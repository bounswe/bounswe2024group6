from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from app.models import Post, Comment, Quiz, Profile
from app.serializers import PostSerializer, CommentSerializer


class SearchView(APIView):
    # Allow any user, including unauthenticated guests, to access the search
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get('q', None)
        filter_type = request.query_params.get('type', None)
        results = {}

        if not query:
            return Response({"error": "A search query is required."}, status=400)

        user = request.user if request.user.is_authenticated else None

        # Search users
        if not filter_type or filter_type == "users":
            users = User.objects.filter(Q(username__icontains=query))
            user_data = [
                {
                    "username": u.username,
                    "email": u.email,
                    "level": u.profile.level if hasattr(u, 'profile') else None,
                    "profile_picture": u.profile.profile_picture.url if hasattr(u, 'profile') and u.profile.profile_picture else None,
                    "isFollowing": user and u.profile in user.profile.following.all() if hasattr(user, 'profile') else False,
                }
                for u in users
            ]
            results['users'] = user_data

        # Search posts
        if not filter_type or filter_type == "posts":
            posts = Post.objects.filter(Q(title__icontains=query))
            results['posts'] = PostSerializer(posts, many=True, context={'request': request}).data

        # Search comments
        if not filter_type or filter_type == "comments":
            comments = Comment.objects.filter(Q(body__icontains=query))
            comment_data = [
                {
                    "id": comment.id,
                    "body": comment.body,
                    "author": comment.author.username,
                    "created_at": comment.created_at,
                    "like_count": comment.like_count,
                    "isLiked": user and comment.liked_by.filter(id=user.id).exists(),
                    "isBookmarked": user and self._is_comment_bookmarked(user, comment),
                }
                for comment in comments
            ]
            results['comments'] = comment_data

        # Search quizzes
        if not filter_type or filter_type == "quizzes":
            quizzes = Quiz.objects.filter(Q(title__icontains=query))
            bookmarked_quiz_ids = self._get_bookmarked_quiz_ids(user) if user else []
            quiz_data = [
                {
                    "id": quiz.id,
                    "title": quiz.title,
                    "description": quiz.description,
                    "author": quiz.author.username,
                    "created_at": quiz.created_at,
                    "tags": [tag.name for tag in quiz.tags.all()],
                    "isLiked": user and quiz.liked_by.filter(id=user.id).exists(),
                    "isBookmarked": quiz.id in bookmarked_quiz_ids,
                    "likeCount": quiz.liked_by.count(),
                }
                for quiz in quizzes
            ]
            results['quizzes'] = quiz_data

        return Response(results)

    @staticmethod
    def _get_bookmarked_quiz_ids(user):
        """Retrieve IDs of quizzes bookmarked by the user."""
        from app.models import Quiz
        return list(Quiz.objects.filter(bookmarked_by=user).values_list('id', flat=True))

    @staticmethod
    def _is_comment_bookmarked(user, comment):
        """Check if a comment is bookmarked by the user."""
        from app.models import CommentBookmark
        return CommentBookmark.objects.filter(user=user, comment=comment).exists()
