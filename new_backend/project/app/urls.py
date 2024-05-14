from django.urls import path
from .views import main_page, user_login

urlpatterns = [
    path('', main_page, name='main_page'),
    path('login/', user_login, name='user_login'),
]
