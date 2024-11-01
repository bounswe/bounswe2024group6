import csv
from django.core.management.base import BaseCommand
from app.word_service.csv_service import populate_words, populate_translations, populate_relationship

class Command(BaseCommand):
    help = 'Populate the database from CSV files'

    def handle(self, *args, **options):
        words_csv_path = 'backend/data/db_files/words.csv'
        translations_csv_path = 'backend/data/db_files/translations.csv'
        relationships_csv_path = 'backend/data/db_diles/relationships.csv'
        
        print("Starting database population from CSV files...")

        populate_words(words_csv_path)
        
        populate_translations(translations_csv_path)
        
        populate_relationship(relationships_csv_path)
        
        print("Database population complete.")
