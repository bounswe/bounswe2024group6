from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)

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
    # author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    author = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tags, related_name='quizzes')
    created_at = models.DateTimeField(default=timezone.now)
    times_taken = models.IntegerField(default=0)
    total_score = models.FloatField(default=0)
    time_limit = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    id = models.AutoField(primary_key=True)
    question_text = models.TextField()
    choice1 = models.CharField(max_length=100)
    choice2 = models.CharField(max_length=100)
    choice3 = models.CharField(max_length=100)
    choice4 = models.CharField(max_length=100)
    correct_choice = models.IntegerField()

    def __str__(self):
        return self.question_text
    
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    tags = models.ManyToManyField(Tags, related_name='posts')
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    author = models.CharField(max_length=100)
    like_count = models.IntegerField(default=0)
    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name  
    

class Word(models.Model):
    word = models.CharField(max_length=255, unique=True)
    language = models.CharField(max_length=3, default='eng')  # e.g., 'eng' for English
    level = models.CharField(max_length=20, blank=True, null=True)  # e.g., 'A1', 'B2'
    part_of_speech = models.CharField(max_length=20, blank=True, null=True)
    meaning = models.CharField(max_length=1000)

    categories = models.ManyToManyField(Category, related_name="words")  # Linking Word and Category

    def __str__(self):
        return self.word
    
class Relationship(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="relationships")
    related_word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="related_to")
    relation_type = models.CharField(max_length=50)  # e.g., 'broader', 'narrower', 'synonym'


    def __str__(self):
        return f"{self.word} - {self.relation_type} -> {self.related_word}"

