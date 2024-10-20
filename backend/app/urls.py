from django.urls import path
from .views import *

urlpatterns = [
    path('', index , name='index_page'),
    path('posts/', post_view_page, name='posts'),
    path('profile/', view_profile, name='profile')
]