from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from app.models import Comment, CommentBookmark
from app.serializers import CommentSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_comment(request):
    comment_id = request.data.get("comment_id")
    if not comment_id:
        return Response({"detail": "Comment ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id)

    if CommentBookmark.objects.filter(user=request.user, comment=comment).exists():
        return Response({"detail": "Comment is already bookmarked."}, status=status.HTTP_400_BAD_REQUEST)

    CommentBookmark.objects.create(user=request.user, comment=comment)

    return Response(
        {
            "detail": "Comment bookmarked successfully.",
            "is_bookmarked": True
        },
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unbookmark_comment(request):
    comment_id = request.data.get("comment_id")
    if not comment_id:
        return Response({"detail": "Comment ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id)

    comment_bookmark = CommentBookmark.objects.filter(user=request.user, comment=comment).first()
    if not comment_bookmark:
        return Response({"detail": "Comment is not bookmarked."}, status=status.HTTP_400_BAD_REQUEST)

    comment_bookmark.delete()

    return Response(
        {
            "detail": "Comment unbookmarked successfully.",
            "is_bookmarked": False
        },
        status=status.HTTP_200_OK
    )


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_bookmarked_comments(request):

    comment_bookmarks = CommentBookmark.objects.filter(user=request.user)
    bookmarked_comments = [cb.comment for cb in comment_bookmarks]

    serializer = CommentSerializer(bookmarked_comments, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)
