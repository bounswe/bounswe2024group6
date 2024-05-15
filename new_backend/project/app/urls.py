from . import views
from django.urls import path
from .views import *

urlpatterns = [
    path('', index , name='index_page'),
    path('login/', login, name='user_login'),
    path('signup/', signup, name='signup'),
    path('user_profile/', views.user_profile, name='user_profile'),
    path('user_profile/<str:username>/', views.user_profile, name='user_profile_by_username'),
    path('create_post/', views.create_post, name='create_post'),
    path('like_post/', views.like_post, name='like_post'), 
    path('comment_post/', views.comment_post, name='comment_post'),
    path('bookmark_post/', views.bookmark_post, name='bookmark_post'),
    path('update_user_profile/', update_user_profile, name='update_user_profile'),


]
    