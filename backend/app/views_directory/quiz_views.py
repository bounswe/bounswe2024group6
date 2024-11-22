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
    quizSerializer = QuizSerializer(data=data['quiz'])
    quiz = None
    if not quizSerializer.is_valid():
        print("was")
        return Response(quizSerializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    quiz = quizSerializer.save() 
    questions = data['questions']
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
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])
    # delete quiz progress as we dont need it anymore
    # QuizProgress.objects.delete(quiz=quiz, user=request.user)
    questions = Question.objects.filter(quiz=quiz.id)
    print(questions)
    question_progresses = []

    for question in questions:
        print(question.id, request.user.id)
        question_progress = get_object_or_404(QuestionProgress, question=question.id, user=request.user.id)
        if question_progress.answer is 0:
            return Response({'error': 'Please answer all questions'}, status=status.HTTP_400_BAD_REQUEST)
        question_progresses.append(question_progress)

    # QuestionProgress.objects.filter(quiz=quiz, user=request.user)
    score = sum([1 for question_progress in question_progresses if question_progress.question.correct_choice == question_progress.answer])
    # quizResult = QuizResults(quiz=quiz, user=request.user, score=score, time_taken=request.data['time_taken'])
    quizResults = QuizResultsSerializer(data = {'quiz': quiz.id, 'user': request.user.id, 'score': score, 'time_taken': 5})
    if quizResults.is_valid():
        quizResults.save()
    return Response({'score': score}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])     
    progress_data = {
    'quiz': quiz.id,
    'user': request.user.id,
    }
    progress = QuizProgressSerializer(data = progress_data)
    if progress.is_valid():
        progress.save()
    else:
        return Response(progress.errors, status=status.HTTP_400_BAD_REQUEST)
    data = {}

    first_question = Question.objects.get(quiz=quiz, question_number=1)
    questionProgress = QuestionProgressSerializer(data = {"question": first_question.id, "user":request.user.id})
    if questionProgress.is_valid():
        questionProgress.save()
    else:
        return Response(questionProgress.errors, status=status.HTTP_400_BAD_REQUEST)

    data = QuestionSerializer(first_question).data
    # data['is_correct'] = is_correct
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solve_question(request):
    question = get_object_or_404(Question, question_number = request.data['question_number'], quiz=request.data['quiz_id'])

    # is_correct = question.correct_choice == request.data['answer']
      
    question_progress = get_object_or_404(QuestionProgress, question=question, user=request.user)

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

