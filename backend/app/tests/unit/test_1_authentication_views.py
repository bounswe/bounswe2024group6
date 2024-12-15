from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class TestRegisterView(APITestCase):
    def setUp(self):
        self.signup_url = reverse('auth_register')

    def test_user_registration_success(self):
        data = {
            'username': 'testuser',
            'password': 'testpass123',
            'email': 'testuser@example.com'
        }
        response = self.client.post(self.signup_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_user_registration_failure_missing_fields(self):
        data = {
            'username': 'incomplete'
        }
        response = self.client.post(self.signup_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(User.objects.filter(username='incomplete').exists())


class TestLoginView(APITestCase):
    def setUp(self):
        self.login_url = reverse('auth_login')
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )

    def test_login_success(self):
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_failure_wrong_password(self):
        data = {
            'username': 'testuser',
            'password': 'wrongpass'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)
        self.assertNotIn('refresh', response.data)


class TestLogoutView(APITestCase):
    def setUp(self):
        self.logout_url = reverse('auth_logout')
        self.user = User.objects.create_user(
            username='logout_tester',
            password='logout123'
        )

    def test_logout_success(self):
        login_url = reverse('auth_login')
        login_response = self.client.post(login_url, {
            'username': 'logout_tester',
            'password': 'logout123'
        }, format='json')
        refresh_token = login_response.data['refresh']
        access_token = login_response.data['access']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.post(self.logout_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Successfully logged out.')

    def test_logout_failure_missing_refresh_token(self):
        login_url = reverse('auth_login')
        login_response = self.client.post(login_url, {
            'username': 'logout_tester',
            'password': 'logout123'
        }, format='json')
        access_token = login_response.data['access']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.post(self.logout_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)


class TestRefreshTokenView(APITestCase):
    def setUp(self):
        self.refresh_url = reverse('token_refresh')
        self.user = User.objects.create_user(
            username='refresh_tester',
            password='refresh123'
        )

    def test_refresh_success(self):
        login_url = reverse('auth_login')
        login_response = self.client.post(login_url, {
            'username': 'refresh_tester',
            'password': 'refresh123'
        }, format='json')
        refresh_token = login_response.data['refresh']

        response = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_refresh_failure_invalid_token(self):
        response = self.client.post(self.refresh_url, {'refresh': 'invalidtoken123'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
