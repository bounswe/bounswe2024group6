from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Quiz, QuizProgress, Question

@api_view(['POST'])
def solve_quiz(request, quiz_id):
    user = request.user
    quiz = Quiz.objects.get(id=quiz_id)

    progress, created = QuizProgress.objects.get_or_create(user=user, quiz=quiz)

    if progress.completed:
        return Response({"message": "Quiz already completed.", "progress": progress.answers}, status=status.HTTP_200_OK)

    question_id = request.data.get('question_id')
    answer = request.data.get('answer')

    if question_id and answer:
        progress.answers[question_id] = answer  # Save answer to the current question
        progress.save()

    remaining_questions = quiz.questions.exclude(id__in=progress.answers.keys())
    if remaining_questions.exists():
        progress.current_question = remaining_questions.first()
        progress.save()
        next_question = {
            "question_text": progress.current_question.question_text,
            "choices": [progress.current_question.choice1, progress.current_question.choice2,
                        progress.current_question.choice3, progress.current_question.choice4]
        }
        return Response({"next_question": next_question}, status=status.HTTP_200_OK)
    else:
        progress.completed = True  
        progress.save()
        return Response({"message": "Quiz completed.", "progress": progress.answers}, status=status.HTTP_200_OK)
