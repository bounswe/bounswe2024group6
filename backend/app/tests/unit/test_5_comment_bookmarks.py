from rest_framework.test import APITestCase
from rest_framework import status
from app.models import Comment, CommentBookmark, User
from app.models import Post

    
from rest_framework_simplejwt.tokens import RefreshToken  # Import for JWT token generation

class CommentBookmarkTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        
        self.post = Post.objects.create(
            title="Test Post",
            description="This is a test post.",
            author=self.user,
        )

        self.comment = Comment.objects.create(
            body="Test Comment",
            author=self.user,
            post=self.post,  
        )

        self.bookmark_url = "/comments/bookmark/"
        self.unbookmark_url = "/comments/unbookmark/"
        self.get_bookmarked_url = "/comments/bookmarked/"


    def test_bookmark_comment(self):
        response = self.client.post(self.bookmark_url, {"comment_id": self.comment.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["detail"], "Comment bookmarked successfully.")
        self.assertTrue(CommentBookmark.objects.filter(user=self.user, comment=self.comment).exists())

    def test_bookmark_comment_already_bookmarked(self):
        CommentBookmark.objects.create(user=self.user, comment=self.comment)
        response = self.client.post(self.bookmark_url, {"comment_id": self.comment.id})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "Comment is already bookmarked.")

    def test_unbookmark_comment(self):
        CommentBookmark.objects.create(user=self.user, comment=self.comment)
        response = self.client.post(self.unbookmark_url, {"comment_id": self.comment.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Comment unbookmarked successfully.")
        self.assertFalse(CommentBookmark.objects.filter(user=self.user, comment=self.comment).exists())

    def test_unbookmark_comment_not_bookmarked(self):
        response = self.client.post(self.unbookmark_url, {"comment_id": self.comment.id})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "Comment is not bookmarked.")

    def test_get_bookmarked_comments(self):
        CommentBookmark.objects.create(user=self.user, comment=self.comment)
        response = self.client.get(self.get_bookmarked_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["body"], "Test Comment")
