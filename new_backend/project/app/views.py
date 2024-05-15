from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework.authtoken.models import Token

from adrf.decorators import api_view
from .models import Post, CustomUser, Tag, Image

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *


import asyncio

from .serializers import UserSerializer
from .utils import query_architect,query_architectural_style,query_building

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def search(request):

    print(request.data)

    if request.method == "POST" and "query" in request.data:
        keyword = request.data['query']
        
        architect_response =query_architect(keyword)
        style_response =  query_architectural_style(keyword)
        building_response = query_building(keyword)

        # return the results
        response = {"style": style_response, "architect":architect_response, "building":building_response}

        return JsonResponse(response)
    
    return Response("there was an error with the query.",status=status.HTTP_204_NO_CONTENT)

def index(request):
    return 

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    user_data = UserSerializer(user).data
    user_posts = Post.objects.filter(author=user)
    posts_data = PostSerializer(user_posts, many=True).data
    user_data['posts'] = posts_data
    return Response(user_data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_post(request):
    user = request.user
    title = request.data.get('title')
    text = request.data.get('text')
    image_url = request.data.get('image_url')
    tag_name = request.data.get('tag_name')

    if not title or not text:
        return Response({'error': 'Title and text are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        image = None
        if image_url:
            image, created = Image.objects.get_or_create(image_url=image_url)

        tag, created = Tag.objects.get_or_create(tag_name=tag_name)

        post = Post.objects.create(
            title=title,
            text=text,
            author=user,
            image=image,
            tags=tag
        )

        return Response({'message': 'Post created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)