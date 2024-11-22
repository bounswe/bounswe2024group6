from django.db.models import Count
from app.models import Post
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Comment
from app.serializers import CommentSerializer
import random

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_post_feed(request):
    posts = Post.objects.all()

    if posts.exists():
        random_posts = random.sample(list(posts), min(len(posts), 100))
    else:
        random_posts = []

    feed_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "author": post.author,
            "created_at": post.created_at,
            "like_count": post.like_count,
            "tags": [tag for tag in post.tags],
            "comments": CommentSerializer(
                Comment.objects.filter(post=post, parent=None),  # Only top-level comments
                many=True
            ).data,
        }
        for post in random_posts
    ]

    return Response({"feed": feed_data}, status=status.HTTP_200_OK)