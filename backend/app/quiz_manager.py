from .models import Quiz, Tags

def CreateQuiz(title, description, author, time_limit):
    quiz = Quiz.objects.create(
        title=title,
        description=description,
        author=author,
        times_taken=0,
        total_score=0,
        time_limit=time_limit,
        like_count=0
    )
    return quiz
