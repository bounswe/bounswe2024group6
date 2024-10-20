import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './navbar';
const QuizFeed = () => {
  const [quizzes, setQuizzes] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 7; // Number of quizzes per page
  const totalQuizzes = 20; // Assuming we have 20 quizzes for demo purposes
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<any>();

  const quizData = [
    { id: 1, title: 'Food', description: 'Learn about foods', author: 'Oguz', level: 'A2', likes: 135 },
    { id: 2, title: 'Animals', description: 'Our furry friends!', author: 'Aras', level: 'A2', likes: 12 },
    { id: 3, title: 'Furniture', description: 'Essential furniture', author: 'Kaan', level: 'A2', likes: 3 },
    { id: 4, title: 'Plants', description: 'Test your plant knowledge', author: 'Halil', level: 'A2', likes: 300 },
    { id: 5, title: 'Transport', description: 'Types of transport', author: 'Alex', level: 'B1', likes: 45 },
    { id: 6, title: 'Food', description: 'Learn about foods', author: 'Oguz', level: 'A2', likes: 135 },
    { id: 7, title: 'Animals', description: 'Our furry friends!', author: 'Aras', level: 'A2', likes: 12 },
    { id: 8, title: 'Furniture', description: 'Essential furniture', author: 'Kaan', level: 'A2', likes: 3 },
    { id: 9, title: 'Plants', description: 'Test your plant knowledge', author: 'Halil', level: 'A2', likes: 300 },
    { id: 10, title: 'Transport', description: 'Types of transport', author: 'Alex', level: 'B1', likes: 45 },
    { id: 11, title: 'Food', description: 'Learn about foods', author: 'Oguz', level: 'A2', likes: 135 },
    { id: 12, title: 'Animals', description: 'Our furry friends!', author: 'Aras', level: 'A2', likes: 12 },
    { id: 13, title: 'Furniture', description: 'Essential furniture', author: 'Kaan', level: 'A2', likes: 3 },
    { id: 14, title: 'Plants', description: 'Test your plant knowledge', author: 'Halil', level: 'A2', likes: 300 },
    { id: 15, title: 'Transport', description: 'Types of transport', author: 'Alex', level: 'B1', likes: 45 },
    { id: 16, title: 'Food', description: 'Learn about foods', author: 'Oguz', level: 'A2', likes: 135 },
    { id: 17, title: 'Animals', description: 'Our furry friends!', author: 'Aras', level: 'A2', likes: 12 },
    { id: 18, title: 'Furniture', description: 'Essential furniture', author: 'Kaan', level: 'A2', likes: 3 },
    { id: 19, title: 'Plants', description: 'Test your plant knowledge', author: 'Halil', level: 'A2', likes: 300 },
    { id: 20, title: 'Transport', description: 'Types of transport', author: 'Alex', level: 'B1', likes: 45 },
  ];

  useEffect(() => {
    loadQuizzes();
  }, [page]);

  const loadQuizzes = () => {
    if (loading || quizzes.length >= totalQuizzes) return; // Prevent loading if already loading or no more quizzes to load
    setLoading(true);

    setTimeout(() => {
      setQuizzes((prevQuizzes: any) => [...prevQuizzes, ...quizData.slice((page - 1) * pageSize, page * pageSize)]);
      setLoading(false);
    }, 500);
  };


  const handleSearch = (text: any) => {
    setSearchTerm(text);
  };

  const filteredQuizzes = quizzes.filter((quiz: any) => 
    quiz.title.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    quiz.author.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const scrollToTop = () => {
    flatListRef.current!.scrollToOffset({ animated: true, offset: 0 });
  };

  const loadMoreQuizzes = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleQuizPress = (quizId: number) => {
    navigation.navigate('quizDetails', { quizId });
  };

  const handleLikePress = (quizId: number) => {
    console.log(`Liked quiz with ID: ${quizId}`);
  };

  const handleBookmarkPress = (quizId: number) => {
    console.log(`Bookmarked quiz with ID: ${quizId}`);
  };

  const renderQuizItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.quizItem}
      onPress={() => handleQuizPress(item.id)}
    >
      <View style={styles.quizInfo}>
        <Text style={styles.quizTitle}>{item.title}</Text>
        <Text style={styles.quizDescription}>{item.description}</Text>
        <Text style={styles.quizAuthor}>by {item.author}</Text>
        <Text style={styles.quizLevel}>{item.level}</Text>
      </View>
      <View style={styles.quizActions}>
        {/* Touchable Up Arrow (Likes) at the top right */}
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLikePress(item.id)}>
          <Text style={styles.quizLikes}>
            <Image source={require('../assets/images/up-arrow.png')} style={styles.icon} /> {item.likes}
          </Text>
        </TouchableOpacity>
  
        {/* Touchable Bookmark Icon at the bottom right */}
        <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleBookmarkPress(item.id)}>
          <Image source={require('../assets/images/bookmark-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}><Navbar/></View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by title or author"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateQuiz')}>
          <Image source={require('../assets/images/add-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Quiz List with Infinite Scroll */}
      <FlatList
        ref={flatListRef}
        data={filteredQuizzes}
        renderItem={renderQuizItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreQuizzes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading more quizzes...</Text> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  quizContainer: {
    backgroundColor: '#800080', 
    borderRadius: 8,            
    marginHorizontal: 10, 
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  forumContainer: {
    backgroundColor: '#9932CC', 
    borderRadius: 8,            
    marginHorizontal: 10, 
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  navItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    padding: 8,
    backgroundColor: '#ffec99',
    borderRadius: 8,
  },
  addButton: {
    marginLeft: 10,
  },
  quizItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#e8f5e9',
    marginBottom: 8,
    borderRadius: 8,
    position: 'relative',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
  },
  quizAuthor: {
    fontSize: 12,
    color: '#999',
  },
  quizLevel: {
    backgroundColor: '#dfe4ea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    color: '#333',
    alignSelf: 'flex-start',
  },
  quizActions: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    padding: 5,
},

  quizLikes: {
    fontSize: 16,
    marginBottom: 0,
  },
  likeButton: {
    position: 'absolute',
    bottom: 20,
    left: -150,
  },
  bookmarkButton: {
    position: 'absolute',
    bottom: 20,
    right: 20, 
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navbarContainer: {
    flex: 0,
  },
});

export default QuizFeed;
