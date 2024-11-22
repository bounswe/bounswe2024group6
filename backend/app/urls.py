from django.urls import path
from app.views import *
from app.views_directory.profileviews import view_profile, update_profile, view_other_profile
from app.views_directory.wordviews import get_word_info, get_turkish_translation, get_similar_level_and_part_of_speech, get_word_details
from app.views_directory.follow_unfollow import follow_user, unfollow_user 
from app.views_directory.authentication_endpoints import RegisterView, LoginView, LogoutView, RefreshTokenView
from app.views_directory.comments import add_comment, delete_comment, like_comment, unlike_comment
from app.views_directory.postviews import like_post, unlike_post
from app.views_directory.activity_streams import activities_by_user, activities_for_user_as_object
from app.views_directory.postviews import create_post, delete_post, get_posts_of_user
from app.views_directory.feed_views import get_user_post_feed
from app.views_directory.bookmark_views import bookmark_post, unbookmark_post, get_bookmarked_posts  



urlpatterns = [
    path('', index , name='index_page'),
    path('profile/', view_profile, name='view_profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('refresh/', RefreshTokenView.as_view(), name='token_refresh'),
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
]

