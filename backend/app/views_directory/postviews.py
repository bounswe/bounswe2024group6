# postviews.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post, ActivityStream

#
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request): 
    post_id = request.data.get("post_id")
    if not post_id:
        return Response({"detail": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)
    if request.user in post.liked_by.all():
        return Response({"detail": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)
    
    post.liked_by.add(request.user)
    post.like_count = post.liked_by.count()  
    post.save()

    ActivityStream.objects.create(
        actor=request.user,
        verb="liked",
        object_type="Post",
        object_id=post.id,
        target=None  # Optional, can specify context if needed
    )
    return Response({"detail": "Post liked successfully.", "like_count": post.like_count}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_post(request):
    post_id = request.data.get("post_id")
    if not post_id:
        return Response({"detail": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)
    if request.user not in post.liked_by.all():
        return Response({"detail": "You have not liked this post yet."}, status=status.HTTP_400_BAD_REQUEST)
    
    post.liked_by.remove(request.user)
    post.like_count = post.liked_by.count() 
    post.save()
    return Response({"detail": "Post unliked successfully.", "like_count": post.like_count}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):

    title = request.data.get("title")
    description = request.data.get("description")
    tags = request.data.get("tags", []) 

    if not title or not description:
        return Response({"detail": "Title and description are required."}, status=status.HTTP_400_BAD_REQUEST)

    post = Post.objects.create(
        title=title,
        description=description,
        author=request.user.username
    )

    if tags:
        post.tags.set(tags)  # Assuming `tags` is a list of valid tag IDs

    post.save()

    ActivityStream.objects.create(
        actor=request.user,
        verb="created",
        object_type="Post",
        object_id=post.id
    )

    return Response({"detail": "Post created successfully.", "post_id": post.id}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_post(request):

    post_id = request.data.get("post_id")
    if not post_id:
        return Response({"detail": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)

    if post.author != request.user.username:
        return Response({"detail": "You do not have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)

    post.delete()

    ActivityStream.objects.create(
        actor=request.user,
        verb="deleted",
        object_type="Post",
        object_id=post_id
    )

    return Response({"detail": "Post deleted successfully."}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_posts_of_user(request):
   
    user_posts = Post.objects.filter(author=request.user.username).order_by('-created_at')

    posts_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "created_at": post.created_at,
            "like_count": post.like_count,
            "tags": [tag.name for tag in post.tags.all()]
        }
        for post in user_posts
    ]

    return Response({"posts": posts_data}, status=status.HTTP_200_OK)
