from django.test import TestCase, Client
from django.urls import reverse
from .models import CustomUser
from .models import Post, SearchResult, Follow, Like
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser, Post, SearchResult, Like, PostComments, Bookmark
from rest_framework.authtoken.models import Token



class UserTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_data = {
            'username': 'test_user',
            'password': 'test_password'
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_login(self):
        url = reverse('user_login')
        response = self.client.post(url, self.user_data)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'token')

    def test_invalid_login(self):
        url = reverse('user_login')
        invalid_data = {
            'username': 'invalid_user',
            'password': 'invalid_password'
        }
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 401)


class GuestFeedTestCase(APITestCase):
    def setUp(self):
        searchresult1 = SearchResult.objects.create(entity_id='1', name= 'name' , image='image', type='type')
        searchresult2 = SearchResult.objects.create(entity_id='2', name= 'name' , image='image', type='type')
        user = CustomUser.objects.create(username='test_user')
        Post.objects.create(title='Post 1', text='Text for post 1', searchresult=searchresult1, author=user)
        Post.objects.create(title='Post 2', text='Text for post 2', searchresult=searchresult2, author=user)

    def test_guest_feed(self):
        url = reverse('guest_feed')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('post_ids' in response.data)
        post_ids = response.data['post_ids']
        self.assertTrue(isinstance(post_ids, list))
        self.assertEqual(len(post_ids), 2)


from django.contrib.auth import get_user_model
User = get_user_model()  

class GetPostsByIdsTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.searchresult = SearchResult.objects.create(entity_id='1')
        self.user = CustomUser.objects.create(username='test_user')
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', searchresult=self.searchresult, author=self.user)

    def test_get_posts_by_ids(self):
        url = reverse('get_posts_by_ids')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.post.title)
        self.assertEqual(response.data['text'], self.post.text)

        



class FollowUnfollowTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = CustomUser.objects.create_user(username='user1', password='password1', email='user1@example.com')
        self.user2 = CustomUser.objects.create_user(username='user2', password='password2', email='user2@example.com')
        self.token1 = Token.objects.create(user=self.user1)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)

    def test_follow_user(self):
        url = reverse('follow_user')
        data = {'username': 'user2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Follow.objects.filter(follower=self.user1, followed=self.user2).exists())

    def test_unfollow_user(self):
        Follow.objects.create(follower=self.user1, followed=self.user2)
        url = reverse('unfollow_user')
        data = {'username': 'user2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.user1, followed=self.user2).exists())

    def test_list_followers(self):
        Follow.objects.create(follower=self.user2, followed=self.user1)
        url = reverse('list_followers')
        data = {'username': 'user1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['followers']), 1)
        self.assertEqual(response.data['followers'][0]['username'], 'user2')

    def test_list_following(self):
        Follow.objects.create(follower=self.user1, followed=self.user2)
        url = reverse('list_following')
        data = {'username': 'user1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['following']), 1)
        self.assertEqual(response.data['following'][0]['username'], 'user2')
        

class LikePostTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.searchresult = SearchResult.objects.create(entity_id='1', name= 'name' , image='image', type='type')
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', author=self.user, searchresult=self.searchresult)

    def test_like_post(self):
        url = reverse('like_post')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Like.objects.filter(user=self.user, post=self.post).exists())
        self.post.refresh_from_db()
        self.assertEqual(self.post.likes_count, 1)

    def test_like_post_without_post_id(self):
        url = reverse('like_post')
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_like_post_nonexistent_post(self):
        url = reverse('like_post')
        data = {'post_id': 999}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_like_post_already_liked(self):
        Like.objects.create(user=self.user, post=self.post)
        url = reverse('like_post')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class GetLikeBackTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.searchresult= SearchResult.objects.create(entity_id='1', name= 'name' , image='image', type='type')
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', author=self.user, searchresult=self.searchresult)
        self.like = Like.objects.create(user=self.user, post=self.post)

    def test_get_like_back(self):
        url = reverse('get_like_back')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Like.objects.filter(user=self.user, post=self.post).exists())
        self.post.refresh_from_db()
        self.assertEqual(self.post.likes_count, 0)

    def test_get_like_back_without_post_id(self):
        url = reverse('get_like_back')
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_like_back_nonexistent_post(self):
        url = reverse('get_like_back')
        data = {'post_id': 999}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_like_back_not_liked_post(self):
        self.like.delete()
        url = reverse('get_like_back')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
class DeletePostTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.searchresult = SearchResult.objects.create(entity_id='1', name= 'name' , image='image', type='type')
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', author=self.user, searchresult=self.searchresult)
        self.comment = PostComments.objects.create(post=self.post, user=self.user, comment_text='This is a comment.')
        self.like = Like.objects.create(user=self.user, post=self.post)
        self.bookmark = Bookmark.objects.create(user=self.user, post=self.post)

    def test_delete_post(self):
        url = reverse('delete_post')
        data = {'post_id': self.post.id}
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Post.objects.filter(id=self.post.id).exists())
        self.assertFalse(PostComments.objects.filter(post=self.post).exists())
        self.assertFalse(Like.objects.filter(post=self.post).exists())
        self.assertFalse(Bookmark.objects.filter(post=self.post).exists())

    def test_delete_nonexistent_post(self):
        url = reverse('delete_post')
        data = {'post_id': 999}
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_post_without_permission(self):
        other_user = CustomUser.objects.create_user(username='otheruser', password='otherpassword', email='other@example.com')
        other_token = Token.objects.create(user=other_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + other_token.key)

        url = reverse('delete_post')
        data = {'post_id': self.post.id}
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Post.objects.filter(id=self.post.id).exists())
        self.assertTrue(PostComments.objects.filter(post=self.post).exists())
        self.assertTrue(Like.objects.filter(post=self.post).exists())
        self.assertTrue(Bookmark.objects.filter(post=self.post).exists())
        
class BookmarkPostTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.searchresult = SearchResult.objects.create(entity_id='1', name= 'name' , image='image', type='type')
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', author=self.user, searchresult=self.searchresult)

    def test_bookmark_post(self):
        url = reverse('bookmark_post')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Bookmark.objects.filter(user=self.user, post=self.post).exists())

    def test_bookmark_post_without_post_id(self):
        url = reverse('bookmark_post')
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_bookmark_nonexistent_post(self):
        url = reverse('bookmark_post')
        data = {'post_id': 999}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unbookmark_post(self):
        Bookmark.objects.create(user=self.user, post=self.post)
        url = reverse('unbookmark_post')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Bookmark.objects.filter(user=self.user, post=self.post).exists())

    def test_unbookmark_post_without_post_id(self):
        url = reverse('unbookmark_post')
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unbookmark_nonexistent_post(self):
        url = reverse('unbookmark_post')
        data = {'post_id': 999}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unbookmark_not_bookmarked_post(self):
        url = reverse('unbookmark_post')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)




User = get_user_model()

class UserProfileTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_user_profile_without_username(self):
        url = reverse('user_profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    

class CommentTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword', email='test@example.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.searchresult = SearchResult.objects.create(entity_id='1', name= 'name' , image='image', type='type')
        self.post = Post.objects.create(title='Test Post', text='This is a test post.', searchresult=self.searchresult, author=self.user)

    def test_add_comment(self):
        url = reverse('comment_post')
        data = {'post_id': self.post.id, 'comment_text': 'This is a test comment.'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(PostComments.objects.filter(user=self.user, post=self.post, comment_text='This is a test comment.').exists())

    def test_add_comment_without_post_id(self):
        url = reverse('comment_post')
        data = {'comment_text': 'This is a test comment.'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_comment_without_comment_text(self):
        url = reverse('comment_post')
        data = {'post_id': self.post.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_comment(self):
        comment = PostComments.objects.create(user=self.user, post=self.post, comment_text='This is a test comment.')
        url = reverse('delete_comment')
        data = {'comment_id': comment.id}
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(PostComments.objects.filter(id=comment.id).exists())

    def test_delete_comment_without_comment_id(self):
        url = reverse('delete_comment')
        response = self.client.delete(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_nonexistent_comment(self):
        url = reverse('delete_comment')
        data = {'comment_id': 999}
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_comment_not_owned(self):
        other_user = CustomUser.objects.create_user(username='otheruser', password='otherpassword', email='other@example.com')
        comment = PostComments.objects.create(user=other_user, post=self.post, comment_text='This is a test comment.')
        url = reverse('delete_comment')
        data = {'comment_id': comment.id}
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

