from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.serializers import QuizSerializer, QuizResultsSerializer, QuestionSerializer, QuizProgressSerializer, QuestionProgressSerializer
from django.contrib.auth.models import User
from app.models import Quiz, QuizResults, Question, QuizProgress, QuestionProgress, ActivityStream
import uuid
from django.core.files.uploadedfile import UploadedFile
import json
from django.core.files.base import ContentFile
import base64

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    try:
        print("Received FILES:", request.FILES.keys())
        
        quiz_data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'level': request.data.get('level'),
            'author': request.user.id, 
            'tags': json.loads(request.data.get('tags', '[]'))
        }

        # Handle title image
        if 'title_image' in request.FILES:
            quiz_data['title_image'] = request.FILES['title_image']
            print("Title image processed")

        questions_data = json.loads(request.data.get('questions', '[]'))
        quiz_data['question_count'] = len(questions_data)

        quiz_serializer = QuizSerializer(data=quiz_data)
        if not quiz_serializer.is_valid():
            print("Quiz serializer errors:", quiz_serializer.errors)
            return Response(quiz_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        quiz = quiz_serializer.save()
        print("Quiz saved successfully")

        for question in questions_data:
            print(f"\nProcessing question {question['question_number']}")
            question['quiz'] = quiz.id
            question['level'] = quiz.level

            # Process question image
            question_image_key = f"question_image_{question['question_number']}"
            if question_image_key in request.FILES:
                question['question_image'] = request.FILES[question_image_key]
                print(f"Added question image: {question_image_key}")

            # Process choice images
            for i in range(1, 5):
                choice_image_key = f"choice{i}_image_{question['question_number']}"
                print(f"Looking for {choice_image_key}")
                if choice_image_key in request.FILES:
                    question[f'choice{i}_image'] = request.FILES[choice_image_key]
                    print(f"Added choice image: {choice_image_key}")
                else:
                    print(f"Missing {choice_image_key}")

            print("Question data before serialization:", {k: '...' if k.endswith('_image') else v for k, v in question.items()})
            
            question_serializer = QuestionSerializer(data=question)
            if not question_serializer.is_valid():
                print("Question serializer errors:", question_serializer.errors)
                quiz.delete()
                return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            saved_question = question_serializer.save()
            print("Saved question images:")
            print(f"Question image: {saved_question.question_image}")
            print(f"Choice1 image: {saved_question.choice1_image}")
            print(f"Choice2 image: {saved_question.choice2_image}")
            print(f"Choice3 image: {saved_question.choice3_image}")
            print(f"Choice4 image: {saved_question.choice4_image}")
        
        user = request.user
        for x in user.profile.followers.all():
            ActivityStream.objects.create(
                actor=request.user,
                verb="created",
                object_type="Quiz",
                object_id=quiz.id,
                object_name = quiz.title,
                target=f"Quiz:{quiz.id}",
                affected_username=x.user.username  # Use the associated User's username
            )

        

        return Response(quiz_serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error in create_quiz: {str(e)}")
        if 'quiz' in locals():
            quiz.delete()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_quiz(request):
    quiz_id = request.data.get('quiz_id')
    if quiz_id is None:
        return Response({'error': 'quiz_id must be provided'}, status=status.HTTP_400_BAD_REQUEST)
    quiz = get_object_or_404(Quiz, id=quiz_id)
    user = request.user
    if user.is_staff:
        if quiz.author != user:
            ActivityStream.objects.create(
                actor=request.user,
                verb="deleted",
                object_type="Quiz",
                object_id=quiz.id,
                object_name = quiz.title,
                target=f"Quiz:{quiz.id}",
                affected_username= quiz.author.username  # Use the associated User
            )
            
            quiz.delete()
        
        return Response({'message': 'Quiz deleted'}, status=status.HTTP_200_OK)
    
    return Response({'error': 'You are not authorized to delete this quiz'}, status=status.HTTP_403_FORBIDDEN)
    

@api_view(['GET'])
def view_quizzes(request):
    quizzes = Quiz.objects.all()
    # TODO: paginate the results
    serializer = QuizSerializer(quizzes, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz(request):
    quiz_progress = get_object_or_404(QuizProgress, id=request.data['quiz_progress_id'])
    if quiz_progress.completed:
        return Response({'error': 'Quiz already submitted.'}, status=status.HTTP_400_BAD_REQUEST)

    quiz = quiz_progress.quiz
    questions = Question.objects.filter(quiz=quiz.id)
    question_progresses = []

    for question in questions:
        question_progress = get_object_or_404(QuestionProgress, question=question.id, quiz_progress=quiz_progress)
        if question_progress.answer == 0:
            return Response({'error': 'Please answer all questions'}, status=status.HTTP_400_BAD_REQUEST)
        question_progresses.append(question_progress)

    score = sum([1 for qp in question_progresses if qp.question.correct_choice == qp.answer])

    quiz_result_serializer = QuizResultsSerializer(
        data={
            'quiz': quiz.id,
            'quiz_progress': quiz_progress.id,
            'user': request.user.id,
            'score': score,
            'time_taken': quiz_progress.quiz_attempt
        },
        context={'request': request}
    )

    if quiz_result_serializer.is_valid():
        quiz_result = quiz_result_serializer.save()
        quiz_progress.completed = True
        quiz_progress.save()

        quiz.times_taken += 1
        quiz.total_score += score
        quiz.save()

        response_data = {
            'result_url': f"/quiz/result/{quiz_result.id}",
            'quiz_result': {
                'id': quiz_result.id,
                'score': score,
                'total_questions': len(questions),
                'quiz_title': quiz.title,
                'quiz_title_image': request.build_absolute_uri(quiz.title_image.url) if quiz.title_image else None,
            }
        }

        ActivityStream.objects.create(
            actor=request.user,
            verb="solved",
            object_type="Quiz",
            object_id=quiz.id,
            object_name = quiz.title,
            target=f"Quiz:{quiz.id}",
            affected_username= quiz.author.username  # Use the associated User's username
        )

        return Response(response_data, status=status.HTTP_200_OK)
    
    return Response(quiz_result_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_quiz(request):
    # check if quiz progress is completed
    quiz_progress = get_object_or_404(QuizProgress, id=request.data['quiz_progress_id'])
    if quiz_progress.completed:
        return Response({'error': 'Quiz already submitted.'}, status=status.HTTP_400_BAD_REQUEST)
    # check if quiz progress is user's
    if quiz_progress.user != request.user:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    quiz_progress.delete()
    return Response({'message': 'Quiz progress deleted'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_results(request):
    quizResults = QuizResults.objects.filter(user=request.user)
    serializer = QuizResultsSerializer(quizResults, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_specific_quiz_result(request, quiz_result_id):
    quiz_result = get_object_or_404(QuizResults, id=quiz_result_id, user=request.user)

    quiz = quiz_result.quiz
    quiz_progress = quiz_result.quiz_progress
    
    questions_data = []
    for question_progress in QuestionProgress.objects.filter(quiz_progress=quiz_progress):
        question = question_progress.question
        question_data = {
            'question_text': question.question_text,
            'question_image': request.build_absolute_uri(question.question_image.url) if question.question_image else None,
            'choices': [
                question.choice1,
                question.choice2,
                question.choice3,
                question.choice4
            ],
            'choice_images': [
                request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
                request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
                request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
                request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None,
            ],
            'question_number': question.question_number,
            'correct_choice': question.correct_choice,
            'user_answer': question_progress.answer,
            'is_correct': question_progress.answer == question.correct_choice
        }
        questions_data.append(question_data)

    response_data = {
        'quiz_result': QuizResultsSerializer(quiz_result, context={'request': request}).data,
        'questions': sorted(questions_data, key=lambda x: x['question_number']),
        'quiz_title_image': request.build_absolute_uri(quiz.title_image.url) if quiz.title_image else None
    }
    
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_review(request, quiz_result_id):
    quiz_result = get_object_or_404(QuizResults, id=quiz_result_id, user=request.user)
    quiz_progress = quiz_result.quiz_progress
    quiz = quiz_progress.quiz
    question_progresses = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
    
    data = {
        'questions': [],
        'quiz_progress_id': quiz_progress.id,
        'quiz_title': quiz.title,
        'quiz_title_image': request.build_absolute_uri(quiz.title_image.url) if quiz.title_image else None,
        'question_count': quiz.question_count
    }

    for question_progress in question_progresses:
        question = get_object_or_404(Question, id=question_progress.question.id)
        question_data = {
            'question': question.question_text,
            'question_image': request.build_absolute_uri(question.question_image.url) if question.question_image else None,
            'choices': [
                question.choice1,
                question.choice2,
                question.choice3,
                question.choice4
            ],
            'choice_images': [
                request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
                request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
                request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
                request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None,
            ],
            'question_number': question.question_number,
            'correct_choice': question.correct_choice,
            'previous_answer': question_progress.answer
        }
        data['questions'].append(question_data)

    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])


    quiz_progresses = QuizProgress.objects.filter(
        quiz=quiz, 
        user=request.user, 
        completed=False
    )

    if quiz_progresses.count() > 1:
        return Response(
            {'error': 'Multiple quiz progresses found'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    elif quiz_progresses.count() == 1:
        quiz_progress = quiz_progresses[0]
        question_progresses = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
        if question_progresses.count() == 0:
            return Response(
                {'error': 'No question progress found'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = format_quiz_data(quiz_progress, question_progresses, request)
        return Response(data, status=status.HTTP_200_OK)

    quiz_attempt = 1
    existing_progresses = QuizProgress.objects.filter(quiz=quiz, user=request.user)
    if existing_progresses.exists():
        quiz_attempt = max([p.quiz_attempt for p in existing_progresses]) + 1

    quiz_progress = QuizProgress.objects.create(
        quiz=quiz,
        user=request.user,
        quiz_attempt=quiz_attempt
    )

    questions = Question.objects.filter(quiz=quiz)
    for question in questions:
        QuestionProgress.objects.create(
            quiz_progress=quiz_progress,
            question=question
        )

    data = format_quiz_data(quiz_progress, questions, request)
    return Response(data, status=status.HTTP_200_OK)

def create_new_progress(quiz, user, request):
    quiz_attempt = 1
    existing_progresses = QuizProgress.objects.filter(quiz=quiz, user=user)
    if existing_progresses.exists():
        quiz_attempt = max([p.quiz_attempt for p in existing_progresses]) + 1

    quiz_progress = QuizProgress.objects.create(
        quiz=quiz,
        user=user,
        quiz_attempt=quiz_attempt
    )

    questions = Question.objects.filter(quiz=quiz)
    for question in questions:
        QuestionProgress.objects.create(
            quiz_progress=quiz_progress,
            question=question
        )

    data = format_quiz_data(quiz_progress, questions, request)
    return Response(data, status=status.HTTP_200_OK)

def format_quiz_data(quiz_progress, questions, request):
    data = {
        "questions": [],
        "quiz_progress_id": quiz_progress.id,
        "quiz_title": quiz_progress.quiz.title,
        "quiz_title_image": request.build_absolute_uri(quiz_progress.quiz.title_image.url) if quiz_progress.quiz.title_image else None,
        "question_count": quiz_progress.quiz.question_count
    }

    for question_item in questions:
        if isinstance(question_item, QuestionProgress):
            question = question_item.question
            previous_answer = question_item.answer
        else:
            question = question_item
            try:
                question_progress = QuestionProgress.objects.get(
                    question=question,
                    quiz_progress=quiz_progress
                )
                previous_answer = question_progress.answer
            except QuestionProgress.DoesNotExist:
                previous_answer = 0

        question_data = {
            'question': question.question_text,
            'question_image': request.build_absolute_uri(question.question_image.url) if question.question_image else None,
            'choices': [
                question.choice1,
                question.choice2,
                question.choice3,
                question.choice4
            ],
            'choice_images': [
                request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
                request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
                request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
                request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None,
            ],
            'question_number': question.question_number,
            'previous_answer': previous_answer
        }
        
        data["questions"].append(question_data)

    return data

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solve_question(request):
    quiz_progress = get_object_or_404(QuizProgress, id=request.data['quiz_progress_id'])
    if quiz_progress.completed:
        return Response({'error': 'Quiz already submitted.'}, status=status.HTTP_400_BAD_REQUEST)

    quiz = quiz_progress.quiz
    question = get_object_or_404(Question, question_number=request.data['question_number'], quiz=quiz)
    question_progress = get_object_or_404(QuestionProgress, question=question, quiz_progress=request.data['quiz_progress_id'])

    question_progress_serializer = QuestionProgressSerializer(
        instance=question_progress,
        data={"answer": request.data['answer']},
        partial=True
    )

    if question_progress_serializer.is_valid():
        question_progress_serializer.save()
        
        response_data = {
            "detail": "Question progress updated.",
            "question": {
                "question_text": question.question_text,
                "question_image": request.build_absolute_uri(question.question_image.url) if question.question_image else None,
                "choices": [
                    question.choice1,
                    question.choice2,
                    question.choice3,
                    question.choice4
                ],
                "choice_images": [
                    request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
                    request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
                    request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
                    request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None
                ],
                "question_number": question.question_number,
                "previous_answer": question_progress.answer
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
    return Response(question_progress_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_question(request):
    question = get_object_or_404(Question, 
        question_number=request.data['question_number'], 
        quiz=request.data['quiz_id']
    )
    
    quiz_progress, _ = QuizProgress.objects.get_or_create(
        quiz_id=request.data['quiz_id'],
        user=request.user,
        completed=False
    )

    question_progress, _ = QuestionProgress.objects.get_or_create(
        question=question,
        quiz_progress=quiz_progress
    )
    
    response_data = {
        'question': question.question_text,
        'question_image': request.build_absolute_uri(question.question_image.url) if question.question_image else None,
        'choices': [
            question.choice1,
            question.choice2,
            question.choice3,
            question.choice4
        ],
        'choice_images': [
            request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
            request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
            request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
            request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None,
        ],
        'previous_answer': question_progress.answer,
        'question_number': question.question_number
    }
    
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_quiz(request, quiz_id):
    try:
        quiz = get_object_or_404(Quiz, id=quiz_id)
        serializer = QuizSerializer(quiz, context={'request': request})
        data = {
            'quiz': serializer.data
        }
        
        if request.user.is_authenticated:    
            data['is_solved'] = QuizProgress.objects.filter(quiz=quiz, user=request.user, completed=True).exists()
            data['quiz_result_id'] = QuizResults.objects.filter(quiz=quiz, user=request.user).order_by('-id').first().id if data['is_solved'] else None
        
        if data['is_solved']:
            latest_result = QuizResults.objects.filter(
                quiz=quiz,
                user=request.user
            ).order_by('-id').first()
            
            data['quiz_result_id'] = latest_result.id if latest_result else None
            data['latest_score'] = latest_result.score if latest_result else None
            
            best_result = QuizResults.objects.filter(
                quiz=quiz,
                user=request.user
            ).order_by('-score').first()
            data['best_score'] = best_result.score if best_result else None
        
        return Response(data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': f'Error retrieving quiz: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])

    if request.user in quiz.bookmarked_by.all():
        quiz.bookmarked_by.remove(request.user)  
        return Response({'message': 'Quiz unbookmarked'}, status=status.HTTP_200_OK)

    quiz.bookmarked_by.add(request.user) 
    return Response({'message': 'Quiz bookmarked'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])
    if quiz.author != request.user and not request.user.is_staff:
        return Response({'error': 'You are not authorized to update this quiz'}, status=status.HTTP_403_FORBIDDEN)
    
    data = request.data
    tags = data['quiz']['tags']
    data['quiz']['tags'] = [{'name': t} for t in tags]
    data['quiz']['author'] = quiz.author.id
    
    quizSerializer = QuizSerializer(instance=quiz, data=data['quiz'], context = {'request': request})
    if not quizSerializer.is_valid():
        return Response(quizSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    quiz = quizSerializer.save()
    return Response(quizSerializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])

    if request.user in quiz.liked_by.all():
        quiz.liked_by.remove(request.user)  
        quiz.like_count -= 1
        quiz.save()
        return Response({'message': 'Quiz unliked'}, status=status.HTTP_200_OK)

    quiz.liked_by.add(request.user) 
    quiz.like_count += 1
    quiz.save()

    if request.user != quiz.author:
        ActivityStream.objects.create(
            actor=request.user,
            verb="liked",
            object_type="Quiz",
            object_id=quiz.id,
            object_name = quiz.title,
            target=f"Quiz:{quiz.id}",
            affected_username= quiz.author.username 
        )
    
    return Response({'message': 'Quiz liked'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_liked_quizzes(request):
    quizzes = Quiz.objects.filter(liked_by=request.user.id)
    serializer = QuizSerializer(quizzes, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_bookmarked_quizzes(request):
    quizzes = Quiz.objects.filter(bookmarked_by=request.user.id)
    serializer = QuizSerializer(quizzes, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_created_quizzes(request, username):
    user = get_object_or_404(User, username=username)
    quizzes = Quiz.objects.filter(author=user)
    serializer = QuizSerializer(quizzes, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_solved_quizzes(request, username):
    user = get_object_or_404(User, username=username)
    quiz_progresses = QuizProgress.objects.filter(user=user, completed=True)
    quizzes = list({quiz_progress.quiz for quiz_progress in quiz_progresses})
    serializer = QuizSerializer(quizzes, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_recommendations(request, quiz_id):
    quiz = get_object_or_404(Quiz, id=quiz_id)
    level = quiz.level
    tags = quiz.tags.all()
    recommended_on_level = Quiz.objects.filter(level=level).exclude(id=quiz_id).order_by('?').first()
    recommended_on_tags = Quiz.objects.filter(tags__in=tags).exclude(id=quiz_id).order_by('?').first()
    if recommended_on_level is not None:
        serializer = QuizSerializer(recommended_on_level, context = {'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    if recommended_on_tags is not None:
        serializer = QuizSerializer(recommended_on_tags, context = {'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    random = Quiz.objects.exclude(id=quiz_id).order_by('?').first()

    serializer = QuizSerializer(random, context = {'request': request})

    if random is not None:
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({'error': 'No recommendations found'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_latest_quiz_review(request, quiz_id):
    quiz = get_object_or_404(Quiz, id=quiz_id)
    quiz_progresses = QuizProgress.objects.filter(
        quiz=quiz, 
        completed=True
    ).order_by('-id')
    
    if quiz_progresses.count() == 0:
        return Response(
            {'error': 'No reviews found'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    quiz_progress = quiz_progresses.first()
    question_progresses = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
    
    data = {
        'questions': [],
        'quiz_title': quiz.title,
        'quiz_title_image': request.build_absolute_uri(quiz.title_image.url) if quiz.title_image else None,
        'quiz_progress_id': quiz_progress.id,
        'question_count': quiz.question_count,
        'score': quiz_progress.score if hasattr(quiz_progress, 'score') else None
    }

    for question_progress in question_progresses:
        question = get_object_or_404(Question, id=question_progress.question.id)
        question_data = {
            'question': question.question_text,
            'question_image': request.build_absolute_uri(question.question_image.url) if question.question_image else None,
            'choices': [
                question.choice1,
                question.choice2,
                question.choice3,
                question.choice4
            ],
            'choice_images': [
                request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
                request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
                request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
                request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None,
            ],
            'question_number': question.question_number,
            'correct_choice': question.correct_choice,
            'previous_answer': question_progress.answer,
            'is_correct': question_progress.answer == question.correct_choice
        }
        data['questions'].append(question_data)
    data['questions'].sort(key=lambda x: x['question_number'])
    
    return Response(data, status=status.HTTP_200_OK)