from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserTestCase(APITestCase):
    def test_signup(self):
        data = {"username": "testuser", "password": "strongpassword123", "email": "test@example.com"}
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 201)

class AuthenticationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword123')

    def test_login(self):
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'testpassword123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('token' in response.data)

    def test_invalid_login(self):
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)