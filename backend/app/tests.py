from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from app.models import Profile
from rest_framework import status
from app.models import Post, Quiz, QuizProgress, Question
from django.utils import timezone

class UserRegistrationTest(APITestCase):
    def setUp(self):
        self.register_url = "/signup/"

    def test_register_user(self):
        """Test registering a new user"""
        data = {
            "username": "testuser",
            "password": "testpassword",
            "email": "testuser@example.com",
            "profile": {
                "name": "Test User",
                "level": 1
            }
        }

        response = self.client.post(self.register_url, data, format="json")

        # Assert the user is created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("username", response.data)
        self.assertEqual(response.data["username"], data["username"])

        # Verify the user exists in the database
        self.assertTrue(User.objects.filter(username=data["username"]).exists())

        # Verify the profile is created with the user
        user = User.objects.get(username=data["username"])
        self.assertTrue(hasattr(user, "profile"))
        self.assertEqual(user.profile.name, "Test User")
        self.assertEqual(user.profile.level, 1)


class UserAuthenticationTest(APITestCase):
    def setUp(self):
        self.login_url = "/login/"
        self.logout_url = "/logout/"
        self.refresh_url = "/refresh/"

        # Create a user for testing
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            email="testuser@example.com"
        )

        # Generate refresh token for the user
        refresh = RefreshToken.for_user(self.user)
        self.refresh_token = str(refresh)
        self.access_token = str(refresh.access_token)

    def test_login_user(self):
        """Test user login to obtain JWT tokens"""
        data = {
            "username": "testuser",
            "password": "testpassword"
        }

        response = self.client.post(self.login_url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_logout_user(self):
        """Test user logout with a valid refresh token"""
        data = {"refresh": self.refresh_token}

        response = self.client.post(
            self.logout_url,
            data,
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Successfully logged out.")

    def test_refresh_token(self):
        """Test refreshing an access token with a valid refresh token"""
        data = {"refresh": self.refresh_token}

        response = self.client.post(self.refresh_url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)



class ProfileTests(APITestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username="testuser", password="password")

        # Retrieve the profile created by the signal
        self.profile = self.user.profile

        # Update the profile as needed
        self.profile.name = "Test User"
        self.profile.level = 1
        self.profile.save()

        self.client = APIClient()

        self.view_profile_url = "/profile/"
        self.update_profile_url = "/profile/update/"

    def test_view_profile(self):
        """Test retrieving the profile of the authenticated user"""
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.view_profile_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Test User")
        self.assertEqual(response.data["level"], 1)

    def test_update_profile(self):
        """Test updating the profile of the authenticated user"""
        self.client.force_authenticate(user=self.user)
        update_data = {"name": "Updated User", "level": 2}

        response = self.client.post(self.update_profile_url, update_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Updated User")
        self.assertEqual(response.data["level"], 2)

        # Verify the profile is updated in the database
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.name, "Updated User")
        self.assertEqual(self.profile.level, 2)




class PostTests(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Define URLs
        self.create_post_url = '/post/create/'
        self.get_user_posts_url = '/post/my-posts/'
        self.like_post_url = '/post/like/'
        self.unlike_post_url = '/post/unlike/'
        self.delete_post_url = '/post/delete/'

        # Create a test post
        self.post = Post.objects.create(
            title="Test Post",
            description="This is a test post.",
            author=self.user.username,
            tags=["test", "post"],
            created_at=timezone.now()
        )

    def test_create_post(self):
        """Test creating a new post"""
        data = {
            "title": "New Post",
            "description": "This is a new post.",
            "tags": ["new", "post"]
        }
        response = self.client.post(self.create_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('post_id', response.data)

        # Verify the post exists in the database
        post_id = response.data['post_id']
        self.assertTrue(Post.objects.filter(id=post_id).exists())
        post = Post.objects.get(id=post_id)
        self.assertEqual(post.title, data['title'])
        self.assertEqual(post.description, data['description'])
        self.assertEqual(post.tags, data['tags'])
        self.assertEqual(post.author, self.user.username)

    def test_get_posts_of_user(self):
        """Test retrieving posts of the authenticated user"""
        response = self.client.get(self.get_user_posts_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('posts', response.data)
        self.assertEqual(len(response.data['posts']), 1)

        post_data = response.data['posts'][0]
        self.assertEqual(post_data['title'], self.post.title)
        self.assertEqual(post_data['description'], self.post.description)
        self.assertEqual(post_data['tags'], self.post.tags)
        self.assertEqual(post_data['like_count'], self.post.like_count)

    def test_like_post(self):
        """Test liking a post"""
        data = {"post_id": self.post.id}
        response = self.client.post(self.like_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], "Post liked successfully.")
        self.assertEqual(response.data['like_count'], 1)

        # Verify the user is in the liked_by list
        self.post.refresh_from_db()
        self.assertIn(self.user, self.post.liked_by.all())

    def test_unlike_post(self):
        """Test unliking a post"""
        # First, like the post
        self.post.liked_by.add(self.user)
        self.post.like_count = 1
        self.post.save()

        data = {"post_id": self.post.id}
        response = self.client.post(self.unlike_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], "Post unliked successfully.")
        self.assertEqual(response.data['like_count'], 0)

        # Verify the user is not in the liked_by list
        self.post.refresh_from_db()
        self.assertNotIn(self.user, self.post.liked_by.all())

    def test_delete_post(self):
        """Test deleting a post"""
        data = {"post_id": self.post.id}
        response = self.client.post(self.delete_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], "Post deleted successfully.")

        # Verify the post no longer exists
        self.assertFalse(Post.objects.filter(id=self.post.id).exists())

    def test_create_post_without_tags(self):
        """Test creating a post without providing tags"""
        data = {
            "title": "Tagless Post",
            "description": "This post has no tags."
        }
        response = self.client.post(self.create_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post_id = response.data['post_id']

        # Verify the post exists and tags are an empty list
        post = Post.objects.get(id=post_id)
        self.assertEqual(post.tags, [])

    def test_like_post_already_liked(self):
        """Test liking a post that the user has already liked"""
        self.post.liked_by.add(self.user)
        self.post.like_count = 1
        self.post.save()

        data = {"post_id": self.post.id}
        response = self.client.post(self.like_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], "You have already liked this post.")

    def test_unlike_post_not_liked(self):
        """Test unliking a post that the user has not liked"""
        data = {"post_id": self.post.id}
        response = self.client.post(self.unlike_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], "You have not liked this post yet.")

    def test_delete_post_not_author(self):
        """Test deleting a post when the user is not the author"""
        # Create another user and post
        other_user = User.objects.create_user(username="otheruser", password="password")
        other_post = Post.objects.create(
            title="Other User Post",
            description="Post by another user.",
            author=other_user.username,
            tags=["other", "user"],
            created_at=timezone.now()
        )

        data = {"post_id": other_post.id}
        response = self.client.post(self.delete_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], "You do not have permission to delete this post.")

    def test_create_post_invalid_tags(self):
        """Test creating a post with invalid tags"""
        data = {
            "title": "Invalid Tags Post",
            "description": "This post has invalid tags.",
            "tags": "notalist"  # Invalid, should be a list
        }
        response = self.client.post(self.create_post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], "Tags must be a list of strings.")

    def test_get_posts_of_user_no_posts(self):
        """Test retrieving posts when the user has no posts"""
        # Delete all posts by the user
        Post.objects.filter(author=self.user.username).delete()

        response = self.client.get(self.get_user_posts_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['posts']), 0)


class QuizViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpassword')

        self.quiz = Quiz.objects.create(
            title='English Vocabulary Quiz',
            description='A quiz to test your English skills.',
            level='A1',
            author=self.user,
            question_count=2
        )
        self.question1 = Question.objects.create(
            quiz=self.quiz, question_text='What is the English word for "elma"?',
            choice1='Banana', choice2='Apple', choice3='Orange', choice4='Pineapple', correct_choice=2
        )
        self.question2 = Question.objects.create(
            quiz=self.quiz, question_text='What is the English word for "kedi"?',
            choice1='Cat', choice2='Dog', choice3='Bird', choice4='Fish', correct_choice=1
        )

    def test_create_quiz(self):
        quiz_data = {
            'quiz': {
                'title': 'Basic English Quiz',
                'description': 'A simple quiz for learning English basics.',
                'level': 'A1'
            },
            'questions': [
                {'question_text': 'Translate "merhaba" to English.', 'choice1': 'Hello', 'choice2': 'Hi', 'choice3': 'Goodbye', 'choice4': 'Thanks', 'correct_choice': 1},
                {'question_text': 'Translate "kitap" to English.', 'choice1': 'Notebook', 'choice2': 'Book', 'choice3': 'Pen', 'choice4': 'Desk', 'correct_choice': 2}
            ]
        }

        response = self.client.post('/quiz/create/', quiz_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('title', response.data)
        self.assertEqual(response.data['title'], quiz_data['quiz']['title'])

        quiz = Quiz.objects.get(title=quiz_data['quiz']['title'])
        self.assertEqual(quiz.author, self.user)
        self.assertEqual(quiz.question_count, len(quiz_data['questions']))

    def test_submit_quiz(self):
        quiz_progress = QuizProgress.objects.create(quiz=self.quiz, user=self.user, completed=False)

        self.client.post('/quiz/question/solve/', {'quiz_progress_id': quiz_progress.id, 'question_number': self.question1.question_number, 'answer': 2})
        self.client.post('/quiz/question/solve/', {'quiz_progress_id': quiz_progress.id, 'question_number': self.question2.question_number, 'answer': 1})

        response = self.client.post('/quiz/submit/', {'quiz_progress_id': quiz_progress.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('result_url', response.data)

        quiz_progress.refresh_from_db()
        self.assertTrue(quiz_progress.completed)
        self.assertEqual(self.quiz.total_score, 2)

    def test_get_quiz(self):
        response = self.client.get(f'/quiz/{self.quiz.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('quiz', response.data)
        self.assertEqual(response.data['quiz']['title'], self.quiz.title)
        self.assertFalse(response.data['is_solved'])

    def test_start_quiz(self):
        response = self.client.post('/quiz/start/', {'quiz_id': self.quiz.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('questions', response.data)
        self.assertEqual(response.data['quiz_title'], self.quiz.title)
        self.assertEqual(response.data['question_count'], self.quiz.question_count)

        quiz_progress = QuizProgress.objects.filter(user=self.user, quiz=self.quiz).first()
        self.assertIsNotNone(quiz_progress)
        self.assertEqual(quiz_progress.quiz, self.quiz)

    def test_like_quiz(self):
        response = self.client.post('/quiz/like/', {'quiz_id': self.quiz.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Quiz liked')

        self.quiz.refresh_from_db()
        self.assertIn(self.user, self.quiz.liked_by.all())

        response = self.client.post('/quiz/like/', {'quiz_id': self.quiz.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Quiz unliked')

        self.quiz.refresh_from_db()
        self.assertNotIn(self.user, self.quiz.liked_by.all())
