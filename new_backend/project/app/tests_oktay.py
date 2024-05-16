from django.test import TestCase, Client
from django.urls import reverse
from .models import CustomUser
from .models import Post, Tag
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status


class UserTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_data = {
            'username': 'test_user',
            'password': 'test_password'
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_login(self):
        url = reverse('user_login')
        response = self.client.post(url, self.user_data)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'token')

    def test_invalid_login(self):
        url = reverse('user_login')
        invalid_data = {
            'username': 'invalid_user',
            'password': 'invalid_password'
        }
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 401)


class GuestFeedTestCase(APITestCase):
    def setUp(self):
        tag = Tag.objects.create(tag_name='Test Tag')
        user = CustomUser.objects.create(username='test_user')
        Post.objects.create(title='Post 1', text='Text for post 1', tags=tag, author=user)
        Post.objects.create(title='Post 2', text='Text for post 2', tags=tag, author=user)

    def test_guest_feed(self):
        url = reverse('guest_feed')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('post_ids' in response.data)
        post_ids = response.data['post_ids']
        self.assertTrue(isinstance(post_ids, list))
        self.assertEqual(len(post_ids), 2)
