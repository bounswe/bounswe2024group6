# postviews.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post, Comment, ActivityStream

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

    if post.author != request.user:
        ActivityStream.objects.create(
            actor=request.user,
            verb="commented",
            object_type="Comment",
            object_id=comment.id,
            target=f"Post:{post.id}",
            affected_username=post.author.username
        )

    user = request.user
    for x in user.profile.followers.all():
            if x.user == post.author:
                continue
            ActivityStream.objects.create(
                actor=request.user,
                verb="created",
                object_type="Quiz",
                object_id=comment.id,
                object_name = comment.body,
                target=f"Post:{post.id}",
                affected_username=x.user.username  
            )

    return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request):
    comment_id = request.data.get('comment_id')
    if not comment_id:
        return Response({"detail": "comment_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id)
    user = request.user
    if comment.author != user and not user.is_staff:
        return Response({"detail": "You do not have permission to delete this comment."}, status=status.HTTP_403_FORBIDDEN)
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
    comment.like_count += 1
    comment.save()

    ActivityStream.objects.create(
        actor=request.user,
        verb="liked",
        object_type="Comment",
        object_id=comment.id,
        target=f"Post:{comment.post.id}"
    )

    return Response(
        {"detail": "Comment liked successfully", "like_count": comment.like_count},
        status=status.HTTP_200_OK
    )


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
    comment.like_count -= 1
    comment.save()
    return Response({"detail": "Comment unliked successfully", "like_count": comment.like_count}, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_comment_by_id(request):
    comment_id = request.data.get("comment_id")  # Access comment_id from request data

    if not comment_id:
        return Response({"detail": "Comment ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the main comment
    comment = get_object_or_404(Comment, id=comment_id)

    # Check if the comment is liked by the current user
    is_liked = comment.liked_by.filter(id=request.user.id).exists() if request.user.is_authenticated else False

    # Fetch all users who liked the comment
    liked_by_users = comment.liked_by.all().values_list('username', flat=True)

    # Fetch all replies to the comment
    replies = Comment.objects.filter(parent=comment).select_related('author')

    # Serialize the replies
    reply_data = [
        {
            "id": reply.id,
            "author": reply.author.username,
            "body": reply.body,
            "created_at": reply.created_at,
            "like_count": reply.like_count,
            "is_liked": reply.liked_by.filter(id=request.user.id).exists() if request.user.is_authenticated else False,
            "liked_by_users": list(reply.liked_by.all().values_list('username', flat=True)),
        }
        for reply in replies
    ]

    # Prepare the comment data
    comment_data = {
        "id": comment.id,
        "author": comment.author.username,
        "body": comment.body,
        "created_at": comment.created_at,
        "like_count": comment.like_count,
        "is_liked": is_liked,
        "liked_by_users": list(liked_by_users),
        "replies": reply_data,
    }

    return Response({"comment": comment_data}, status=status.HTTP_200_OK)