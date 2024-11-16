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
            self.stdout.write(self.style.SUCCESS("Database populated successfully!"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))

    def populate_words(self, file_path):
        self.stdout.write(f"Loading Words from {file_path}...")
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Word.objects.get_or_create(
                    word=row['word'],
                    defaults={
                        'language': row.get('language', 'eng'),
                        'level': row.get('level'),
                        'part_of_speech': row.get('part_of_speech'),
                        'meaning': row.get('meaning', 'Meaning not available'),
                        'sentence': row.get('sentence', 'Sentence not available')
                    }
                )
        self.stdout.write(self.style.SUCCESS("Words loaded successfully."))

    def populate_translations(self, file_path):
        self.stdout.write(f"Loading Translations from {file_path}...")
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
                if created:
                    self.stdout.write(f"Created missing Word: {row['word']}")

                # Create or get the Translation
                Translation.objects.get_or_create(
                    word=word,
                    translation=row['turkish_translation']
                )
        self.stdout.write(self.style.SUCCESS("Translations loaded successfully."))




    def populate_relationships(self, file_path):
        self.stdout.write(f"Loading Relationships from {file_path}...")
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

                    # If the related word was created, log it
                    if created:
                        self.stdout.write(f"Created missing related word '{related_word}'.")

                    # Create the relationship in the Relationship table
                    Relationship.objects.get_or_create(
                        word=word,
                        related_word=related_word_obj,
                        defaults={'relation_type': row['relation_type']}
                    )

                except Word.DoesNotExist:
                    self.stderr.write(f"Word '{row['word']}' not found. Skipping relationship.")
        
        self.stdout.write(self.style.SUCCESS("Relationships loaded successfully."))





    


