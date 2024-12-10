
from rest_framework.response import Response
from rest_framework import status
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
import random
from django.core.cache import cache

def get_similar_level_pos_words(word_obj, exclude_words=None, max_words=3):
    """
    Get words with the same level and part of speech for quiz choices.
    
    Args:
        word_obj: Word object to find similar words for
        exclude_words: List of words to exclude from choices
        max_words: Maximum number of words to return
    
    Returns:
        list: Similar words suitable for quiz choices
    """
    if exclude_words is None:
        exclude_words = []
    
    # Ensure word_obj exists
    if not word_obj:
        return []
        
    # Get words with same level and part of speech
    similar_words = Word.objects.filter(
        level=word_obj.level,
        part_of_speech=word_obj.part_of_speech
    ).exclude(
        word__in=[word_obj.word] + exclude_words
    ).values_list('word', flat=True)
    
    # Convert to list and get random sample
    similar_words = list(similar_words)
    if len(similar_words) >= max_words:
        return random.sample(similar_words, max_words)
    
    # If not enough words in same level, try adjacent levels
    cefr_levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    current_level_idx = cefr_levels.index(word_obj.level) if word_obj.level in cefr_levels else 0
    
    adjacent_levels = []
    if current_level_idx > 0:
        adjacent_levels.append(cefr_levels[current_level_idx - 1])
    if current_level_idx < len(cefr_levels) - 1:
        adjacent_levels.append(cefr_levels[current_level_idx + 1])
    
    if adjacent_levels:
        additional_words = Word.objects.filter(
            level__in=adjacent_levels,
            part_of_speech=word_obj.part_of_speech
        ).exclude(
            word__in=[word_obj.word] + exclude_words + similar_words
        ).values_list('word', flat=True)
        
        similar_words.extend(list(additional_words))
        
    return similar_words[:max_words]

