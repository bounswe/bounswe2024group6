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
from ..serializers import *
from django.shortcuts import render
from ..models import Tags
from ..models import Quiz, Relationship, Word, Translation
from ..word_service import lexvo_manager
import requests


@api_view(['GET'])
def get_lexvo_info(request,word):

    try:

        final_info = lexvo_manager.get_final_info(word)

        return  Response({"final_info": final_info}, status=200)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def get_word_info(request, word):
    """
    Endpoint to retrieve all information related to a word from the database.
    """
    try:
        word_obj = Word.objects.filter(word=word).first()
        if not word_obj:
            return Response({"error": f"Word '{word}' not found in the database."}, status=status.HTTP_404_NOT_FOUND)

        word_info = {
            "word": word_obj.word,
            "language": word_obj.language,
            "level": word_obj.level,
            "part_of_speech": word_obj.part_of_speech,
            "meaning": word_obj.meaning,
            "sentence": word_obj.sentence,
        }

        relationships = Relationship.objects.filter(word=word_obj)
        related_words = [
            {
                "related_word": rel.related_word.word,
                "relation_type": rel.relation_type,
                "related_word_level": rel.related_word.level,
                "related_word_part_of_speech": rel.related_word.part_of_speech,
            }
            for rel in relationships
        ]

        word_info["related_words"] = related_words

        return Response(word_info, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def get_turkish_translation(request, word):
    try:
        word_obj = Word.objects.get(word=word)
        
        translations = word_obj.translations.all().values_list('translation', flat=True)
        
        if translations:
            return Response({"word": word, "turkish_translations": list(translations)}, status=200)
        else:
            return Response({"word": word, "turkish_translations": [], "message": "No translations found."}, status=200)
    except Word.DoesNotExist:
        return Response({"error": f"Word '{word}' not found in the database."}, status=404)
    

@api_view(['GET'])
def get_similar_level_and_part_of_speech(request, word):
    try:
       
        word_obj = Word.objects.get(word=word)
        
        level = word_obj.level
        part_of_speech = word_obj.part_of_speech
        related_words = Relationship.objects.filter(word=word_obj).values_list('related_word', flat=True)
        
        related_word_list = Word.objects.filter(id__in=related_words, level=level, part_of_speech=part_of_speech).exclude(word=word)
        
        suggestions = []
        for related_word in related_word_list:
            suggestions.append({
                "word": related_word.word,
                "level": related_word.level,
                "part_of_speech": related_word.part_of_speech,
                "meaning": related_word.meaning,
                "sentence": related_word.sentence
            })

        return Response({"word": word, "suggestions": suggestions}, status=200)

    except Word.DoesNotExist:
        return Response({"error": f"Word '{word}' not found in the database."}, status=404)

    

@api_view(['GET'])
def get_word_details(request, word):
    """
    Fetch word details from the database, or if not found, fetch from Lexvo
    and populate the necessary database entries.
    If the word exists with empty fields, populate those fields with related meanings.
    """
    word_instances = Word.objects.filter(word=word)
    for word_instance in word_instances:
        print(f"The meaning of '{word_instance.word}' is: {word_instance.meaning}")


    
    if word_instance:
        if word_instance.meaning == "Meaning not available" and word_instance.sentence == "Sentence not available":
            
            try:
                word_info = lexvo_manager.get_final_info(word)
            except Exception as e:
                return Response({
                    "error": f"Error fetching data for word '{word}': {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            meanings = []
            if word_info.get("meanings") is None or word_info["meanings"] == []:
                related_meanings = fetch_related_meanings(word)
                word_instance.meaning = ', '.join(related_meanings) if related_meanings else "Meaning not available"
            else:
                for meaning in word_info["meanings"]:
                    meanings.append(meaning["label"])
                
                word_instance.meaning = meanings
            
            word_instance.sentence = "Sentence not available" 
            word_instance.save()

            if word_info.get("turkish_translations"):
                for translation_uri in word_info["turkish_translations"]:
                    translation, created = Translation.objects.get_or_create(
                        word=word_instance,
                        translation=translation_uri.split('/')[-1]  
                    )

            if word_info["meanings"]:
                for meaning in word_info["meanings"]:
                    for related_word in meaning["broader"] + meaning["narrower"] + meaning["nearlySameAs"]:
                        related_word_instance, created = Word.objects.get_or_create(word=related_word)
                        
                        Relationship.objects.get_or_create(
                            word=word_instance,
                            related_word=related_word_instance,
                            relation_type='broader'  
                        )

            return Response({
                "word": word_instance.word,
                "meaning": word_instance.meaning,
                "sentence": word_instance.sentence,
                "translations": [translation.translation for translation in word_instance.translations.all()],
                "relationships": [
                    {
                        "related_word": relationship.related_word.word,
                        "relation_type": relationship.relation_type
                    } for relationship in word_instance.relationships.all()
                ]
            })
        else:
            return Response({
                "word": word_instance.word,
                "meaning": word_instance.meaning,
                "sentence": word_instance.sentence,
                "translations": [translation.translation for translation in word_instance.translations.all()],
                "relationships": [
                    {
                        "related_word": relationship.related_word.word,
                        "relation_type": relationship.relation_type
                    } for relationship in word_instance.relationships.all()
                ]
            })

    else:
        try:
            word_info = lexvo_manager.get_final_info(word)
        except Exception as e:
            return Response({
                "error": f"Error fetching data for word '{word}': {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        new_word = Word.objects.create(
            word=word,
            meaning=word_info["meanings"][0]["label"] if word_info["meanings"] else "Meaning not available",
            sentence="Sentence not available",  
        )

        if word_info.get("turkish_translations"):
            for translation_uri in word_info["turkish_translations"]:
                Translation.objects.create(
                    word=new_word,
                    translation=translation_uri.split('/')[-1] 
                )

        if word_info["meanings"]:
            for meaning in word_info["meanings"]:
                for related_word in meaning["broader"] + meaning["narrower"] + meaning["nearlySameAs"]:
                    related_word_instance, created = Word.objects.get_or_create(word=related_word)
                    Relationship.objects.get_or_create(
                        word=new_word,
                        related_word=related_word_instance,
                        relation_type='broader'  
                    )

        return Response({
            "word": new_word.word,
            "meaning": new_word.meaning,
            "sentence": new_word.sentence,
            "translations": [translation.translation for translation in new_word.translations.all()],
            "relationships": [
                {
                    "related_word": relationship.related_word.word,
                    "relation_type": relationship.relation_type
                } for relationship in new_word.relationships.all()
            ]
        })

def fetch_related_meanings(word):
    """
    Fetch related meanings from external resources (OpenCyc, DBpedia, etc.) 
    when Lexvo meaning is not available.
    """
    related_meanings = []
    
    URIs = [
        "http://sw.opencyc.org/2009/04/07/concept/en/Collection",
        "http://sw.opencyc.org/2009/04/07/concept/en/_http___dbpedia_org_ontology_type_",
        "http://sw.opencyc.org/2009/04/07/concept/en/genls",
        "http://sw.opencyc.org/2009/04/07/concept/en/isa",
        "http://sw.opencyc.org/2009/04/07/concept/en/rdf_type"
    ]
    
    for uri in URIs:
        try:
            response = requests.get(uri)
            if response.status_code == 200:
                related_meanings.append(uri.split('/')[-1]) 
        except requests.exceptions.RequestException as e:
            print(f"Error fetching related meaning for {uri}: {e}")
    
    return related_meanings
