from rest_framework import serializers
from .models import CustomUser, Post

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email', 'phone_number', 'bio', 'profile_image', 'background_image')

    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)
        background_image = validated_data.pop('background_image', None)

        # Set unspecified fields to None
        if 'phone_number' not in validated_data:
            validated_data['phone_number'] = None
        if 'bio' not in validated_data:
            validated_data['bio'] = None

        # Create CustomUser instance
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            bio=validated_data['bio'],
            profile_image=profile_image,
            background_image=background_image
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'created_at', 'text', 'tags', 'author', 'likes_count']
