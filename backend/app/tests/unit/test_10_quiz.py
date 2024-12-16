from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from app.models import Quiz, Question, QuizProgress, QuizResults, ActivityStream
import json

class QuizTestCase(APITestCase):
    def setUp(self):
        # Create two users
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.user2 = User.objects.create_user(username="otheruser", password="password123")

        # Log in as self.user to get a token
        refresh = RefreshToken.for_user(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        # Create a sample quiz authored by self.user
        self.quiz = Quiz.objects.create(
            title="Sample Quiz",
            description="A test quiz",
            level="B1",
            author=self.user
        )

        # Create a question for the quiz
        self.question = Question.objects.create(
            quiz=self.quiz,
            question_text="What is 2+2?",
            choice1="1",
            choice2="2",
            choice3="3",
            choice4="4",
            correct_choice=4,
            question_number=1,
            level="B1"
        )

        self.get_quiz_url = reverse("get_quiz", kwargs={"quiz_id": self.quiz.id})
        self.view_quizzes_url = reverse("feed_quiz")
        self.create_quiz_url = reverse("create_quiz")
        self.get_question_url = reverse("get_question")
        self.solve_question_url = reverse("solve_question")
        self.submit_quiz_url = reverse("submit_quiz")
        self.start_quiz_url = reverse("start_quiz")
        self.get_quiz_results_url = reverse("get_quiz_results")
        self.like_quiz_url = reverse("like_quiz")
        self.bookmark_quiz_url = reverse("bookmark_quiz")
   
        self.view_bookmarked_quizzes_url = reverse("view_bookmarked_quizzes")
        self.view_liked_quizzes_url = reverse("view_bookmarked_quizzes")  # According to provided name in URL
        self.view_created_quizzes_url = reverse("view_created_quizzes", kwargs={"username": self.user.username})
        self.view_solved_quizzes_url = reverse("view_solved_quizzes", kwargs={"username": self.user.username})
        self.delete_quiz_url = reverse("delete_quiz")
        self.update_quiz_url = reverse("update_quiz")
        self.cancel_quiz_url = reverse("cancel_quiz")
        self.cancel_quiz_id_url = reverse("cancel_quiz_id")

    def test_get_quiz(self):
        response = self.client.get(self.get_quiz_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn("quiz", data)
        self.assertEqual(data["quiz"]["id"], self.quiz.id)

    def test_view_quizzes(self):
        response = self.client.get(self.view_quizzes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertTrue(isinstance(data, list))
        self.assertGreaterEqual(len(data), 1)

    def test_create_quiz_success(self):
        quiz_data = {
            "title": "New Quiz",
            "description": "Test quiz creation",
            "level": "B1",
            "tags": json.dumps([{"name": "math"}, {"name": "B1"}]),
            "questions": json.dumps([{
                "question_text": "1+1=?",
                "choice1": "1",
                "choice2": "2",
                "choice3": "3",
                "choice4": "4",
                "correct_choice": 2,
                "question_number": 1
            }])
        }
        response = self.client.post(self.create_quiz_url, quiz_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = response.json()
        self.assertIn("id", data)

    def test_create_quiz_missing_title(self):
        quiz_data = {
            "description": "No title quiz",
            "level": "B1",
            "tags": json.dumps([{"name": "no-title"}]),
            "questions": json.dumps([])
        }
        response = self.client.post(self.create_quiz_url, quiz_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_question(self):

        params = {
            "question_number": self.question.question_number,
            "quiz_id": self.quiz.id
        }
        response = self.client.get(self.get_question_url, params)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn("question", data)

    def test_solve_question(self):
        # First start the quiz
        start_response = self.client.post(self.start_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        self.assertEqual(start_response.status_code, status.HTTP_200_OK)
        quiz_progress_id = start_response.json()["quiz_progress_id"]

        # Solve the question
        solve_data = {
            "quiz_progress_id": quiz_progress_id,
            "question_number": self.question.question_number,
            "answer": self.question.correct_choice
        }
        response = self.client.post(self.solve_question_url, solve_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn("detail", data)
        self.assertIn("Question progress updated.", data["detail"])

    def test_submit_quiz(self):
        # Start quiz and solve question first
        start_response = self.client.post(self.start_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        self.assertEqual(start_response.status_code, status.HTTP_200_OK)
        quiz_progress_id = start_response.json()["quiz_progress_id"]

        solve_data = {
            "quiz_progress_id": quiz_progress_id,
            "question_number": self.question.question_number,
            "answer": self.question.correct_choice
        }
        solve_response = self.client.post(self.solve_question_url, solve_data, format="json")
        self.assertEqual(solve_response.status_code, status.HTTP_200_OK)

        # Now submit the quiz
        submit_response = self.client.post(self.submit_quiz_url, {"quiz_progress_id": quiz_progress_id}, format="json")
        self.assertEqual(submit_response.status_code, status.HTTP_200_OK)
        data = submit_response.json()
        self.assertIn("quiz_result", data)
        self.assertEqual(data["quiz_result"]["score"], 1)

    def test_start_quiz(self):
        response = self.client.post(self.start_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn("questions", data)
        self.assertIn("quiz_progress_id", data)

    def test_get_quiz_results(self):
        # No quiz results yet
        response = self.client.get(self.get_quiz_results_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_like_quiz(self):
        data = {"quiz_id": self.quiz.id}
        response = self.client.post(self.like_quiz_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz liked", response.json()["message"])
        # Unlike
        response2 = self.client.post(self.like_quiz_url, data, format="json")
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz unliked", response2.json()["message"])

    def test_bookmark_quiz(self):
        data = {"quiz_id": self.quiz.id}
        response = self.client.post(self.bookmark_quiz_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz bookmarked", response.json()["message"])
        # Unbookmark
        response2 = self.client.post(self.bookmark_quiz_url, data, format="json")
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz unbookmarked", response2.json()["message"])

    def test_view_bookmarked_quizzes(self):
        self.client.post(self.bookmark_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        response = self.client.get(self.view_bookmarked_quizzes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

    def test_view_liked_quizzes(self):
        self.client.post(self.like_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        response = self.client.get(self.view_liked_quizzes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_view_created_quizzes(self):
        response = self.client.get(self.view_created_quizzes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_view_solved_quizzes(self):
        start_resp = self.client.post(self.start_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        qp_id = start_resp.json()["quiz_progress_id"]
        self.client.post(self.solve_question_url, {
            "quiz_progress_id": qp_id,
            "question_number": self.question.question_number,
            "answer": self.question.correct_choice
        }, format="json")
        self.client.post(self.submit_quiz_url, {"quiz_progress_id": qp_id}, format="json")

        response = self.client.get(self.view_solved_quizzes_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertGreaterEqual(len(data), 1)

    def test_delete_quiz_unauthorized(self):
        # Non-staff user tries to delete a quiz
        response = self.client.post(self.delete_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_quiz_as_staff(self):
        self.user.is_staff = True
        self.user.save()
        response = self.client.post(self.delete_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz deleted", response.json()["message"])

    def test_update_quiz_unauthorized(self):
        refresh = RefreshToken.for_user(self.user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        response = self.client.post(self.update_quiz_url, {
            "quiz_id": self.quiz.id,
            "quiz": {
                "title": "Updated title",
                "description": "Updated description",
                "tags": [{"name": "updated"}]
            }
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_quiz_authorized(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        response = self.client.post(self.update_quiz_url, {
            "quiz_id": self.quiz.id,
            "quiz": {
                "title": "Updated title",
                "description": "Updated description",
                "tags": [{"name": "updated"}]
            }
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cancel_quiz(self):
        start_resp = self.client.post(self.start_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        qp_id = start_resp.json()["quiz_progress_id"]
        response = self.client.post(self.cancel_quiz_url, {"quiz_progress_id": qp_id}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz progress deleted", response.json()["message"])

    def test_cancel_quiz_id(self):
        start_resp = self.client.post(self.start_quiz_url, {"quiz_id": self.quiz.id}, format="json")
        response = self.client.post(self.cancel_quiz_id_url, {"quiz_id": self.quiz.id}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Quiz progress deleted.", response.json()["message"])


