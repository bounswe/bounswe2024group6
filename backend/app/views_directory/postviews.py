# postviews.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post, ActivityStream, Comment, Bookmark
from django.utils import timezone
from app.serializers import CommentSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


post_id_param = openapi.Parameter(
    'post_id', openapi.IN_BODY, description="ID of the post", type=openapi.TYPE_INTEGER, required=True
)

create_post_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['title', 'description'],
    properties={
        'title': openapi.Schema(type=openapi.TYPE_STRING, description='Title of the post'),
        'description': openapi.Schema(type=openapi.TYPE_STRING, description='Description of the post'),
        'tags': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(type=openapi.TYPE_STRING), description='List of tags')
    }
)

like_unlike_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['post_id'],
    properties={
        'post_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the post to like/unlike')
    }
)

delete_post_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['post_id'],
    properties={
        'post_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the post to delete')
    }
)

get_post_details_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['post_id'],
    properties={
        'post_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the post to retrieve details for')
    }
)


@swagger_auto_schema(
    method='post',
    operation_description="Like a post.",
    request_body=like_unlike_request_body,
    responses={
        200: openapi.Response(
            description="Post liked successfully.",
            examples={
                "application/json": {
                    "detail": "Post liked successfully.",
                    "like_count": 10,
                    "is_liked": True,
                    "is_bookmarked": False
                }
            }
        ),
        400: "Bad Request",
    }
)
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
        affected_username=post.author.username
    )

    is_liked = post.liked_by.filter(id=request.user.id).exists()
    is_bookmarked = post.bookmarked_by.filter(id=request.user.id).exists()

    return Response(
        {
            "detail": "Post liked successfully.",
            "like_count": post.like_count,
            "is_liked": is_liked,
            "is_bookmarked": is_bookmarked,
        },
        status=status.HTTP_200_OK
    )


@swagger_auto_schema(
    method='post',
    operation_description="Unlike a previously liked post.",
    request_body=like_unlike_request_body,
    responses={
        200: openapi.Response(
            description="Post unliked successfully.",
            examples={
                "application/json": {
                    "detail": "Post unliked successfully.",
                    "like_count": 9,
                    "is_liked": False,
                    "is_bookmarked": False
                }
            }
        ),
        400: "Bad Request",
    }
)
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

    is_liked = post.liked_by.filter(id=request.user.id).exists()
    is_bookmarked = post.bookmarked_by.filter(id=request.user.id).exists()

    return Response(
        {
            "detail": "Post unliked successfully.",
            "like_count": post.like_count,
            "is_liked": is_liked,
            "is_bookmarked": is_bookmarked,
        },
        status=status.HTTP_200_OK
    )


@swagger_auto_schema(
    method='post',
    operation_description="Create a new post.",
    request_body=create_post_request_body,
    responses={
        201: openapi.Response(
            description="Post created successfully.",
            examples={"application/json": {"detail": "Post created successfully.", "post_id": 123}}
        ),
        400: "Bad Request"
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    title = request.data.get("title")
    description = request.data.get("description")
    tags = request.data.get("tags", [])

    if not title or not description:
        return Response({"detail": "Title and description are required."}, status=status.HTTP_400_BAD_REQUEST)

    if not isinstance(tags, list):
        return Response({"detail": "Tags must be a list of strings."}, status=status.HTTP_400_BAD_REQUEST)

    post = Post.objects.create(
        title=title,
        description=description,
        author=request.user,
        tags=tags,
        created_at=timezone.now()
    )

    ActivityStream.objects.create(
        actor=request.user,
        verb="created",
        object_type="Post",
        object_id=post.id
    )

    return Response({"detail": "Post created successfully.", "post_id": post.id}, status=status.HTTP_201_CREATED)


@swagger_auto_schema(
    method='post',
    operation_description="Delete a post owned by the authenticated user.",
    request_body=delete_post_request_body,
    responses={
        200: openapi.Response(
            description="Post deleted successfully.",
            examples={"application/json": {"detail": "Post deleted successfully."}}
        ),
        400: "Bad Request",
        403: "Forbidden"
    }
)
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


@swagger_auto_schema(
    method='get',
    operation_description="Retrieve all posts created by the authenticated user.",
    responses={
        200: openapi.Response(
            description="Returns a list of user's posts.",
            examples={
                "application/json": {
                    "posts": [
                        {
                            "id": 1,
                            "title": "Sample Post",
                            "description": "Post description",
                            "created_at": "2024-12-10T12:00:00Z",
                            "like_count": 5,
                            "tags": ["tag1", "tag2"]
                        }
                    ]
                }
            }
        )
    }
)
@api_view(['GET'])
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
            "tags": post.tags
        }
        for post in user_posts
    ]

    return Response({"posts": posts_data}, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='post',
    operation_description="Get details of a specific post.",
    request_body=get_post_details_request_body,
    responses={
        200: openapi.Response(
            description="Returns the details of the requested post.",
            examples={
                "application/json": {
                    "post": {
                        "id": 123,
                        "title": "Post Title",
                        "description": "Post Description",
                        "created_at": "2024-12-10T12:00:00Z",
                        "like_count": 10,
                        "tags": ["tag1", "tag2"],
                        "is_liked": True,
                        "author": "username",
                        "is_bookmarked": False,
                        "comments": [
                            {
                                "id": 1,
                                "content": "Nice post!",
                                "created_at": "2024-12-10T13:00:00Z",
                                "author": "commenter_user"
                            }
                        ]
                    }
                }
            }
        ),
        400: "Bad Request"
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_post_details(request):
    post_id = request.data.get("post_id")

    if not post_id:
        return Response({"detail": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)

    is_liked = post.liked_by.filter(id=request.user.id).exists()
    is_bookmarked = Bookmark.objects.filter(user=request.user, post=post).exists()
    comments = post.comments.all().order_by("-created_at")
    comments_data = CommentSerializer(comments, many=True, context={'request': request}).data

    post_data = {
        "id": post.id,
        "title": post.title,
        "description": post.description,
        "created_at": post.created_at,
        "like_count": post.like_count,
        "tags": post.tags,
        "is_liked": is_liked,
        "author": post.author.username,
        "is_bookmarked": is_bookmarked,
        "comments": comments_data,
    }

    return Response({"post": post_data}, status=status.HTTP_200_OK)
