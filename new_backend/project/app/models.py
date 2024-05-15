from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class CustomUser(AbstractUser):
    email = models.EmailField('email address', unique=True, blank=False, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    image_id = models.ForeignKey('Image', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    text = models.TextField()
    tag_id = models.ForeignKey('Tag', on_delete=models.CASCADE)
    likes_count = models.IntegerField(default=0)  # Added field for likes count

class PostComments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment_text = models.TextField()

class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.username} likes {self.post.title}"

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    text = models.TextField()

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_name = models.CharField(max_length=50)

class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    image_url = models.URLField()

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, related_name='following', on_delete=models.CASCADE)
    followed = models.ForeignKey(CustomUser, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed')

    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"
