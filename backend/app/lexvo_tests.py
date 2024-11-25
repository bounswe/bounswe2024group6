from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from app.models import Profile
from rest_framework import status
from app.models import Post, Quiz, QuizProgress, Question
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from app.models import Word, Translation
import json
from unittest.mock import patch



class QuizEndpointsAPITests(APITestCase):
    def setUp(self):
        self.word = Word.objects.create(
            word="test",
            meaning="a process for testing",
            sentence="This is a test sentence",
            level="B1",
            part_of_speech="noun"
        )
        self.translation = Translation.objects.create(
            word=self.word,
            translation="test_tr"
        )

    @patch('app.word_service.lexvo_manager.get_final_info')
    def test_get_turkish_translation(self, mock_final_info):
        url = reverse('get_turkish_translation', kwargs={'word': 'test'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['turkish_translation'], 'test_tr')

        mock_final_info.return_value = {"turkish_translations": []}
        url = reverse('get_turkish_translation', kwargs={'word': 'new_word'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch('requests.get')
    def test_get_word_meanings(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "meanings": [{"label": "mocked meaning"}]
        }

        url = reverse('get_word_meanings', kwargs={'word': 'test'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['meaning'], 'a process for testing')

        word = Word.objects.create(
            word="multiple",
            meaning=["first meaning", "second meaning"]
        )
        url = reverse('get_word_meanings', kwargs={'word': 'multiple'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['meaning'], 'first meaning')

    @patch('requests.get')
    def test_fetch_english_words(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "english_words": ["mocked_word"]
        }

        url = reverse('fetch_english_word', kwargs={'turkish_word': 'test_tr'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['english_word'], 'test')

        url = reverse('fetch_english_word', kwargs={'turkish_word': 'new_tr'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['english_word'], 'mocked_word')

    def test_error_handling(self):
        url = reverse('get_turkish_translation', kwargs={'word': ' '})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        with patch('requests.get') as mock_get:
            mock_get.side_effect = Exception('Mocked error')
            url = reverse('get_word_meanings', kwargs={'word': 'error_test'})
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def test_meaning_formats(self):
        test_cases = [
            ('string_list', "['meaning1', 'meaning2']", 'meaning1'),
            ('python_list', ['meaning1', 'meaning2'], 'meaning1'),
            ('simple_string', 'simple meaning', 'simple meaning'),
            ('dict_string', '{"meaning": "test"}', '{"meaning": "test"}')
        ]

        for word, meaning, expected in test_cases:
            Word.objects.create(word=word, meaning=meaning)
            url = reverse('get_word_meanings', kwargs={'word': word})
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['meaning'], expected)

    def test_caching_behavior(self):
        with patch('requests.get') as mock_get:
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {
                "english_words": ["cached_word"]
            }
            
            url = reverse('fetch_english_word', kwargs={'turkish_word': 'new_tr'})
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            
            mock_get.reset_mock()
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            mock_get.assert_not_called()

    def tearDown(self):
        Word.objects.all().delete()
        Translation.objects.all().delete()
