from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from app.models import Post, Comment, Quiz, Profile, CommentBookmark
from app.serializers import PostSerializer
from datetime import datetime
from django.utils import timezone

class SearchViewTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.user1 = User.objects.create_user(
            username='testuser1',
            email='test1@example.com', 
            password='testpass123'
        )
        self.user2 = User.objects.create_user(
            username='testuser2',
            email='test2@example.com',
            password='testpass123'
        )
        
        self.profile1 = Profile.objects.create(
            user=self.user1,
            level='A1',
            profile_picture=SimpleUploadedFile(
                "test_image.jpg",
                b"file_content", 
                content_type="image/jpeg"
            )
        )
        self.profile2 = Profile.objects.create(
            user=self.user2,
            level='C2'
        )
        
        self.post1 = Post.objects.create(
            title='Test post 1',
            content='Content 1', 
            author=self.user1
        )
        self.post2 = Post.objects.create(
            title='Another post',
            content='Content 2',
            author=self.user2
        )
        
        self.comment1 = Comment.objects.create(
            body='Test comment 1',
            author=self.user1,
            post=self.post1
        )
        self.comment2 = Comment.objects.create(
            body='Another comment',
            author=self.user2,
            post=self.post2
        )
        
        self.quiz1 = Quiz.objects.create(
            title='Test quiz 1',
            description='Quiz description 1',
            author=self.user1,
            level='A1'
        )
        self.quiz2 = Quiz.objects.create(
            title='Another quiz',
            description='Quiz description 2',
            author=self.user2,
            level='C2'
        )
        
        self.search_url = reverse('search')

    def test_search_no_query(self):
        response = self.client.get(self.search_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "A search query is required."})

    def test_search_users(self):
        response = self.client.get(f'{self.search_url}?q=testuser&type=users')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['users']), 2)
        self.assertIn('username', response.data['users'][0])
        self.assertIn('email', response.data['users'][0])
        self.assertIn('level', response.data['users'][0])
        
        user_data = response.data['users']
        user1_data = next(u for u in user_data if u['username'] == 'testuser1')
        user2_data = next(u for u in user_data if u['username'] == 'testuser2')
        self.assertEqual(user1_data['level'], 'A1')
        self.assertEqual(user2_data['level'], 'C2')

    def test_search_posts(self):
        response = self.client.get(f'{self.search_url}?q=Test&type=posts')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['posts']), 1)
        self.assertEqual(response.data['posts'][0]['title'], 'Test post 1')

    def test_search_comments(self):
        response = self.client.get(f'{self.search_url}?q=Test&type=comments')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['comments']), 1)
        self.assertEqual(response.data['comments'][0]['body'], 'Test comment 1')

    def test_search_quizzes(self):
        response = self.client.get(f'{self.search_url}?q=Test&type=quizzes')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['quizzes']), 1)
        quiz_data = response.data['quizzes'][0]
        self.assertEqual(quiz_data['title'], 'Test quiz 1')
        self.assertEqual(quiz_data['level'], 'A1')

    def test_search_all_types(self):
        response = self.client.get(f'{self.search_url}?q=test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('posts', response.data)
        self.assertIn('comments', response.data)
        self.assertIn('quizzes', response.data)

    def test_authenticated_user_search(self):
        self.client.force_authenticate(user=self.user1)
        
        self.profile1.following.add(self.profile2)
        
        self.comment1.liked_by.add(self.user1)
        self.quiz1.liked_by.add(self.user1)
        CommentBookmark.objects.create(user=self.user1, comment=self.comment1)
        self.quiz1.bookmarked_by.add(self.user1)
        
        response = self.client.get(f'{self.search_url}?q=test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        user_data = response.data['users']
        user2_data = next(u for u in user_data if u['username'] == 'testuser2')
        self.assertTrue(user2_data['isFollowing'])
        
        comment_data = response.data['comments']
        comment1_data = next(c for c in comment_data if c['id'] == self.comment1.id)
        self.assertTrue(comment1_data['isLiked'])
        self.assertTrue(comment1_data['isBookmarked'])
        
        quiz_data = response.data['quizzes']
        quiz1_data = next(q for q in quiz_data if q['id'] == self.quiz1.id)
        self.assertTrue(quiz1_data['isLiked'])
        self.assertTrue(quiz1_data['isBookmarked'])

    def test_search_case_insensitive(self):
        response = self.client.get(f'{self.search_url}?q=TEST')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['posts']), 1)
        self.assertEqual(len(response.data['comments']), 1)
        self.assertEqual(len(response.data['quizzes']), 1)

    def test_search_no_results(self):
        response = self.client.get(f'{self.search_url}?q=nonexistent')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['users']), 0)
        self.assertEqual(len(response.data['posts']), 0)
        self.assertEqual(len(response.data['comments']), 0)
        self.assertEqual(len(response.data['quizzes']), 0)

    def test_invalid_filter_type(self):
        response = self.client.get(f'{self.search_url}?q=test&type=invalid')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {})