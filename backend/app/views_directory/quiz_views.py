from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.serializers import QuizSerializer, QuizResultsSerializer, QuestionSerializer, QuizProgressSerializer, QuestionProgressSerializer
from django.contrib.auth.models import User
from app.models import Quiz, QuizResults, Question, QuizProgress, QuestionProgress, WrongQuestion
from django.db import transaction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    if request.data.get('quiz') is None or request.data.get('questions') is None:
        return Response({'error': 'quiz and questions must be provided'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    data['quiz']['author'] = request.user.id
    questions = data['questions']
    data['quiz']['question_count'] = len(questions)
    quizSerializer = QuizSerializer(data=data['quiz'], context = {'request': request})
    quiz = None
    if not quizSerializer.is_valid():
        return Response(quizSerializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    quiz = quizSerializer.save() 
    question_serializers = []
    for question in questions:
        question['quiz'] = quiz.id
        question['level'] = quiz.level # TODO: change this
        questionSerializer = QuestionSerializer(data=question)
        if questionSerializer.is_valid():
            print(questionSerializer.validated_data['question_number'])
            question_serializers.append(questionSerializer)
        else:
            quiz.delete()
            return Response(questionSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # quizSerializer.save()
    for question_serializer in question_serializers:
        question_serializer.save()
    return Response(quizSerializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_quizzes(request):
    #  quizzes with for_user field null are public quizzes, so view them
    quizzes = Quiz.objects.filter(for_user__isnull=True)

    # TODO: paginate the results
    serializer = QuizSerializer(quizzes, many=True, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_review_quizzes(request):
    #  quizzes with for_user field null are public quizzes, so view them
    quizzes = Quiz.objects.filter(for_user=request.user)
    return Response(QuizSerializer(quizzes, many=True, context = {'request': request}).data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz(request):
    quiz_progress = get_object_or_404(QuizProgress, id=request.data['quiz_progress_id'])
    if quiz_progress.completed:
        return Response({'error': 'Quiz already submitted.'}, status=status.HTTP_400_BAD_REQUEST)
    quiz_progress.quiz.id
    quiz = get_object_or_404(Quiz, id=quiz_progress.quiz.id)
 
    questions = Question.objects.filter(quiz=quiz.id)
    # print(questions)
    question_progresses = []

    for question in questions:
        # print(question.id, request.user.id)
        question_progress = get_object_or_404(QuestionProgress, question=question.id, quiz_progress=quiz_progress)
        if question_progress.answer is 0:
            return Response({'error': 'Please answer all questions'}, status=status.HTTP_400_BAD_REQUEST)
        question_progresses.append(question_progress)

    score = 0
    
    for qp in question_progresses:
        user_answer = qp.answer
        question = qp.question
        
        if question.correct_choice == user_answer:
            score += 1
        else:
            if not WrongQuestion.objects.filter(question=question, user=request.user).exists():
                WrongQuestion.objects.create(question=question, user=request.user)

    wrong_question_count = WrongQuestion.objects.filter(user=request.user).count()
    if wrong_question_count > 5:
        print('Creating review quiz')
        # fetch the latest 5 wrong questions
        # TODO: change this to a more clever algorithm
        wrong_questions = WrongQuestion.objects.filter(user=request.user).order_by('-id')[:5]
        
        review_quiz_data = {
            'title': 'Review Your Mistakes',
            'description': 'A set of questions you answered incorrectly.',
            'author': request.user.id,
            'tags': [{'name': 'for you'}],  # TODO: add relevant tags if necessary
            'level': 'B1',  # TODO: adjust the level from the wrong questions 
            'question_count': wrong_questions.count(),
            'for_user': request.user.id
        }
        
        quiz_serializer = QuizSerializer(data=review_quiz_data, context={'request': request})
        if quiz_serializer.is_valid():
            with transaction.atomic():
                review_quiz = quiz_serializer.save()
                
                for wq in wrong_questions:
                    original_question = wq.question
                    question_data = {
                        'quiz': review_quiz.id,
                        'question_number': original_question.question_number,
                        'question_text': original_question.question_text,
                        'level': original_question.level,
                        'choice1': original_question.choice1,
                        'choice2': original_question.choice2,
                        'choice3': original_question.choice3,
                        'choice4': original_question.choice4,
                        'correct_choice': original_question.correct_choice,
                    }
                    question_serializer = QuestionSerializer(data=question_data)
                    if question_serializer.is_valid():
                        question_serializer.save()
                    else:
                        raise ValueError(question_serializer.errors)
                
                wrong_question_ids = list(wrong_questions.values_list('id', flat=True))
                WrongQuestion.objects.filter(id__in=wrong_question_ids).delete()
        else:
            print("welp...")
            return Response(quiz_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    quiz_result_serializer = QuizResultsSerializer(data={
        'quiz': quiz.id,
        'quiz_progress': quiz_progress.id,
        'user': request.user.id,
        'score': score,
        'time_taken': quiz_progress.quiz_attempt
    })

    if quiz_result_serializer.is_valid():
        quiz_result = quiz_result_serializer.save() 
    else:
        return Response(quiz_result.errors, status=status.HTTP_400_BAD_REQUEST)

    quiz_progress.completed = True
    quiz_progress.save()


    # update time taken of quiz in database
    quiz.times_taken += 1
    quiz.total_score += score
    quiz.save()
    result_url = f"/quiz/result/{quiz_result.id}"

    return Response({'result_url': result_url}, status=status.HTTP_200_OK)



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

    serializer = QuizResultsSerializer(quiz_result, context = {'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_review(request, quiz_result_id):
    quiz_progress = get_object_or_404(QuizResults, id=quiz_result_id, user=request.user).quiz_progress
    quiz = quiz_progress.quiz
    question_progresses = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
    data = {'questions': []}
    for question_progress in question_progresses:
        question = get_object_or_404(Question, id=question_progress.question.id)
        data['questions'].append({'question': question.question_text, 
                    'choices': [question.choice1, question.choice2, 
                    question.choice3, question.choice4], 
                    'question_number': question.question_number,
                    'correct_choice': question.correct_choice,
                    'previous_answer': question_progress.answer})
    data["quiz_progress_id"] = quiz_progress.id
    data["quiz_title"] = quiz.title
    data["question_count"] = quiz.question_count
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])     

    # get quiz progresses, if the highest is not completed, retrieve that
    quiz_progresses = QuizProgress.objects.filter(quiz=quiz, user=request.user, completed = False)
    if quiz_progresses.count() > 1:
        return Response({'error': 'Multiple quiz progresses found'}, status=status.HTTP_400_BAD_REQUEST)
    elif quiz_progresses.count() == 1:
        quiz_progress = quiz_progresses[0]
        question_progress = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
        if question_progress.count() == 0:
            return Response({'error': 'No question progress found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'questions': []}
            for question_progress in question_progress:
                data['questions'].append({'question': question_progress.question.question_text, 
                            'choices': [question_progress.question.choice1, question_progress.question.choice2, 
                            question_progress.question.choice3, question_progress.question.choice4], 
                            'question_number': question_progress.question.question_number,
                            'previous_answer': question_progress.answer})
            data["quiz_progress_id"] = quiz_progress.id
            data["quiz_title"] = quiz.title
            data["question_count"] = quiz.question_count
            return Response(data, status=status.HTTP_200_OK)
    
    # no quiz progress found, create a new one
    # get highest quiz attempt yet
    quiz_progresses = QuizProgress.objects.filter(quiz=quiz, user=request.user)
    quiz_attempt = 1
    if quiz_progresses.count() > 0:
        quiz_attempt = max([quiz_progress.quiz_attempt for quiz_progress in quiz_progresses]) + 1
    quiz_progress = QuizProgress.objects.create(quiz=quiz, user=request.user, quiz_attempt=quiz_attempt)

    for question in Question.objects.filter(quiz=quiz):
        question_progress = QuestionProgress.objects.create(quiz_progress= quiz_progress, question= question)
        
    # send all questions to the user
    questions = Question.objects.filter(quiz=quiz)
    data = {"questions": []}
    for question in questions:
        question_progress = get_object_or_404(QuestionProgress, question=question, quiz_progress= quiz_progress)
        data["questions"].append({'question': question.question_text, 
                        'choices': [question.choice1, question.choice2, 
                        question.choice3, question.choice4], 
                        'question_number': question.question_number,
                        'previous_answer': question_progress.answer})
    data["quiz_progress_id"] = quiz_progress.id
    data["quiz_title"] = quiz.title
    data["question_count"] = quiz.question_count

    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solve_question(request):
    quizProgress = get_object_or_404(QuizProgress, id=request.data['quiz_progress_id'])
    if quizProgress.completed:
        return Response({'error': 'Quiz already submitted.'}, status=status.HTTP_400_BAD_REQUEST)
    quiz = quizProgress.quiz
    question = get_object_or_404(Question, question_number = request.data['question_number'], quiz = quiz)
    
    question_progress = get_object_or_404(QuestionProgress, question=question, quiz_progress=request.data['quiz_progress_id'])

    question_progress_serializer = QuestionProgressSerializer(
        instance=question_progress,
        data={"answer": request.data['answer']},
        partial=True  
    )

    if question_progress_serializer.is_valid():
        question_progress_serializer.save()
        return Response({"detail": "Question progress updated."}, status=status.HTTP_200_OK)
    else:
        return Response(question_progress_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_question(request):
    question = get_object_or_404(Question, question_number = request.data['question_number'], quiz=request.data['quiz_id'])
    print(question)
    questionProgress, _ = QuestionProgress.objects.get_or_create(question=question, user=request.user)
    previous_answer = None
    if questionProgress is not None:
        previous_answer = questionProgress.answer
    
    return Response({'question': question.question_text, 'choices': [question.choice1, question.choice2, question.choice3, question.choice4], 'previous_answer': previous_answer}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz(request, quiz_id):
    quiz = get_object_or_404(Quiz, id=quiz_id)
    serializer = QuizSerializer(quiz, context = {'request': request})
    data = {'quiz': serializer.data}
    data['is_solved'] = QuizProgress.objects.filter(quiz=quiz, user=request.user, completed=True).exists()
    data['quiz_result_id'] = QuizResults.objects.filter(quiz=quiz, user=request.user).order_by('-id').first().id if data['is_solved'] else None
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])

    if request.user in quiz.bookmarked_by.all():
        quiz.bookmarked_by.remove(request.user)  # Unbookmark if already bookmarked
        return Response({'message': 'Quiz unbookmarked'}, status=status.HTTP_200_OK)

    quiz.bookmarked_by.add(request.user)  # Add bookmark
    return Response({'message': 'Quiz bookmarked'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])

    if request.user in quiz.liked_by.all():
        quiz.liked_by.remove(request.user)  # Unlike if already liked
        quiz.like_count -= 1
        quiz.save()
        return Response({'message': 'Quiz unliked'}, status=status.HTTP_200_OK)

    quiz.liked_by.add(request.user)  # Add like
    quiz.like_count += 1
    quiz.save()
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
    quiz_progresses = QuizProgress.objects.filter(quiz=quiz, completed=True).order_by('-id')
    print(quiz_progresses)
    if quiz_progresses.count() == 0:
        return Response({'error': 'No reviews found'}, status=status.HTTP_400_BAD_REQUEST)
    quiz_progress = quiz_progresses.first()
    question_progresses = QuestionProgress.objects.filter(quiz_progress=quiz_progress)
    data = {'questions': []}
    for question_progress in question_progresses:
        question = get_object_or_404(Question, id=question_progress.question.id)
        data['questions'].append({'question': question.question_text, 
                    'choices': [question.choice1, question.choice2, 
                    question.choice3, question.choice4], 
                    'question_number': question.question_number,
                    'correct_choice': question.correct_choice,
                    'previous_answer': question_progress.answer})
    return Response(data, status=status.HTTP_200_OK)
