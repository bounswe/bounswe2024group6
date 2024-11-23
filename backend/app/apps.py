from django.apps import AppConfig
import requests
from django.db.models.signals import post_migrate, post_init
import json



class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    def ready(self):
        import app.signals  # Import the signals to ensure they are registered
        