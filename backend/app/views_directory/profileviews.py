from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.serializers import ProfileSerializer
from django.contrib.auth.models import User
from app.models import Profile


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def view_profile(request):
    user = request.user
    profile = get_object_or_404(Profile, user=user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    profile = get_object_or_404(Profile, user=user)
    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_profile_mock(request):
    mock_profile = {
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Person",
  "id": "https://example.com/profiles/oktay_ozel",
  "name": "oktay_ozel",
  "image": {
    "type": "Image",
    "url": "https://private-user-images.githubusercontent.com/24993956/309188090-69afd5bb-8258-4995-939c-4600b6ecce12.jpg"
  },
  "followers": {
    "type": "Collection",
    "totalItems": 100
  },
  "following": {
    "type": "Collection",
    "totalItems": 50
  },
  "level": "B2",
  "activity": [
    {
      "type": "Create",
      "id": "https://example.com/posts/2",
      "actor": {
        "type": "Person",
        "name": "oktay_ozel",
        "image": {
          "type": "Image",
          "url": "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png"
        }
      },
      "object": {
        "type": "Note",
        "name": "Petrichor: The Smell of Rain",
        "content": "Petrichor is the pleasant, earthy smell that comes after rain. Example: 'She loved the petrichor that filled the air after the storm.'",
        "tag": [
          {
            "type": "Hashtag",
            "name": "Vocabulary"
          }
        ],
        "published": "2024-11-05T17:00:00Z",
        "replies": {
          "type": "Collection",
          "totalItems": 3
        },
        "likes": {
          "type": "Collection",
          "totalItems": 90
        }
      }
    },
    {
      "type": "Create",
      "id": "https://example.com/posts/3",
      "actor": {
        "type": "Person",
        "name": "oktay_ozel",
        "image": {
          "type": "Image",
          "url": "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png"
        }
      },
      "object": {
        "type": "Note",
        "name": "Serendipity: A Fortunate Discovery",
        "content": "Serendipity is the occurrence of events by chance in a happy or beneficial way. Example: 'They met by serendipity and became lifelong friends.'",
        "tag": [
          {
            "type": "Hashtag",
            "name": "Vocabulary"
          }
        ],
        "published": "2024-11-05T20:00:00Z",
        "replies": {
          "type": "Collection",
          "totalItems": 5
        },
        "likes": {
          "type": "Collection",
          "totalItems": 75
        }
      }
    }
  ],
  "quizzes": [
    {
      "type": "Quiz",
      "id": "https://example.com/quizzes/1",
      "name": "Basic Vocabulary Quiz",
      "summary": "Test your knowledge on basic vocabulary words!",
      "attributedTo": {
        "type": "Person",
        "name": "oktay_ozel"
      },
      "audienceLevel": "Beginner",
      "likes": {
        "type": "Collection",
        "totalItems": 5
      }
    },
    {
      "type": "Quiz",
      "id": "https://example.com/quizzes/2",
      "name": "Advanced Vocabulary Quiz",
      "summary": "Challenge yourself with advanced vocabulary words.",
      "attributedTo": {
        "type": "Person",
        "name": "oktay_ozel"
      },
      "audienceLevel": "Advanced",
      "likes": {
        "type": "Collection",
        "totalItems": 9
      }
    }
  ]
}
    return Response(mock_profile, status=status.HTTP_200_OK)