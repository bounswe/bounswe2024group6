import csv
from django.core.management.base import BaseCommand
from ...models import Word, Translation, Relationship
import re
from collections import defaultdict

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

            word_dict = defaultdict(list)

            for row in reader:
                info_dict = {
                    'language': row.get('language', 'eng'),
                    'level': row.get('level'),
                    'part_of_speech': row.get('part_of_speech'),
                    'meaning': row.get('explanation', 'Meaning not available'),
                    'sentence': row.get('sentence', 'Sentence not available'),
                }
                word_dict[row['word']].append(info_dict)

            existing_words = set(Word.objects.values_list('word', flat=True))
            words_to_create = []

            for word, infos in word_dict.items():
                if word not in existing_words:
                    defaults = {
                        'language': ', '.join(set(info['language'] for info in infos)),
                        'level': ', '.join(set(info['level'] for info in infos if info['level'])),
                        'part_of_speech': ', '.join(set(info['part_of_speech'] for info in infos if info['part_of_speech'])),
                        'meaning': ', '.join(set(info['meaning'] for info in infos if info['meaning'])),
                        'sentence': ', '.join(set(info['sentence'] for info in infos if info['sentence'])),
                    }
                    words_to_create.append(Word(word=word, **defaults))

            # Bulk create new words
            if words_to_create:
                Word.objects.bulk_create(words_to_create)
                self.stdout.write(f"Created {len(words_to_create)} new words.")

    def populate_translations(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            existing_translations = set(Translation.objects.values_list('word__word', 'translation'))
            words = {w.word: w for w in Word.objects.all()}
            translations_to_create = []

            for row in reader:
                word = row['word']
                translation = row['turkish_translation']

                if (word, translation) not in existing_translations:
                    if word not in words:
                        words[word] = Word.objects.create(
                            word=word,
                            language='eng',
                            level='unknown',
                            part_of_speech='unknown',
                            meaning='Auto-created for missing translation',
                            sentence='No example provided',
                        )
                    translations_to_create.append(
                        Translation(word=words[word], translation=translation)
                    )

            # Bulk create translations
            if translations_to_create:
                Translation.objects.bulk_create(translations_to_create)
                self.stdout.write(f"Created {len(translations_to_create)} new translations.")

    def populate_relationships(self, file_path):
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            words = {w.word: w for w in Word.objects.all()}
            relationships_to_create = []

            for row in reader:
                word = row['word']
                related_word = row['related_word']
                relation_type = row['relation_type']

                if not re.match(r"^[a-zA-Z-']+$", related_word):
                    self.stderr.write(f"Skipping invalid related word '{related_word}'.")
                    continue

                if word not in words:
                    self.stderr.write(f"Word '{word}' not found. Skipping relationship.")
                    continue

                if related_word not in words:
                    words[related_word] = Word.objects.create(
                        word=related_word,
                        language='eng',
                        level=words[word].level,
                        part_of_speech=words[word].part_of_speech,
                    )

                relationships_to_create.append(
                    Relationship(word=words[word], related_word=words[related_word], relation_type=relation_type)
                )

            # Bulk create relationships
            if relationships_to_create:
                Relationship.objects.bulk_create(relationships_to_create)
                self.stdout.write(f"Created {len(relationships_to_create)} new relationships.")
