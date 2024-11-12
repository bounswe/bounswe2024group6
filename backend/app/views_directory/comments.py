# postviews.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post, Comment
from app.serializers import CommentSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request):
    post_id = request.data.get('post_id')
    body = request.data.get('body')
    parent_id = request.data.get('parent_id')  # For nested comments

    if not post_id or not body:
        return Response({"detail": "post_id and body are required."}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)
    parent_comment = Comment.objects.filter(id=parent_id).first() if parent_id else None

    comment = Comment.objects.create(
        post=post,
        author=request.user,
        body=body,
        parent=parent_comment
    )

    return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request):
    comment_id = request.data.get('comment_id')
    if not comment_id:
        return Response({"detail": "comment_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id, author=request.user)
    comment.delete()
    return Response({"detail": "Comment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_comment(request):
    comment_id = request.data.get('comment_id')
    if not comment_id:
        return Response({"detail": "comment_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id)
    if request.user in comment.liked_by.all():
        return Response({"detail": "You have already liked this comment."}, status=status.HTTP_400_BAD_REQUEST)

    comment.liked_by.add(request.user)
    comment.save()
    return Response({"detail": "Comment liked successfully", "like_count": comment.like_count}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_comment(request):
    comment_id = request.data.get('comment_id')
    if not comment_id:
        return Response({"detail": "comment_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id)
    if request.user not in comment.liked_by.all():
        return Response({"detail": "You have not liked this comment."}, status=status.HTTP_400_BAD_REQUEST)

    comment.liked_by.remove(request.user)
    comment.save()
    return Response({"detail": "Comment unliked successfully", "like_count": comment.like_count}, status=status.HTTP_200_OK)