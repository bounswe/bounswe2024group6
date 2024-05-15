from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('search/', views.search, name='search'),
    path('building/', views.building_view, name='building'),
    path('architect/', views.architect_view, name='architect'),
    path('style/', views.style_view, name='style')
]
