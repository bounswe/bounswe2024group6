from . import views
from django.urls import path
from .views import *
from .views import login

urlpatterns = [
    path('', index , name='index_page'),
    path('login/', login, name='user_login'),
    path('signup/', signup, name='signup'),
    path('user_profile/', views.user_profile, name='user_profile'),
    path('auth_user_profile/', views.auth_user_profile, name='auth_user_profile'),
    path('create_post/', views.create_post, name='create_post'),
    path('like_post/', views.like_post, name='like_post'), 
    path('get_like_back/', get_like_back, name='get_like_back'),
    path('comment_post/', views.comment_post, name='comment_post'),
    path('bookmark_post/', views.bookmark_post, name='bookmark_post'),
    path('unbookmark_post/', views.unbookmark_post, name='unbookmark_post'),
    path('update_user_profile/', update_user_profile, name='update_user_profile'),
    path('follow/', follow_user, name='follow_user'),
    path('unfollow/', unfollow_user, name='unfollow_user'),
    path('followers/', list_followers, name='list_followers'),
    path('following/', list_following, name='list_following'),
    path('guest_feed/', guest_feed, name='guest_feed'),
    path('auth_feed/', auth_feed, name='auth_feed'),
    path('get_posts_by_ids/', get_posts_by_ids, name='get_posts_by_ids'),
    path('architect/', architect_view, name='architect_view'),
    path('building/', building_view, name='building_view'),
    path('style/', style_view, name='style_view'),
    path('search/', views.search, name='search'),
    path('delete_post/',delete_post, name='delete_post'),
    path('delete_comment/',delete_comment, name='delete_comment'),
    path('get_entity_posts/', get_entity_posts, name='get_entity_posts'),
    path('basic_user_info/', basic_user_info, name='basic_user_info'),
    path('entity_from_searchresult/', entity_from_searchresult, name='entity_from_searchresult'),
    

]
    