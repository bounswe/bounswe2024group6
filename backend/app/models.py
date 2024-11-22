from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField

LEVEL_CHOICES = [
    ('A1', 'A1'),
    ('A2', 'A2'),
    ('B1', 'B1'),
    ('B2', 'B2'),
    ('C1', 'C1'),
    ('C2', 'C2'),
]

class CustomUser(User):
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES, default='A1')

    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="profile")
    name = models.CharField(max_length=100,null=True, blank=True)
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)

    def __str__(self):
        return self.name


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
    author = models.CharField(max_length=100)
    like_count = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(CustomUser, related_name='liked_posts', blank=True)  

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
    actor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='activities')  
    verb = models.CharField(max_length=50)  # liked, created, followed
    object_type = models.CharField(max_length=50)  # Quiz, Post
    object_id = models.IntegerField()  #Quiz ID Post ID
    timestamp = models.DateTimeField(default=now)  # timestamp

    def __str__(self):
        return f"{self.actor.username} {self.verb} {self.object_type}:{self.object_id} at {self.timestamp}"
    
    
class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')  # Assuming a Post model exists
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.post}'

class Bookmark(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookmarks')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='bookmarked_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')  
        ordering = ['-created_at']  

    def __str__(self):
        return f"{self.user.username} bookmarked {self.post.title}"