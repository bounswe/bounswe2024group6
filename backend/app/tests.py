from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationTest(APITestCase):
    def setUp(self):
        # Define the registration URL based on your urlpatterns
        self.register_url = "/signup/"

    def test_register_user(self):
        """Test registering a new user"""
        data = {
            "username": "testuser",
            "password": "testpassword",
            "email": "testuser@example.com",
        }

        # Make the POST request to the registration endpoint
        response = self.client.post(self.register_url, data)

        # Assert the user is created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("username", response.data)
        self.assertEqual(response.data["username"], data["username"])

        # Verify the user exists in the database
        self.assertTrue(User.objects.filter(username=data["username"]).exists())


class UserAuthenticationTest(APITestCase):
    def setUp(self):
        # Define URLs
        self.login_url = "/login/"
        self.logout_url = "/logout/"
        self.refresh_url = "/refresh/"

        # Create a user for testing
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            email="testuser@example.com"
        )

        # Generate refresh token for the user
        refresh = RefreshToken.for_user(self.user)
        self.refresh_token = str(refresh)
        self.access_token = str(refresh.access_token)

    def test_login_user(self):
        """Test user login to obtain JWT tokens"""
        data = {
            "username": "testuser",
            "password": "testpassword"
        }

        # Make the POST request to the login endpoint
        response = self.client.post(self.login_url, data)

        # Assert the user gets a successful response with tokens
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_logout_user(self):
        """Test user logout with a valid refresh token"""
        data = {"refresh": self.refresh_token}

        # Include the access token in the Authorization header
        response = self.client.post(
            self.logout_url, 
            data, 
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        # Assert the user gets a successful response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Successfully logged out.")


    def test_refresh_token(self):
        """Test refreshing an access token with a valid refresh token"""
        data = {"refresh": self.refresh_token}
    
        # POST request to the refresh endpoint
        response = self.client.post(self.refresh_url, data)
    
        # Assert the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

