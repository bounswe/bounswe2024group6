import unittest
from unittest.mock import patch, MagicMock
from django.test import TestCase, RequestFactory
from django.core.cache import cache
from django.http import JsonResponse, HttpResponseRedirect
from ...views_directory import get_image, get_image_details, get_direct_image

class ImageHandlingTests(TestCase):
   def setUp(self):
       self.factory = RequestFactory()
       cache.clear()
       
       self.sample_photo_data = {
           'photos': [{
               'src': {
                   'large': 'https://example.com/large.jpg',
                   'small': 'https://example.com/small.jpg'
               },
               'photographer': 'Test Photographer', 
               'url': 'https://example.com/photo'
           }]
       }
       
       self.expected_result = {
           'url': 'https://example.com/large.jpg',
           'thumb': 'https://example.com/small.jpg',
           'photographer': 'Test Photographer',
           'pexels_url': 'https://example.com/photo'
       }

   def tearDown(self):
       cache.clear()

   @patch('requests.get')
   def test_get_image_successful_api_call(self, mock_get):
       mock_response = MagicMock()
       mock_response.status_code = 200
       mock_response.json.return_value = self.sample_photo_data
       mock_get.return_value = mock_response

       result = get_image('test_query')

       mock_get.assert_called_once_with(
           f'{PEXELS_BASE_URL}/search',
           headers={'Authorization': PEXELS_API_KEY},
           params={
               'query': 'test_query',
               'orientation': 'landscape',
               'per_page': 15
           }
       )

       self.assertEqual(result, self.expected_result)

   def test_get_image_from_cache(self):
       cache_key = 'pexels_image_test_query'
       cache.set(cache_key, self.expected_result, 3600)

       with patch('requests.get') as mock_get:
           result = get_image('test_query')
           mock_get.assert_not_called()
           self.assertEqual(result, self.expected_result)

   @patch('requests.get')
   def test_get_image_api_error(self, mock_get):
       mock_get.side_effect = requests.exceptions.RequestException()
       result = get_image('test_query')
       self.assertIsNone(result)

   @patch('requests.get')  
   def test_get_image_empty_response(self, mock_get):
       mock_response = MagicMock()
       mock_response.status_code = 200
       mock_response.json.return_value = {'photos': []}
       mock_get.return_value = mock_response

       result = get_image('test_query')
       self.assertIsNone(result)

   def test_get_image_details_success(self):
       with patch('your_module.get_image') as mock_get_image:
           mock_get_image.return_value = self.expected_result
           
           request = self.factory.get('/image-details/test_query')
           response = get_image_details(request, 'test_query')
           
           self.assertEqual(response.status_code, 200)
           self.assertEqual(response.content.decode(), 
                          JsonResponse(self.expected_result).content.decode())

   def test_get_image_details_not_found(self):
       with patch('your_module.get_image') as mock_get_image:
           mock_get_image.return_value = None
           
           request = self.factory.get('/image-details/test_query')
           response = get_image_details(request, 'test_query')
           
           self.assertEqual(response.status_code, 404)
           expected_error = {
               'error': 'No images found',
               'message': 'No images found for query: test_query'
           }
           self.assertEqual(response.content.decode(),
                          JsonResponse(expected_error, status=404).content.decode())

   def test_get_direct_image_success(self):
       with patch('your_module.get_image') as mock_get_image:
           mock_get_image.return_value = self.expected_result
           
           request = self.factory.get('/direct-image/test_query')
           response = get_direct_image(request, 'test_query')
           
           self.assertEqual(response.status_code, 302)
           self.assertEqual(response.url, self.expected_result['url'])

   def test_get_direct_image_not_found(self):
       with patch('your_module.get_image') as mock_get_image:
           mock_get_image.return_value = None
           
           request = self.factory.get('/direct-image/test_query')
           response = get_direct_image(request, 'test_query')
           
           self.assertEqual(response.status_code, 404)
           expected_error = {'error': 'Image not found'}
           self.assertEqual(response.content.decode(),
                          JsonResponse(expected_error, status=404).content.decode())

   def test_get_direct_image_error(self):
       with patch('your_module.get_image') as mock_get_image:
           mock_get_image.side_effect = Exception('Test error')
           
           request = self.factory.get('/direct-image/test_query')
           response = get_direct_image(request, 'test_query')
           
           self.assertEqual(response.status_code, 500)
           expected_error = {'error': 'Internal server error'}
           self.assertEqual(response.content.decode(),
                          JsonResponse(expected_error, status=500).content.decode())