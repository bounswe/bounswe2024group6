from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Post, Tags
from ..serializers import PostSerializer

@api_view(['POST'])
def create_post(request):
    post_data = request.data

    serializer = PostSerializer(data=post_data)
    if serializer.is_valid():
        post = serializer.save()

        if 'tags' in post_data:
            tags = post_data['tags']
            post.tags.add(*[Tags.objects.get_or_create(name=tag)[0] for tag in tags])

        activity_stream = {
            "@context": "https://www.w3.org/ns/activitystreams",
            "type": "Create",
            "actor": {
                "type": "Person",
                "name": post.author.username,
            },
            "object": {
                "type": "Note",
                "id": post.id,
                "name": post.title,
                "content": post.description,
                "tags": [{"type": "Hashtag", "name": tag} for tag in post.tags.values_list('name', flat=True)]
            },
            "published": post.created_at.isoformat() 
        }

        return Response({'activity_stream': activity_stream}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
