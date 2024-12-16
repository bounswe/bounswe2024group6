
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from app.models import Profile
from app.serializers import ProfileSerializer

class TestProfileViews(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.profile = Profile.objects.get(user=self.user)
        self.profile.bio = 'Initial bio'
        self.profile.save()

        self.other_user = User.objects.create_user(username='otheruser', password='otherpass123')
        self.other_profile = Profile.objects.get(user=self.other_user)
        self.other_profile.bio = 'Other user bio'
        self.other_profile.save()

        self.view_profile_url = reverse('view_profile')  
        self.update_profile_url = reverse('update_profile')  
        self.view_other_profile_url = reverse('view_other_profile', kwargs={'username': 'otheruser'})
        self.view_followers_url = reverse('view_followers', kwargs={'username': 'otheruser'})
        self.view_following_url = reverse('view_following', kwargs={'username': 'otheruser'})

        self.jwt_login_url = reverse('auth_login')

    def authenticate(self):
        login_data = {'username': 'testuser', 'password': 'testpass123'}
        response = self.client.post(self.jwt_login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        access_token = response.data['access']
        self.assertIsNotNone(access_token, "JWT login must provide an access token.")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    def test_view_profile_authenticated(self):
        self.authenticate()
        response = self.client.get(self.view_profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = ProfileSerializer(
            self.profile, context={'request': response.wsgi_request}
        ).data
        self.assertEqual(response.data, expected_data)

    def test_view_profile_unauthenticated(self):
        response = self.client.get(self.view_profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_profile_authenticated(self):
        self.authenticate()
        update_data = {'bio': 'Updated bio text'}
        response = self.client.post(self.update_profile_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.bio, 'Updated bio text')
        self.assertEqual(response.data['bio'], 'Updated bio text')

    def test_update_profile_unauthenticated(self):
        update_data = {'bio': 'Should fail'}
        response = self.client.post(self.update_profile_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_view_other_profile_authenticated(self):
        self.authenticate()
        response = self.client.get(self.view_other_profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = ProfileSerializer(
            self.other_profile, context={'request': response.wsgi_request}
        ).data
        self.assertEqual(response.data, expected_data)

    def test_view_other_profile_unauthenticated(self):
        response = self.client.get(self.view_other_profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_view_followers_authenticated(self):
  
        self.authenticate()

        self.other_profile.followers.add(self.profile)

        response = self.client.get(self.view_followers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 1, "Expected exactly 1 follower in the list.")

        first_follower = response.data[0]
        self.assertIn('bio', first_follower, "Profile data should have 'bio' field.")
        self.assertEqual(first_follower['bio'], self.profile.bio)


    def test_view_followers_unauthenticated(self):
        response = self.client.get(self.view_followers_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_view_following_authenticated(self):

        self.authenticate()

        self.other_profile.following.add(self.profile)

        response = self.client.get(self.view_following_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 1, "Expected exactly 1 item in the 'following' list.")
        first_following = response.data[0]
        self.assertIn('bio', first_following)
        self.assertEqual(first_following['bio'], self.profile.bio)


    def test_view_following_unauthenticated(self):
        response = self.client.get(self.view_following_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
