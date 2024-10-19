from .models import Quiz, Question 
def CreateQuiz(title, description, author, text, level, time_limit, i = 0):
    print("creating quiz")
    Quiz.objects.create(
        title= title,
        description= description,
        author= author,
        level= level,
        times_taken= 0,
        total_score= 0,
        time_limit= time_limit,
        like_count= 0
        )

    