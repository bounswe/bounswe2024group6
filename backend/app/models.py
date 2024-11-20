from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.timezone import now



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)

    def __str__(self):
        return self.user.username


class Tags(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name

class Quiz(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    # TODO: switch the below line to the following when we have a working user model
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_author')
    tags = models.ManyToManyField(Tags, related_name='quizzes')
    created_at = models.DateTimeField(default=timezone.now)
    times_taken = models.IntegerField(default=0)
    total_score = models.FloatField(default=0)
    time_limit = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    

class QuizProgress(models.Model):
    id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='progress')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_progress')
    current_question = models.IntegerField(default=0)
    score = models.FloatField(default=0)
    time_taken = models.IntegerField(default=0)
    date_started = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.quiz.title + ' - ' + self.user.username

class QuizResults(models.Model):
    id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='results')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='results')
    score = models.FloatField()
    time_taken = models.IntegerField()
    
    def __str__(self):
        return self.quiz.title + ' - ' + self.user.username

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    id = models.AutoField(primary_key=True)
    question_number = models.IntegerField(default=0)
    question_text = models.TextField()
    choice1 = models.CharField(max_length=100)
    choice2 = models.CharField(max_length=100)
    choice3 = models.CharField(max_length=100)
    choice4 = models.CharField(max_length=100)
    correct_choice = models.IntegerField()

    def __str__(self):
        return self.question_text
    
class QuestionProgress(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='progress')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='question_progress')
    answer = models.IntegerField(default=0)
    time_taken = models.IntegerField(default=0)
    
    def __str__(self):
        return self.question.question_text + ' - ' + self.user.username

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    tags = models.ManyToManyField(Tags, related_name='posts')
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    author = models.CharField(max_length=100)
    like_count = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(User, related_name='liked_posts', blank=True)  

    def __str__(self):
        return self.title

class Word(models.Model):
    word = models.CharField(max_length=255, unique=True)
    language = models.CharField(max_length=3, default='eng')  # e.g., 'eng' for English
    level = models.CharField(max_length=20, blank=True, null=True)  # e.g., 'A1', 'B2'
    part_of_speech = models.CharField(max_length=20, blank=True, null=True)
    meaning = models.CharField(max_length=1000, default="Meaning not available")
    sentence = models.CharField(max_length=1000, default="Sentence not available")

    def __str__(self):
        return self.word
    
class Relationship(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="relationships")
    related_word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="related_to")
    relation_type = models.CharField(max_length=50)  # e.g., 'broader', 'narrower', 'synonym'


    def __str__(self):
        return f"{self.word} - {self.relation_type} -> {self.related_word}"
    
class Translation(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="translations")
    translation = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.translation} (Translation of {self.word})"

class ActivityStream(models.Model):
    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')  
    verb = models.CharField(max_length=50)  # liked, created, followed
    object_type = models.CharField(max_length=50)  # Quiz, Post
    object_id = models.IntegerField()  #Quiz ID Post ID
    timestamp = models.DateTimeField(default=now)  # timestamp

    def __str__(self):
        return f"{self.actor.username} {self.verb} {self.object_type}:{self.object_id} at {self.timestamp}"
    
    
class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')  # Assuming a Post model exists
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.post}'
