from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

LEVEL_CHOICES = [
    ('A1', 'A1'),
    ('A2', 'A2'),
    ('B1', 'B1'),
    ('B2', 'B2'),
    ('C1', 'C1'),
    ('C2', 'C2'),
    ('NA', 'NA')
]

class Tags(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    name = models.CharField(max_length=100,null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    following = models.ManyToManyField("self", symmetrical=False, related_name="profile_following", blank=True)
    followers = models.ManyToManyField("self", symmetrical=False, related_name="profile_followers", blank=True)
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES, default='A1')
    profile_picture = models.ImageField(upload_to="profile_pictures/", null=True, blank=True)

    def __str__(self):
        return self.name


class Quiz(models.Model):
    LEVEL_CHOICES = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
    ]

    title = models.CharField(max_length=100)
    title_image = models.ImageField(
        upload_to='quiz_titles/',
        null=True,
        blank=True,
        help_text="Optional image to display with the quiz title"
    )
    description = models.TextField()
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='quizzes')
    tags = models.ManyToManyField('Tags', related_name='quizzes')
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES)
    question_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    times_taken = models.IntegerField(default=0)
    total_score = models.FloatField(default=0)
    like_count = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(User, related_name='liked_quizzes', blank=True)
    bookmarked_by = models.ManyToManyField(User, related_name='bookmarked_quizzes', blank=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    LEVEL_CHOICES = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
    ]
    
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_number = models.IntegerField()
    question_text = models.TextField()
    question_image = models.ImageField(upload_to='question_images/', null=True, blank=True)
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES)
    
    choice1 = models.CharField(max_length=100)
    choice1_image = models.ImageField(upload_to='choice_images/', null=True, blank=True)
    choice2 = models.CharField(max_length=100)
    choice2_image = models.ImageField(upload_to='choice_images/', null=True, blank=True)
    choice3 = models.CharField(max_length=100)
    choice3_image = models.ImageField(upload_to='choice_images/', null=True, blank=True)
    choice4 = models.CharField(max_length=100)
    choice4_image = models.ImageField(upload_to='choice_images/', null=True, blank=True)
    
    correct_choice = models.IntegerField(
        help_text="Number between 1-4 indicating which choice is correct",
        validators=[
            MinValueValidator(1, "Choice must be between 1 and 4"),
            MaxValueValidator(4, "Choice must be between 1 and 4")
        ]
    )

    def __str__(self):
        return self.question_text

class QuizProgress(models.Model):
    id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='progress')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_progress')
    score = models.FloatField(default=0)
    quiz_attempt = models.IntegerField(default=0)
    date_started = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('quiz', 'user', "quiz_attempt")  # Enforce unique combination of quiz and user

    
    def __str__(self):
        return self.quiz.title + ' - ' + self.user.username

class QuizResults(models.Model):
    id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='results')
    quiz_progress = models.ForeignKey(QuizProgress, on_delete=models.CASCADE, related_name='results')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='results')
    score = models.FloatField()
    time_taken = models.IntegerField()
    
    def __str__(self):
        return self.quiz.title + ' - ' + self.user.username

    
class QuestionProgress(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='progress')
    answer = models.IntegerField(default=0)
    time_taken = models.IntegerField(default=0)
    quiz_progress = models.ForeignKey(QuizProgress, on_delete=models.CASCADE, related_name='question_progress')

    class Meta:
        unique_together = ('question', 'quiz_progress')  # Enforce unique combination of question and user

    def __str__(self):
        return self.question.question_text + ' - ' + self.user.username

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    tags = ArrayField(
        models.CharField(max_length=50),
        blank=True,
        default=list,
        help_text="List of tags associated with the post."
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    like_count = models.IntegerField(default=0)
    bookmarked_by = models.ManyToManyField(User, related_name='bookmarked_posts', blank=True)  

    liked_by = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def __str__(self):
        return self.title

class Word(models.Model):
    word = models.CharField(max_length=255)
    language = models.CharField(max_length=10000, default='eng')  # e.g., 'eng' for English
    level = models.CharField(max_length=10000, blank=True, null=True)  # e.g., 'A1', 'B2'
    part_of_speech = models.CharField(max_length=20000, blank=True, null=True)
    meaning = models.CharField(max_length=10000, default="Meaning not available")
    sentence = models.CharField(max_length=10000, default="Sentence not available")

    def __str__(self):
        return self.word


class WordBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarked_words')
    word = models.CharField(max_length=255)
    class Meta:
        unique_together = ('user', 'word')

    def __str__(self):
        return f"{self.user.username} bookmarked {self.word.word}"
    

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
    actor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='activities'
    )  
    verb = models.CharField(max_length=50) 
    object_type = models.CharField(max_length=50) 
    object_id = models.IntegerField()
    object_name = models.CharField(max_length=100, null=True, blank=True)
    timestamp = models.DateTimeField(default=now) 
    target = models.CharField(max_length=100, null=True, blank=True)  
    affected_username = models.CharField(
        max_length=150, null=True, blank=True
    )  

    def __str__(self):
        affected = f" affecting {self.affected_username}" if self.affected_username else ""
        return (
            f"{self.actor.username} {self.verb} {self.object_type}:{self.object_id} "
            f"at {self.timestamp}{affected}"
        )
    
class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')  # Assuming a Post model exists
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    like_count = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(User, related_name='liked_comments', blank=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.post}'
    

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_bookmarks') 
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')  # Ensure one bookmark per user per post
        ordering = ['-created_at']  # Latest bookmarks first

    def __str__(self):
        return f"{self.user.username} bookmarked {self.post.title}"
    
class CommentBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_bookmarks')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'comment')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} bookmarked comment {self.comment.id}"
