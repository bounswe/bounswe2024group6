from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from app.models import Post, Comment, Quiz
from app.serializers import UserSerializer, PostSerializer, CommentSerializer, QuizSerializer

class SearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get('q', None)
        filter_type = request.query_params.get('type', None)
        results = {}

        if not query:
            return Response({"error": "A search query is required."}, status=400)

        # Search users by username
        if not filter_type or filter_type == "users":
            users = User.objects.filter(Q(username__icontains=query))
            results['users'] = UserSerializer(users, many=True).data

        # Search posts by title
        if not filter_type or filter_type == "posts":
            posts = Post.objects.filter(Q(title__icontains=query))
            results['posts'] = PostSerializer(posts, many=True).data

        # Search comments by body
        if not filter_type or filter_type == "comments":
            comments = Comment.objects.filter(Q(body__icontains=query))
            results['comments'] = CommentSerializer(comments, many=True).data

        # Search quizzes by title
        if not filter_type or filter_type == "quizzes":
            quizzes = Quiz.objects.filter(Q(title__icontains=query))
            results['quizzes'] = QuizSerializer(quizzes, many=True).data

        return Response(results)
