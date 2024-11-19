from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from app.models import Profile, ActivityStream
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request):
    current_user_profile = request.user.profile
    user_id = request.data.get("user_id")  # Get the user_id from the request body
    user_to_follow = get_object_or_404(Profile, user__id=user_id)

    if user_to_follow != current_user_profile:
        current_user_profile.following.add(user_to_follow)

        ActivityStream.objects.create(
            actor=request.user,
            verb="followed",
            object_type="Profile",
            object_id=user_to_follow.user.id,
            target=None  # Optional: could be used for specific contexts
        )

        return JsonResponse({"message": "Followed successfully"}, status=200)
    return JsonResponse({"error": "Cannot follow yourself"}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow_user(request):
    current_user_profile = request.user.profile
    user_id = request.data.get("user_id")  # Get the user_id from the request body
    user_to_unfollow = get_object_or_404(Profile, user__id=user_id)

    if user_to_unfollow != current_user_profile:
        current_user_profile.following.remove(user_to_unfollow)
        return JsonResponse({"message": "Unfollowed successfully"}, status=200)
    return JsonResponse({"error": "Cannot unfollow yourself"}, status=400)
