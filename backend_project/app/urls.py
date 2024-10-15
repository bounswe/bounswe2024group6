from django.urls import path
from .views import ExampleView

urlpatterns = [
    path('example/', ExampleView.as_view(), name='example'),  # Define the 'example/' URL
]
