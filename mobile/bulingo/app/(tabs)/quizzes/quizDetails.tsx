import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
import { useLocalSearchParams } from 'expo-router';
import TokenManager from '@/app/TokenManager';

type QuizDetails = {
  id: number;
  title: string;
  description: string;
  author: {
    id: number;
    username: string;
  };
  tags: string[];
  level: string;
  question_count: number;
  created_at: string;
  times_taken: number;
  like_count: number;
  average_score: number;
  is_bookmarked: boolean;
  is_liked: boolean;
};


const QuizDetails = () => {
  const { id } = useLocalSearchParams();
  const [quizDetails, setQuizDetails] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const quizId = id ? Number(id) : null;


  if (quizId === null || isNaN(quizId)) {
    console.error("Invalid quiz ID:", id);
    return (
      <View>
        <Text>Invalid Quiz ID</Text>
      </View>
    );
  }


  useEffect(() => {
    fetchQuizDetails(quizId);
  } , [quizId]);

  const fetchQuizDetails = async (quizId: number) => {
    setLoading(true);
  
    try {
      const response = await TokenManager.authenticatedFetch(`/quiz/${quizId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      const data = await response.json();
  
      if (response.ok) {
        const formattedQuizDetails = {
          id: data.id,
          title: data.title,
          description: data.description,
          author: data.author.username,
          tags: data.tags,
          level: data.level,
          question_count: data.question_count,
          created_at: data.created_at,
          times_taken: data.times_taken,
          like_count: data.like_count,
          average_score: data.average_score,
          is_bookmarked: data.is_bookmarked,
          is_liked: data.is_liked,
        };
  
        setQuizDetails(formattedQuizDetails);
        setError(null);
      } else {
        setError('Failed to fetch quiz details. Please try again. Error: ' + data.message || JSON.stringify(data));
      }
    } catch (error: any) {
      setError('An error occurred while fetching quiz details. Please try again. Error: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3944FD" />
        <Text style={styles.loadingText}>Loading Quiz Details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress = {async () => fetchQuizDetails(quizId)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!quizDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No Quiz Details Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.elevation, styles.quizDetailsBox]}>
        <Text style={styles.quizTitle}>{quizDetails.title}</Text>
        <Text style={styles.quizDescription}>
          Stats {'\n'}
          Times Taken: {quizDetails.times_taken || 0} {'\n'}
          Number of Questions: {quizDetails.question_count || 0} {'\n'}
          Average Score: {quizDetails.average_score || 'N/A'} {'\n'}
          Tags: {quizDetails.level || 'N/A'}
        </Text>

        {/* Bookmark button in the bottom right corner */}
        <TouchableOpacity style={styles.bookmarkButton}>
          <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.bookmarkIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
      <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
        <TouchableOpacity style={styles.quizButton}
          onPress={() => router.navigate('/(tabs)/quizzes/quizQuestion')}
        <TouchableOpacity style={styles.quizButton} onPress={() => router.push({ pathname: '/(tabs)/quizzes/quizQuestion', params: { quizId: id } })}
        >
          <Text style={styles.buttonText}>Take Quiz</Text>
        </TouchableOpacity>
        </Shadow>
      </View>

      {/* Go Back button */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? '#121212' : 'white',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : 'white',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#333',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
    },
    retryButton: {
      marginTop: 20,
      backgroundColor: '#3944FD',
      padding: 10,
      borderRadius: 5,
    },
    retryButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    quizDetailsBox: {
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      borderRadius: 5,
      padding: 20,
      marginTop: 20,
      marginBottom: 30,
      position: 'relative',
    },
    quizTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#ffffff' : '#333',
    },
    quizDescription: {
      fontSize: 16,
      color: isDark ? '#bbbbbb' : '#333',
    },
    quizButton: {
      backgroundColor: '#3944FD',
      padding: 15,
      borderRadius: 10,
      width: 300,
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    elevation: {
      elevation: 10,
      shadowColor: isDark ? '#ffffff' : 'black',
    },
    goBackButton: {
      backgroundColor: isDark ? '#555555' : '#CCCCCC',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      width: '70%',
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      alignItems: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
    },
    bookmarkButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    bookmarkIcon: {
      width: 24,
      height: 24,
      tintColor: isDark ? 'white' : 'black',
    },
  });
};

export default QuizDetails;
