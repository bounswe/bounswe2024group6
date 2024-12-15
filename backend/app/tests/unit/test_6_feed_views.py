from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from app.models import Post, Comment, Bookmark
from datetime import datetime, timedelta

class GetUserPostFeedTestCase(APITestCase):
    def setUp(self):
      
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client = APIClient()
        self.client.login(username='testuser', password='password123')

        self.post1 = Post.objects.create(
            title="Post 1",
            description="Description 1",
            author=self.user,
            created_at=datetime.now() - timedelta(days=1)
        )
        self.post2 = Post.objects.create(
            title="Post 2",
            description="Description 2",
            author=self.user,
            created_at=datetime.now() - timedelta(days=2)
        )

        Comment.objects.create(post=self.post1, author=self.user, body="Comment 1")
        Comment.objects.create(post=self.post2, author=self.user, body="Comment 2")

        Bookmark.objects.create(user=self.user, post=self.post1)

        self.feed_url = '/feed/'  

    def test_get_feed_success(self):
        response = self.client.get(self.feed_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('feed', response.data)
        self.assertEqual(len(response.data['feed']), 2) 

    def test_feed_contains_correct_data(self):
        response = self.client.get(self.feed_url)

        feed = response.data['feed']
        post1_data = next(post for post in feed if post['id'] == self.post1.id)

        self.assertEqual(post1_data['title'], self.post1.title)
        self.assertEqual(post1_data['description'], self.post1.description)
        self.assertEqual(post1_data['author'], self.user.username)



    def test_feed_no_posts(self):
        Post.objects.all().delete()

        response = self.client.get(self.feed_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['feed']), 0)

    def test_feed_unauthenticated(self):
        self.client.logout()

        response = self.client.get(self.feed_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        feed = response.data['feed']

        for post in feed:
            self.assertFalse(post['is_liked'])  
            self.assertFalse(post['is_bookmarked'])  
