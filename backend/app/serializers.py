from rest_framework import serializers
from .models import Profile, Post, Comment, CustomUser



class ProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['name', 'level', 'posts', 'comments', 'follower_count', 'following_count']

    def get_posts(self, obj):
        """Get posts created by the user."""
        posts = Post.objects.filter(author=obj.user)
        return PostSerializer(posts, many=True).data

    def get_comments(self, obj):
        """Get comments created by the user."""
        comments = Comment.objects.filter(author=obj.user)
        return CommentSerializer(comments, many=True).data

    def get_follower_count(self, obj):
        """Get the count of followers."""
        return obj.followers.count()

    def get_following_count(self, obj):
        """Get the count of following."""
        return obj.following.count()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Create the user
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

      
        Profile.objects.create(user=user, name=user.username)

        return user

    def update(self, instance, validated_data):
        # Extract profile data from validated_data
        profile_data = validated_data.pop('profile', {})

        # Update user fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()

        if profile_data:
            profile = instance.profile
            profile.name = profile_data.get('name', profile.name)
            profile.level = profile_data.get('level', profile.level)
            profile.save()

        return instance




class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ['id', 'title', 'description', 'author', 'tags', 'created_at', 'like_count']



class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()  # To fetch nested replies

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'body', 'created_at', 'parent', 'replies']

    def get_replies(self, obj):
        # If this comment has replies, serialize them recursively
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True).data
        return None
