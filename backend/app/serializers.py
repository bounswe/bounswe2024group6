from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Quiz, Post, QuizResults, QuizProgress, QuestionProgress, Question, Comment, Tags,Bookmark



class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    posts = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = [
            'username', 'name','bio','level', 'posts', 'comments',
            'follower_count', 'following_count', 'is_followed','profile_picture'
        ]

    def get_posts(self, obj):
        """Get posts created by the user, similar to get_post_details."""

        request = self.context.get('request')

        if not request or not request.user.is_authenticated:
            return []
        
        posts = Post.objects.filter(author=obj.user)

        user = request.user

        post_data = []
        for post in posts:
            is_liked = post.liked_by.filter(id=request.user.id).exists()
            is_bookmarked = Bookmark.objects.filter(user=user, post=post).exists()
            
            comments_data = [
                {
                    "id": comment.id,
                    "content": comment.body, 
                    "author": comment.author.username,
                    "created_at": comment.created_at,
                    "is_liked": comment.liked_by.filter(id=request.user.id).exists(),
                    "like_count": comment.liked_by.count(),  
                }
                for comment in post.comments.all().order_by("-created_at")
            ]
            
            post_data.append({
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "created_at": post.created_at,
                "like_count": post.like_count,
                "tags": post.tags,
                "author": post.author.username,
                "is_liked": is_liked,
                "is_bookmarked": is_bookmarked,
                "comments": comments_data
            })
        return post_data

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

    def get_is_followed(self, obj):
        """Check if the authenticated user follows this profile."""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return obj.followers.filter(id=request.user.id).exists()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['is_banned'] = not instance.user.is_active
        return representation




class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

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

class QuizResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResults
        fields = ['id', 'quiz', 'quiz_progress', 'user', 'score', 'time_taken']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['quiz'] = { 'id' : instance.quiz.id, 'title' : instance.quiz.title }
        representation['question_count'] = instance.quiz.question_count
        representation['user'] = { 'id' : instance.user.id, 'username' : instance.user.username }
        representation['author'] = { 'id' : instance.quiz.author.id, 'username' : instance.quiz.author.username }
        representation['level'] = instance.quiz.level

        request = self.context.get('request')
        if request and request.user.is_authenticated:
            representation['is_bookmarked'] = instance.quiz.bookmarked_by.filter(id=request.user.id).exists()
            representation['is_liked'] = instance.quiz.liked_by.filter(id=request.user.id).exists()
            representation['like_count'] = instance.quiz.like_count

        return representation


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ['id', 'name']


class QuizSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    level = serializers.ChoiceField(choices=Quiz.LEVEL_CHOICES) 

    class Meta:
        model = Quiz
        fields = [
            'id',
            'title',
            'title_image',
            'description',
            'author',
            'tags',
            'level',
            'question_count',
            'created_at',
            'times_taken',
            'total_score',
            'like_count',
            'bookmarked_by',
            'liked_by'
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        quiz = Quiz.objects.create(**validated_data)
        
        for tag_data in tags_data:
            tag, _ = Tags.objects.get_or_create(name=tag_data['name'])
            quiz.tags.add(tag)

        return quiz

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tags_data is not None:
            instance.tags.clear()
            
            for tag_data in tags_data:
                tag, created = Tags.objects.get_or_create(name=tag_data['name'])
                instance.tags.add(tag)
        
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('bookmarked_by')
        representation.pop('liked_by')
        
        total_score = representation.pop('total_score')
        representation['average_score'] = total_score / instance.times_taken if instance.times_taken > 0 else 0

        representation['tags'] = [tag['name'] for tag in representation['tags']]
        representation['author'] = { 'id' : instance.author.id, 'username' : instance.author.username } 

        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            representation['is_bookmarked'] = instance.bookmarked_by.filter(id=request.user.id).exists()
            representation['is_liked'] = instance.liked_by.filter(id=request.user.id).exists()

        return representation

class QuizProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizProgress
        fields = ['quiz', 'user', 'score', 'quiz_attempt', 'date_started', 'completed']


class QuestionSerializer(serializers.ModelSerializer):
    level = serializers.ChoiceField(choices=Question.LEVEL_CHOICES)

    class Meta:
        model = Question
        fields = [
            'quiz',
            'id',
            'question_number',
            'question_text',
            'question_image',
            'choice1',
            'choice1_image',
            'choice2',
            'choice2_image',
            'choice3',
            'choice3_image',
            'choice4',
            'choice4_image',
            'correct_choice',
            'level',
        ]
        # Add this to explicitly specify which fields can be written to
        extra_kwargs = {
            'id': {'read_only': True},
            'correct_choice': {'required': True},
        }

    def validate_correct_choice(self, value):
        """
        Check that correct_choice is between 1 and 4
        """
        if not (1 <= value <= 4):
            raise serializers.ValidationError("Correct choice must be between 1 and 4")
        return value

class QuestionProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionProgress
        fields = ['question', 'quiz_progress', 'answer', 'time_taken']


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    author = serializers.CharField(source='author.username')

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'description', 'author', 'tags', 'created_at',
            'like_count', 'is_bookmarked', 'is_liked', 'comments'
        ]

    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Bookmark.objects.filter(user=request.user, post=obj).exists()
        return False

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.liked_by.filter(id=request.user.id).exists()
        return False

    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj)
        return CommentSerializer(comments, many=True, context=self.context).data

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField() 
    author = serializers.CharField(source='author.username')

    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'author', 'body', 'created_at', 'parent',
            'replies', 'is_liked', 'like_count','is_bookmarked',
        ]

    def get_replies(self, obj):
        replies = obj.replies.all()
        if replies.exists():
            return CommentSerializer(replies, many=True, context=self.context).data
        return []

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.liked_by.filter(id=request.user.id).exists()
        return False

    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from app.models import CommentBookmark  # or wherever it’s defined
            return CommentBookmark.objects.filter(user=request.user, comment=obj).exists()
        return False