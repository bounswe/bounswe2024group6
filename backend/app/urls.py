from django.urls import path
from app.views import *
from app.views_directory.profileviews import view_profile, update_profile
from app.views_directory.wordviews import get_word_info, get_turkish_translation, get_similar_level_and_part_of_speech, get_word_details
from app.views_directory.follow_unfollow import follow_user, unfollow_user 
from app.views_directory.authentication_endpoints import RegisterView, LoginView, LogoutView
from app.views_directory.comments import add_comment, delete_comment, like_comment
from app.views_directory.postviews import like_post, unlike_post
from app.views_directory.postviews import add_comment, delete_comment, like_comment, unlike_comment
from app.views_directory.activity_streams import activities_by_user, activities_for_user_as_object
from app.views_directory.postviews import create_post, delete_post, get_posts_of_user
from app.views_directory.feed_views import get_user_feed


urlpatterns = [
    path('', index , name='index_page'),
    path('profile_mock/', view_profile_mock, name='profile_mock'),
    path('profile/', view_profile, name='view_profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('quizzes/', quiz_view, name="quizzes"),
    path('create-quiz/', create_quiz_view, name="create_quiz"),
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('get-word-info/<str:word>/', get_word_info, name='get_word_info'),
    path('get-word-details/<str:word>/', get_word_details, name='get_word_details'),
    path('get-translation/<str:word>/', get_turkish_translation, name='get_turkish_translation'),
    path('get-related-words/<str:word>/', get_similar_level_and_part_of_speech, name='get_similar_level_and_part_of_speech'),
    path('profile/follow/', follow_user, name='follow_user'),
    path('profile/unfollow/', unfollow_user, name='unfollow_user'),
    path('post/like/', like_post, name='like_post'),
    path('post/unlike/', unlike_post, name='unlike_post'),
    path('post/comment/add/', add_comment, name='add_comment'),
    path('post/comment/delete/', delete_comment, name='delete_comment'),
    path('post/comment/like/', like_comment, name='like_comment'),
    path('post/comment/unlike/', unlike_comment, name='unlike_comment'),
    path('post/create/', create_post, name='create_post'),  # Create a new post
    path('post/delete/', delete_post, name='delete_post'),  # Delete an existing post
    path('post/my-posts/', get_posts_of_user, name='get_posts_of_user'),  # Get posts of the requesting user
    path('user-activities/', activities_by_user, name='activities_by_user'),
    path('user-activities-as-object/', activities_for_user_as_object, name='activities_for_user_as_object'),
    path('feed/', get_user_feed, name='get_user_feed'),

]

