from django.apps import AppConfig
import requests
from django.db.models.signals import post_migrate, post_init

import json


def create_mockdata(**kwargs):
    from .mock_data_manager import create_quiz_mockdata
    create_quiz_mockdata()


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    def ready(self):
        import app.signals
        post_migrate.connect(create_mockdata, sender=self)



        