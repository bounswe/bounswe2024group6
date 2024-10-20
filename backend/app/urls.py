from django.urls import path
from .views import *

urlpatterns = [
    path('', index , name='index_page'),
    path('posts/', post_view_page, name='posts'),
    path('profile/', view_profile, name='profile'),
    path('quizzes/', quiz_view, name="quizzes"),
    path('create-quiz/', create_quiz_view, name="create_quiz"),
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]