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
from ..models import Quiz, Relationship, Word, Translation, WordBookmark
from ..word_service import lexvo_manager
import requests


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_word(request, word):
    """
    Bookmark a word for the user.
    """
    try:
        user = request.user
        bookmark, created = WordBookmark.objects.get_or_create(user=user, word=word)
        if not created:
            return Response({"error": "Word already bookmarked"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Word bookmarked successfully"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unbookmark_word(request, word):
    """
    Unbookmark a word for the user.
    """
    try:
        user = request.user
        bookmark = WordBookmark.objects.filter(user=user, word=word).first()
        if not bookmark:
            return Response({"error": "Word not bookmarked"}, status=status.HTTP_400_BAD_REQUEST)

        bookmark.delete()
        return Response({"message": "Word unbookmarked successfully"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookmarked_words(request):
    """
    Get all words bookmarked by the user.
    """
    try:
        user = request.user
        bookmarks = WordBookmark.objects.filter(user=user)
        bookmarked_words = [bookmark.word for bookmark in bookmarks]
        return Response({"bookmarked_words": bookmarked_words}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
    """Get a single Turkish translation for an English word"""
    try:
        try:
            word_obj = Word.objects.get(word=word)
            translation = word_obj.translations.first() 
            if translation:
                return Response(
                    {"word": word, "turkish_translation": translation.translation},
                    status=status.HTTP_200_OK,
                )
        except Word.DoesNotExist:
            pass

        try:
            word_info = lexvo_manager.get_final_info(word)
            turkish_translations = word_info.get("turkish_translations", [])
            
            if turkish_translations:
                translation_text = turkish_translations[0].split('/')[-1] 
                word_obj, _ = Word.objects.get_or_create(word=word)
                Translation.objects.get_or_create(word=word_obj, translation=translation_text)
                
                return Response(
                    {"word": word, "turkish_translation": translation_text},
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": f"No Turkish translation found for '{word}'"},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"error": f"Error fetching data for word '{word}': {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    except Exception as e:
        return Response(
            {"error": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

@api_view(['GET'])
def get_word_meanings(request, word):
    try:
        word_instance = Word.objects.filter(word=word).first()

        if word_instance:
            if not word_instance.meaning or word_instance.meaning == "Meaning not available":
                return fetch_and_update_word_meaning(word_instance, word)

            meaning = extract_single_meaning(word_instance.meaning)
            return Response({"word": word_instance.word, "meaning": meaning}, status=status.HTTP_200_OK)

        word_instance = Word.objects.create(
            word=word,
            meaning="Meaning not available",
            sentence="",
            level="",
            part_of_speech=""
        )
        return fetch_and_update_word_meaning(word_instance, word)

    except Exception as e:
        return Response(
            {"error": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    

def extract_single_meaning(meaning_data):
    try:
        if isinstance(meaning_data, str):
            try:
                evaluated_data = eval(meaning_data)
                if isinstance(evaluated_data, list):
                    meaning_data = evaluated_data
            except:
                definitions = meaning_data.split(';')
                return clean_definition(definitions[0]) if definitions else "Meaning not available"
        if isinstance(meaning_data, list):
            return clean_definition(meaning_data[0]) if meaning_data else "Meaning not available"
        return clean_definition(str(meaning_data))

    except Exception:
        return "Meaning not available"

def clean_definition(definition):
    if not definition:
        return "Meaning not available"
    cleaned = definition.strip().rstrip(',')
    return cleaned if cleaned else "Meaning not available"

@api_view(['GET'])
def fetch_english_words(request, turkish_word):
    """Get a single English translation for a Turkish word"""
    try:
        translation = Translation.objects.filter(translation=turkish_word).select_related('word').first()

        if translation:
            return Response(
                {"turkish_word": turkish_word, "english_word": translation.word.word},
                status=status.HTTP_200_OK
            )
        try:
            word_info = get_english_words_from_lexvo(turkish_word)
            english_words = word_info.get("english_words", [])

            if english_words:
                english_word = english_words[0] 
                
                word_instance, created = Word.objects.get_or_create(
                    word=english_word,
                    defaults={
                        "meaning": "Meaning not fetched",
                        "sentence": "Sentence not fetched",
                        "level": "Unknown",
                        "part_of_speech": "Unknown",
                    }
                )
                Translation.objects.create(
                    word=word_instance,
                    translation=turkish_word
                )

                return Response(
                    {"turkish_word": turkish_word, "english_word": english_word},
                    status=status.HTTP_200_OK
                )

            return Response(
                {"error": f"No English translation found for '{turkish_word}'"},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"error": f"Error fetching data from Lexvo for '{turkish_word}': {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    except Exception as e:
        return Response(
            {"error": f"An unexpected error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def get_english_words_from_lexvo(turkish_word):
    """
    Fetch English equivalents of a Turkish word from Lexvo API.
    """
    response = requests.get(f"https://api.lexvo.org/v1/translate?word={turkish_word}&language=tr")

    if response.status_code != 200:
        raise Exception(f"Lexvo API request failed with status code {response.status_code}")

    data = response.json()

    return {"english_words": data.get("english_words", [])}


def fetch_and_update_word_meaning(word_instance, word):
    try:
        word_info = lexvo_manager.get_final_info(word)
    except Exception as e:
        return Response(
            {"error": f"Error fetching meaning for word '{word}': {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    meaning = word_info.get("meaning", "Meaning not available")
    word_instance.meaning = meaning
    word_instance.save()

    return Response({"word": word_instance.word, "meanings": word_instance.meaning}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_word_details(request, word):
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