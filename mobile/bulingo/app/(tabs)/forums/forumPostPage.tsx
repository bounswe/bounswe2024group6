import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import PostCard from '../../components/postcard'; // Assuming you already have the PostCard component defined
import CommentCard from '../../components/commentcard'; // Assuming you already have the CommentCard component defined
import { useLocalSearchParams } from 'expo-router';
import { getPostDetails,getGuestUserPostDetails, unlikePost, likePost, unbookmarkPost, bookmarkPost, unlikeComment, likeComment, addComment } from '../../api/forum'; // Fetch post and comments API
import TokenManager from '@/app/TokenManager';
import GuestModal from '@/app/components/guestModal';

interface Comment {
  id: number;
  post: number;
  author: string;
  body: string;
  created_at: string;
  parent: number | null;
  replies: Comment[];
  is_liked: boolean;
  like_count: number;
  is_bookmarked: boolean;
}

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
    comments: Comment[];
  }>({
    id: null,
    title: '',
    author: '',
    likes: 0,
    liked: false,
    bookmarked: false,
    tags: [],
    comments: []
  });

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  useEffect(() => {
    // Fetch post details
    const fetchPostandComments = async () => {
      try {
        if(!TokenManager.getUsername()){
          var response =  await getGuestUserPostDetails(Number(id));
        }else{
            var response =  await getPostDetails(Number(id));
        }
        // var response = await getPostDetails(Number(id));
        var post = response.post;
        console.log(post);

        setPost({
          id: post.id,
          title: post.title,
          author: post.author,
          likes: post.like_count,
          liked: post.is_liked,
          bookmarked: post.is_bookmarked,
          tags: post.tags,
          comments: post.comments
        });
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPostandComments();
  }, [id]);

  const handleLikePost = async () => {
    if (post.liked) {
      try {
        const response = await unlikePost(Number(id));
        if (response) {
          setPost(post => {
            if (post.id === Number(id)) {
              return {
                ...post,
                liked: response.is_liked,
                likes: response.like_count
              };
            }
            return post;
          });
        }
      } catch (error) {
        console.error('Failed to unlike post:', error);
      }
    } else {
      try {
        const response = await likePost(Number(id));
        if (response) {
          setPost(post => {
            if (post.id === Number(id)) {
              return {
                ...post,
                liked: response.is_liked,
                likes: response.like_count
              };
            }
            return post;
          });
        }
      } catch (error) {
        console.error('Failed to like post:', error);
      }
    }
  };

  const handleLikeComment = async (commentId: number) => {
    post.comments.map(async comment => {
      if (comment.id === commentId) {
        if (comment.is_liked) {
          try {
            const response = await unlikeComment(commentId);
            if (response) {
              setPost(post => ({
                ...post,
                comments: post.comments.map(comment => {
                  if (comment.id === commentId) {
                    return {
                      ...comment,
                      is_liked: !comment.is_liked,
                      like_count: response.like_count
                    };
                  }
                  return comment;
                })
              }));
            }
          } catch (error) {
            console.error('Failed to unlike comment:', error);
          }
        } else {
          try {
            const response = await likeComment(commentId);
            if (response) {
              setPost(post => ({
                ...post,
                comments: post.comments.map(comment => {
                  if (comment.id === commentId) {
                    return {
                      ...comment,
                      is_liked: !comment.is_liked,
                      like_count: response.like_count
                    };
                  }
                  return comment;
                })
              }));
            }
          } catch (error) {
            console.error('Failed to like comment:', error);
          }
        }
      }
    });
  };

  const handleBookmarkPress = async () => {
    if (post.bookmarked) {
      try {
        const response = await unbookmarkPost(Number(id));
        if (response) {
          setPost(post => {
            if (post.id === Number(id)) {
              return {
                ...post,
                bookmarked: response.is_bookmarked,
              };
            }
            return post;
          });
        }
      } catch (error) {
        console.error('Failed to unbookmark post:', error);
      }
    } else {
      try {
        const response = await bookmarkPost(Number(id));
        if (response) {
          setPost(post => {
            if (post.id === Number(id)) {
              return {
                ...post,
                bookmarked: response.is_bookmarked,
              };
            }
            return post;
          });
        }
      } catch (error) {
        console.error('Failed to bookmark post:', error);
      }
    }
  };

  const handleAddComment = async (postId: number, newComment: string) => {
    
    try {

      
      const response = await addComment(postId, newComment);
      if (response) {
        setPost(post => ({
          ...post,
          comments: [...post.comments, response]
        }));
        setNewComment('');
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  // Render each comment in a CommentCard component
  const renderComment = ({ item }) => (
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

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
        {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}

        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderComment}
          contentContainerStyle={styles.commentsContainer}
          ListHeaderComponent={
            <>
              <PostCard
                id={String(post.id)}
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
              <View style={styles.commentsHeader}>
                <Text style={styles.sectionTitle}>Comments</Text>
                {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={styles.addButton}>+</Text>
                </TouchableOpacity> */}
              <TouchableOpacity style={styles.addButtonContainer} 
              onPress={() => {
                if(!TokenManager.getUsername()){
                  setGuestModalVisible(true);
                  return
              }
                setModalVisible(true)}}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
              </View>
            </>
          }
          ListHeaderComponentStyle={styles.container}
        />
        </>
      )}

      {/* Modal for adding a comment */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Comment</Text>
            <TextInput
              style={styles.input}
              placeholder="Write your comment..."
              value={newComment}
              onChangeText={setNewComment}
              multiline={true}
              numberOfLines={4} 
            />
            {/* <Button title="Submit" onPress={() => handleAddComment(post.id, newComment)} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} /> */}
            <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#000000" />

              <View style={styles.buttonSpacing} />
              <Button title="Submit" onPress={() => handleAddComment(post.id, newComment)} color="#000000" />

            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonSpacing: {
    width: 10, // Adjust the width to set the desired space between buttons
  },

  addButtonContainer: {
    backgroundColor: '#000000',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 25
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
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  addButton: {
    fontSize: 24,
    color: '#007BFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 100, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top'
  },
});

export default ForumPostPage;