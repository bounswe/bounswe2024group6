from django.urls import path
from app.views import *
from app.views_directory.profileviews import view_profile, update_profile
from app.views_directory.follow_unfollow import follow_user, unfollow_user 
from app.views_directory.authentication_endpoints import RegisterView, LoginView, LogoutView
from app.views_directory.comments import add_comment, delete_comment, like_comment
from app.views_directory.postviews import like_post, unlike_post
from app.views_directory.postviews import add_comment, delete_comment, like_comment, unlike_comment


urlpatterns = [
    path('', index , name='index_page'),
    path('posts/', post_view_page, name='posts'),
    path('profile_mock/', view_profile_mock, name='profile_mock'),
    path('profile/', view_profile, name='view_profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('quizzes/', quiz_view, name="quizzes"),
    path('create-post/',create_post, name='create_post'),
    path('create-quiz/', create_quiz_view, name="create_quiz"),
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('profile/follow/', follow_user, name='follow_user'),
    path('profile/unfollow/', unfollow_user, name='unfollow_user'),
    path('post/like/', like_post, name='like_post'),
    path('post/unlike/', unlike_post, name='unlike_post'),
    path('post/comment/add/', add_comment, name='add_comment'),
    path('post/comment/delete/', delete_comment, name='delete_comment'),
    path('post/comment/like/', like_comment, name='like_comment'),
    path('post/comment/unlike/', unlike_comment, name='unlike_comment'),
]
