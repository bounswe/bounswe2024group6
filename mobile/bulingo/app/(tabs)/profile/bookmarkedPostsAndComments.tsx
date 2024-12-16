import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import TokenManager from '@/app/TokenManager';
import CommentCard from '@/app/components/commentcard';
import PostCard from '@/app/components/postcard';
import { router } from 'expo-router';
import { likePost, bookmarkPost, unlikePost, unbookmarkPost, likeComment, unlikeComment } from '../../api/forum'; // Import the functions from forum.tsx

export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedComments, setBookmarkedComments] = useState<any[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchBookmarkedPostAndComments = async () => {
      const username = TokenManager.getUsername();
      if(username === undefined){
        console.error('username is undefined!');
        return
      }
      const params = {
        'user': username,
      }
      try {
        const response = await TokenManager.authenticatedFetch("get_bookmarked_posts/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok){
          const result = await response.json();
          setBookmarkedPosts(result);
          try {
            const response2 = await TokenManager.authenticatedFetch("comments/bookmarked/", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(params),
            });
    
            if (response.ok){
              const result2 = await response2.json();
              setBookmarkedComments(result2)
            }
          }
          catch (error){
            console.error(error)
          }
        } else {
          console.log(response.status)
        };
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchBookmarkedPostAndComments();
  }, []);

  if(isLoading){
    return (
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const handlePostPress = (id: number) => {
    router.navigate({pathname: '/(tabs)/forums/forumPostPage', params: {
       "id": id,
      }});
  };

  const handleLikePress = async (postId: number): Promise<void> => { 
    bookmarkedPosts.map(async item => {
      if (item.id === postId) {
        if(item.is_liked){
          try {
            const response = await unlikePost(postId);
            if (response) {
              setBookmarkedPosts(bookmarkedPosts.map(item => {
                return (item.comments && item.id === postId) ? {...item, is_liked: response.is_liked, like_count: response.like_count} : item
              }))
            }
          } catch (error) {
            console.error('Failed to unlike post:', error);
          }
        }
        else{
          try {
            const response = await likePost(postId);
            if (response) {
              setBookmarkedPosts(bookmarkedPosts.map(item => {
                return (item.comments && item.id === postId) ? {...item, is_liked: response.is_liked, like_count: response.like_count} : item
              }))
            }
          } catch (error) {
            console.error('Failed to like post:', error);
          }
        }

      }
    })
    


  };

  const handleBookmarkPress = async (postId: number): Promise<void> => {
    bookmarkedPosts.map(async item => {
      if (item.id === postId) {
        if(item.is_bookmarked){
          try {
            const response = await unbookmarkPost(postId);
            if (response) {
              setBookmarkedPosts(bookmarkedPosts.map(item => {
                return (item.comments && item.id === postId) ? {...item, is_bookmarked: response.is_bookmarked} : item
              }))
            }
          } catch (error) {
            console.error('Failed to unbookmark post:', error);
          }
        }
        else{
          try {
            const response = await bookmarkPost(postId);
            if (response) {
              setBookmarkedPosts(bookmarkedPosts.map(item => {
                return (item.comments && item.id === postId) ? {...item, is_bookmarked: response.is_bookmarked} : item
              }))
            }
          } catch (error) {
            console.error('Failed to bookmark post:', error);
          }
        }
      }
    })
    
  };

  const handleLikeComment = async (commentId: number) => {
    bookmarkedComments.map(async item => {
      if (!item.comments && item.id === commentId) {
        if (item.is_liked) {
          try {
            const response = await unlikeComment(commentId);
            if (response) {
              setBookmarkedComments(bookmarkedComments.map(item => { 
                return (!item.comments && item.id === commentId) ? {...item, is_liked: !item.is_liked, like_count: response.like_count} : item;
              }))
            }
          } catch (error) {
            console.error('Failed to unlike comment:', error);
          }
        } else {
          try {
            const response = await likeComment(commentId);
            if (response) {
              setBookmarkedComments(bookmarkedComments.map(item => { 
                return (!item.comments && item.id === commentId) ? {...item, is_liked: !item.is_liked, like_count: response.like_count} : item;
              }))
            }
          } catch (error) {
            console.error('Failed to like comment:', error);
          }
        }
      }
    });
  };

  return (
    <FlatList
      data={bookmarkedComments.concat(bookmarkedPosts)}
      keyExtractor={item => `${item.id}${item.comments ? 'yes' : 'no'}`}
      renderItem={({item}) => {  // Placeholder, replace with post/comment card
        if(item.comments){
          // /// Post
          return (
            <PostCard title={item.title} id={item.id} author={TokenManager.getUsername() || ''} likes={item.like_count} 
              liked={item.is_liked} tags={item.tags} feedOrPost='feed' isBookmarked={item.is_bookmarked} 
              description={item.description}
              onUpvote={() => handleLikePress(item.id)}
              onBookmark={() => handleBookmarkPress(item.id)}
              onPress={() => handlePostPress(item.id)}
            />
          );
        }
        else{
          // Comment
          return (
            <CommentCard
            id={item.id}
            username={item.author}
            onUpvote={handleLikeComment}
            comment={item.body}
            isBookmarked={item.is_bookmarked}
            liked={item.is_liked}
            likes={item.like_count}
          />
          );
        }
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Bookmarked Posts And Comments</Text>
        </View>
      }
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 5,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

