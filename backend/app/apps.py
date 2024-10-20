from django.apps import AppConfig
import requests
from django.db.models.signals import post_migrate, post_init

import json


def create_mockdata(**kwargs):
    from .mock_data_manager import create_quiz_mockdata
    create_quiz_mockdata()



class AppConfig(AppConfig):
    name = 'app'

    def ready(self):
        import app.signals  # Ensure the signals are loaded




        