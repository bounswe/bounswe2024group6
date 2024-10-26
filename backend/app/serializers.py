from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Quiz, Post



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'location', 'birth_date']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        # Optionally, create a Profile here if you want it created automatically
        profile, created = Profile.objects.get_or_create(user=user)
        return user


    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        instance.save()

        profile = instance.profile
        profile.bio = profile_data.get('bio', profile.bio)
        profile.location = profile_data.get('location', profile.location)
        profile.birth_date = profile_data.get('birth_date', profile.birth_date)
        profile.save()

        return instance

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'author', 'tags', 'created_at', 'times_taken', 'total_score', 'time_limit', 'like_count']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ['id', 'title', 'description', 'author', 'tags', 'created_at', 'like_count']
