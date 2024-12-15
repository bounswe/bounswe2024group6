
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from app.models import Profile

class TestAuthIntegrationFlow(APITestCase):

    def setUp(self):
        self.register_url = reverse('auth_register')      
        self.login_url = reverse('auth_login')           
        self.logout_url = reverse('auth_logout')         
        self.refresh_url = reverse('token_refresh')    

        self.view_profile_url = reverse('view_profile')  
        self.update_profile_url = reverse('update_profile')  

    def test_full_auth_profile_flow(self):
        # 1) REGISTER
        register_data = {
            'username': 'integration_user',
            'password': 'integration_pass',
            'email': 'integration@example.com'
        }
        reg_response = self.client.post(self.register_url, register_data, format='json')
        self.assertEqual(reg_response.status_code, status.HTTP_201_CREATED, reg_response.data)
        self.assertTrue(User.objects.filter(username='integration_user').exists())

        login_data = {'username': 'integration_user', 'password': 'integration_pass'}
        login_response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK, login_response.data)
        self.assertIn('access', login_response.data)
        self.assertIn('refresh', login_response.data)
        access_token = login_response.data['access']
        refresh_token = login_response.data['refresh']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        profile_response = self.client.get(self.view_profile_url)
        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)

        update_response = self.client.post(
            self.update_profile_url, 
            {'bio': 'New integration bio'}, 
            format='json'
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data['bio'], 'New integration bio')

        user2 = User.objects.create_user(username='seconduser', password='pass123')
        profile2 = Profile.objects.get(user=user2)
        profile2.bio = 'Second user bio'
        profile2.save()

        view_other_profile_url = reverse('view_other_profile', kwargs={'username': 'seconduser'})
        view_followers_url = reverse('view_followers', kwargs={'username': 'seconduser'})
        view_following_url = reverse('view_following', kwargs={'username': 'seconduser'})

        other_profile_response = self.client.get(view_other_profile_url)
        self.assertEqual(other_profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(other_profile_response.data['bio'], 'Second user bio')

        profile_user1 = Profile.objects.get(user__username='integration_user') 
        profile2.followers.add(profile_user1)  # seconduser is followed by integration_user

        followers_response = self.client.get(view_followers_url)
        self.assertEqual(followers_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(followers_response.data), 1, "Expected exactly 1 follower.")
        self.assertEqual(followers_response.data[0]['bio'], profile_user1.bio)

        following_response = self.client.get(view_following_url)
        self.assertEqual(following_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(following_response.data), 0, "seconduser isn't following anyone yet.")

        profile2.following.add(profile_user1)  
        following_response = self.client.get(view_following_url)
        self.assertEqual(following_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(following_response.data), 1)
        self.assertEqual(following_response.data[0]['bio'], profile_user1.bio)

        logout_response = self.client.post(self.logout_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        self.assertEqual(logout_response.data['detail'], 'Successfully logged out.')

        refresh_response = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')
        self.assertNotEqual(refresh_response.status_code, status.HTTP_200_OK,
                            "Refreshing blacklisted token should fail.")
        self.assertIn(refresh_response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_401_UNAUTHORIZED])
        self.assertIn('detail', refresh_response.data)
