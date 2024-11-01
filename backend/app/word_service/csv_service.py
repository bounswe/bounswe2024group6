import csv
from .lexvo_manager import get_final_info
import time
from ..models import Word, Translation, Relationship


REQUEST_DELAY = 1
MAX_RETRIES = 3


def fetch_and_save_data(words, output_path):
    with open(f"{output_path}_words.csv", 'w', encoding='utf-8', newline='') as words_file, \
         open(f"{output_path}_translations.csv", 'w', encoding='utf-8', newline='') as translations_file, \
         open(f"{output_path}_relationships.csv", 'w', encoding='utf-8', newline='') as relationships_file:

        word_writer = csv.writer(words_file)
        translation_writer = csv.writer(translations_file)
        relationship_writer = csv.writer(relationships_file)

        word_writer.writerow(['word', 'meaning', 'level', 'part_of_speech'])
        translation_writer.writerow(['word', 'turkish_translation'])
        relationship_writer.writerow(['word', 'related_word', 'relation_type'])

        for word_data in words:
            word, level, part_of_speech = word_data['word'], word_data['level'], word_data['part_of_speech']
            final_info = get_final_info(word)

            meanings = ";".join([m['label'] for m in final_info['meanings']])
            word_writer.writerow([word, meanings, level, part_of_speech])

            for translation in final_info['turkish_translations']:
                translation_writer.writerow([word, translation])


            for meaning in final_info['meanings']:
                for synonym in meaning['nearlySameAs']:
                    relationship_writer.writerow([word, synonym, 'synonym'])
                for broader in meaning['broader']:
                    relationship_writer.writerow([word, broader, 'broader'])
                for narrower in meaning['narrower']:
                    relationship_writer.writerow([word, narrower, 'narrower'])

    print(f"Data saved to {output_path}_words.csv, {output_path}_translations.csv, and {output_path}_relationships.csv")


def populate_words(csv_path):

    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            word, created = Word.objects.get_or_create(
                word=row['word'],
                defaults={
                    'level': row.get('level'),
                    'part_of_speech': row.get('part_of_speech'),
                    'meaning': row.get('meaning', "Meaning not available"),
                    'language': 'eng'
                }
            )
            if created:
                print(f"Added word: {word.word}")


def populate_translations(csv_path):
    with open(csv_path, 'r', encoding='utf-8') as file :
        reader = csv.DictReader(file)
        for row in reader:
            
            english_word = Word.objects.get(word=row['word'])

            turkish_word, created = Word.objects.get_or_create(
                word=row['turkish_translation'],
                defaults={'language': 'tur'}
            )


            Translation.objects.get_or_create(
                word=english_word,
                translation=turkish_word.word  
            )
            
            if created:
                print(f"Added Turkish word: {turkish_word.word}")

def populate_relationship(csv_path):
    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            word = Word.objects.get(word=row['word'])
            related_word = Word.objects.get(word=row['related_word'])
            relationship, created = Relationship.objects.get_or_create(
                word=word,
                related_word=related_word,
                relation_type=row['relation_type']
            )
            if created:
                print(f"Added {row['relation_type']} relationship: {word.word} -> {related_word.word}")




