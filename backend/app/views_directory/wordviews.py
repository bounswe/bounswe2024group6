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
from ..models import Quiz, Relationship, Word, Translation, WordChoices
from ..word_service import lexvo_manager
import requests
import nltk
from nltk.corpus import wordnet
from typing import List, Dict, Optional
import random
from django.core.cache import cache
import os

import nltk

# Add this before your view functions
nltk.download('wordnet')
nltk.download('omw-1.4')



def get_related_words(word: str, num_choices: int = 3):

    related_words = set()
    synsets = wordnet.synsets(word)
    if synsets:
        synset = synsets[0]
        # Get words from same category
        if synset.hypernyms():
            for hyponym in synset.hypernyms()[0].hyponyms():
                related_words.update(lemma.name() for lemma in hyponym.lemmas())

        for similar in synset.similar_tos():
            related_words.update(lemma.name() for lemma in similar.lemmas())

    related_words = {w for w in related_words if '_' not in w and w != word}
    return list(related_words)[:num_choices]

@api_view(['GET'])
def get_english_to_turkish_choices(request, word):
    cache_key = f'en_tr_choices_{word}'
    cached_result = cache.get(cache_key)
    if cached_result:
        return Response(cached_result)
    
    try:
        word_obj = Word.objects.filter(word=word).first()
        correct_translation = None

        if word_obj:
            translation = word_obj.translations.first()
            if translation:
                correct_translation = translation.translation

        if not correct_translation:
            word_info = lexvo_manager.get_final_info(word)
            turkish_translations = word_info.get("turkish_translations", [])
            if turkish_translations:
                correct_translation = turkish_translations[0].split('/')[-1]

        if not correct_translation:
            return Response(
                {'error': 'Translation not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        related_words = get_related_words(word)
        wrong_choices = []

        for related_word in related_words:
            related_obj = Word.objects.filter(word=related_word).first()
            if related_obj and related_obj.translations.first():
                wrong_choices.append(related_obj.translations.first().translation)
            else:
                try:
                    related_info = lexvo_manager.get_final_info(related_word)
                    if related_info.get("turkish_translations"):
                        wrong_choices.append(related_info["turkish_translations"][0].split('/')[-1])
                except:
                    continue

        while len(wrong_choices) < 3:
            random_translation = Translation.objects.order_by('?').first()
            if random_translation and random_translation.translation != correct_translation:
                wrong_choices.append(random_translation.translation)

        choices = wrong_choices[:3] + [correct_translation]
        random.shuffle(choices)

        result = {
            'word': word,
            'correct_answer': correct_translation,
            'choices': choices
        }

        cache.set(cache_key, result, 3600)
        return Response(result)

    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@api_view(['GET'])
def get_turkish_to_english_choices(request, word):
    """Generate multiple choices for Turkish to English translation"""
    cache_key = f'tr_en_choices_{word}'
    cached_result = cache.get(cache_key)
    if cached_result:
        return Response(cached_result)

    try:
        # Get correct English translation
        translation = Translation.objects.filter(translation=word).select_related('word').first()
        correct_word = None

        if translation:
            correct_word = translation.word.word
        else:
            try:
                word_info = lexvo_manager.get_final_info(word)
                english_words = word_info.get("english_words", [])
                if english_words:
                    correct_word = english_words[0]
            except:
                pass

        if not correct_word:
            return Response(
                {'error': 'Translation not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        wrong_choices = set()
        
        # Get the word's synsets
        synsets = wordnet.synsets(correct_word)
        
        if synsets:
            # If it's an adverb (like 'maybe')
            for synset in synsets:
                if synset.pos() == wordnet.ADV:  # If it's an adverb
                    # Get similar adverbs
                    for similar in synset.similar_tos():
                        for lemma in similar.lemmas():
                            name = lemma.name()
                            if (name != correct_word and 
                                '_' not in name and 
                                ' ' not in name and
                                len(name) > 2 and  # Avoid very short words
                                name.isalpha()):   # Only alphabetic words
                                wrong_choices.add(name)
                    
                    # Get also_sees relationships
                    for related in synset.also_sees():
                        for lemma in related.lemmas():
                            name = lemma.name()
                            if (name != correct_word and 
                                '_' not in name and 
                                ' ' not in name and
                                len(name) > 2 and
                                name.isalpha()):
                                wrong_choices.add(name)

        # If we still don't have enough choices, add common adverbs
        if len(wrong_choices) < 3:
            common_adverbs = {
                'maybe': ['probably', 'possibly', 'perhaps', 'sometimes', 'usually'],
                'now': ['soon', 'today', 'already', 'currently', 'presently'],
                'good': ['well', 'nicely', 'properly', 'right', 'correctly']
            }
            
            # Get adverb synsets
            adverb_synsets = wordnet.synsets('probably', pos=wordnet.ADV)
            for synset in adverb_synsets:
                for lemma in synset.lemmas():
                    name = lemma.name()
                    if (name != correct_word and 
                        '_' not in name and 
                        ' ' not in name and
                        len(name) > 2 and
                        name.isalpha()):
                        wrong_choices.add(name)

        # Ensure choices are appropriate words
        wrong_choices = {word for word in wrong_choices 
                        if len(word) > 2 and 
                        word.isalpha() and 
                        not word.isupper()}  # Exclude abbreviations

        # If still not enough choices, get common related words from WordNet
        if len(wrong_choices) < 3:
            for synset in wordnet.all_synsets(pos=wordnet.ADV):
                if len(wrong_choices) >= 5:
                    break
                name = synset.lemmas()[0].name()
                if (name != correct_word and 
                    '_' not in name and 
                    ' ' not in name and
                    len(name) > 2 and
                    name.isalpha() and
                    not name.isupper()):
                    wrong_choices.add(name)

        # Select final choices
        wrong_choices = list(wrong_choices)
        if len(wrong_choices) >= 3:
            final_wrong_choices = random.sample(wrong_choices, 3)
        else:
            if correct_word == 'maybe':
                final_wrong_choices = ['probably', 'perhaps', 'possibly']
            else:
                final_wrong_choices = ['often', 'usually', 'sometimes']

        # Create final choices
        choices = final_wrong_choices + [correct_word]
        random.shuffle(choices)

        result = {
            'word': word,
            'correct_answer': correct_word,
            'choices': choices
        }

        # Cache result for 1 hour
        cache.set(cache_key, result, 3600)
        return Response(result)

    except Exception as e:
        print(f"Error in get_turkish_to_english_choices: {str(e)}")
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
@api_view(['GET'])
def get_english_to_meaning_choices(request, word):
    """Generate multiple choices for English word to meaning"""
    cache_key = f'en_meaning_choices_{word}'
    cached_result = cache.get(cache_key)
    if cached_result:
        return Response(cached_result)

    try:
        word_obj = Word.objects.filter(word=word).first()
        correct_meaning = None

        if word_obj and word_obj.meaning and word_obj.meaning != "Meaning not available":
            if isinstance(word_obj.meaning, list):
                correct_meaning = word_obj.meaning[0]
            elif isinstance(word_obj.meaning, str):
                try:
                    meanings = eval(word_obj.meaning)
                    correct_meaning = meanings[0] if isinstance(meanings, list) else word_obj.meaning
                except:
                    correct_meaning = word_obj.meaning

        if not correct_meaning:
            synsets = wordnet.synsets(word)
            if synsets:
                correct_meaning = synsets[0].definition()

        if not correct_meaning:
            return Response(
                {'error': 'Meaning not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        wrong_choices = []
        related_words = get_related_words(word)

        for related_word in related_words:
            related_obj = Word.objects.filter(word=related_word).first()
            if related_obj and related_obj.meaning and related_obj.meaning != "Meaning not available":
                if isinstance(related_obj.meaning, list):
                    wrong_choices.append(related_obj.meaning[0])
                else:
                    wrong_choices.append(related_obj.meaning)
                continue

            synsets = wordnet.synsets(related_word)
            if synsets:
                wrong_choices.append(synsets[0].definition())

        while len(wrong_choices) < 3:
            random_word = Word.objects.exclude(meaning="Meaning not available").order_by('?').first()
            if random_word and random_word.meaning:
                meaning = random_word.meaning[0] if isinstance(random_word.meaning, list) else random_word.meaning
                if meaning not in wrong_choices and meaning != correct_meaning:
                    wrong_choices.append(meaning)

        choices = wrong_choices[:3] + [correct_meaning]
        random.shuffle(choices)

        result = {
            'word': word,
            'correct_answer': correct_meaning,
            'choices': choices
        }

        cache.set(cache_key, result, 3600)
        return Response(result)

    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


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
    """Get a single meaning for an English word"""
    try:
        word_instance = Word.objects.filter(word=word).first()

        if word_instance:
            if not word_instance.meaning or word_instance.meaning == "Meaning not available":
                return fetch_and_update_word_meaning(word_instance, word)

            if isinstance(word_instance.meaning, list):
                meaning = word_instance.meaning[0]
            elif isinstance(word_instance.meaning, str):
                try:
                    meanings = eval(word_instance.meaning)
                    meaning = meanings[0] if isinstance(meanings, list) else word_instance.meaning
                except:
                    meaning = word_instance.meaning
            else:
                meaning = str(word_instance.meaning)

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