from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.serializers import QuizSerializer, QuizResultsSerializer, QuestionSerializer, QuizProgressSerializer, QuestionProgressSerializer
from django.contrib.auth.models import User
from app.models import Quiz, QuizResults, Question, QuizProgress, QuestionProgress

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    if request.data.get('quiz') is None or request.data.get('questions') is None:
        return Response({'error': 'quiz and questions must be provided'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    data['quiz']['author'] = request.user.id
    questions = data['questions']
    data['quiz']['question_count'] = len(questions)
    quizSerializer = QuizSerializer(data=data['quiz'])
    quiz = None
    if not quizSerializer.is_valid():
        print("was")
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
    quizzes = Quiz.objects.all()
    # TODO: paginate the results
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

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
        print(question.id, request.user.id)
        question_progress = get_object_or_404(QuestionProgress, question=question.id, quiz_progress=quiz_progress)
        if question_progress.answer is 0:
            return Response({'error': 'Please answer all questions'}, status=status.HTTP_400_BAD_REQUEST)
        question_progresses.append(question_progress)

    score = sum([1 for question_progress in question_progresses if question_progress.question.correct_choice == question_progress.answer])

    quizResults = QuizResultsSerializer(data = {'quiz': quiz.id, 'user': request.user.id, 'score': score, 'time_taken': quiz_progress.quiz_attempt})
    if quizResults.is_valid():
        quizResults.save()

    quiz_progress.completed = True
    quiz_progress.save()


    # update time taken of quiz in database
    quiz.times_taken += 1

    return Response({'score': score}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_results(request):
    quizResults = QuizResults.objects.filter(user=request.user)
    serializer = QuizResultsSerializer(quizResults, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
        question_progress.answer = 0

        question_progress_serializer = QuestionProgressSerializer(
            instance=question_progress,
            data={"answer": 0},
            partial=True
        )

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

    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solve_question(request):
    quizProgress = get_object_or_404(QuizProgress, id=request.data['quiz_progress_id'])
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
def get_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])
    serializer = QuizSerializer(quiz)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

