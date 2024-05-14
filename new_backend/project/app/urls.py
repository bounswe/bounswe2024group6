from . import views
from django.urls import path
from .views import *

urlpatterns = [
    path('', index , name='index_page'),
    path('login/', user_login, name='user_login'),
    path('signup/', signup, name='signup'),
    path('user_homepage/<str:username>/', views.user_homepage, name='user_homepage'),

]
