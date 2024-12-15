from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from app.models import Post


class TestPostViews(APITestCase):
    def setUp(self):
        # Create test user and generate JWT token
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # Add Authorization header with JWT token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        # Create another user for unauthorized tests
        self.other_user = User.objects.create_user(username='otheruser', password='testpass456')

        # Create a sample post
        self.post = Post.objects.create(
            title='Sample Post',
            description='Some description',
            author=self.user,  # ForeignKey relation
            tags=['tag1', 'tag2']
        )

        # Define URLs
        self.like_post_url = reverse('like_post')
        self.unlike_post_url = reverse('unlike_post')
        self.create_post_url = reverse('create_post')
        self.delete_post_url = reverse('delete_post')
        self.get_posts_of_user_url = reverse('get_posts_of_user')
        self.get_post_details_url = reverse('get_post_details')
        self.update_post_base_url = '/post/update/'  # Append post_id manually

    def test_like_post_success(self):
        data = {'post_id': self.post.id}
        response = self.client.post(self.like_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Post liked successfully.')
        self.assertTrue(self.post.liked_by.filter(id=self.user.id).exists())

    def test_like_post_already_liked(self):
        self.post.liked_by.add(self.user)  # Simulate already liked
        data = {'post_id': self.post.id}
        response = self.client.post(self.like_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'You have already liked this post.')

    def test_unlike_post_success(self):
        self.post.liked_by.add(self.user)  # Simulate already liked
        data = {'post_id': self.post.id}
        response = self.client.post(self.unlike_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Post unliked successfully.')
        self.assertFalse(self.post.liked_by.filter(id=self.user.id).exists())

    def test_create_post_success(self):
        data = {
            'title': 'New Post Title',
            'description': 'New post description',
            'tags': ['python', 'django']
        }
        response = self.client.post(self.create_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('post_id', response.data)
        new_post_id = response.data['post_id']
        self.assertTrue(Post.objects.filter(id=new_post_id).exists())

    def test_create_post_missing_fields(self):
        data = {'tags': ['python']}
        response = self.client.post(self.create_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Title and description are required.')



    def test_delete_post_unauthorized(self):
        # Authenticate as another user
        self.client.logout()
        refresh = RefreshToken.for_user(self.other_user)
        other_user_access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {other_user_access_token}')

        data = {'post_id': self.post.id}
        response = self.client.post(self.delete_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], 'You do not have permission to delete this post.')




    def test_get_post_details_success(self):
        data = {'post_id': self.post.id}
        response = self.client.post(self.get_post_details_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('post', response.data)
        self.assertEqual(response.data['post']['title'], self.post.title)
        self.assertEqual(response.data['post']['description'], self.post.description)

    def test_unlike_post_not_liked(self):
        data = {'post_id': self.post.id}
        response = self.client.post(self.unlike_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'You have not liked this post yet.')

    def test_create_post_invalid_tags(self):
        data = {
            'title': 'Invalid tags',
            'description': 'Description here',
            'tags': 'notalist'
        }
        response = self.client.post(self.create_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Tags must be a list of strings.')
