from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post

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
        fields = ['post_id', 'title', 'image', 'created_at', 'like_count', 'dislike_count', 'text', 'tags']
