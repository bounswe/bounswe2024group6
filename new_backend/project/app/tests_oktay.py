from django.test import TestCase, Client
from django.urls import reverse
from .models import CustomUser  # Import the CustomUser model

class UserTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_data = {
            'username': 'test_user',
            'password': 'test_password'
        }
        # Create a user using the CustomUser model
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_login(self):
        url = '/login/'  # URL for the login view
        response = self.client.post(url, self.user_data)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'token')

    def test_invalid_login(self):
        url = '/login/'  # URL for the login view
        invalid_data = {
            'username': 'invalid_user',
            'password': 'invalid_password'
        }
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 401)
