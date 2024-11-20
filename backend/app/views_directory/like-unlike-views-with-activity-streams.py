from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Post
import json
from datetime import datetime

def log_activity(actor, verb, obj_type, obj_id, obj_content):
    activity = {
        "@context": "localhost",
        "type": "Post Like/Unlike",
        "actor": {
            "type": "Person",
            "id": actor.id,
            "name": actor.username
        },
        "verb": verb,
        "object": {
            "type": obj_type,
            "id": obj_id,
            "content": obj_content
        },
        "published": datetime.utcnow().isoformat() + 'Z'
    }
    print(json.dumps(activity))  

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

    log_activity(
        actor=request.user,
        verb="like",
        obj_type="Post",
        obj_id=post.id,
        obj_content=post.content
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

    # Log the "unlike" activity
    log_activity(
        actor=request.user,
        verb="unlike",
        obj_type="Post",
        obj_id=post.id,
        obj_content=post.content
    )

    return Response({"detail": "Post unliked successfully.", "like_count": post.like_count}, status=status.HTTP_200_OK)
