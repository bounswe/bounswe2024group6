from django.core.cache import cache
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class CacheManager:
    """
    A utility class to manage caching operations consistently across the application.
    Provides methods for getting, setting, and invalidating cached data.
    """
    
    def __init__(self):
        self.cache = cache
        self.timeouts = getattr(settings, 'CACHE_TIMEOUTS', {})

    def get_cache_key(self, prefix, identifier):
        """
        Creates a consistent cache key format across the application.
        Example: 'quiz_list_page_1' or 'post_detail_123'
        """
        return f"{prefix}_{identifier}"
    

    def get_or_set(self, prefix, identifier, callback):
        """
        Gets data from cache if it exists, otherwise calls the callback
        to fetch and cache the data.
        
        Args:
            prefix: Type of data being cached (e.g., 'quiz_list')
            identifier: Unique identifier (e.g., 'page_1' or '123')
            callback: Function to call if cache miss occurs
        """
        cache_key = self.get_cache_key(prefix, identifier)
        data = self.cache.get(cache_key)
        
        if data is None:
            logger.debug(f"Cache miss for key: {cache_key}")
            data = callback()
            timeout = self.timeouts.get(prefix, 300)  # Default 5 minutes
            self.cache.set(cache_key, data, timeout)
            logger.debug(f"Cached data for key: {cache_key}")
        else:
            logger.debug(f"Cache hit for key: {cache_key}")
            
        return data
    
    def invalidate(self, prefix, identifier):
        """
        Removes specific data from cache.
        """
        cache_key = self.get_cache_key(prefix, identifier)
        self.cache.delete(cache_key)
        logger.debug(f"Invalidated cache for key: {cache_key}")
    