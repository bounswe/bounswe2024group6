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

import asyncio

from .serializers import UserSerializer
from .utils import query_architect,query_architectural_style,query_building, get_description_wikibase, get_content_wikidata, get_building_info, get_architect_info
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})


@api_view(['POST'])
def search(request):

    print(request.data)

    if request.method == "POST" and "query" in request.data:
        keyword = request.data['query']
        
        architect_response =query_architect(keyword)
        style_response =  query_architectural_style(keyword)
        building_response = query_building(keyword)

        # return the results
        response = {"style": style_response, "architect":architect_response, "building":building_response}

        return JsonResponse(response)
    
    return Response("there was an error with the query.",status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def building_view(request):
    
    if request.method == "GET":
        entity_id = request.data['entity_id']
        # get_description_wikibase(entity_id)
        # get_content_wikidata(entity_id)
        return JsonResponse(get_building_info(entity_id))

@api_view(['GET'])
def architect_view(request):
    
    if request.method == "GET":
        entity_id = request.data['entity_id']
        # get_description_wikibase(entity_id)
        # get_content_wikidata(entity_id)
        return JsonResponse(get_architect_info(entity_id))

