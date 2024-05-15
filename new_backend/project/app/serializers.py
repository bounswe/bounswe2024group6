from rest_framework import serializers
from .models import CustomUser, Post,PostComments, Comment, Tag, Image, UserProfile, Follow, Like

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'phone_number', 'bio')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data.get('phone_number', ''),
            bio=validated_data.get('bio', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['post_id', 'title', 'image_id', 'created_at', 'like_count', 'dislike_count', 'text']


class PostCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComments
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment_id', 'text']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag_id', 'tag_name']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image_id', 'image_url']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['follower', 'followed', 'created_at']

from rest_framework import serializers
from .models import CustomUser, Post, Like, Follow

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='customuser.email')
    phone_number = serializers.CharField(source='customuser.phone_number')
    bio = serializers.CharField(source='customuser.bio')
    posts = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['email', 'phone_number', 'bio', 'posts', 'likes', 'followers', 'following']

    def get_posts(self, obj):
        # Get posts authored by the user
        posts = Post.objects.filter(author=obj)
        return PostSerializer(posts, many=True).data

    def get_likes(self, obj):
        # Get likes by the user
        likes = Like.objects.filter(user=obj)
        return LikeSerializer(likes, many=True).data

    def get_followers(self, obj):
        # Get followers of the user
        followers = Follow.objects.filter(followed=obj)
        return FollowSerializer(followers, many=True).data

    def get_following(self, obj):
        # Get users followed by the user
        following = Follow.objects.filter(follower=obj)
        return FollowSerializer(following, many=True).data
