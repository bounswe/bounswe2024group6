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
    def __init__(self, num_options=4):
        self.num_options = num_options
        # Download required NLTK data
        nltk.download('wordnet')
        nltk.download('words')
        nltk.download('punkt_tab')
        

    def generate_quiz_question(self, word, quiz_type):
        if quiz_type == 'EN_TO_MEANING':
            return self._generate_meaning_choices(word)
        elif quiz_type == 'EN_TO_TR':
            return self._generate_turkish_translation_choices(word)
        else:  # TR_TO_EN
            return self._generate_english_translation_choices(word)


    def _generate_meaning_choices(self, word):
        """
        Generate meaning-based choices using WordNet and database
        """
        word_obj = Word.objects.filter(word=word).first()
        if word_obj and word_obj.meaning and word_obj.meaning != "Meaning not available":
            correct_meaning = word_obj.meaning
            
            related_meanings = Word.objects.exclude(
                id=word_obj.id
            ).exclude(
                meaning="Meaning not available"
            ).values_list('meaning', flat=True).distinct()[:self.num_options-1]
            
            choices = list(related_meanings)
            choices.append(correct_meaning)
            random.shuffle(choices)
            
            return {
                'word': word,
                'correct_answer': correct_meaning,
                'options': choices[:self.num_options]
            }
        
        synsets = wordnet.synsets(word)
        if not synsets:
            return self._fallback_choices(word)

        choices = set()
        choices.add(synsets[0].definition()) 

        for synset in synsets:
            for hypernym in synset.hypernyms():
                choices.add(hypernym.definition())
    
            for hyponym in synset.hyponyms():
                choices.add(hyponym.definition())
                
            for hypernym in synset.hypernyms():
                for sibling in hypernym.hyponyms():
                    choices.add(sibling.definition())

        choices = list(choices)
        if len(choices) < self.num_options:
            additional = self._get_related_word_definitions(word, self.num_options - len(choices))
            choices.extend(additional)

        random.shuffle(choices)
        return {
            'word': word,
            'correct_answer': synsets[0].definition(),
            'options': choices[:self.num_options]
        }
    

    def _get_related_word_definitions(self, word, num_needed):
        """
        Get definitions of words that are related but not exactly synonymous
        """
        related_defs = set()
        synsets = wordnet.synsets(word)
        
        if synsets:
            for synset in synsets:
                for domain in synset.topic_domains() + synset.region_domains() + synset.usage_domains():
                    related_defs.add(domain.definition())
                for lemma in synset.lemmas():
                    for related_lemma in lemma.derivationally_related_forms():
                        related_synset = related_lemma.synset()
                        related_defs.add(related_synset.definition())

        return list(related_defs)[:num_needed]

    def _get_phonetic_matches(self, word, num_needed):
        """
        Get words that sound similar using metaphone algorithm
        """
        from nltk.metrics import distance
        word_list = nltk_words.words()
        phonetic_matches = []
        
        # Get words with similar metaphone encoding
        for other_word in word_list:
            if len(other_word) > 2:  # Skip very short words
                if distance.edit_distance(word, other_word) <= 3:  # Limit edit distance
                    phonetic_matches.append(other_word)
                    
        return random.sample(phonetic_matches, min(num_needed, len(phonetic_matches)))

    def _fallback_choices(self, word):
        """
        Generate fallback choices when no semantic relationships are found
        """
        word_list = nltk_words.words()
        choices = set([word])
        
        # Get words of similar length
        similar_length_words = [w for w in word_list if abs(len(w) - len(word)) <= 2]
        if similar_length_words:
            choices.update(random.sample(similar_length_words, min(self.num_options - 1, len(similar_length_words))))
            
        choices = list(choices)
        random.shuffle(choices)
        
        return {
            'correct_answer': word,
            'options': choices[:self.num_options]
        }
    
    def _get_translation_from_apis(self, word):
        """
        Try multiple translation APIs to get Turkish translation
        """

        translation = self._try_mymemory_translate(word)
        if translation:
            return translation

        return None
    

    def _try_mymemory_translate(self, word):
        """
        Try MyMemory Translation API (free and doesn't require authentication)
        """
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
                    return data['responseData']['translatedText']

        except Exception as e:
            print(f"MyMemory API error: {e}")
        return None
    

    def _generate_turkish_translation_choices(self, word):
        """
        Generate Turkish translation choices, trying multiple translation services
        if the word is not in database
        """
        # First try database
        word_obj = Word.objects.filter(word=word).first()
        if not word_obj or not word_obj.translations.exists():
            # If not in database, try translation APIs
            translation_text = self._get_translation_from_apis(word)
            if translation_text:
                word_obj, _ = Word.objects.get_or_create(
                    word=word,
                    defaults={
                        "meaning": "Meaning not fetched",
                        "sentence": "",
                        "level": "A1",  # Default level
                        "part_of_speech": ""
                    }
                )
                Translation.objects.get_or_create(
                    word=word_obj,
                    translation=translation_text
                )

        word_obj = Word.objects.filter(word=word).first()
        if word_obj and word_obj.translations.exists():
            correct_translation = word_obj.translations.first().translation
        else:
            return self._fallback_choices(word)

        synsets = wordnet.synsets(word)
        similar_words = set([word]) 
        if synsets:
            for synset in synsets:
                similar_words.update([lemma.name() for lemma in synset.lemmas()])
                
                for hypernym in synset.hypernyms():
                    similar_words.update([lemma.name() for lemma in hypernym.lemmas()])
            
                for hyponym in synset.hyponyms():
                    similar_words.update([lemma.name() for lemma in hyponym.lemmas()])

        choices = set([correct_translation])
        for similar_word in similar_words:
            translations = Translation.objects.filter(
                word__word=similar_word
            ).values_list('translation', flat=True)
            choices.update(translations)

            if len(choices) < self.num_options:
                new_translation = self._get_translation_from_apis(similar_word)
                if new_translation:
                    choices.add(new_translation)

        if len(choices) < self.num_options:
            # Get translations from words with same part of speech
            if word_obj.part_of_speech:
                similar_translations = Translation.objects.filter(
                    word__part_of_speech=word_obj.part_of_speech
                ).exclude(
                    translation=correct_translation
                ).values_list('translation', flat=True).distinct()[:10]
                choices.update(similar_translations)
            
            # If still not enough, get more translations from the database
            if len(choices) < self.num_options:
                additional_translations = Translation.objects.exclude(
                    translation__in=choices
                ).order_by('?')[:self.num_options - len(choices)]
                choices.update([t.translation for t in additional_translations])

        choices = list(set([choice for choice in choices if isinstance(choice, str)]))
        if correct_translation not in choices:
            choices.append(correct_translation)
        
        random.shuffle(choices)

        # Ensure exactly num_options choices
        while len(choices) < self.num_options:
            additional_translation = self._get_translation_from_apis(
                random.choice(list(similar_words))
            )
            if additional_translation and additional_translation not in choices:
                choices.append(additional_translation)

        choices = choices[:self.num_options]

        return {
            'word': word,
            'correct_answer': correct_translation,
            'options': choices
        }

    def _try_mymemory_translate_tr_to_en(self, word):
        """
        Try MyMemory Translation API for Turkish to English
        """
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
                    return data['responseData']['translatedText']

        except Exception as e:
            print(f"MyMemory API error: {e}")
        return None

    def _generate_english_translation_choices(self, turkish_word):
        """
        Generate English translation choices by first finding the English word,
        then using WordNet to find semantically similar words
        """
        # First try database
        translation = Translation.objects.filter(translation=turkish_word).select_related('word').first()
        if not translation:
            # If not in database, try translation APIs
            english_word = self._try_mymemory_translate_tr_to_en(turkish_word)
            if english_word:
                word_obj, _ = Word.objects.get_or_create(
                    word=english_word,
                    defaults={
                        "meaning": "Meaning not fetched",
                        "sentence": "",
                        "level": "A1",
                        "part_of_speech": ""
                    }
                )
                translation = Translation.objects.create(
                    word=word_obj,
                    translation=turkish_word
                )

        if not translation:
            return self._fallback_choices(turkish_word)

        word_obj = translation.word
        correct_word = word_obj.word

        # Get semantically similar words using WordNet
        synsets = wordnet.synsets(correct_word)
        choices = set([correct_word])

        if synsets:
            for synset in synsets:
                # Add synonyms
                choices.update([lemma.name() for lemma in synset.lemmas()])
                
                # Add words from similar concepts
                for hypernym in synset.hypernyms():
                    choices.update([lemma.name() for lemma in hypernym.lemmas()])
                for hyponym in synset.hyponyms():
                    choices.update([lemma.name() for lemma in hyponym.lemmas()])

                # Add more related words if needed
                if len(choices) < self.num_options:
                    # Add words with similar meaning
                    for similar in synset.similar_tos():
                        choices.update([lemma.name() for lemma in similar.lemmas()])
                    
                    # Add words that are used in the same way
                    for usage in synset.usage_domains():
                        for lemma in usage.lemmas():
                            choices.add(lemma.name())

        # Ensure we have enough choices
        if len(choices) < self.num_options:
            # Get words with similar part of speech
            if word_obj.part_of_speech:
                same_pos_words = Word.objects.filter(
                    part_of_speech=word_obj.part_of_speech
                ).exclude(
                    word=correct_word
                ).values_list('word', flat=True)[:10]
                choices.update(same_pos_words)
            
            # If still not enough, get words from WordNet with similar length
            if len(choices) < self.num_options:
                for synset in wordnet.synsets(correct_word)[:5]:
                    choices.update([lemma.name() for lemma in synset.lemmas() 
                                if abs(len(lemma.name()) - len(correct_word)) <= 3])

        # Convert to list and ensure minimum number of options
        choices = list(choices)
        if len(choices) < self.num_options:
            additional_words = Word.objects.exclude(
                word__in=choices
            ).order_by('?')[:self.num_options - len(choices)]
            choices.extend([w.word for w in additional_words])

        choices = list(set([choice.lower() for choice in choices if isinstance(choice, str)]))
        if correct_word.lower() not in choices:
            choices.append(correct_word.lower())
        
        random.shuffle(choices)

        # Ensure we have exactly num_options choices
        if len(choices) < self.num_options:
            word_list = nltk_words.words()
            additional = random.sample([w for w in word_list if w not in choices], 
                                    self.num_options - len(choices))
            choices.extend(additional)
        
        choices = choices[:self.num_options]

        return {
            'word': turkish_word,
            'correct_answer': correct_word,
            'options': choices
        }