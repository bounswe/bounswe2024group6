import csv
from .lexvo_manager import get_final_info
import time


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

