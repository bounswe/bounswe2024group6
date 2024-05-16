from django.test import TestCase, Client
from django.urls import reverse
from .models import CustomUser
from .models import Post, Tag, Follow
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient

from rest_framework.authtoken.models import Token



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


from django.contrib.auth import get_user_model
User = get_user_model()  

class GetPostsByIdsTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.tag = Tag.objects.create(tag_name='Test Tag')
        self.user = User.objects.create(username='test_user')  # Create a user using the custom user model
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', tags=self.tag, author=self.user)

    def test_get_posts_by_ids(self):
        url = reverse('get_posts_by_ids')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.post.title)
        self.assertEqual(response.data['text'], self.post.text)
        



class FollowUnfollowTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = CustomUser.objects.create_user(username='user1', password='password1', email='user1@example.com')
        self.user2 = CustomUser.objects.create_user(username='user2', password='password2', email='user2@example.com')
        self.token1 = Token.objects.create(user=self.user1)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)

    def test_follow_user(self):
        url = reverse('follow_user')
        data = {'username': 'user2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Follow.objects.filter(follower=self.user1, followed=self.user2).exists())

    def test_unfollow_user(self):
        Follow.objects.create(follower=self.user1, followed=self.user2)
        url = reverse('unfollow_user')
        data = {'username': 'user2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.user1, followed=self.user2).exists())

    def test_list_followers(self):
        Follow.objects.create(follower=self.user2, followed=self.user1)
        url = reverse('list_followers')
        data = {'username': 'user1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['followers']), 1)
        self.assertEqual(response.data['followers'][0]['username'], 'user2')

    def test_list_following(self):
        Follow.objects.create(follower=self.user1, followed=self.user2)
        url = reverse('list_following')
        data = {'username': 'user1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['following']), 1)
        self.assertEqual(response.data['following'][0]['username'], 'user2')