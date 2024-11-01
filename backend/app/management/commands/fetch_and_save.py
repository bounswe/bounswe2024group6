import os
from django.core.management.base import BaseCommand
from app.word_service.csv_service import fetch_and_save_data, populate_words, populate_translations, populate_relationship
import csv

class Command(BaseCommand):
    help = 'Fetch the first k words from the CSV file and save to new CSV files'

    def handle(self, *args, **options):
        filename = 'vocabulary_level_ab'
        input_csv_path = f'/app/data/cefr_files/{filename}.csv'
        output_path = f'/app/data/db_files'
        

        words = []
        try:
            with open(input_csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for i, row in enumerate(reader):
                    if i < 10:  
                        words.append(row)
                    else:
                        break

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Input file '{input_csv_path}' not found."))
            return

        fetch_and_save_data(words, output_path, 0, len(words))
        
