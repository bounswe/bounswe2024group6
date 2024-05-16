from rest_framework import serializers
from .models import CustomUser, Post, Image, Tag

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email', 'phone_number', 'bio', 'profile_image', 'background_image', 'name')

    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)
        background_image = validated_data.pop('background_image', None)
        name = validated_data.pop('name', None)

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
            background_image=background_image,
            name=name
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image_url']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag_name']

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    image = ImageSerializer()
    tags = TagSerializer()

    class Meta:
        model = Post
        fields = ['title', 'image', 'created_at', 'text', 'tags', 'author', 'likes_count']