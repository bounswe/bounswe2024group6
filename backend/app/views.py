from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework.authtoken.models import Token

from adrf.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from django.shortcuts import render

@api_view(['GET'])
def index(request):
    return Response({'message': 'Index Page'})


@api_view(['GET'])
def post_view_page(request):
    mock_posts = [
    {
      "id": 1,
      "author": {
        "username": "aras_tasci",
        "profile_image": "https://private-user-images.githubusercontent.com/24993956/309188090-69afd5bb-8258-4995-939c-4600b6ecce12.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2MzQsIm5iZiI6MTcyOTMyOTMzNCwicGF0aCI6Ii8yNDk5Mzk1Ni8zMDkxODgwOTAtNjlhZmQ1YmItODI1OC00OTk1LTkzOWMtNDYwMGI2ZWNjZTEyLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTUzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBhODJlMDJlYmEwZWU5OWNmMzZlYmYxNDU2MDYxYzgxNTlhMjgxZWUyMzI0NjcyM2Y0YWNmZmFkN2NiNmI4ZjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.05RprWnhY5xEluCg9VWOMBn50-atNZuTpHavIXBq9cc"
      },
      "post": {
        "title": "Ephemeral: Short-lived",
        "content": "Ephemeral means lasting for a very short time. Example: 'The beauty of the sunset was ephemeral but unforgettable.'",
        "category": "Vocabulary",
        "timestamp": "30 minutes ago"
      },
      "engagement": {
        "likes": 50,
        "comments": 3,
        "bookmark": 2
      },
      "comments":[
             {
                "id": 31,
                "author": {
                    "username": "oktay_ozel",
                    "profile_image": "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA3MTAsIm5iZiI6MTcyOTMzMDQxMCwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MzMzMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU2MDU4M2EwMWE5MjJiZmU4MDc3OWQzODBlOTIyYTdjNjZjMTZjNDlmYTQ4ZmEwMGJhZjg1YjIwYjE4NjMzNGEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GMPWCh1PJN6IJnbaJ8y1D2cidA-jvFqmZszGDFeTYVc"
                },
                "comment": "What a nice information!",
                "timestamp": "49 minutes ago",
                "likes": 11
            },
            {
                "id": 32,
                "author": {
                    "username": "kaan_yolcu",
                    "profile_image": ""
                },
                "comment": "Good word!",
                "timestamp": "6 hours ago",
                "likes": 3
            },
             {
                "id": 4,
                "author": {
                    "username": "yunus_emre_ozdemir",
                    "profile_image": "https://private-user-images.githubusercontent.com/47982397/376757594-a0c5112d-b1c6-4486-8dcf-413cd320de95.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA2MTAsIm5iZiI6MTcyOTMzMDMxMCwicGF0aCI6Ii80Nzk4MjM5Ny8zNzY3NTc1OTQtYTBjNTExMmQtYjFjNi00NDg2LThkY2YtNDEzY2QzMjBkZTk1LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MzE1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlMzFhMGU3NGY3YmQwNTNjYzI1ZTMyNDQzNDVlMjZlOGE2ZTAxMDU3MmFkOWUzNTVlZDYwZjNkNjFkYjhkYjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.zh3Q0LrRlH3GpEeESxf01P5JENuyetxwlMLILPBCRkk"
                },
                "comment": "Epheremal has a striking meaning!",
                "timestamp": "53 minutes ago",
                "likes": 12
            }
        ]
    },
    {
      "id": 2,
      "author": {
        "username": "oktay_ozel",
        "profile_image": "https://private-user-images.githubusercontent.com/57640531/310137517-cbe7aa9f-3457-4f64-b37b-c3e46d4e448b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2NzUsIm5iZiI6MTcyOTMyOTM3NSwicGF0aCI6Ii81NzY0MDUzMS8zMTAxMzc1MTctY2JlN2FhOWYtMzQ1Ny00ZjY0LWIzN2ItYzNlNDZkNGU0NDhiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTYxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY1YTNiM2MxZDY0ZTdjYmNlZTU2NmU5NTUyZDZjMjI4NGZmZjNmNGI2OWI2ZjljODg1MzFmOThhOTEwYjFmYzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GctR1cVt7p3T5MUGBCWRNT_9kdB5SRXamcQVh5pLMOc"
      },
      "post": {
        "title": "Petrichor: The Smell of Rain",
        "content": "Petrichor is the pleasant, earthy smell that comes after rain. Example: 'She loved the petrichor that filled the air after the storm.'",
        "category": "Vocabulary",
        "timestamp": "5 hours ago"
      },
      "engagement": {
        "likes": 90,
        "comments": 3,
        "bookmark": 3
        },
        "comments":[
             {
                "id": 4,
                "author": {
                    "username": "yunus_emre_ozdemir",
                    "profile_image": "https://private-user-images.githubusercontent.com/47982397/376757594-a0c5112d-b1c6-4486-8dcf-413cd320de95.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA2MTAsIm5iZiI6MTcyOTMzMDMxMCwicGF0aCI6Ii80Nzk4MjM5Ny8zNzY3NTc1OTQtYTBjNTExMmQtYjFjNi00NDg2LThkY2YtNDEzY2QzMjBkZTk1LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MzE1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlMzFhMGU3NGY3YmQwNTNjYzI1ZTMyNDQzNDVlMjZlOGE2ZTAxMDU3MmFkOWUzNTVlZDYwZjNkNjFkYjhkYjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.zh3Q0LrRlH3GpEeESxf01P5JENuyetxwlMLILPBCRkk"
                },
                "comment": "Nice Post!",
                "timestamp": "15 minutes ago",
                "likes": 2
            },
             {
                "id": 17,
                "author": {
                    "username": "elif_nur_deniz",
                    "profile_image": "https://private-user-images.githubusercontent.com/70893987/307748909-5ce6b412-2201-40e6-9351-38372e83b3f1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA0ODcsIm5iZiI6MTcyOTMzMDE4NywicGF0aCI6Ii83MDg5Mzk4Ny8zMDc3NDg5MDktNWNlNmI0MTItMjIwMS00MGU2LTkzNTEtMzgzNzJlODNiM2YxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5Mjk0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWMwZjg1ZDVlZjU1NTk0YjIwMmZlMjRhZTY5ZGEyYmQ2YTY2ODMyYzVkZmY1ZTAxNTUwZDlmN2RjOGUyMjI1N2YmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.vv1mThwpjfwpKgQrBUMuaDzDDMApXPMC58ZKDOwZ320"
                },
                "comment": "Petrichor, interesting word!",
                "timestamp": "2 hours ago",
                "likes": 7
            },
            {
                "id": 29,
                "author": {
                    "username": "kaan_yolcu",
                    "profile_image": ""
                },
                "comment": "Fascinating!",
                "timestamp": "1 hours ago",
                "likes": 3
            }
        ]
    },
    {
      "id": 3,
      "author": {
        "username": "ali_tarik_sahin",
        "profile_image": "https://private-user-images.githubusercontent.com/112548301/376665235-25b54a08-cc25-4a9e-b80b-99583fe381b2.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2OTAsIm5iZiI6MTcyOTMyOTM5MCwicGF0aCI6Ii8xMTI1NDgzMDEvMzc2NjY1MjM1LTI1YjU0YTA4LWNjMjUtNGE5ZS1iODBiLTk5NTgzZmUzODFiMi5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTAxOVQwOTE2MzBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03OTE2NWE2M2ExYWJjN2Y4ZDQ3ZWY4ZGQ2ZjRlMTM0ZjcwOWFiMmU0YTU1NTU2ZGUwOWNlYzk5MzVlNGE5ZWQ4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.8WNDf0PAu2nKSbLUgBAn3zeQZvs4DSV5-D-vBTiMzAU"
      },
      "post": {
        "title": "Ineffable: Beyond Words",
        "content": "Ineffable means too great or extreme to be expressed in words. Example: 'The beauty of the mountains was ineffable.'",
        "category": "Vocabulary",
        "timestamp": "4 hours ago"
      },
      "engagement": {
        "likes": 80,
        "comments": 3,
        "bookmark": 1
      },
      "comments":[
            {
                "id": 89,
                "author": {
                    "username": "elif_nur_deniz",
                    "profile_image": "https://private-user-images.githubusercontent.com/70893987/307748909-5ce6b412-2201-40e6-9351-38372e83b3f1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA0ODcsIm5iZiI6MTcyOTMzMDE4NywicGF0aCI6Ii83MDg5Mzk4Ny8zMDc3NDg5MDktNWNlNmI0MTItMjIwMS00MGU2LTkzNTEtMzgzNzJlODNiM2YxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5Mjk0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWMwZjg1ZDVlZjU1NTk0YjIwMmZlMjRhZTY5ZGEyYmQ2YTY2ODMyYzVkZmY1ZTAxNTUwZDlmN2RjOGUyMjI1N2YmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.vv1mThwpjfwpKgQrBUMuaDzDDMApXPMC58ZKDOwZ320"
                },
                "comment": "This word describes my last vacation perfectly!",
                "timestamp": "3 hours ago",
                "likes": 10
            },
            {
                "id": 21,
                "author": {
                    "username": "aras_tasci",
                    "profile_image": "https://private-user-images.githubusercontent.com/24993956/309188090-69afd5bb-8258-4995-939c-4600b6ecce12.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMjk2MzQsIm5iZiI6MTcyOTMyOTMzNCwicGF0aCI6Ii8yNDk5Mzk1Ni8zMDkxODgwOTAtNjlhZmQ1YmItODI1OC00OTk1LTkzOWMtNDYwMGI2ZWNjZTEyLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MTUzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBhODJlMDJlYmEwZWU5OWNmMzZlYmYxNDU2MDYxYzgxNTlhMjgxZWUyMzI0NjcyM2Y0YWNmZmFkN2NiNmI4ZjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.05RprWnhY5xEluCg9VWOMBn50-atNZuTpHavIXBq9cc"
                },
                "comment": "What a beautiful word for such a feeling.",
                "timestamp": "2 hours ago", 
                "likes": 5
            },
            {
                "id": 16,
                "author": {
                    "username": "yunus_emre_ozdemir",
                    "profile_image": "https://private-user-images.githubusercontent.com/47982397/376757594-a0c5112d-b1c6-4486-8dcf-413cd320de95.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA2MTAsIm5iZiI6MTcyOTMzMDMxMCwicGF0aCI6Ii80Nzk4MjM5Ny8zNzY3NTc1OTQtYTBjNTExMmQtYjFjNi00NDg2LThkY2YtNDEzY2QzMjBkZTk1LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MzE1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlMzFhMGU3NGY3YmQwNTNjYzI1ZTMyNDQzNDVlMjZlOGE2ZTAxMDU3MmFkOWUzNTVlZDYwZjNkNjFkYjhkYjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.zh3Q0LrRlH3GpEeESxf01P5JENuyetxwlMLILPBCRkk"
                },
                "comment": "I couldn't understand it...",
                "timestamp": "10 seconds ago",
                "likes": 0
            }
        ]

      
    }
  ]
    
    return Response({'posts': mock_posts})

