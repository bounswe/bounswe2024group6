from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from app.models import Post, Comment


class TestComments(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.other_user = User.objects.create_user(username='otheruser', password='testpass456')

        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        self.post = Post.objects.create(
            title="Sample Post",
            description="This is a sample post.",
            author=self.user,
        )

        self.add_comment_url = reverse('add_comment')
        self.add_reply_url = reverse('add_reply')
        self.delete_comment_url = reverse('delete_comment')
        self.like_comment_url = reverse('like_comment')
        self.unlike_comment_url = reverse('unlike_comment')
        self.get_comment_url = reverse('get_comment_by_id')

    def test_add_comment_success(self):
        data = {
            'post_id': self.post.id,
            'body': 'This is a comment.',
        }
        response = self.client.post(self.add_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['body'], 'This is a comment.')

    def test_add_comment_missing_fields(self):
        data = {'post_id': self.post.id}
        response = self.client.post(self.add_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'post_id and body are required.')

    def test_add_reply_success(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            body='Parent comment.',
        )
        data = {
            'parent_id': comment.id,
            'body': 'This is a reply.',
        }
        response = self.client.post(self.add_reply_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['body'], 'This is a reply.')

    def test_delete_comment_success(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            body='Comment to delete.',
        )
        data = {'comment_id': comment.id}
        response = self.client.delete(self.delete_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Comment.objects.filter(id=comment.id).exists())

    def test_delete_comment_unauthorized(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.other_user,
            body='Comment by another user.',
        )
        data = {'comment_id': comment.id}
        response = self.client.delete(self.delete_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], 'You do not have permission to delete this comment.')

    def test_like_comment_success(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            body='Comment to like.',
        )
        data = {'comment_id': comment.id}
        response = self.client.post(self.like_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Comment liked successfully')
        self.assertEqual(response.data['like_count'], 1)

    def test_like_comment_already_liked(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            body='Comment already liked.',
        )
        comment.liked_by.add(self.user)
        data = {'comment_id': comment.id}
        response = self.client.post(self.like_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'You have already liked this comment.')

    def test_unlike_comment_success(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            body='Comment to unlike.',
        )
        comment.liked_by.add(self.user)
        comment.like_count = 1  
        comment.save()

        data = {'comment_id': comment.id}
        response = self.client.post(self.unlike_comment_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Comment unliked successfully')

        comment.refresh_from_db()
        self.assertEqual(comment.like_count, response.data['like_count'])  # Match like_count from response


    def test_get_comment_success(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            body='Comment to fetch.',
        )
        data = {'comment_id': comment.id}
        response = self.client.post(self.get_comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('comment', response.data)
        self.assertEqual(response.data['comment']['body'], 'Comment to fetch.')

    def test_get_comment_missing_id(self):
        response = self.client.post(self.get_comment_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Comment ID is required.')
