import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import PostCard from './components/postcard'; // Assuming you already have the PostCard component defined
import CommentCard from './components/commentcard'; // Assuming you already have the CommentCard component defined
import { useLocalSearchParams } from 'expo-router';
import { fetchForumPostWithId, fetchCommentsForPost } from './api/forum'; // Fetch post and comments API
import { bookmarkPost, likePost } from './api';

const ForumPostPage = () => {
  const { id } = useLocalSearchParams(); // Get post ID from parameters

  // State for post data
  const [post, setPost] = useState<{
    id: number | null;
    title: string;
    author: string;
    likes: number;
    liked: boolean;
    bookmarked: boolean;
  }>({
    id: null,
    title: '',
    author: '',
    likes: 0,
    liked: false,
    bookmarked: false,
  });

  // State for comments data
  const [comments, setComments] = useState([
    {
      id:1,
    username : "anil",
    comment : "well done well donewell donewell donewell donewell donewell donewell donewell donewell done",
    upvoteCount : 100,
    isBookmarked : false
    },
    {
      id:2,
    username : "anil",
    comment : "well done",
    upvoteCount : 100,
    isBookmarked : false
    },
    {
      id:3,
    username : "anil",
    comment : "well done",
    upvoteCount : 100,
    isBookmarked : false
    },
    {
      id:4,
    username : "anil",
    comment : "well done",
    upvoteCount : 100,
    isBookmarked : false
    },
    {
      id:5,
    username : "anil",
    comment : "well done",
    upvoteCount : 100,
    isBookmarked : false
    },
    {
      id:6,
    username : "anil",
    comment : "well done",
    upvoteCount : 100,
    isBookmarked : false
    },
    {
      id:7,
    username : "anil",
    comment : "well done",
    upvoteCount : 100,
    isBookmarked : false
    }



  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPost(
      {
      id: 123,
      title: "Example Title",
      author: "Example Author",
      likes: 12,
      liked: false,
      bookmarked: true,
    }
  );

  }, []);

  useEffect(() => {
    // Fetch post details
    const fetchPost = async () => {
      try {
        const postData = await fetchForumPostWithId(id);
        setPost(postData || {
          id: 123,
          title: "Example Title",
          author: "Example Author",
          likes: 12,
          liked: false,
          bookmarked: true,
        });
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    // Fetch comments
    const fetchComments = async () => {
      try {
        const commentsData = await fetchCommentsForPost(id); // Call the API to get comments
        setComments(commentsData || []); // Set comments data or an empty array if none found
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleLikePress = async () => {
    const newLikedState = !post.liked;

    setPost({
          ...post,
          liked: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
    });
    console.log(newLikedState)
    // console.log(newLikedState)

    try {
      const response = await likePost(post.id);
      if (response.success) {
        setPost(prevPost => ({
          ...prevPost,
          liked: !prevPost.liked,
          likes: prevPost.liked ? prevPost.likes - 1 : prevPost.likes + 1,
        }));
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleBookmarkPress = async () => {
    try {
      const response = await bookmarkPost(post.id);
      if (response.success) {
        setPost(prevPost => ({
          ...prevPost,
          bookmarked: !prevPost.bookmarked,
        }));
      }
    } catch (error) {
      console.error('Failed to bookmark post:', error);
    }
  };

  // Render each comment in a CommentCard component
  const renderComment = ({ item }) => (
    <CommentCard
      username={item.username}
      comment={item.comment}
      upvoteCount={item.upvoteCount}
      isBookmarked={item.isBookmarked}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <PostCard
        id= {String(post.id)}
        title={post.title}
        author={post.author}
        likes={post.likes}
        liked={post.liked}
        isBookmarked={post.bookmarked}
        feedOrPost="post"
        onUpvote={handleLikePress}
        onBookmark={handleBookmarkPress}
      />

      {/* Comments Section */}
      <Text style={styles.sectionTitle}>Comments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderComment}
          contentContainerStyle={styles.commentsContainer}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  commentsContainer: {
    paddingBottom: 20, // For some padding at the end of the list
  },
});

export default ForumPostPage;
