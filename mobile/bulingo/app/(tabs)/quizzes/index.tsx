import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, useColorScheme, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import QuizCard from '@/app/components/quizCard';
import TokenManager from '@/app/TokenManager';

const BASE_URL = 'http://3.70.214.28:8000';

const QuizFeed = () => {
  const [quizzes, setQuizzes] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    fetchQuizzes();
  }, [page]);

  const [error, setError] = useState<string | null>(null);


  const fetchQuizzes = async (reset = false) => {
    if (!reset && (loading || error)) return;
    setLoading(true);
  
    if (reset) {
      setQuizzes([]);
      setPage(1); 
      console.log('reset');
    }
  
    try {
      const response = await TokenManager.authenticatedFetch(`/feed/quiz/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const formattedResults = data.map((quiz: any) => ({
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          author: quiz.author.username,
          level: quiz.level,
          likes: quiz.like_count,
          liked: quiz.is_liked,
        }));
  
        setQuizzes((prevQuizzes: any) => (reset ? formattedResults : [...prevQuizzes, ...formattedResults]));

        setError(null);
      } else {
        setError('Failed to fetch quizzes. Please try again. Error: ' + data.message || JSON.stringify(data));
      }
    } catch (error: any) {
      setError('An error occurred while fetching quizzes. Please try again. Error: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const filteredQuizzes = quizzes.filter((quiz: any) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const loadMoreQuizzes = () => {
  //   if (!loading) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  const handleQuizPress = (quizId: number) => {
    router.push({
      pathname: '/(tabs)/quizzes/quizDetails',
      params: { id: quizId },
    });
  };

  const handleLikePress = (quizId: number) => {
    const updatedQuizzes = quizzes.map((quiz: any) => {
      if (quiz.id === quizId) {
        const liked = !quiz.liked;
        const likes = liked ? quiz.likes + 1 : quiz.likes - 1;
        return { ...quiz, liked, likes };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
  };

  const renderQuizItem = ({ item }: { item: any }) => (
    <QuizCard
      {...item}
      onQuizPress={() => handleQuizPress(item.id)}
      onLikePress={() => handleLikePress(item.id)}
    />
  );

  const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await fetchQuizzes(true); 
  setRefreshing(false);
};

const onReload = () => {
  fetchQuizzes(true); 
};

return (
  <View style={styles.container}>
    {error && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.reloadButton} onPress={onReload}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    )}

    {!error && (
      <>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by title or author"
            placeholderTextColor={isDark ? '#aaa' : '#555'}
            value={searchTerm}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(tabs)/quizzes/quizCreationSettings')}>
            <Image source={require('@/assets/images/add-icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={filteredQuizzes}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item.id.toString()}
          // onEndReached={loadMoreQuizzes}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <Text style={styles.loadingText}>Loading more quizzes...</Text> : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ff6347']} 
              tintColor={isDark ? '#fff' : '#000'}
            />
          }
        />
      </>
    )}
  </View>
);
  };
  const getStyles = (colorScheme: any) => {
    const isDark = colorScheme === 'dark';
    return StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        paddingTop: 25,
        backgroundColor: isDark ? '#121212' : '#f8f8f8',
      },
      errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
      },
      reloadButton: {
        backgroundColor: isDark ? '#333' : '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      reloadButtonText: {
        color: isDark ? '#fff' : '#000',
        fontSize: 16,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
        borderRadius: 8,
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
      },
      searchBar: {
        flex: 1,
        padding: 10,
        backgroundColor: isDark ? '#333' : '#e8e8e8',
        borderRadius: 8,
        color: isDark ? '#fff' : '#000',
      },
      addButton: {
        marginLeft: 10,
      },
      icon: {
        width: 30,
        height: 30,
        tintColor: isDark ? '#fff' : '#000',
      },
      loadingText: {
        textAlign: 'center',
        color: isDark ? '#fff' : '#000',
        marginTop: 10,
      },
    });
  };
  

export default QuizFeed;
