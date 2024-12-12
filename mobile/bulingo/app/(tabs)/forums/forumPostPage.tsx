import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import PostCard from '../../components/postcard'; // Assuming you already have the PostCard component defined
import CommentCard from '../../components/commentcard'; // Assuming you already have the CommentCard component defined
import { useLocalSearchParams } from 'expo-router';
import { getPostDetails, unlikePost, likePost, unbookmarkPost, bookmarkPost, unlikeComment, likeComment } from '../../api/forum'; // Fetch post and comments API
// import { bookmarkPost, likePost } from '../../api';

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
    tags:[],
    comments: []
  });



  // State for comments data
  // const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   var post = getPostDetails(Number(id));
  //   console.log(post);
    
  // //   setPost(
  // //     {
  // //     id: 123,
  // //     title: "Example Title",
  // //     author: "Example Author",
  // //     likes: 12,
  // //     liked: false,
  // //     bookmarked: true,
  // //     tags: ["vocabulary", "business"]
  // //   }
  // // );

  // }, []);

  useEffect(() => {
    // Fetch post details
    const fetchPostandComments = async () => {
      try {
        var response = await getPostDetails(Number(id));
        
        var post = response.post
        console.log(post);
        
      //   const postData = await fetchForumPostWithId(id);
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


      //   [
      //     {
      //         "id": 1,
      //         "post": 2,
      //         "author": "asd",
      //         "body": "bodyyy",
      //         "created_at": "2024-11-25T12:14:17.313636Z",
      //         "parent": null,
      //         "replies": [],
      //         "is_liked": false,
      //         "like_count": 0
      //     }
      // ]



      
        
        // setComments(
        //   post.comments
        // )
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }finally{
        setLoading(false);
      }
    }

   
    fetchPostandComments();
  }, [id]);

  const handleLikePost = async () => {
    if(post.liked){

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
          })
        }

      } catch (error) {
        console.error('Failed to unlike post:', error);
      }



    }


    else{
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
          })
        }
      } catch (error) {
        console.error('Failed to like post:', error);
      }
    }


  };


  const handleLikeComment = async (commentId: number) => {



    post.comments.map(async comment => {

      if (comment.id === commentId) {
        if(comment.is_liked){

          try {
            const response = await unlikeComment(commentId);
            if (response) {

              
              setPost(post => ({
                ...post,
                comments: post.comments.map(comment => {
                  if (comment.id === commentId) {
                    return {
                      ...comment,
                      is_liked:  !comment.is_liked,
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



        }


        else{

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
    })






    // setComments(prevComments =>
    //   prevComments.map(comment =>
    //     comment.id === commentId
    //       ? {
    //           ...comment,
    //           likes: !comment.liked ? comment.likes + 1 : comment.likes - 1,
    //           isBookmarked: !comment.isBookmarked,
    //           liked: !comment.liked
    //         }
    //       : comment
    //   )
    // );

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
    if(post.bookmarked){

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
          })
        }

      } catch (error) {
        console.error('Failed to unbookmark post:', error);
      }



    }


    else{
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
          })
        }
      } catch (error) {
        console.error('Failed to bookmark post:', error);
      }
    }


  };

  // Render each comment in a CommentCard component
  const renderComment = ({ item }) => (

  
    <CommentCard
      id = {item.id}
      username={item.author}
      onUpvote={handleLikeComment}
      comment={item.body}
      isBookmarked={item.isBookmarked}
      liked={item.is_liked}
      likes= {item.like_count}
    />
  );


  return (
    <>    
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderComment}
          contentContainerStyle={styles.commentsContainer}
          ListHeaderComponent={
            <>
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

            </>
          }
          ListHeaderComponentStyle={styles.container}
        />
      )}
  </>
);
};

const styles = StyleSheet.create({
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
});

export default ForumPostPage;
