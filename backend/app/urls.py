from django.urls import path
from app.views import *
from app.views_directory.wordviews import get_turkish_translation, get_lexvo_info, get_word_meanings, fetch_english_words
from app.views_directory.profileviews import view_profile, update_profile, view_other_profile, view_followers, view_following
from app.views_directory.follow_unfollow import follow_user, unfollow_user 
from app.views_directory.authentication_endpoints import RegisterView, LoginView, LogoutView, RefreshTokenView
from app.views_directory.comments import add_comment, delete_comment, like_comment, unlike_comment, get_comment_by_id
from app.views_directory.postviews import like_post, unlike_post
from app.views_directory.activity_streams import activities_by_user, activities_for_user_as_object
from app.views_directory.postviews import create_post, delete_post, get_posts_of_user, get_post_details
from app.views_directory.feed_views import get_user_post_feed
from app.views_directory.bookmark_views import bookmark_post, unbookmark_post, get_bookmarked_posts  
from app.views_directory.searchview import SearchView
from app.views_directory.image_view import get_image_details, get_direct_image
import app.views_directory.quiz_views as quiz_views

urlpatterns = [
    path('', index , name='index_page'),
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
    path('post/comment/add/', add_comment, name='add_comment'),
    path('post/comment/delete/', delete_comment, name='delete_comment'),
    path('post/comment/like/', like_comment, name='like_comment'),
    path('post/comment/unlike/', unlike_comment, name='unlike_comment'),
    path('post/create/', create_post, name='create_post'), 
    path('post/delete/', delete_post, name='delete_post'), 
    path('post/my-posts/', get_posts_of_user, name='get_posts_of_user'),  
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
    path('image/<str:query>/', get_direct_image, name='direct-image')
    
]

