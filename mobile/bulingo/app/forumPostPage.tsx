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
    tags: string[];
  }>({
    id: null,
    title: '',
    author: '',
    likes: 0,
    liked: false,
    bookmarked: false,
    tags:[]
  });

  // State for comments data
  const [comments, setComments] = useState([
    {
      id:1,
    username : "anil",
    comment : "well done well donewell donewell donewell donewell donewell donewell donewell donewell done",
    likes : 100,
    isBookmarked : false,
    liked: false
      }
    // ,
    // {
    //   id:2,
    // username : "anil",
    // comment : "well done",
    // upvoteCount : 100,
    // isBookmarked : false
    // },
    // {
    //   id:3,
    // username : "anil",
    // comment : "well done",
    // upvoteCount : 100,
    // isBookmarked : false
    // },
    // {
    //   id:4,
    // username : "anil",
    // comment : "well done",
    // upvoteCount : 100,
    // isBookmarked : false
    // },
    // {
    //   id:5,
    // username : "anil",
    // comment : "well done",
    // upvoteCount : 100,
    // isBookmarked : false
    // },
    // {
    //   id:6,
    // username : "anil",
    // comment : "well done",
    // upvoteCount : 100,
    // isBookmarked : false
    // },
    // {
    //   id:7,
    // username : "anil",
    // comment : "well done",
    // upvoteCount : 100,
    // isBookmarked : false
    // }



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
      tags: ["vocabulary", "business"]
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
          tags: ["vocabulary", "business"]
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

  const handleLikePost = async () => {
    const newLikedState = !post.liked;

    setPost({
          ...post,
          liked: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
    });

    // try {
    //   const response = await likePost(post.id);
    //   if (response.success) {
    //     setPost(prevPost => ({
    //       ...prevPost,
    //       liked: !prevPost.liked,
    //       likes: prevPost.liked ? prevPost.likes - 1 : prevPost.likes + 1,
    //     }));
    //   }
    // } catch (error) {
    //   console.error('Failed to like post:', error);
    // }
  };


  const handleLikeComment = async (commentId: number) => {
    console.log("likecomment")
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              likes: !comment.liked ? comment.likes + 1 : comment.likes - 1,
              isBookmarked: !comment.isBookmarked,
              liked: !comment.liked
            }
          : comment
      )
    );

    // try {
    //   const response = await likeComment(commentId);
    //   if (response.success) {
    //     setComments(prevComments =>
    //       prevComments.map(comment =>
    //         comment.id === commentId
    //           ? {
    //               ...comment,
    //               upvoteCount: comment.isBookmarked ? comment.upvoteCount - 1 : comment.upvoteCount + 1,
    //               isBookmarked: !comment.isBookmarked,
    //             }
    //           : comment
    //       )
    //     );
    //   }
    // } catch (error) {
    //   console.error('Failed to like comment:', error);
    // }
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
      id = {item.id}
      username={item.username}
      onUpvote={handleLikeComment}
      comment={item.comment}
      isBookmarked={item.isBookmarked}
      liked={item.liked}
      likes= {item.likes}
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
        onUpvote={handleLikePost}
        onBookmark={handleBookmarkPress}
        tags={post.tags}
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
