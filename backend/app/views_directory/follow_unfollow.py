from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from app.models import Profile, ActivityStream
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request):
    current_user_profile = request.user.profile
    username_to_follow = request.data.get("username") 

    if not username_to_follow:
        return JsonResponse({"error": "Username is required."}, status=400)

    user_to_follow = get_object_or_404(Profile, user__username=username_to_follow)

    if user_to_follow != current_user_profile:
        current_user_profile.following.add(user_to_follow)
        user_to_follow.followers.add(current_user_profile)

        ActivityStream.objects.create(
            actor=request.user,
            verb="followed",
            object_type="Profile",
            object_id=user_to_follow.user.id,
            affected_username=user_to_follow.user.username 
        )

        return JsonResponse({"message": f"Successfully followed {username_to_follow}"}, status=200)
    return JsonResponse({"error": "Cannot follow yourself."}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow_user(request):
    current_user_profile = request.user.profile
    username_to_unfollow = request.data.get("username")  

    if not username_to_unfollow:
        return JsonResponse({"error": "Username is required."}, status=400)

    user_to_unfollow = get_object_or_404(Profile, user__username=username_to_unfollow)

    if user_to_unfollow != current_user_profile:
        current_user_profile.following.remove(user_to_unfollow)
        user_to_unfollow.followers.remove(current_user_profile)

        return JsonResponse({"message": f"Successfully unfollowed {username_to_unfollow}"}, status=200)
    return JsonResponse({"error": "Cannot unfollow yourself."}, status=400)
