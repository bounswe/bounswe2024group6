# postviews.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post, Comment, ActivityStream
from app.models import CommentBookmark
from app.serializers import CommentSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request):
    post_id = request.data.get('post_id')
    body = request.data.get('body')
    parent_id = request.data.get('parent_id')  

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
                verb="commented",
                object_type="Comment",
                object_id=comment.id,
                object_name = comment.body,
                target=f"Post:{post.id}",
                affected_username=x.user.username  
            )

    return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_reply(request):
    parent_id = request.data.get('parent_id')
    body = request.data.get('body')

    if not parent_id or not body:
        return Response({"detail": "parent_id and body are required."}, status=status.HTTP_400_BAD_REQUEST)

    parent_comment = get_object_or_404(Comment, id=parent_id)

    reply = Comment.objects.create(
        post=parent_comment.post,
        author=request.user,
        body=body,
        parent=parent_comment
    )

    if parent_comment.author != request.user:
        ActivityStream.objects.create(
            actor=request.user,
            verb="replied",
            object_type="Comment",
            object_id=reply.id,
            object_name=reply.body,
            target=f"Comment:{parent_comment.id}",
            affected_username=parent_comment.author.username
        )

    return Response(CommentSerializer(reply).data, status=status.HTTP_201_CREATED)


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
    
    if comment.author != user:
        ActivityStream.objects.create(
            actor=request.user,
            verb="deleted",
            object_type="Comment",
            object_id=comment.id,
            object_name=comment.body,
            target=f"Post:{comment.post.id}",
            affected_username=comment.author.username
        )
    
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

    if request.user != comment.author:
        ActivityStream.objects.create(
            actor=request.user,
            verb="liked",
            object_type="Comment",
            object_id=comment.id,
            target=f"Post:{comment.post.id}",
            affected_username=comment.author.username
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_liked_comments(request):
    """
    Endpoint to fetch all comments liked by the authenticated user.
    """
    user = request.user

    # Fetch comments liked by the user
    liked_comments = Comment.objects.filter(liked_by=user).select_related('author', 'post').order_by('-created_at')

    # Serialize the comments
    serialized_comments = [
        {
            "id": comment.id,
            "post": comment.post.id,  # Assuming the post ID is needed
            "author": comment.author.username,
            "body": comment.body,
            "created_at": comment.created_at,
            "like_count": comment.like_count,
            "is_liked": True,  # User liked these comments
            "is_bookmarked": CommentBookmark.objects.filter(user=user, comment=comment).exists(),
        }
        for comment in liked_comments
    ]

    return Response({"liked_comments": serialized_comments}, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_comment_by_id(request):
    comment_id = request.data.get("comment_id")  

    if not comment_id:
        return Response({"detail": "Comment ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    comment = get_object_or_404(Comment, id=comment_id)

    is_liked = comment.liked_by.filter(id=request.user.id).exists() if request.user.is_authenticated else False
    is_bookmarked = (
        CommentBookmark.objects.filter(user=request.user, comment=comment).exists()
        if request.user.is_authenticated
        else False
    )

    liked_by_users = comment.liked_by.all().values_list('username', flat=True)
    replies = Comment.objects.filter(parent=comment).select_related('author')


    reply_data = [
        {
            "id": reply.id,
            "author": reply.author.username,
            "body": reply.body,
            "created_at": reply.created_at,
            "like_count": reply.like_count,
            "is_liked": reply.liked_by.filter(id=request.user.id).exists() if request.user.is_authenticated else False,
            "is_bookmarked": CommentBookmark.objects.filter(user=request.user, comment=reply).exists() if request.user.is_authenticated else False,
            "liked_by_users": list(reply.liked_by.all().values_list('username', flat=True)),
        }
        for reply in replies
    ]

    comment_data = {
        "id": comment.id,
        "author": comment.author.username,
        "body": comment.body,
        "created_at": comment.created_at,
        "like_count": comment.like_count,
        "is_liked": is_liked,
        "is_bookmarked": is_bookmarked,
        "liked_by_users": list(liked_by_users),
        "replies": reply_data,
    }

    return Response({"comment": comment_data}, status=status.HTTP_200_OK)
