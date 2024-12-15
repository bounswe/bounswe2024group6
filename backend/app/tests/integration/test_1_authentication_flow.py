
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase


class TestAuthIntegrationFlow(APITestCase):
  
    def setUp(self):
        self.register_url = reverse('auth_register') 
        self.login_url = reverse('auth_login')        
        self.logout_url = reverse('auth_logout')      
        self.refresh_url = reverse('token_refresh')   

    def test_full_auth_flow(self):
        # 1) REGISTER
        register_data = {
            'username': 'integration_user',
            'password': 'integration_pass',
            'email': 'integration@example.com'
        }
        reg_response = self.client.post(self.register_url, register_data, format='json')
        self.assertEqual(reg_response.status_code, status.HTTP_201_CREATED, reg_response.data)
        self.assertTrue(
            User.objects.filter(username='integration_user').exists(),
            "User should be created."
        )

        login_data = {
            'username': 'integration_user',
            'password': 'integration_pass'
        }
        login_response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK, login_response.data)
        self.assertIn('access', login_response.data, "Login response should contain an access token.")
        self.assertIn('refresh', login_response.data, "Login response should contain a refresh token.")
        access_token = login_response.data['access']
        refresh_token = login_response.data['refresh']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        logout_response = self.client.post(self.logout_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(
            logout_response.status_code,
            status.HTTP_200_OK,
            "Logout should succeed with valid refresh token."
        )

        refresh_response = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')
        self.assertNotEqual(
            refresh_response.status_code,
            status.HTTP_200_OK,
            "Refreshing a blacklisted token should fail."
        )
        self.assertIn(
            refresh_response.status_code,
            [status.HTTP_400_BAD_REQUEST, status.HTTP_401_UNAUTHORIZED],
            "Blacklisted refresh token should return 400 or 401."
        )
        self.assertIn('detail', refresh_response.data, "Error response should contain 'detail' message.")
