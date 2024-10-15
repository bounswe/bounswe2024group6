from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ExampleSerializer

class ExampleView(APIView):
    def get(self, request):
        data = {"message": "Hello from Django REST!"}
        serializer = ExampleSerializer(data)
        return Response(serializer.data)
