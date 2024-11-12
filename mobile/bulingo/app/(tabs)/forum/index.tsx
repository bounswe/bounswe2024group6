import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../navbar';
import { router } from 'expo-router';
import PostCard from '../../components/postcard'; 
import { likePost, bookmarkPost } from '../../api/forum'; // Import the functions from forum.tsx


interface ForumPost {
  id: number;
  title: string;
  author: string;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  tags: string[];
}

const initialForumData: ForumPost[] = [
  { 
    id: 1, 
    title: 'Word In Detail: Insurance', 
    author: 'Y.Emre',
    likes: 501,
    liked: false,
    bookmarked: false,
    tags: ['Vocabulary', 'Business']
  },
  {
    id: 2,
    title: "Elevator vs Lift, what's the difference?",
    author: 'Aras',
    likes: 291,
    liked: false,
    bookmarked: false,
    tags: ['Grammar', 'Usage']
  },
  {
    id: 3,
    title: 'MegaThread: Toponymy of Scotland',
    author: 'Kaan',
    likes: 52,
    liked: false,
    bookmarked: false,
    tags: ['Culture']
  }
];

const ForumFeed: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pageSize: number = 5;
  const flatListRef = useRef<FlatList<ForumPost>>(null);
  const navigation = useNavigation();

  useEffect(() => {
     loadPosts();
  }, [page]);

  const loadPosts = (): void => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...initialForumData]);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (text: string): void => {
    setSearchTerm(text);
  };

  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlePostPress = (item: ForumPost) => {
  
    router.navigate({pathname: '../forumPostPage', params: {
       "id": item.id,
       "title": item.title,
       "author": item.author,
       "likes": item.likes,
       "liked": item.liked.toString(),
       "bookmarked": item.bookmarked.toString(),

      
      }});
  };

  const handleAddButton = () => {
    router.push({
      pathname: '../forumPostCreation',
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
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.liked;
        return {
          ...post,
          liked: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));

    
    // try {
    //   const response = await likePost(postId);
    //   if (response.success) {
    //     setPosts(posts.map(post => {
    //       if (post.id === postId) {
    //         const newLikedState = !post.liked;
    //         return {
    //           ...post,
    //           liked: newLikedState,
    //           likes: newLikedState ? post.likes + 1 : post.likes - 1
    //         };
    //       }
    //       return post;
    //     }));
    //   }
    // } catch (error) {
    //   console.error('Failed to like post:', error);
    // }
  };

  const handleBookmarkPress = async (postId: number): Promise<void> => {
    try {
      const response = await bookmarkPost(postId);
      if (response.success) {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, bookmarked: !post.bookmarked };
          }
          return post;
        }));
      }
    } catch (error) {
      console.error('Failed to bookmark post:', error);
    }
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
            source={require('../assets/images/add-icon.png')} 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>

      <FlatList<ForumPost>
        ref={flatListRef}
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => setPage(prev => prev + 1)}
        onEndReachedThreshold={0.5}
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
  },
  navbarContainer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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