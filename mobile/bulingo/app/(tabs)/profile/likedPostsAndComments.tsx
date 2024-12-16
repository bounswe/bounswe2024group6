import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import TokenManager from '@/app/TokenManager';
import { router } from 'expo-router';
import { likePost, bookmarkPost, unlikePost, unbookmarkPost, likeComment, unlikeComment } from '../../api/forum'; // Import the functions from forum.tsx
import PostCard from '@/app/components/postcard';
import CommentCard from '@/app/components/commentcard';

export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [likedComments, setLikedComments] = useState<any[]>([])


  useEffect(() => {
    const fetchLikedPostsAndComments = async () => {
      const url = "post/liked/"
      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok){
          const result = await response.json()
          setLikedPosts(result.liked_posts);
        } else {
          console.log(response.status)
        };
      } catch (error) {
        console.error(error);
      }

      const url2 = "comments/liked/"
      try {
        const response = await TokenManager.authenticatedFetch(url2, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok){
          const result = await response.json()
          setLikedComments(result.liked_comments);
        } else {
          console.log(response.status)
        };
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchLikedPostsAndComments();
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
    likedPosts.map(async item => {
      if (item.id === postId) {
        if(item.is_liked){
          try {
            const response = await unlikePost(postId);
            if (response) {
              setLikedPosts(likedPosts.map(item => {
                return (item.id === postId) ? {...item, is_liked: response.is_liked, like_count: response.like_count} : item
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
              setLikedPosts(likedPosts.map(item => {
                return (item.id === postId) ? {...item, is_liked: response.is_liked, like_count: response.like_count} : item
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
    likedPosts.map(async item => {
      if (item.id === postId) {
        if(item.is_bookmarked){
          try {
            const response = await unbookmarkPost(postId);
            if (response) {
              setLikedPosts(likedPosts.map(item => {
                return (item.id === postId) ? {...item, is_bookmarked: response.is_bookmarked} : item
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
              setLikedPosts(likedPosts.map(item => {
                return (item.id === postId) ? {...item, is_bookmarked: response.is_bookmarked} : item
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
    likedComments.map(async item => {
      if (item.id === commentId) {
        if (item.is_liked) {
          try {
            const response = await unlikeComment(commentId);
            if (response) {
              setLikedComments(likedComments.map(item => { 
                return (item.id === commentId) ? {...item, is_liked: !item.is_liked, like_count: response.like_count} : item;
              }))
            }
          } catch (error) {
            console.error('Failed to unlike comment:', error);
          }
        } else {
          try {
            const response = await likeComment(commentId);
            if (response) {
              setLikedComments(likedComments.map(item => { 
                return (item.id === commentId) ? {...item, is_liked: !item.is_liked, like_count: response.like_count} : item;
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
      data={likedPosts.concat(likedComments)}
      keyExtractor={(item) => `${item.id}${item.tags ? 'yes' : 'no'}`}  // Placeholder, change with quiz card
      renderItem={({item}) => {  // Placeholder, replace with quiz card
        if(item.tags){
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
          <Text style={styles.headerText}>Liked Posts And Comments</Text>
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

