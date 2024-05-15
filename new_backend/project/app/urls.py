from . import views
from django.urls import path
from .views import *

urlpatterns = [
    path('', index , name='index_page'),
    path('login/', login, name='user_login'),
    path('signup/', signup, name='signup'),
    path('user_profile/', views.user_profile, name='user_profile'),
    path('create_post/', views.create_post, name='create_post'),

]
