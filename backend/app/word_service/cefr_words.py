import csv
import requests
import os
import django
import pandas as pd
from ..models import Word, Category 
from .lexvo_manager import get_final_info


def populate_word_with_category(row):

    word = row["headword"]
    part_of_speech = row["pos"]
    level = row["CEFR"]

    final_info = get_final_info(word)

    word_instance, created = Word.objects.get_or_create(
        word=word,
        defaults={
            "part_of_speech": part_of_speech,
            "level": level,
            "language": "eng"
        }
    )

    word_instance.save()
    print(f"{'Created' if created else 'Updated'} word: {word}")

    for meaning in final_info["meanings"]:
        category_name = meaning["label"]
        if category_name:
            category_instance, _ = Category.objects.get_or_create(name=category_name)
            word_instance.categories.add(category_instance)



def migrate_words_from_csv(file_path):
    df = pd.read_csv(file_path)
    for _, row in df.iterrows():
        populate_word_with_category(row)




