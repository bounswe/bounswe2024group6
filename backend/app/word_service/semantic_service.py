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

    def generate_quiz_question(self, word, quiz_type, correct_answer=None):
        word = word.lower()
        if correct_answer:
            correct_answer = correct_answer.lower()
            
        if quiz_type == 'EN_TO_MEANING':
            return self._generate_meaning_choices(word, correct_answer)
        elif quiz_type == 'EN_TO_TR':
            return self._generate_turkish_translation_choices(word, correct_answer)
        else:
            return self._generate_english_translation_choices(word, correct_answer)

    def _generate_turkish_translation_choices(self, word, correct_translation=None):
        word_obj = Word.objects.filter(word__iexact=word).first()
        
        if correct_translation:
            if word_obj:
                translation = Translation.objects.filter(
                    word=word_obj,
                    translation__iexact=correct_translation
                ).first()
                
                if not translation:
                    Translation.objects.create(
                        word=word_obj,
                        translation=correct_translation.lower()
                    )
            else:
                word_obj = Word.objects.create(
                    word=word,
                    meaning="Meaning not fetched",
                    sentence="",
                    level="A1",
                    part_of_speech=""
                )
                Translation.objects.create(
                    word=word_obj,
                    translation=correct_translation.lower()
                )

        if not correct_translation:
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
            
            if not word_obj or not word_obj.translations.exists():
                return self._fallback_choices(word)
            
            correct_translation = word_obj.translations.first().translation.lower()

        wrong_translations = []
        synsets = wordnet.synsets(word)
        if synsets:
            main_synset = synsets[0]
            related_words = set()
            
            for synset in synsets:
                related_words.update(lemma.name().lower() for lemma in synset.lemmas())
                for hypernym in synset.hypernyms():
                    related_words.update(lemma.name().lower() for lemma in hypernym.lemmas())
                for hyponym in synset.hyponyms():
                    related_words.update(lemma.name().lower() for lemma in hyponym.lemmas())
            for related_word in related_words:
                if len(wrong_translations) >= 3:
                    break
                    
                related_word_obj = Word.objects.filter(word__iexact=related_word).first()
                if related_word_obj:
                    translation = Translation.objects.filter(word=related_word_obj).first()
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

    def _generate_english_translation_choices(self, word, correct_answer=None):
        """
        Generate English translation choices with optional correct answer
        Args:
            word: Turkish word to translate
            correct_answer: Optional specific English translation to use
        """
        try:
            translation = Translation.objects.filter(translation__iexact=word).first()
            correct_english = correct_answer
            
        
            if correct_english:
                if translation:
                    if translation.word.word.lower() != correct_english:
                        word_obj = Word.objects.create(
                            word=correct_english,
                            meaning="Meaning not fetched",
                            sentence="",
                            level="A1",
                            part_of_speech=""
                        )
                        translation = Translation.objects.create(
                            word=word_obj,
                            translation=word.lower()
                        )
                else:
                    word_obj = Word.objects.create(
                        word=correct_english,
                        meaning="Meaning not fetched",
                        sentence="",
                        level="A1",
                        part_of_speech=""
                    )
                    translation = Translation.objects.create(
                        word=word_obj,
                        translation=word.lower()
                    )
            
            if not correct_english:
                if not translation:
                    english_word = self._try_mymemory_translate_tr_to_en(word)
                    if english_word:
                        word_obj = Word.objects.create(
                            word=english_word,
                            meaning="Meaning not fetched",
                            sentence="",
                            level="A1",
                            part_of_speech=""
                        )
                        translation = Translation.objects.create(
                            word=word_obj,
                            translation=word.lower()
                        )
                        correct_english = english_word.lower()
                    else:
                        return self._fallback_choices(word)
                else:
                    correct_english = translation.word.word.lower()

            wrong_translations = []
            synsets = wordnet.synsets(correct_english)
            if synsets:
                main_synset = synsets[0]
                related_words = set()
                
                for synset in synsets:
                    related_words.update(lemma.name().lower() for lemma in synset.lemmas())
                    for hypernym in synset.hypernyms():
                        related_words.update(lemma.name().lower() for lemma in hypernym.lemmas())
                    for hyponym in synset.hyponyms():
                        related_words.update(lemma.name().lower() for lemma in hyponym.lemmas())

                for related_word in related_words:
                    if len(wrong_translations) >= 3:
                        break
                    if related_word != correct_english and '_' not in related_word and ' ' not in related_word:
                        wrong_translations.append(related_word)

            while len(wrong_translations) < 3:
                if synsets:
                    random_synset = random.choice(synsets)
                    random_lemma = random.choice(random_synset.lemmas())
                    word_text = random_lemma.name().lower()
                    if (word_text != correct_english and 
                        word_text not in wrong_translations and 
                        '_' not in word_text and 
                        ' ' not in word_text):
                        wrong_translations.append(word_text)
                else:
                    backup_word = Word.objects.filter(
                        part_of_speech=translation.word.part_of_speech
                    ).exclude(
                        word__iexact=correct_english
                    ).order_by('?').first()
                    
                    if backup_word:
                        word_text = backup_word.word.lower()
                        if word_text not in wrong_translations:
                            wrong_translations.append(word_text)

            wrong_translations = wrong_translations[:3]
            all_choices = wrong_translations + [correct_english]
            random.shuffle(all_choices)

            return {
                'word': word,
                'correct_answer': correct_english,
                'options': all_choices
            }
        except Exception as e:
            print(f"Error in generate_english_translation_choices: {str(e)}")
            raise

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

    def _generate_meaning_choices(self, word, correct_answer=None):
        def _contains_word(definition, word):
            word_parts = word.lower().split()
            def_parts = definition.lower().split()
            return any(any(word_part in def_part for def_part in def_parts) for word_part in word_parts)

        word_obj = Word.objects.filter(word__iexact=word).first()
        
        if correct_answer:
            if _contains_word(correct_answer, word):
                return self._fallback_choices(word)
                
            if word_obj:
                if self._clean_definition(word_obj.meaning) != correct_answer:
                    word_obj = Word.objects.create(
                        word=word,
                        meaning=correct_answer,
                        sentence="",
                        level="A1",
                        part_of_speech=""
                    )
            else:
                word_obj = Word.objects.create(
                    word=word,
                    meaning=correct_answer,
                    sentence="",
                    level="A1",
                    part_of_speech=""
                )
            correct_meaning = self._clean_definition(correct_answer)
        else:
            if not word_obj or not word_obj.meaning or word_obj.meaning == "Meaning not available":
                return self._fallback_choices(word)
            correct_meaning = self._clean_definition(word_obj.meaning)
            if _contains_word(correct_meaning, word):
                return self._fallback_choices(word)

        wrong_meanings = set()
        
        synsets = wordnet.synsets(word)
        if synsets:
            main_synset = synsets[0]
            pos = main_synset.pos()
            related_synsets = set()
            
            for synset in synsets:
                related_synsets.update(synset.hypernyms())
                related_synsets.update(synset.hyponyms())
                for hypernym in synset.hypernyms():
                    related_synsets.update(hypernym.hyponyms())
                if pos == wordnet.VERB:
                    related_synsets.update(synset.entailments())
                if pos == wordnet.ADJ:
                    related_synsets.update(synset.similar_tos())

            for synset in related_synsets:
                if len(wrong_meanings) >= 3:
                    break
                cleaned_def = self._clean_definition(synset.definition())
                if (cleaned_def and 
                    cleaned_def != correct_meaning and 
                    not _contains_word(cleaned_def, word)):  
                    similarity = synset.path_similarity(main_synset)
                    if similarity and similarity > 0.2:
                        wrong_meanings.add(cleaned_def)

        if len(wrong_meanings) < 3:
            similar_words = self._get_similar_level_pos_words(word_obj, {word_obj.word})
            for similar_word in similar_words:
                if len(wrong_meanings) >= 3:
                    break
                
                similar_synsets = wordnet.synsets(similar_word.word)
                if similar_synsets and synsets:
                    similarity = similar_synsets[0].path_similarity(synsets[0])
                    if similarity and similarity > 0.2:
                        cleaned_def = self._clean_definition(similar_word.meaning)
                        if (cleaned_def and 
                            cleaned_def != correct_meaning and 
                            not _contains_word(cleaned_def, word)):  
                            wrong_meanings.add(cleaned_def)

        if len(wrong_meanings) < 3:
            backup_words = Word.objects.filter(
                part_of_speech=word_obj.part_of_speech
            ).exclude(
                word__iexact=word
            ).exclude(
                meaning="Meaning not available"
            ).order_by('?')[:20]  

            for backup_word in backup_words:
                if len(wrong_meanings) >= 3:
                    break
                    
                if backup_word.meaning:
                    backup_synsets = wordnet.synsets(backup_word.word)
                    if backup_synsets and synsets:
                        similarity = backup_synsets[0].path_similarity(synsets[0])
                        if similarity and similarity > 0.2:
                            cleaned_def = self._clean_definition(backup_word.meaning)
                            if (cleaned_def and 
                                cleaned_def != correct_meaning and 
                                not _contains_word(cleaned_def, word)):  
                                wrong_meanings.add(cleaned_def)

        wrong_meanings = list(wrong_meanings)[:3]
        attempts = 0
        while len(wrong_meanings) < 3 and attempts < 20: 
            if synsets:
                random_synset = random.choice(list(wordnet.all_synsets(pos=pos)))
                cleaned_def = self._clean_definition(random_synset.definition())
                if (cleaned_def and 
                    cleaned_def != correct_meaning and 
                    cleaned_def not in wrong_meanings and 
                    not _contains_word(cleaned_def, word)): 
                    wrong_meanings.append(cleaned_def)
            attempts += 1

        all_choices = wrong_meanings + [correct_meaning]
        random.shuffle(all_choices)

        return {
            'word': word,
            'correct_answer': correct_meaning,
            'options': all_choices
        }