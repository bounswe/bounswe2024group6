from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from app.models import Profile

class FollowUnfollowUserTestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="user1", password="password123")
        self.user2 = User.objects.create_user(username="user2", password="password123")

        self.profile1 = self.user1.profile
        self.profile2 = self.user2.profile

        refresh = RefreshToken.for_user(self.user1)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        self.follow_url = "/profile/follow/"
        self.unfollow_url = "/profile/unfollow/"

    def test_follow_user_success(self):
        data = {"username": "user2"}
        response = self.client.post(self.follow_url, data, format="json")
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Successfully followed user2", response_data["message"])
        self.assertEqual(self.profile2.followers.count(), 1)
        self.assertTrue(self.profile1 in self.profile2.followers.all())

    def test_follow_user_missing_username(self):
        response = self.client.post(self.follow_url, {}, format="json")
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Username is required", response_data["error"])

    def test_follow_self(self):
        data = {"username": "user1"}
        response = self.client.post(self.follow_url, data, format="json")
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Cannot follow yourself", response_data["error"])

    def test_unfollow_user_success(self):
        self.profile1.following.add(self.profile2)
        self.profile2.followers.add(self.profile1)

        data = {"username": "user2"}
        response = self.client.post(self.unfollow_url, data, format="json")
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Successfully unfollowed user2", response_data["message"])
        self.assertEqual(self.profile2.followers.count(), 0)
        self.assertFalse(self.profile1 in self.profile2.followers.all())

    def test_unfollow_user_missing_username(self):
        response = self.client.post(self.unfollow_url, {}, format="json")
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Username is required", response_data["error"])

    def test_unfollow_self(self):
        data = {"username": "user1"}
        response = self.client.post(self.unfollow_url, data, format="json")
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Cannot unfollow yourself", response_data["error"])