@api_view(['GET'])
def get_english_to_turkish_choices(request, word):
    """Generate multiple choices for English to Turkish translation"""
    cache_key = f'en_tr_choices_{word}'
    cached_result = cache.get(cache_key)
    if cached_result:
        return Response(cached_result)
    
    try:
        # Step 1: Get or create word object
        word_obj = Word.objects.filter(word=word).first()
        correct_translation = None

        # Step 2: Get translation from database or Lexvo
        if word_obj and word_obj.translations.exists():
            correct_translation = word_obj.translations.first().translation
        else:
            try:
                word_info = lexvo_manager.get_final_info(word)
                turkish_translations = word_info.get("turkish_translations", [])
                
                if turkish_translations:
                    correct_translation = turkish_translations[0].split('/')[-1]
                    
                    # Create word if it doesn't exist
                    if not word_obj:
                        # Get part of speech from WordNet
                        synsets = wordnet.synsets(word)
                        pos_mapping = {
                            wordnet.NOUN: 'noun',
                            wordnet.VERB: 'verb',
                            wordnet.ADJ: 'adjective',
                            wordnet.ADV: 'adverb'
                        }
                        pos = pos_mapping.get(synsets[0].pos(), 'noun') if synsets else 'noun'
                        
                        word_obj = Word.objects.create(
                            word=word,
                            level='B1',  # Default level
                            part_of_speech=pos
                        )
                    
                    # Create translation
                    Translation.objects.get_or_create(
                        word=word_obj,
                        translation=correct_translation
                    )
            except Exception as e:
                print(f"Lexvo error: {str(e)}")

        if not correct_translation:
            return Response(
                {'error': 'Translation not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Step 3: Get similar words for wrong choices
        wrong_choices = []
        if word_obj:
            similar_words = get_similar_level_pos_words(word_obj)
            
            for similar_word in similar_words:
                similar_obj = Word.objects.filter(word=similar_word).first()
                if similar_obj and similar_obj.translations.exists():
                    wrong_translation = similar_obj.translations.first().translation
                    if wrong_translation != correct_translation:
                        wrong_choices.append(wrong_translation)
                        if len(wrong_choices) >= 3:
                            break

        # Step 4: Fill remaining slots with random translations
        while len(wrong_choices) < 3:
            if word_obj:
                random_translation = Translation.objects.filter(
                    word__level=word_obj.level,
                    word__part_of_speech=word_obj.part_of_speech
                ).exclude(
                    translation__in=[correct_translation] + wrong_choices
                ).order_by('?').first()
            else:
                random_translation = Translation.objects.exclude(
                    translation=correct_translation
                ).order_by('?').first()

            if random_translation and random_translation.translation not in wrong_choices:
                wrong_choices.append(random_translation.translation)

        # Create final choices
        choices = wrong_choices[:3] + [correct_translation]
        random.shuffle(choices)

        result = {
            'word': word,
            'correct_answer': correct_translation,
            'choices': choices,
            'level': word_obj.level if word_obj else 'B1',
            'part_of_speech': word_obj.part_of_speech if word_obj else 'noun'
        }

        cache.set(cache_key, result, 3600)
        return Response(result)

    except Exception as e:
        print(f"Error in get_english_to_turkish_choices: {str(e)}")
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
        # Step 1: Get translation from database
        translation = Translation.objects.filter(translation=word).select_related('word').first()
        word_obj = None
        correct_word = None

        # Step 2: Handle database or Lexvo lookup
        if translation:
            word_obj = translation.word
            correct_word = word_obj.word
        else:
            try:
                word_info = lexvo_manager.get_final_info(word)
                english_words = word_info.get("english_words", [])
                if english_words:
                    correct_word = english_words[0]
                    
                    # Get POS from WordNet
                    synsets = wordnet.synsets(correct_word)
                    pos_mapping = {
                        wordnet.NOUN: 'noun',
                        wordnet.VERB: 'verb',
                        wordnet.ADJ: 'adjective',
                        wordnet.ADV: 'adverb'
                    }
                    pos = pos_mapping.get(synsets[0].pos(), 'noun') if synsets else 'noun'
                    
                    # Create word and translation
                    word_obj = Word.objects.create(
                        word=correct_word,
                        level='B1',  # Default level
                        part_of_speech=pos
                    )
                    Translation.objects.create(
                        word=word_obj,
                        translation=word
                    )
            except Exception as e:
                print(f"Lexvo error: {str(e)}")

        if not correct_word:
            return Response(
                {'error': 'Translation not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Step 3: Get similar words for wrong choices
        wrong_choices = []
        if word_obj:
            similar_words = get_similar_level_pos_words(word_obj)
            wrong_choices = list(similar_words)[:3]

        # Step 4: Fill remaining slots with random words
        while len(wrong_choices) < 3:
            if word_obj:
                random_word = Word.objects.filter(
                    level=word_obj.level,
                    part_of_speech=word_obj.part_of_speech
                ).exclude(
                    word__in=[correct_word] + wrong_choices
                ).order_by('?').values_list('word', flat=True).first()
            else:
                random_word = Word.objects.exclude(
                    word__in=[correct_word] + wrong_choices
                ).order_by('?').values_list('word', flat=True).first()

            if random_word:
                wrong_choices.append(random_word)

        # Create final choices
        choices = wrong_choices[:3] + [correct_word]
        random.shuffle(choices)

        result = {
            'word': word,
            'correct_answer': correct_word,
            'choices': choices,
            'level': word_obj.level if word_obj else 'B1',
            'part_of_speech': word_obj.part_of_speech if word_obj else 'noun'
        }

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
        # Step 1: Get or create word object
        word_obj = Word.objects.filter(word=word).first()
        correct_meaning = None

        # Step 2: Get meaning from database or WordNet
        if word_obj and word_obj.meaning and word_obj.meaning != "Meaning not available":
            if isinstance(word_obj.meaning, list):
                correct_meaning = word_obj.meaning[0]
            elif isinstance(word_obj.meaning, str):
                try:
                    meanings = eval(word_obj.meaning)
                    correct_meaning = meanings[0] if isinstance(meanings, list) else word_obj.meaning
                except:
                    correct_meaning = word_obj.meaning
        else:
            try:
                # Try to get from Lexvo first
                word_info = lexvo_manager.get_final_info(word)
                if word_info.get("meanings"):
                    correct_meaning = word_info["meanings"][0]["label"]
                else:
                    # Fallback to WordNet
                    synsets = wordnet.synsets(word)
                    if synsets:
                        correct_meaning = synsets[0].definition()
                        
                        # Get part of speech from WordNet
                        pos_mapping = {
                            wordnet.NOUN: 'noun',
                            wordnet.VERB: 'verb',
                            wordnet.ADJ: 'adjective',
                            wordnet.ADV: 'adverb'
                        }
                        pos = pos_mapping.get(synsets[0].pos(), 'noun')
                        
                        # Create or update word object
                        if not word_obj:
                            word_obj = Word.objects.create(
                                word=word,
                                meaning=correct_meaning,
                                level='B1',  # Default level
                                part_of_speech=pos
                            )
                        else:
                            word_obj.meaning = correct_meaning
                            word_obj.part_of_speech = pos
                            word_obj.save()

            except Exception as e:
                print(f"Error fetching meaning: {str(e)}")

        if not correct_meaning:
            return Response(
                {'error': 'Meaning not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Step 3: Get similar words for wrong choices
        wrong_choices = []
        if word_obj:
            similar_words = get_similar_level_pos_words(word_obj)
            
            for similar_word in similar_words:
                similar_obj = Word.objects.filter(word=similar_word).first()
                if similar_obj and similar_obj.meaning and similar_obj.meaning != "Meaning not available":
                    if isinstance(similar_obj.meaning, list):
                        wrong_meaning = similar_obj.meaning[0]
                    else:
                        wrong_meaning = similar_obj.meaning
                        
                    if wrong_meaning != correct_meaning:
                        wrong_choices.append(wrong_meaning)
                        if len(wrong_choices) >= 3:
                            break
                else:
                    # Try WordNet for meaning
                    synsets = wordnet.synsets(similar_word)
                    if synsets:
                        wrong_meaning = synsets[0].definition()
                        if wrong_meaning != correct_meaning:
                            wrong_choices.append(wrong_meaning)
                            # Update the database
                            if similar_obj:
                                similar_obj.meaning = wrong_meaning
                                similar_obj.save()

        # Step 4: Fill remaining slots with meanings from the same level/POS
        while len(wrong_choices) < 3:
            if word_obj:
                random_word = Word.objects.filter(
                    level=word_obj.level,
                    part_of_speech=word_obj.part_of_speech
                ).exclude(
                    meaning="Meaning not available"
                ).exclude(
                    word=word
                ).order_by('?').first()
            else:
                random_word = Word.objects.exclude(
                    meaning="Meaning not available"
                ).exclude(
                    word=word
                ).order_by('?').first()

            if random_word and random_word.meaning:
                meaning = random_word.meaning[0] if isinstance(random_word.meaning, list) else random_word.meaning
                if meaning not in wrong_choices and meaning != correct_meaning:
                    wrong_choices.append(meaning)

        # Create final choices
        choices = wrong_choices[:3] + [correct_meaning]
        random.shuffle(choices)

        result = {
            'word': word,
            'correct_answer': correct_meaning,
            'choices': choices,
            'level': word_obj.level if word_obj else 'B1',
            'part_of_speech': word_obj.part_of_speech if word_obj else 'noun'
        }

        cache.set(cache_key, result, 3600)
        return Response(result)

    except Exception as e:
        print(f"Error in get_english_to_meaning_choices: {str(e)}")
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