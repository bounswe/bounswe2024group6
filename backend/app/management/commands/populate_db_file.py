import csv
from django.core.management.base import BaseCommand
from  ...models import Word, Translation, Relationship
import re

class Command(BaseCommand):
    help = 'Populate the database with Words, Translations, and Relationships from CSV files'

    def add_arguments(self, parser):
        parser.add_argument('words_csv', type=str, help="Path to the Words CSV file")
        parser.add_argument('translations_csv', type=str, help="Path to the Translations CSV file")
        parser.add_argument('relationships_csv', type=str, help="Path to the Relationships CSV file")

    def handle(self, *args, **kwargs):
        words_csv = kwargs['words_csv']
        translations_csv = kwargs['translations_csv']
        relationships_csv = kwargs['relationships_csv']

        self.stdout.write("Starting to populate the database...")

        try:
            self.populate_words(words_csv)
            self.populate_translations(translations_csv)
            self.populate_relationships(relationships_csv)
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))

    def populate_words(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            word_dict = {}

            for row in reader:
                word_list = word_dict.get(row['word'], list())
                info_dict = {
                        'language': row.get('language', 'eng'),
                        'level': row.get('level'),
                        'part_of_speech': row.get('part_of_speech'),
                        'meaning': row.get('explanation', 'Meaning not available'),
                        'sentence': row.get('sentence', 'Sentence not available')

                }

                word_list.append(info_dict)

                word_dict[row['word']] = word_list


            
            for word in word_dict.keys():
                defaults={
                    'language': '', 
                    'level': '',
                    'part_of_speech': '',
                    'meaning': '',
                    'sentence': ''
                    }
                for key in defaults.keys():
                    parts = [info[key] for info in word_dict[word]]
                    defaults[key] = parts
                    
                

                result = Word.objects.get_or_create(
                    word=word,
                    defaults=defaults
                )

                

    def populate_translations(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Ensure the Word exists, creating it if necessary
                word, created = Word.objects.get_or_create(
                    word=row['word'],
                    defaults={
                        'language': 'eng',  # Default values for missing words
                        'level': 'unknown',
                        'part_of_speech': 'unknown',
                        'meaning': 'Auto-created for missing translation',
                        'sentence': 'No example provided'
                    }
                )

                # Create or get the Translation
                Translation.objects.get_or_create(
                    word=word,
                    translation=row['turkish_translation']
                )




    def populate_relationships(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                try:
                    # Check if related_word is valid (not a number and allows hyphen, apostrophe)
                    related_word = row['related_word']
                    # Allow alphabetic characters, hyphens, and apostrophes in the related word
                    if not re.match(r"^[a-zA-Z-']+$", related_word):
                        self.stderr.write(
                            f"Skipping invalid related word '{related_word}'."
                        )
                        continue

                    # Fetch the word
                    word = Word.objects.get(word=row['word'])

                    # Fetch or create the related word in the Word table
                    related_word_obj, created = Word.objects.get_or_create(
                        word=related_word,
                        defaults={
                            'language': 'eng',  # Default language, or pull from 'word' if needed
                            'level': word.level,  # Use the level of the main word
                            'part_of_speech': word.part_of_speech  # Use the part of speech of the main word
                        }
                    )


                    # Create the relationship in the Relationship table
                    Relationship.objects.get_or_create(
                        word=word,
                        related_word=related_word_obj,
                        defaults={'relation_type': row['relation_type']}
                    )

                except Word.DoesNotExist:
                    self.stderr.write(f"Word '{row['word']}' not found. Skipping relationship.")
        





    


