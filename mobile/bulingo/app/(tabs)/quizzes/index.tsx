import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, useColorScheme, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import QuizCard from '@/app/components/quizCard';
import TokenManager from '@/app/TokenManager';
import GuestModal from '@/app/components/guestModal';

const BASE_URL = 'http://64.226.76.231:8000';

const QuizFeed = () => {
  const [quizzes, setQuizzes] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const isDark = colorScheme === 'dark';
  const [guestModalVisible, setGuestModalVisible] = useState(false);

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
    }
  
    try {
      // const response = await TokenManager.authenticatedFetch(`/feed/quiz/`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
  

      let response;
      if(!TokenManager.getUsername()){
          response = await fetch(`${BASE_URL}/feed/quiz/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
       }else{
        response = await TokenManager.authenticatedFetch(`/feed/quiz/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }


      
      const data = await response.json();
      if (response.ok) {
        const formattedResults = data.map((quiz: any) => ({
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          author: quiz.author.username,
          level: quiz.level,
          likes: quiz.like_count,
          liked: quiz.is_liked,
          bookmarked: quiz.is_bookmarked,
          image: quiz.title_image ? quiz.title_image : require('@/assets/images/logo.jpeg'),
          
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

  const filteredQuizzes = quizzes.filter((quiz: any) => {
    return quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.author.toLowerCase().includes(searchTerm.toLowerCase()) }
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

  const handleLikePress = async (quizId: number) => {
    const updatedQuizzes = await Promise.all( quizzes.map( async (quiz: any) => {
      if (quiz.id === quizId) {
        let data = '';
        try {
          const response = await TokenManager.authenticatedFetch(`/quiz/like/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quiz_id: quizId,
            }),
          });
      
          data = await response.json();
          let liked = quiz.liked;
          let likes = quiz.likes;
          if (response.ok) {
            liked = !quiz.liked;
            likes = liked ? quiz.likes + 1 : quiz.likes - 1;
          }
          return { ...quiz, liked, likes };
        }
        catch(error: any)
        {
          setError('Failed to fetch quizzes. Please try again. Error: ' + JSON.stringify(data));
        }

    }
    return quiz;
    }));
    setQuizzes(updatedQuizzes);
  };


  const handleBookmarkPress = async (quizId: number) => {
    const updatedQuizzes = await Promise.all(
      quizzes.map(async (quiz: any) => {
        if (quiz.id === quizId) {
          let data = '';
          try {
            const response = await TokenManager.authenticatedFetch(`/quiz/bookmark/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                quiz_id: quizId,
              }),
            });
            
            data = await response.json();
            console.log(data);
            let bookmarked = quiz.bookmarked;
            if (response.ok) {
              bookmarked = !quiz.bookmarked; // Toggle bookmark status
            }
            return { ...quiz, bookmarked };
          } catch (error: any) {
            setError(
              'Failed to bookmark the quiz. Please try again. Error: ' +
                JSON.stringify(data)
            );
          }
        }
        return quiz;
      })
    );
    setQuizzes(updatedQuizzes);
  };
  
  

  const renderQuizItem = ({ item }: { item: any }) => (
    <QuizCard
      {...item}
      onQuizPress={() => handleQuizPress(item.id)}
      onLikePress={() => handleLikePress(item.id)}
      onBookmarkPress={() => {handleBookmarkPress(item.id)}}
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
        {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}
      
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by title or author"
            placeholderTextColor={isDark ? '#aaa' : '#555'}
            value={searchTerm}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => {
              if(!TokenManager.getUsername()){
                  setGuestModalVisible(true);
                  return
              }
            router.push('/(tabs)/quizzes/quizCreationSettings')}}>
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
