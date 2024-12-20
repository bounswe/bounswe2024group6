from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class AuthenticationTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = "/auth/register/"
        self.login_url = "/auth/login/"
        self.logout_url = "/auth/logout/"
        self.user_data = {
            "username": "testuser",
            "password": "securepassword123",
            "email": "testuser@example.com"
        }
        self.user = User.objects.create_user(
            username=self.user_data["username"],
            email=self.user_data["email"],
            password=self.user_data["password"]
        )

    def test_register_user(self):
        response = self.client.post(self.register_url, {
            "username": "newuser",
            "password": "newpassword123",
            "email": "newuser@example.com"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.get(username="newuser").email, "newuser@example.com")

    def test_login_user(self):
        response = self.client.post(self.login_url, {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_user_invalid_credentials(self):
        response = self.client.post(self.login_url, {
            "username": self.user_data["username"],
            "password": "wrongpassword"
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)

    def test_logout_user(self):
        tokens = RefreshToken.for_user(self.user)
        refresh_token = str(tokens)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens.access_token}")


  response = self.client.post(self.logout_url, {"refresh": refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Successfully logged out.")

    def test_logout_user_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {RefreshToken.for_user(self.user).access_token}")
        response = self.client.post(self.logout_url, {"refresh": "invalidtoken"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
