from django.db.models import Q
from app.models import Post, Bookmark, Comment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.serializers import CommentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_post_feed(request):
    user = request.user  

    # Fetch posts from followed accounts
    followed_posts = Post.objects.filter(author__profile__in=user.profile.following.all())

    # Fetch posts from non-followed accounts
    non_followed_posts = Post.objects.exclude(author__profile__in=user.profile.following.all())

    # Select 50% of posts from followed and 50% from non-followed accounts
    num_followed_posts = followed_posts.count()
    num_non_followed_posts = non_followed_posts.count()

    followed_posts_sample = list(followed_posts.order_by('-created_at')[:min(num_followed_posts, 50)])
    non_followed_posts_sample = list(non_followed_posts.order_by('-created_at')[:min(num_non_followed_posts, 50)])

    # Combine the two samples
    combined_posts = followed_posts_sample + non_followed_posts_sample

    # Sort combined posts by created_at date in descending order
    combined_posts_sorted = sorted(combined_posts, key=lambda post: post.created_at, reverse=True)

    # Serialize the data
    feed_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "author": post.author.username,
            "created_at": post.created_at,
            "like_count": post.like_count,
            "tags": [tag for tag in post.tags],
            "is_liked": post.liked_by.filter(id=user.id).exists(),
            "is_bookmarked": Bookmark.objects.filter(user=user, post=post).exists(),
            "comments": CommentSerializer(
                Comment.objects.filter(post=post),
                many=True
            ).data,
        }
        for post in combined_posts_sorted
    ]

    return Response({"feed": feed_data}, status=status.HTTP_200_OK)
