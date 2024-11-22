from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.serializers import QuizSerializer, QuizResultsSerializer, QuestionSerializer
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
    if not quizSerializer.is_valid():
        return Response(quizSerializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    quiz = quizSerializer.save() 
    questions = data['questions']
    question_serializers = []
    for question in questions:
        question['quiz'] = quiz.id
        question['level'] = quiz.level # TODO: change this
        questionSerializer = QuestionSerializer(data=question)
        if questionSerializer.is_valid():
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
    QuizProgress.objects.delete(quiz=quiz, user=request.user)
    question_progresses = QuestionProgress.objects.filter(quiz=quiz, user=request.user)
    score = sum([1 for question_progress in question_progresses if question_progress.question.correct_choice == question_progress.answer])
    quizResult = QuizResults(quiz=quiz, user=request.user, score=score, time_taken=request.data['time_taken'])
    quizResult.save()
    return Response({'score': score}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solve_question(request):
    question = get_object_or_404(Question, id=request.data['question_id'])
    is_correct = question.correct_choice == request.data['answer']
      
    progress = get_object_or_404(QuizProgress, quiz=question.quiz, user=request.user) # must be unique
    questionProgress = QuestionProgress.objects.get_or_create(question=question, user=request.user)
    questionProgress.update(answer=request.data['answer'])
    questionProgress.save()
    data = {}
    # data['is_correct'] = is_correct
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_question(request):
    question = get_object_or_404(Question, question_number = request.data['question_number'], quiz=request.data['quiz_id'])
    return Response({'question': question.question_text, 'choices': [question.choice1, question.choice2, question.choice3, question.choice4]}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz(request):
    quiz = get_object_or_404(Quiz, id=request.data['quiz_id'])
    serializer = QuizSerializer(quiz)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

