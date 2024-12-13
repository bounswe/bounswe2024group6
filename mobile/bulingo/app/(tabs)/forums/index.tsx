import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../navbar';
import { router, useFocusEffect } from 'expo-router';
import PostCard from '../../components/postcard'; 
import { likePost, bookmarkPost, getUserPostFeed, unlikePost, unbookmarkPost } from '../../api/forum'; // Import the functions from forum.tsx


interface ForumPost {
  id: number;
  title: string;
  author: string;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  tags: string[];
}


const ForumFeed: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost[]>([]);
  // const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const flatListRef = useRef<FlatList<ForumPost>>(null);
  const navigation = useNavigation();
  
  
  
  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );


  const loadPosts = async (): Promise<void> => {

  try {
    var response =  await getUserPostFeed();
    if (loading) return;
    setLoading(true);

    // setPosts((prevPosts) => [...prevPosts, ...feed]);

    var feed = response.feed
    // setPosts(feed)

    
    const posts = feed.map((post: any) => ({
      author: post.author,
      comments: post.comments,
      createdAt: post.created_at,
      description: post.description,
      id: post.id,
      isBookmarked: post.is_bookmarked,
      liked: post.is_liked,
      likes: post.like_count,
      tags: post.tags,
      title: post.title,
    }));

    setPosts(posts);
  } catch (error) {
    console.error('Error loading posts:', error);
  } finally {
    setLoading(false);
  }
};


  const handleSearch = (text: string): void => {
    setSearchTerm(text);
  };

  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlePostPress = (item: ForumPost) => {
  
    router.navigate({pathname: '/(tabs)/forums/forumPostPage', params: {
       "id": item.id,
      //  "title": item.title,
      //  "author": item.author,
      //  "likes": item.likes,
      //  "liked": item.liked.toString(),
      //  "bookmarked": item.bookmarked.toString(),

      
      }});
  };

  const handleAddButton = () => {
    router.push({
      pathname: '/(tabs)/forums/forumPostCreation',
      params: {
        title: 'Create a New Post',      // Custom title
        headerColor: '#4a90e2',          // Custom header color
      },
    });
    // router.navigate('./forumPostCreation');
  }

  // const handlePostPress = (postId: number): void => {
  //   router.navigate('../postDetails');
  // };

  const handleLikePress = async (postId: number): Promise<void> => { 
    
    posts.map(async post => {

      if (post.id === postId) {
        if(post.liked){

          try {
            const response = await unlikePost(postId);
            if (response) {

              setPosts(posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    liked: response.is_liked,
                    likes: response.like_count
                  };
                }
                return post;
              }));
            }
          } catch (error) {
            console.error('Failed to unlike post:', error);
          }



        }


        else{
          try {
            const response = await likePost(postId);
            if (response) {
              setPosts(posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    liked: response.is_liked,
                    likes: response.like_count
                  };
                }
                return post;
              }));
            }
          } catch (error) {
            console.error('Failed to like post:', error);
          }
        }

      }
    })
    


  };

  const handleBookmarkPress = async (postId: number): Promise<void> => {
    posts.map(async post => {

      if (post.id === postId) {
        if(post.bookmarked){

          try {
            const response = await unbookmarkPost(postId);
            if (response) {

              setPosts(posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    bookmarked: response.is_bookmarked,
                  };
                }
                return post;
              }));
            }
          } catch (error) {
            console.error('Failed to unbookmark post:', error);
          }



        }


        else{
          try {
            const response = await bookmarkPost(postId);
            if (response) {
              setPosts(posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    bookmarked: response.is_bookmarked,
                  };
                }
                return post;
              }));
            }
          } catch (error) {
            console.error('Failed to bookmark post:', error);
          }
        }

      }
    })
    
  };


  const renderPostItem: ListRenderItem<ForumPost> = ({ item }) => (
    <PostCard
      id= {String(item.id)}
      title={item.title}
      author={item.author}
      likes={item.likes}
      tags={item.tags}
      liked= {item.liked}
      isBookmarked={item.bookmarked}
      feedOrPost='feed'
      onUpvote={() => handleLikePress(item.id)}
      onBookmark={() => handleBookmarkPress(item.id)}
      onPress={() => handlePostPress(item)}
    />
  );

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search discussions"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => handleAddButton()}
        >
          <Image 
            source={require('../../../assets/images/add-icon.png')} 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>

      <FlatList<ForumPost>
        ref={flatListRef}
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={item => item.id.toString()}
        // onEndReached={() => setPage(prev => prev + 1)}
        // onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? 
          <Text style={styles.loadingText}>Loading more posts...</Text> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 25
  },
  navbarContainer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8

  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    elevation: 2,
  },
  addButton: {
    padding: 8,
  },
  postItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  elevation: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  postContent: {
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  loadingText: {
    textAlign: 'center',
    padding: 16,
    color: '#666',
  },
});

export default ForumFeed;