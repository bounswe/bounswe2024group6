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
from .models import Post, CustomUser, Image
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
from .utils import  get_building_info, get_architect_info, get_style_info

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, Follow, SearchResult
from django.db.models import Q


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
            'username': user.username,
            'profile_image': user.profile_image
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def search(request):

    print(request.data)

    if request.method == "POST" and "query" in request.data:
        keyword = request.data['query']
        
        results = SearchResult.objects.filter(
              Q(name__icontains=keyword)
        )

        architect_response = []
        style_response = []
        building_response = []

        for result in results:
            if result.type == 'architect':
                architect_response.append({"name": result.name, "image": result.image,  "entity_id": result.entity_id})
            elif result.type == 'style':
                style_response.append({"name": result.name, "image": result.image, "entity_id": result.entity_id})
            elif result.type == 'building':
                building_response.append({"name": result.name, "image": result.image,  "entity_id": result.entity_id})

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
        return Response(serializer.data, status = 200)
    return Response(serializer.errors, status=400)



@api_view(['POST'])
def user_profile(request):
    username = request.data.get('username')  # Retrieve username from request body
    user = get_object_or_404(CustomUser, username=username)
    

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

    return Response(user_data, status=200)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def auth_user_profile(request):
    username = request.data.get('username')  # Retrieve username from request body
    user = get_object_or_404(CustomUser, username=username)
    viewing_user = request.user

    is_following = Follow.objects.filter(follower=viewing_user, followed=user).exists()
    
    # Serialize user data
    user_data = UserSerializer(user).data
    user_data['is_following'] = is_following

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

    return Response(user_data, status=200)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_post(request):
    user = request.user
    title = request.data.get('title')
    text = request.data.get('text')
    image_url = request.data.get('image_url')
    entity_id = request.data.get('entity_id')

    if not title or not text:
        return Response({'error': 'Title and text are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        image = None
        if image_url:
            image, created = Image.objects.get_or_create(image_url=image_url)

        searchresult, created = SearchResult.objects.get_or_create(entity_id=entity_id)

        post = Post.objects.create(
            title=title,
            text=text,
            author=user,
            image=image,
            searchresult=searchresult
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

    if Like.objects.filter(user=user, post=post).exists():
        return Response({'error': 'You have already liked this post.'}, status=status.HTTP_400_BAD_REQUEST)

    like = Like.objects.create(user=user, post=post)
    post.likes_count += 1
    post.save()

    return Response({'message': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_like_back(request):
    user = request.user
    post_id = request.data.get('post_id')

    if not post_id:
        return Response({'error': 'Post ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    like = Like.objects.filter(user=user, post=post).first()
    if not like:
        return Response({'error': 'You have not liked this post.'}, status=status.HTTP_400_BAD_REQUEST)

    like.delete()
    post.likes_count = max(post.likes_count - 1, 0) 
    post.save()

    return Response({'message': 'Like removed successfully.'}, status=status.HTTP_200_OK)


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

    if Bookmark.objects.filter(user=user, post=post).exists():
        return Response({'error': 'You have already bookmarked this post.'}, status=status.HTTP_400_BAD_REQUEST)

    bookmark = Bookmark.objects.create(user=user, post=post)

    return Response({'message': 'Post bookmarked successfully.'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def unbookmark_post(request):
    user = request.user
    post_id = request.data.get('post_id')

    if not post_id:
        return Response({'error': 'Post ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    bookmark = Bookmark.objects.filter(user=user, post=post).first()
    if not bookmark:
        return Response({'error': 'You have not bookmarked this post.'}, status=status.HTTP_400_BAD_REQUEST)
    
    bookmark.delete()
    return Response({'message': 'Bookmark removed successfully.'}, status=status.HTTP_200_OK)




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
    
    
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_post(request):
    user = request.user
    post_id = request.data.get('post_id')
    
    if not post_id:
        return Response({'error': 'Post ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    if post.author != user:
        return Response({'error': 'You do not have permission to delete this post.'}, status=status.HTTP_403_FORBIDDEN)

    post.delete()
    return Response({'message': 'Post deleted successfully.'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request):
    user = request.user
    comment_id = request.data.get('comment_id')
    
    if not comment_id:
        return Response({'error': 'Comment ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        comment = PostComments.objects.get(pk=comment_id)
    except PostComments.DoesNotExist:
        return Response({'error': 'Comment does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    if comment.user != user:
        return Response({'error': 'You do not have permission to delete this comment.'}, status=status.HTTP_403_FORBIDDEN)

    comment.delete()
    return Response({'message': 'Comment deleted successfully.'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_entity_posts(request):
    entity_id = request.data.get('entity_id')
    
    if not entity_id:
        return Response({'error': 'Entity ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        search_result = SearchResult.objects.get(entity_id=entity_id)
    except SearchResult.DoesNotExist:
        return Response({'error': 'Entity does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    posts = Post.objects.filter(SearchResult=search_result)
    posts_data = PostSerializer(posts, many=True).data
    
    return Response({'posts': posts_data}, status=status.HTTP_200_OK)
    
    
    
    
    
