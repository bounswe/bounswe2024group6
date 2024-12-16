# utils/cache_handlers.py

from django.core.paginator import Paginator
from ..models import Quiz, QuizProgress, QuizResults, QuestionProgress, Question
from ..serializers import QuizSerializer
from django.contrib.auth.models import User
from .cache_manager import CacheManager
from django.shortcuts import get_object_or_404

cache_manager = CacheManager()

class QuizCacheHandler:
    """
    Handles all quiz-related caching operations, working like a specialized librarian
    who knows exactly where to find and store quiz information.
    """
    
    @staticmethod
    def get_quiz_list(page=1, page_size=20, request=None):
        """
        Retrieves a paginated list of quizzes, similar to getting a specific page
        from our library's catalog.
        """
        cache_key = f'quiz_list_page_{page}'
        
        def fetch_quizzes():
            queryset = Quiz.objects.select_related('author')\
                                 .prefetch_related('tags', 'questions')\
                                 .order_by('-created_at')
            paginator = Paginator(queryset, page_size)
            page_obj = paginator.get_page(page)
            serializer = QuizSerializer(page_obj, many=True, context={'request': request})
            return serializer.data
            
        return cache_manager.get_or_set('quiz_list', cache_key, fetch_quizzes)

    @staticmethod
    def get_quiz_detail(quiz_id, request=None, user=None):
        """
        Retrieves detailed information about a specific quiz, like pulling a specific
        book's complete information from our catalog.
        """
        base_key = f'quiz_detail_{quiz_id}'
        cache_key = f'{base_key}_user_{user.id}' if user else base_key
        
        def fetch_quiz_detail():
            quiz = Quiz.objects.select_related('author')\
                             .prefetch_related('tags', 'questions')\
                             .get(id=quiz_id)
            
            # Serialize the quiz data
            serializer = QuizSerializer(quiz)
            quiz_data = serializer.data
            
            # Process all image URLs
            quiz_data = QuizCacheHandler.prepare_quiz_images(quiz_data, request)
            
            data = {'quiz': quiz_data}
            
            if user:
                # Add user-specific data
                data['is_solved'] = QuizProgress.objects.filter(
                    quiz=quiz, 
                    user=user, 
                    completed=True
                ).exists()
                
                if data['is_solved']:
                    latest_result = QuizResults.objects.filter(
                        quiz=quiz,
                        user=user
                    ).order_by('-id').first()
                    
                    data.update({
                        'quiz_result_id': latest_result.id if latest_result else None,
                        'latest_score': latest_result.score if latest_result else None,
                        'best_score': QuizResults.objects.filter(
                            quiz=quiz,
                            user=user
                        ).order_by('-score').first().score
                    })
            
            return data
            
        return cache_manager.get_or_set('quiz_detail', cache_key, fetch_quiz_detail)
    

    @staticmethod
    def get_question_detail(question_number, quiz_id, user, request=None):
        """
        Retrieves cached question details with user progress information.
        
        Parameters:
        - question_number: The sequence number of the question within the quiz
        - quiz_id: The ID of the quiz this question belongs to
        - user: The user requesting the question
        - request: The HTTP request object (needed for building absolute URLs)
        
        Returns:
        - Dictionary containing question details and user's progress
        """
        cache_key = f'question_{quiz_id}_{question_number}_user_{user.id}'
        
        def fetch_question_detail():
            # Find the question using question_number and quiz ID
            question = get_object_or_404(Question, 
                question_number=question_number,
                quiz_id=quiz_id
            )
            
            # Get the user's active quiz progress
            quiz_progress = QuizProgress.objects.filter(
                quiz_id=quiz_id,
                user=user,
                completed=False
            ).first()
            
            # Get the user's progress on this specific question
            question_progress = None
            if quiz_progress:
                question_progress = QuestionProgress.objects.filter(
                    question=question,
                    quiz_progress=quiz_progress
                ).first()
            
            # Prepare the response data
            return {
                'question': question.question_text,
                'question_image': request.build_absolute_uri(question.question_image.url) if question.question_image else None,
                'choices': [question.choice1, question.choice2, question.choice3, question.choice4],
                'choice_images': [
                    request.build_absolute_uri(question.choice1_image.url) if question.choice1_image else None,
                    request.build_absolute_uri(question.choice2_image.url) if question.choice2_image else None,
                    request.build_absolute_uri(question.choice3_image.url) if question.choice3_image else None,
                    request.build_absolute_uri(question.choice4_image.url) if question.choice4_image else None,
                ],
                'previous_answer': question_progress.answer if question_progress else 0,
                'question_number': question.question_number
            }
            
        return cache_manager.get_or_set('question', cache_key, fetch_question_detail)
    

from django.shortcuts import get_object_or_404
from app.models import Post, Comment, Bookmark
from app.serializers import CommentSerializer

class PostCacheHandler:
    """
    Handles caching operations for post-related data. This handler centralizes all post caching
    logic, making it easier to maintain consistent caching behavior throughout the application.
    """
    
    @staticmethod
    def get_post_detail(post_id, user=None, request=None):
        """
        Retrieves cached post details including likes, bookmarks, and comments.
        If the data isn't in cache, it fetches from the database and caches the result.
        """
        # Create different cache keys for authenticated and anonymous users
        cache_key = f'post_detail_{post_id}_user_{user.id if user else "anon"}'
        
        def fetch_post_detail():
            # Use select_related and prefetch_related to optimize queries
            post = Post.objects.select_related('author')\
                            .prefetch_related('liked_by', 'bookmarked_by', 'comments')\
                            .get(id=post_id)
            is_liked = False
            is_bookmarked = False
            
            if user and user.is_authenticated:
                is_liked = post.liked_by.filter(id=user.id).exists()
                is_bookmarked = Bookmark.objects.filter(user=user, post=post).exists()

            comments = post.comments.all().order_by("-created_at")
            comments_data = CommentSerializer(comments, many=True, context={'request': request}).data

            return {
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "created_at": post.created_at,
                "like_count": post.like_count,
                "tags": post.tags,
                "is_liked": is_liked,
                "author": post.author.username,
                "is_bookmarked": is_bookmarked,
                "comments": comments_data,
            }
            
        return cache_manager.get_or_set('post_detail', cache_key, fetch_post_detail)

    @staticmethod
    def get_user_liked_posts(user, request=None):
        """
        Retrieves cached list of posts liked by a specific user.
        """
        cache_key = f'liked_posts_user_{user.id}'
        
        def fetch_liked_posts():
            liked_posts = Post.objects.filter(liked_by=user).order_by('-created_at')
            
            return [{
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "created_at": post.created_at,
                "like_count": post.like_count,
                "tags": post.tags,
                "author": post.author.username,
                "is_liked": True,
                "is_bookmarked": post.bookmarked_by.filter(id=user.id).exists(),
            } for post in liked_posts]
            
        return cache_manager.get_or_set('liked_posts', cache_key, fetch_liked_posts)

    @staticmethod
    def get_user_posts(user, request=None):
        """
        Retrieves cached list of posts created by a specific user.
        """
        cache_key = f'user_posts_{user.username}'
        
        def fetch_user_posts():
            user_posts = Post.objects.filter(author=user.username).order_by('-created_at')
            
            return [{
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "created_at": post.created_at,
                "like_count": post.like_count,
                "tags": post.tags
            } for post in user_posts]
            
        return cache_manager.get_or_set('user_posts', cache_key, fetch_user_posts)