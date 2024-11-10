from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.models import Post, Comment
from app.serializers import CommentSerializer

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_comment(request):
    """
    Add a comment to a specific post.
    """
    user = request.user
    post_id = request.data.get("post_id")
    content = request.data.get("content")

    if not content:
        return Response({"error": "Content is required"}, status=status.HTTP_400_BAD_REQUEST)

    post = get_object_or_404(Post, id=post_id)
    comment = Comment.objects.create(post=post, user=user, content=content)
    serializer = CommentSerializer(comment)
    
    return Response({"message": "Comment added successfully", "comment": serializer.data}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request, post_id):
    """
    Retrieve comments for a specific post.
    """
    post = get_object_or_404(Post, id=post_id)
    comments = post.comments.all()
    serializer = CommentSerializer(comments, many=True)
    
    return Response({"comments": serializer.data}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment_id):
    """
    Delete a comment made by the authenticated user.
    """
    comment = get_object_or_404(Comment, id=comment_id, user=request.user)
    comment.delete()
    
    return Response({"message": "Comment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
