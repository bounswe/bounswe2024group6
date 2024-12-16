import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import TokenManager, { BASE_URL } from '@/app/TokenManager';
import PressableText from '@/app/pressableText';
import GuestModal from '@/app/components/guestModal';

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
  is_solved: boolean;
  image: string;
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
  const [guestModalVisible, setGuestModalVisible] = useState(false);


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


         let response;
            if(!TokenManager.getUsername()){
                response = await fetch(`${BASE_URL}/quiz/${quizId}/`, {
                          method: 'GET',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                      });
             }else{
              response = await TokenManager.authenticatedFetch(`/quiz/${quizId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            }


      // const response = await TokenManager.authenticatedFetch(`/quiz/${quizId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      

      const data = await response.json();
      
      if (response.ok) {
        const formattedQuizDetails = {
          id: data.quiz.id,
          title: data.quiz.title,
          description: data.quiz.description,
          author: data.quiz.author.username,
          tags: data.quiz.tags,
          level: data.quiz.level,
          question_count: data.quiz.question_count,
          created_at: data.quiz.created_at,
          times_taken: data.quiz.times_taken,
          like_count: data.quiz.like_count,
          average_score: data.quiz.average_score,
          is_bookmarked: data.quiz.is_bookmarked,
          is_liked: data.quiz.is_liked,
          is_solved: data.is_solved,
          quiz_result_id: data.quiz_result_id, // This could be null
          image: data.quiz.title_image,
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
    <>
    {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}
    
    <View style={styles.container}>
      <View style={[styles.elevation, styles.quizDetailsBox]}>
      {quizDetails.image && (
          <Image
            source={{ uri: quizDetails.image }}
            style={{ width: '100%', height: 200, borderRadius: 5 }}
          />
        )}

        <PressableText style={styles.quizTitle} text={quizDetails.title}/>
        
        {/* <Text style={styles.quizTitle}>{quizDetails.title}</Text> */}
        <Text style={styles.quizDescription}>
          Times Taken: {quizDetails.times_taken || 0} {'\n'}
          Number of Questions: {quizDetails.question_count || 0} {'\n'}
          Average Score: {quizDetails.average_score || 'N/A'} {'\n'}
          Level: {quizDetails.level || 'N/A'}
        </Text>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.quizButton} onPress={() => 
        
        {
          if(!TokenManager.getUsername()){
            setGuestModalVisible(true);
            return
        }
          
          router.push({ pathname: '/(tabs)/quizzes/quizQuestion', params: { quizId: id } })}
      
      }
        >
          <Text style={styles.buttonText}>Take Quiz</Text>
        </TouchableOpacity>
      </View>


      {/* Go Back button */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      

    </View>
    </>
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
  });
};

export default QuizDetails;