@api_view(['GET'])
def view_profile(request):
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
          "category": "Vocabulary",
          "timestamp": "5 hours ago"
        },
        "engagement": {
          "likes": 90,
          "comments": 3,
          "bookmark": 3
          },
          "comments":[
              {
                  "id": 4,
                  "author": {
                      "username": "yunus_emre_ozdemir",
                      "profile_image": "https://private-user-images.githubusercontent.com/47982397/376757594-a0c5112d-b1c6-4486-8dcf-413cd320de95.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA2MTAsIm5iZiI6MTcyOTMzMDMxMCwicGF0aCI6Ii80Nzk4MjM5Ny8zNzY3NTc1OTQtYTBjNTExMmQtYjFjNi00NDg2LThkY2YtNDEzY2QzMjBkZTk1LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5MzE1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlMzFhMGU3NGY3YmQwNTNjYzI1ZTMyNDQzNDVlMjZlOGE2ZTAxMDU3MmFkOWUzNTVlZDYwZjNkNjFkYjhkYjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.zh3Q0LrRlH3GpEeESxf01P5JENuyetxwlMLILPBCRkk"
                  },
                  "comment": "Nice Post!",
                  "timestamp": "15 minutes ago",
                  "likes": 2
              },
              {
                  "id": 17,
                  "author": {
                      "username": "elif_nur_deniz",
                      "profile_image": "https://private-user-images.githubusercontent.com/70893987/307748909-5ce6b412-2201-40e6-9351-38372e83b3f1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzMzA0ODcsIm5iZiI6MTcyOTMzMDE4NywicGF0aCI6Ii83MDg5Mzk4Ny8zMDc3NDg5MDktNWNlNmI0MTItMjIwMS00MGU2LTkzNTEtMzgzNzJlODNiM2YxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDE5VDA5Mjk0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWMwZjg1ZDVlZjU1NTk0YjIwMmZlMjRhZTY5ZGEyYmQ2YTY2ODMyYzVkZmY1ZTAxNTUwZDlmN2RjOGUyMjI1N2YmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.vv1mThwpjfwpKgQrBUMuaDzDDMApXPMC58ZKDOwZ320"
                  },
                  "comment": "Petrichor, interesting word!",
                  "timestamp": "2 hours ago",
                  "likes": 7
              },
              {
                  "id": 29,
                  "author": {
                      "username": "kaan_yolcu",
                      "profile_image": ""
                  },
                  "comment": "Fascinating!",
                  "timestamp": "1 hours ago",
                  "likes": 3
              }
          ]
      }],
      "quizzes": [
            {
                "id": 1,
                "title": "Basic Vocabulary Quiz",
                "description": "Test your knowledge on basic vocabulary words!",
                "author": "aras_tasci",
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