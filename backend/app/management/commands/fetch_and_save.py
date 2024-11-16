import os
import csv
from django.core.management.base import BaseCommand
from app.word_service.csv_service import fetch_and_save_data

class Command(BaseCommand):
    help = 'Fetch the first k words from the CSV file and save to new CSV files'

    def handle(self, *args, **options):
        ab_filename = 'vocabulary_level_ab'
        c_filename = 'vocabulary_level_c'
        input_csv_path_ab = f'/app/data/cefr_files/{ab_filename}.csv'
        input_csv_path_c = f'/app/data/cefr_files/{c_filename}.csv'
        output_path = f'/app/data/db_files'
        progress_file_ab = f'/app/data/progress_ab.txt'
        progress_file_c = f'/app/data/progress_c.txt'

        # Read progress from files
        start_row_ab = self.get_progress(progress_file_ab)
        start_row_c = self.get_progress(progress_file_c)

        # Process first file
        words_ab = self.read_csv(input_csv_path_ab)
        self.process_words(
            words_ab, start_row_ab, progress_file_ab, output_path
        )

        # Process second file
        words_c = self.read_csv(input_csv_path_c)
        self.process_words(
            words_c, start_row_c, progress_file_c, output_path
        )

    def get_progress(self, progress_file):
        if os.path.exists(progress_file):
            with open(progress_file, 'r') as file:
                return int(file.read().strip())
        return 0

    def save_progress(self, progress_file, row_number):
        with open(progress_file, 'w') as file:
            file.write(str(row_number))

    def read_csv(self, csv_path):
        words = []
        try:
            with open(csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    words.append(row)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Input file '{csv_path}' not found."))
        return words

    def process_words(self, words, start_row, progress_file, output_path):
        if not words:
            self.stdout.write(self.style.ERROR("No words to process. Exiting process_words."))
            return

        self.stdout.write(self.style.NOTICE(f"Starting from row {start_row}. Total rows: {len(words)}"))

        for i in range(start_row, len(words)):
            try:
                self.stdout.write(self.style.NOTICE(f"Processing row {i}..."))
                fetch_and_save_data(
                    words,
                    output_path,
                    i,
                    i + 1,
                    update_checkpoint=lambda row: self.save_progress(progress_file, row)
                )
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error processing row {i}: {e}"))
                break



