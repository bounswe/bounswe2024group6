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
from .models import Post, Like
from .models import Post, PostComments

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *


import asyncio

from .serializers import UserSerializer
from .utils import query_architect,query_architectural_style,query_building, get_building_info, get_architect_info, get_style_info

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, Follow


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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)  # Allow partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_profile(request):
    username = request.data.get('username')  # Retrieve username from request body
    print(username)
    user = get_object_or_404(CustomUser, username=username)
    other_user = request.user
    

    # Serialize user data
    user_data = UserSerializer(user).data

    # Get user's own posts
    user_posts = Post.objects.filter(author=user)
    posts_data = PostSerializer(user_posts, many=True).data
    user_data['posts'] = posts_data

    # Get posts the user has bookmarked
    bookmarked_posts = Bookmark.objects.filter(user=user).select_related('post')
    bookmarked_posts_data = PostSerializer([bookmark.post for bookmark in bookmarked_posts], many=True).data
    user_data['bookmarked_posts'] = bookmarked_posts_data

    # Get posts the user has commented on
    commented_posts = PostComments.objects.filter(user=user).select_related('post').distinct()
    commented_posts_data = PostSerializer({comment.post for comment in commented_posts}, many=True).data
    user_data['commented_posts'] = commented_posts_data

    # Get posts the user has liked
    liked_posts = Like.objects.filter(user=user).select_related('post')
    liked_posts_data = PostSerializer([like.post for like in liked_posts], many=True).data
    user_data['liked_posts'] = liked_posts_data

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
    


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def like_post(request):
    user = request.user
    post_id = request.data.get('post_id')

    if not post_id:
        return Response({'error': 'Post ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user has already liked the post
    if Like.objects.filter(user=user, post=post).exists():
        return Response({'error': 'You have already liked this post.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new Like object
    like = Like.objects.create(user=user, post=post)

    # Increment the likes_count of the post
    post.likes_count += 1
    post.save()

    return Response({'message': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_post(request):
    user = request.user
    post_id = request.data.get('post_id')
    comment_text = request.data.get('comment_text')

    if not post_id or not comment_text:
        return Response({'error': 'Post ID and comment text are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    # Create a new comment
    PostComments.objects.create(user=user, post=post, comment_text=comment_text)

    return Response({'message': 'Comment added successfully.'}, status=status.HTTP_201_CREATED)

from .models import Post, Bookmark

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def bookmark_post(request):
    user = request.user
    post_id = request.data.get('post_id')

    if not post_id:
        return Response({'error': 'Post ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user has already bookmarked the post
    if Bookmark.objects.filter(user=user, post=post).exists():
        return Response({'error': 'You have already bookmarked this post.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new Bookmark object
    bookmark = Bookmark.objects.create(user=user, post=post)

    return Response({'message': 'Post bookmarked successfully.'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def follow_user(request):
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is missing in the request body.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_to_follow = CustomUser.objects.get(username=username)
        user = request.user
        if user == user_to_follow:
            return Response({'error': 'You cannot follow yourself.'}, status=status.HTTP_400_BAD_REQUEST)
        
        follow, created = Follow.objects.get_or_create(follower=user, followed=user_to_follow)
        if created:
            return Response({'message': f'You are now following {username}.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': f'You are already following {username}.'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def unfollow_user(request):
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is missing in the request body.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_to_unfollow = CustomUser.objects.get(username=username)
        user = request.user
        follow = Follow.objects.filter(follower=user, followed=user_to_unfollow)
        if follow.exists():
            follow.delete()
            return Response({'message': f'You have unfollowed {username}.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': f'You are not following {username}.'}, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_followers(request):
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is missing in the request body.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(username=username)
        followers = Follow.objects.filter(followed=user).select_related('follower')
        followers_data = [{'username': follow.follower.username} for follow in followers]
        return Response({'followers': followers_data}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_following(request):
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is missing in the request body.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(username=username)
        following = Follow.objects.filter(follower=user).select_related('followed')
        following_data = [{'username': follow.followed.username} for follow in following]
        return Response({'following': following_data}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['GET'])
def guest_feed(request):
    try:
        latest_posts = Post.objects.order_by('-created_at').values_list('id', flat=True)
        return Response({'post_ids': list(latest_posts)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def auth_feed(request):
    user = request.user
    try:
        following_users = Follow.objects.filter(follower=user).values_list('followed', flat=True)
        follower_posts = Post.objects.filter(author_id__in=following_users).order_by('-created_at').values_list('id', flat=True)
        return Response({'post_ids': list(follower_posts)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_posts_by_ids(request):
    if request.method == 'POST':
        post_id = request.data.get('post_id')

        if not post_id:
            return Response({'error': 'Post ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PostSerializer(post)

        return Response(serializer.data)
    

@api_view(['POST'])
def building_view(request):

    entity_id = request.data['entity_id']
    # get_description_wikibase(entity_id)
    # get_content_wikidata(entity_id)
    return JsonResponse(get_building_info(entity_id))

@api_view(['POST'])
def architect_view(request):

    entity_id = request.data['entity_id']
    # get_description_wikibase(entity_id)
    # get_content_wikidata(entity_id)
    return JsonResponse(get_architect_info(entity_id))

@api_view(['POST'])
def style_view(request):

    entity_id = request.data['entity_id']
    # get_description_wikibase(entity_id)
    # get_content_wikidata(entity_id)
    return JsonResponse(get_style_info(entity_id))