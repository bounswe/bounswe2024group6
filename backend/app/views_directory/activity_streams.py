from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import ActivityStream
from django.contrib.auth.models import User


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def activities_for_user_as_object(request):
    user = request.user  

    activities = ActivityStream.objects.filter(object_type="Profile", object_id=user.id).order_by('-timestamp')

    activity_data = [
        {
            "actor": activity.actor.username,
            "verb": activity.verb,
            "object_type": activity.object_type,
            "object_id": activity.object_id,
            "timestamp": activity.timestamp,
        }
        for activity in activities
    ]

    return Response({"activities": activity_data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def activities_by_user(request):
 
    user_id = request.data.get("user_id")
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(id=user_id).first()
    if not user:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    activities = ActivityStream.objects.filter(actor=user).order_by('-timestamp')

    activity_data = [
        {
            "verb": activity.verb,
            "object_type": activity.object_type,
            "object_id": activity.object_id,
            "timestamp": activity.timestamp,
        }
        for activity in activities
    ]

    return Response({"activities": activity_data}, status=status.HTTP_200_OK)