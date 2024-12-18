from django.urls import path
from app.views import *

from app.views_directory.wordviews import get_turkish_translation, get_lexvo_info, get_word_meanings, fetch_english_words, bookmark_word, unbookmark_word, get_bookmarked_words, get_quiz_choices
from app.views_directory.profileviews import view_profile, update_profile, view_other_profile, view_followers, view_following
from app.views_directory.follow_unfollow import follow_user, unfollow_user 
from app.views_directory.authentication_endpoints import RegisterView, LoginView, LogoutView, RefreshTokenView
from app.views_directory.comments import add_comment, delete_comment, like_comment, unlike_comment, get_comment_by_id, get_liked_comments, add_reply
from app.views_directory.postviews import like_post, unlike_post
from app.views_directory.activity_streams import activities_by_user, activities_for_user_as_object
from app.views_directory.postviews import create_post, delete_post, get_posts_of_user, get_post_details, update_post, get_liked_posts
from app.views_directory.feed_views import get_user_post_feed
from app.views_directory.bookmark_views import bookmark_post, unbookmark_post, get_bookmarked_posts
from app.views_directory.searchview import SearchView

from app.views_directory.image_view import get_image_details, get_direct_image, get_image_url
from app.views_directory.admin_views import ban_user, admin_check
from django.conf.urls.static import static
from django.conf import settings
import app.views_directory.quiz_views as quiz_views
from app.views_directory.comment_bookmarks import  bookmark_comment, unbookmark_comment, get_bookmarked_comments


urlpatterns = [
    path('', index , name='index_page'),
    path('admin-ban/', ban_user, name="ban_user"),
    path('admin-check/', admin_check, name="admin_check"),
    path('profile/', view_profile, name='view_profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('quiz/<int:quiz_id>/', quiz_views.get_quiz, name="get_quiz"),
    path('feed/quiz/', quiz_views.view_quizzes, name="feed_quiz"),
    path('quiz/create/', quiz_views.create_quiz, name="create_quiz"),
    path('quiz/question/', quiz_views.get_question, name="get_question"),
    path('quiz/question/solve/', quiz_views.solve_question, name="solve_question"),
    path('quiz/submit/', quiz_views.submit_quiz, name="submit_quiz"),
    path('quiz/start/', quiz_views.start_quiz, name="start_quiz"),
    path('quiz/results/', quiz_views.get_quiz_results, name="get_quiz_results"),
    path('quiz/like/', quiz_views.like_quiz, name="like_quiz"),
    path('quiz/bookmark/', quiz_views.bookmark_quiz, name="bookmark_quiz"),
    path('quiz/result/<int:quiz_result_id>/', quiz_views.get_specific_quiz_result, name="get_specific_quiz_result"),
    path('quiz/bookmarks/', quiz_views.view_bookmarked_quizzes, name="view_bookmarked_quizzes"),
    path('quiz/likes/', quiz_views.view_liked_quizzes, name="view_bookmarked_quizzes"),
    path('quiz/created/<str:username>/', quiz_views.view_created_quizzes, name="view_created_quizzes"),
    path('quiz/solved/<str:username>/', quiz_views.view_solved_quizzes, name="view_solved_quizzes"),
    path('quiz/review/<int:quiz_result_id>/', quiz_views.get_quiz_review, name="review_quiz"),
    path('quiz/recommend/<int:quiz_id>/', quiz_views.get_quiz_recommendations, name="recommend_quiz"),
    path('quiz/review_latest/<int:quiz_id>/', quiz_views.get_latest_quiz_review, name="review_latest_quiz"),
    path('quiz/choices/<str:word>/<str:quiz_type>/', get_quiz_choices, name='quiz-choices'),
    path('quiz/delete/', quiz_views.delete_quiz, name="delete_quiz"),
    path('quiz/update/', quiz_views.update_quiz, name="update_quiz"),
    path('quiz/cancel/', quiz_views.cancel_quiz, name="cancel_quiz"),
    path('quiz/cancel-id/', quiz_views.cancel_quiz_id, name="cancel_quiz_id"),

    path('word/bookmark/<str:word>/', bookmark_word, name='bookmark_word'),
    path('word/unbookmark/<str:word>/', unbookmark_word, name='unbookmark_word'),
    path('word/bookmarks/', get_bookmarked_words, name='get_bookmarked_words'),
    path('create-post/',create_post, name='create_post'),
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('get-lexvo-info/<str:word>/', get_lexvo_info, name='get_lexvo_info'),
    path('get-turkish/<str:word>/', get_turkish_translation, name='get_turkish_translation'),
    path('get-meaning/<str:word>/', get_word_meanings,name='get_word_meanings'),
    path('get-english/<str:turkish_word>/', fetch_english_words, name='fetch_english_word'),
    path('profile/follow/', follow_user, name='follow_user'),
    path('profile/unfollow/', unfollow_user, name='unfollow_user'),
    path('post/', get_post_details, name='get_post_details'),
    path('comment/', get_comment_by_id, name='get_comment_by_id'),
    path('post/like/', like_post, name='like_post'),
    path('post/unlike/', unlike_post, name='unlike_post'),
    path('post/liked/', get_liked_posts, name='get_liked_posts'),
    path('post/comment/add/', add_comment, name='add_comment'),
    path('post/comment/reply/', add_reply, name='add_reply'),
    path('post/comment/delete/', delete_comment, name='delete_comment'),
    path('post/comment/like/', like_comment, name='like_comment'),
    path('post/comment/unlike/', unlike_comment, name='unlike_comment'),
    path('post/create/', create_post, name='create_post'), 
    path('post/delete/', delete_post, name='delete_post'), 
    path('post/my-posts/', get_posts_of_user, name='get_posts_of_user'),  
    path('post/update/<int:post_id>/', update_post, name='update_tags'),
    path('user-activities/', activities_by_user, name='activities_by_user'),
    path('user-activities-as-object/', activities_for_user_as_object, name='activities_for_user_as_object'),
    path('feed/', get_user_post_feed, name='get_user_feed'),
    path('bookmark/', bookmark_post, name='bookmark_post'),  
    path('unbookmark/', unbookmark_post, name='unbookmark_post'), 
    path('get_bookmarked_posts/', get_bookmarked_posts, name='get_bookmarked_posts'),  
    path('profile/<str:username>/', view_other_profile, name='view_other_profile'),
    path('profile/followers/<str:username>/', view_followers, name='view_followers'),
    path('profile/following/<str:username>/', view_following, name='view_following'),
    path('search/', SearchView.as_view(), name='search'),
    path('image-details/<str:query>/', get_image_details, name='image-search'),
    path('image/<str:query>/', get_direct_image, name='direct-image'),
    path('image/url/<str:query>/', get_image_url, name='image-url'),
    path('comments/bookmark/', bookmark_comment, name='bookmark_comment'),
    path('comments/unbookmark/', unbookmark_comment, name='unbookmark_comment'),
    path('comments/bookmarked/', get_bookmarked_comments, name='get_bookmarked_comments'),
    path('comments/liked/', get_liked_comments, name='get_liked_comments'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
