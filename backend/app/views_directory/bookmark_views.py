# bookmarks.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post, Bookmark
from app.serializers import PostSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_post(request):
    post_id = request.data.get('post_id')
    if not post_id:
        return Response({"detail": "post_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)

    if Bookmark.objects.filter(user=request.user, post=post).exists():
        return Response({"detail": "Post is already bookmarked."}, status=status.HTTP_400_BAD_REQUEST)

    Bookmark.objects.create(user=request.user, post=post)

    return Response({"detail": "Post bookmarked successfully."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unbookmark_post(request):
    post_id = request.data.get('post_id')
    if not post_id:
        return Response({"detail": "post_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)

    bookmark = Bookmark.objects.filter(user=request.user, post=post).first()
    if not bookmark:
        return Response({"detail": "Post is not bookmarked."}, status=status.HTTP_400_BAD_REQUEST)

    bookmark.delete()

    return Response({"detail": "Post unbookmarked successfully."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_bookmarked_posts(request):
    bookmarks = Bookmark.objects.filter(user=request.user)
    bookmarked_posts = [bookmark.post for bookmark in bookmarks]

    return Response(PostSerializer(bookmarked_posts, many=True).data, status=status.HTTP_200_OK)
