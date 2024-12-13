import os
import requests
from django.conf import settings
from django.core.cache import cache
import random
from django.http import JsonResponse, HttpResponseRedirect
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes

PEXELS_API_KEY = "50kSA0DclhxjmoeBPQgDT5ZRaw6kNiw7W4JAdf9DCMwfMiouZK2YeXJ1"
PEXELS_BASE_URL = 'https://api.pexels.com/v1'

def get_image(query):
    cache_key = f'pexels_image_{query}'
    cached_result = cache.get(cache_key)
    if cached_result:
        return cached_result

    headers = {'Authorization': PEXELS_API_KEY}
    params = {
        'query': query,
        'orientation': 'landscape',
        'per_page': 15
    }

    try:
        response = requests.get(
            f'{PEXELS_BASE_URL}/search',
            headers=headers,
            params=params
        )

        if response.status_code == 200:
            data = response.json()
            if data['photos']:
                photo = random.choice(data['photos'])
                result = {
                    'url': photo['src']['large'],
                    'thumb': photo['src']['small'],
                    'photographer': photo['photographer'],
                    'pexels_url': photo['url']
                }
                cache.set(cache_key, result, 3600)
                return result
        return None
    except requests.exceptions.RequestException:
        return None

@api_view(['GET'])
def get_image_details(request, query):
    """
    Return image details in JSON format
    """
    try:
        result = get_image(query)
        if result:
            return JsonResponse(result)
        return JsonResponse({
            'error': 'No images found',
            'message': f'No images found for query: {query}'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)

@api_view(['GET'])
def get_direct_image(request, query):
    """
    Redirect directly to image URL
    """
    try:
        result = get_image(query)
        if result and result.get('url'):
            return HttpResponseRedirect(result['url'])
        return JsonResponse({
            'error': 'Image not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)
