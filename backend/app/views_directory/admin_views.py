from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ban_user(request):
    if not request.user.is_staff and not request.user.is_superuser:
        return Response({"detail": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

    username = request.data.get("username")
    if not username:
        return Response({"detail": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    user = get_object_or_404(User, username=username)
    user.is_active = False
    user.save()

    return Response(
        {
            "detail": "User banned successfully.",
        },
        status=status.HTTP_200_OK
   )
