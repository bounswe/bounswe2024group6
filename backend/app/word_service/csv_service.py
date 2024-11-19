import csv
from .lexvo_manager import get_final_info
from ..models import Word, Translation, Relationship

REQUEST_DELAY = 1
MAX_RETRIES = 3


def fetch_and_save_data(words, output_path, starting_row, ending_row, update_checkpoint):
    try:
        with open(f"{output_path}/words.csv", 'a', encoding='utf-8', newline='') as words_file, \
             open(f"{output_path}/translations.csv", 'a', encoding='utf-8', newline='') as translations_file, \
             open(f"{output_path}/relationships.csv", 'a', encoding='utf-8', newline='') as relationships_file:

            word_writer = csv.writer(words_file)
            translation_writer = csv.writer(translations_file)
            relationship_writer = csv.writer(relationships_file)

            if starting_row == 0:
                word_writer.writerow(['word', 'explanation', 'sentence', 'level', 'part_of_speech'])
                translation_writer.writerow(['word', 'turkish_translation'])
                relationship_writer.writerow(['word', 'related_word', 'relation_type'])

            for i in range(starting_row, ending_row):
                word = words[i].get('headword', '').strip()
                level = words[i].get('CEFR', '').strip()
                part_of_speech = words[i].get('pos', '').strip()
                print(f"Processing word: {word}, level: {level}, POS: {part_of_speech}")

                try:
                    final_info = get_final_info(word)

                    for translation in final_info['turkish_translations']:
                        translation_writer.writerow([word, translation])

                    for meaning in final_info['meanings']:
                        comment = meaning.get('comment', '').strip()
                        explanation, sentence = (comment.split('"', 1) + [""])[:2] if '"' in comment else (comment, "")
                        word_writer.writerow([word, explanation.strip(), sentence.strip('"'), level, part_of_speech])

                        for synonym in meaning.get('nearlySameAs', []):
                            if not synonym.startswith("synset"):
                                relationship_writer.writerow([word, synonym, 'synonym'])
                        for broader in meaning.get('broader', []):
                            relationship_writer.writerow([word, broader, 'broader'])
                        for narrower in meaning.get('narrower', []):
                            relationship_writer.writerow([word, narrower, 'narrower'])

                    if callable(update_checkpoint):
                        update_checkpoint(i)

                except Exception as e:
                    print(f"Error processing word {word}: {e}")
                    continue

    except Exception as e:
        print(f"Critical error in fetch_and_save_data: {e}")



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
            
            try:
                english_word = Word.objects.get(word=row['word'])
            except Word.DoesNotExist:
                print(f"Word '{row['word']}' not found in the database.")
                continue

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
            try:
                word = Word.objects.get(word=row['word'])
            except Word.DoesNotExist:
                print(f"Word '{row['word']}' not found in the database.")
                continue
            related_word = Word.objects.get(word=row['related_word'])
            
            relationship, created = Relationship.objects.get_or_create(
                word=word,
                related_word=related_word,
                relation_type=row['relation_type']
            )
            if created:
                print(f"Added {row['relation_type']} relationship: {word.word} -> {related_word.word}")




