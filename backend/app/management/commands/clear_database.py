from django.core.management.base import BaseCommand
from ...models import Word, Translation, Relationship

class Command(BaseCommand):
    help = 'Clear all data from the Word, Translation, and Relationship tables'

    def handle(self, *args, **kwargs):
        self.stdout.write("Clearing all data from the database...")
        
        try:
            # Delete all records from the models
            Translation.objects.all().delete()
            Relationship.objects.all().delete()
            Word.objects.all().delete()

            self.stdout.write(self.style.SUCCESS("All data cleared successfully!"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))