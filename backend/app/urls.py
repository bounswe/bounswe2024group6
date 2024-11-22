from django.urls import path
from app.views import *
from app.views_directory.profileviews import view_profile, update_profile
from app.views_directory.wordviews import get_word_info, get_turkish_translation, get_similar_level_and_part_of_speech, get_word_details,get_lexvo_info

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
    path('get-word-info/<str:word>/', get_word_info, name='get_word_info'),
    path('get-word-details/<str:word>/', get_word_details, name='get_word_details'),
    path('get-translation/<str:word>/', get_turkish_translation, name='get_turkish_translation'),
    path('get-related-words/<str:word>/', get_similar_level_and_part_of_speech, name='get_similar_level_and_part_of_speech'),
    path('get-lexvo-info/<str:word>/', get_lexvo_info, name='get_lexvo_info'),
]