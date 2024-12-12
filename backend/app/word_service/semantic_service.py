# semantic_service.py
import sys
import os
sys.path.append("/app")  # Add the Django project root to Python path
from app.models import Word, Translation

import nltk
from nltk.corpus import wordnet
from nltk.corpus import words as nltk_words 
from difflib import get_close_matches
import random
import requests

class SemanticChoiceGenerator:
    def __init__(self):
        self.num_options = 4
        nltk.download('wordnet')
        nltk.download('words')
        nltk.download('punkt_tab')

    def generate_quiz_question(self, word, quiz_type):
        if quiz_type == 'EN_TO_MEANING':
            return self._generate_meaning_choices(word.lower())
        elif quiz_type == 'EN_TO_TR':
            return self._generate_turkish_translation_choices(word.lower())
        else:
            return self._generate_english_translation_choices(word.lower())

    def _clean_definition(self, definition):
        if not definition:
            return ""
        definition = definition.lower()
        if ";" in definition:
            definition = definition.split(";")[0]
        return definition.strip()

    def _get_similar_level_pos_words(self, word_obj, exclude_words=None):
        if exclude_words is None:
            exclude_words = set()
        
        similar_words = Word.objects.filter(
            level=word_obj.level,
            part_of_speech=word_obj.part_of_speech
        ).exclude(
            word__in=exclude_words
        ).exclude(
            meaning="Meaning not available"
        ).distinct()
        
        return similar_words

    def _generate_meaning_choices(self, word):
        word_obj = Word.objects.filter(word__iexact=word).first()
        if not word_obj or not word_obj.meaning or word_obj.meaning == "Meaning not available":
            return self._fallback_choices(word)

        correct_meaning = self._clean_definition(word_obj.meaning)
        wrong_meanings = []
        exclude_words = {word_obj.word}

        similar_words = self._get_similar_level_pos_words(word_obj, exclude_words)
        
        for similar_word in similar_words:
            if len(wrong_meanings) >= 3:
                break
                
            cleaned_meaning = self._clean_definition(similar_word.meaning)
            if cleaned_meaning and cleaned_meaning != correct_meaning:
                wrong_meanings.append(cleaned_meaning)
                exclude_words.add(similar_word.word)

        while len(wrong_meanings) < 3:
            backup_words = Word.objects.filter(
                part_of_speech=word_obj.part_of_speech
            ).exclude(
                word__in=exclude_words
            ).exclude(
                meaning="Meaning not available"
            ).order_by('?')[:1]
            
            if not backup_words:
                break
                
            backup_word = backup_words[0]
            cleaned_meaning = self._clean_definition(backup_word.meaning)
            if cleaned_meaning and cleaned_meaning != correct_meaning:
                wrong_meanings.append(cleaned_meaning)
                exclude_words.add(backup_word.word)

        if len(wrong_meanings) < 3:
            synsets = wordnet.synsets(word, pos=self._get_wordnet_pos(word_obj.part_of_speech))
            for synset in synsets:
                if len(wrong_meanings) >= 3:
                    break
                    
                for lemma in synset.lemmas():
                    related_synsets = wordnet.synsets(lemma.name(), pos=self._get_wordnet_pos(word_obj.part_of_speech))
                    if related_synsets:
                        cleaned_def = self._clean_definition(related_synsets[0].definition())
                        if cleaned_def and cleaned_def != correct_meaning and cleaned_def not in wrong_meanings:
                            wrong_meanings.append(cleaned_def)

        wrong_meanings = wrong_meanings[:3]
        all_choices = wrong_meanings + [correct_meaning]
        random.shuffle(all_choices)

        return {
            'word': word,
            'correct_answer': correct_meaning,
            'options': all_choices
        }

    def _get_wordnet_pos(self, pos):
        pos_map = {
            'NOUN': wordnet.NOUN,
            'VERB': wordnet.VERB,
            'ADJ': wordnet.ADJ,
            'ADV': wordnet.ADV
        }
        return pos_map.get(pos.upper())

    def _fallback_choices(self, word):
        synsets = wordnet.synsets(word)
        if not synsets:
            return {
                'word': word,
                'correct_answer': word,
                'options': [word] + random.sample(nltk_words.words(), 3)
            }
        
        correct_def = self._clean_definition(synsets[0].definition())
        pos = synsets[0].pos()
        
        wrong_defs = set()
        for synset in wordnet.all_synsets(pos=pos):
            if len(wrong_defs) >= 3:
                break
            cleaned_def = self._clean_definition(synset.definition())
            if cleaned_def and cleaned_def != correct_def:
                wrong_defs.add(cleaned_def)
        
        wrong_defs = list(wrong_defs)[:3]
        all_choices = wrong_defs + [correct_def]
        random.shuffle(all_choices)
        
        return {
            'word': word,
            'correct_answer': correct_def,
            'options': all_choices
        }

    def _generate_turkish_translation_choices(self, word):
        word_obj = Word.objects.filter(word__iexact=word).first()
        if not word_obj or not word_obj.translations.exists():
            translation_text = self._get_translation_from_apis(word)
            if translation_text:
                word_obj, _ = Word.objects.get_or_create(
                    word=word,
                    defaults={
                        "meaning": "Meaning not fetched",
                        "sentence": "",
                        "level": "A1",
                        "part_of_speech": ""
                    }
                )
                Translation.objects.get_or_create(
                    word=word_obj,
                    translation=translation_text.lower()
                )

        word_obj = Word.objects.filter(word__iexact=word).first()
        if not word_obj or not word_obj.translations.exists():
            return self._fallback_choices(word)

        correct_translation = word_obj.translations.first().translation.lower()
        wrong_translations = []

        similar_words = self._get_similar_level_pos_words(word_obj, {word_obj.word})
        for similar_word in similar_words:
            if len(wrong_translations) >= 3:
                break
                
            translation = Translation.objects.filter(word=similar_word).first()
            if translation and translation.translation.lower() != correct_translation:
                wrong_translations.append(translation.translation.lower())

        while len(wrong_translations) < 3:
            backup_translation = Translation.objects.filter(
                word__part_of_speech=word_obj.part_of_speech
            ).exclude(
                translation__iexact=correct_translation
            ).order_by('?').first()
            
            if backup_translation:
                trans_text = backup_translation.translation.lower()
                if trans_text not in wrong_translations:
                    wrong_translations.append(trans_text)

        wrong_translations = wrong_translations[:3]
        all_choices = wrong_translations + [correct_translation]
        random.shuffle(all_choices)

        return {
            'word': word,
            'correct_answer': correct_translation,
            'options': all_choices
        }

    def _get_translation_from_apis(self, word):
        translation = self._try_mymemory_translate(word)
        if translation:
            return translation.lower()
        return None

    def _try_mymemory_translate(self, word):
        try:
            url = f"https://api.mymemory.translated.net/get"
            params = {
                'q': word,
                'langpair': 'en|tr'
            }
            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                if data['responseStatus'] == 200:
                    return data['responseData']['translatedText'].lower()
        except Exception as e:
            print(f"MyMemory API error: {e}")
        return None

    def _try_mymemory_translate_tr_to_en(self, word):
        try:
            url = f"https://api.mymemory.translated.net/get"
            params = {
                'q': word,
                'langpair': 'tr|en'
            }
            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                if data['responseStatus'] == 200:
                    return data['responseData']['translatedText'].lower()
        except Exception as e:
            print(f"MyMemory API error: {e}")
        return None


