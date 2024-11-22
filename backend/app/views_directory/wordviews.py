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
from ..models import  Relationship, Word, Translation
from ..word_service import lexvo_manager
import requests




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
        # Fetch the word from the database
        word_obj = Word.objects.get(word=word)
        
        # Get the level and part of speech (category) of the word
        level = word_obj.level
        part_of_speech = word_obj.part_of_speech
        
        # Fetch words that are either related by category or have the same part of speech
        related_words = Relationship.objects.filter(word=word_obj).values_list('related_word', flat=True)
        
        # Fetch related words that have the same level and part of speech
        related_word_list = Word.objects.filter(id__in=related_words, level=level, part_of_speech=part_of_speech).exclude(word=word)
        
        # Convert related words to a list of dictionaries
        suggestions = []
        for related_word in related_word_list:
            suggestions.append({
                "word": related_word.word,
                "level": related_word.level,
                "part_of_speech": related_word.part_of_speech,
                "meaning": related_word.meaning,
                "sentence": related_word.sentence
            })
        
        # Return the word and suggestions
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
    # Check if the word is already in the database
    word_instance = Word.objects.filter(word=word).first()
    
    if word_instance:
        # If the word exists, check if it has missing or empty fields
        if word_instance.meaning == "Meaning not available" and word_instance.sentence == "Sentence not available":
            # Fetch missing data from Lexvo if meaning and sentence are default
            try:
                word_info = lexvo_manager.get_final_info(word)
            except Exception as e:
                return Response({
                    "error": f"Error fetching data for word '{word}': {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Fetch meanings from Lexvo if necessary
            if word_info.get("meanings") is None or word_info["meanings"] == []:
                # Fetch related meanings from URIs if Lexvo does not have a direct meaning
                related_meanings = fetch_related_meanings(word)
                word_instance.meaning = ', '.join(related_meanings) if related_meanings else "Meaning not available"
            else:
                word_instance.meaning = word_info["meanings"][0]["label"] if word_info["meanings"] else "Meaning not available"
            
            word_instance.sentence = "Sentence not available"  # You can modify this if Lexvo provides example sentences
            word_instance.save()

            # Add translations if missing
            if word_info.get("turkish_translations"):
                for translation_uri in word_info["turkish_translations"]:
                    translation, created = Translation.objects.get_or_create(
                        word=word_instance,
                        translation=translation_uri.split('/')[-1]  # Assuming the translation is part of the URI
                    )

            # Add relationships if missing
            if word_info["meanings"]:
                for meaning in word_info["meanings"]:
                    for related_word in meaning["broader"] + meaning["narrower"] + meaning["nearlySameAs"]:
                        related_word_instance, created = Word.objects.get_or_create(word=related_word)
                        # Add relationships to the Relationship model
                        Relationship.objects.get_or_create(
                            word=word_instance,
                            related_word=related_word_instance,
                            relation_type='broader'  # Modify this based on your logic
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
            # Word exists and has data, return the data
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
        # If word is not in the database, fetch from Lexvo and save the data
        try:
            word_info = lexvo_manager.get_final_info(word)
        except Exception as e:
            return Response({
                "error": f"Error fetching data for word '{word}': {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Create the word instance
        new_word = Word.objects.create(
            word=word,
            meaning=word_info["meanings"][0]["label"] if word_info["meanings"] else "Meaning not available",
            sentence="Sentence not available",  # You can modify this if Lexvo provides example sentences
        )

        # Add translations to the database
        if word_info.get("turkish_translations"):
            for translation_uri in word_info["turkish_translations"]:
                Translation.objects.create(
                    word=new_word,
                    translation=translation_uri.split('/')[-1]  # Assuming the translation is part of the URI
                )

        # Add relationships to the database
        if word_info["meanings"]:
            for meaning in word_info["meanings"]:
                for related_word in meaning["broader"] + meaning["narrower"] + meaning["nearlySameAs"]:
                    related_word_instance, created = Word.objects.get_or_create(word=related_word)
                    # Add relationships to the Relationship model
                    Relationship.objects.get_or_create(
                        word=new_word,
                        related_word=related_word_instance,
                        relation_type='broader'  # Modify this based on your logic
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
    
    # Define the URIs to fetch related meanings from (example URIs provided)
    URIs = [
        "http://sw.opencyc.org/2009/04/07/concept/en/Collection",
        "http://sw.opencyc.org/2009/04/07/concept/en/_http___dbpedia_org_ontology_type_",
        "http://sw.opencyc.org/2009/04/07/concept/en/genls",
        "http://sw.opencyc.org/2009/04/07/concept/en/isa",
        "http://sw.opencyc.org/2009/04/07/concept/en/rdf_type"
    ]
    
    # Fetch meanings from these URIs (implement according to your preferred method)
    for uri in URIs:
        try:
            response = requests.get(uri)
            if response.status_code == 200:
                # Process the response to extract relevant information
                # This could involve extracting labels, descriptions, etc.
                related_meanings.append(uri.split('/')[-1])  # Simplified for demonstration
        except requests.exceptions.RequestException as e:
            print(f"Error fetching related meaning for {uri}: {e}")
    
    return related_meanings
