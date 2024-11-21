from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Tags
from .models import Quiz
from .word_service import lexvo_manager


@api_view(['GET'])
def index(request):
    return Response({'message': 'Index Page'})



@api_view(['GET'])
def view_profile_mock(request):
    mock_profile=  {
        "username": "oktay_ozel", 
        "level": "B2",
        "followers": 100,
        "following": 50,
        "image":"https://private-user-images.githubusercontent.com/24993956/309188090-69afd5bb-8258-4995-939c-4600b6ecce12.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2MzQsIm5iZiI6MTcyOTMyOTMzNCwicGF0aCI6Ii8yNDk5Mzk1Ni8zMDkxODgwOTAtNjlhZmQ1YmItODI1OC00OTk1LTkzOWMtNDYwMGI2ZWNjZTEyLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTUzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBhODJlMDJlYmEwZWU5OWNmMzZlYmYxNDU2MDYxYzgxNTlhMjgxZWUyMzI0NjcyM2Y0YWNmZmFkN2NiNmI4ZjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.05RprWnhY5xEluCg9VWOMBn50-atNZuTpHavIXBq9cc",
        "posts": [{
        "id": 2,
        "author": {
          "username": "oktay_ozel",
          "profile_image": "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2NzUsIm5iZiI6MTcyOTMyOTM3NSwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTYxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY1YTNiM2MxZDY0ZTdjYmNlZTU2NmU5NTUyZDZjMjI4NGZmZjNmNGI2OWI2ZjljODg1MzFmOThhOTEwYjFmYzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GctR1cVt7p3T5MUGBCWRNT_9kdB5SRXamcQVh5pLMOc"
        },
        "post": {
          "title": "Petrichor: The Smell of Rain",
          "content": "Petrichor is the pleasant, earthy smell that comes after rain. Example: 'She loved the petrichor that filled the air after the storm.'",
          "tags": ["Vocabulary"],
          "timestamp": "5 hours ago"
        },
        "engagement": {
          "likes": 90,
          "comments": 3
          }
      },
      {
        "id": 3,
        "author": {
          "username": "oktay_ozel",
          "profile_image": "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2NzUsIm5iZiI6MTcyOTMyOTM3NSwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTYxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY1YTNiM2MxZDY0ZTdjYmNlZTU2NmU5NTUyZDZjMjI4NGZmZjNmNGI2OWI2ZjljODg1MzFmOThhOTEwYjFmYzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GctR1cVt7p3T5MUGBCWRNT_9kdB5SRXamcQVh5pLMOc"
        },
        "post": {
          "title": "Serendipity: A Fortunate Discovery",
          "content": "Serendipity is the occurrence of events by chance in a happy or beneficial way. Example: 'They met by serendipity and became lifelong friends.'",
          "tags": ["Vocabulary"],
          "timestamp": "2 hours ago"
        },
        "engagement": {
          "likes": 75,
          "comments": 5
        }
      }],
      "quizzes": [
            {
                "id": 1,
                "title": "Basic Vocabulary Quiz",
                "description": "Test your knowledge on basic vocabulary words!",
                "author": "oktay_ozel",
                "upvote": 5,
                "level": "Beginner"
            },
            {
                "id": 2,
                "title": "Advanced Vocabulary Quiz",
                "description": "Challenge yourself with advanced vocabulary words.",
                "author": "oktay_ozel",
                "upvote": 9,
                "level": "Advanced"
            }
        ]
          
    }
    return Response({'profile': mock_profile})
