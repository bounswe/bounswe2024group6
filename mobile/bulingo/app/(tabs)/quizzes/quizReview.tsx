import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import TokenManager from '@/app/TokenManager';
import { Dimensions, useColorScheme } from 'react-native';

const { width, height } = Dimensions.get('window');

export type QuizQuestionReview = {
    question_number: number;       
    question: string;              
    choices: string[];             
    correct_choice: number;        
    previous_answer: number;
  };
  

export type QuizData = {
  quiz_progress_id: number;
  quiz_title: string;
  question_count: number;
  questions: QuizQuestionReview[];
};

const QuizQuestion = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const quizId = useLocalSearchParams().quizId;
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isDark = colorScheme === 'dark';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

useEffect(() => {
    const fetchQuizReview = async () => {
      try {
        setLoading(true);
        const response = await TokenManager.authenticatedFetch(`/quiz/review/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setQuizData(data);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch quiz review.');
        }
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizReview();
  }, [quizId]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3944FD" />
        <Text style={styles.loadingText}>Loading Quiz Review...</Text>
      </View>
    );
  }

  const handleCancel = () => {
    router.back();
  };

  const handleOptionSelect = (choiceIndex: number) => {
    const updatedChoices = [...selectedChoices];
    updatedChoices[currentQuestionIndex] = choiceIndex;
    setSelectedChoices(updatedChoices);
  };

  const handleNext = async () => {
      setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinish = async () => {
      router.push(
        {pathname:'/(tabs)/quizzes/',});
  };

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const questionCount = quizData?.question_count || 0;

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.topContainer}>
            <TouchableOpacity style={styles.cancelQuizButton} onPress={handleCancel}>
              <Text style={styles.cancelQuizText}>Cancel Quiz</Text>
            </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1}/{questionCount}
            </Text>
          </View>
        </View>

        <View style={[styles.questionWrapper, styles.elevation]}>
          <View style={[styles.questionContainer, styles.questionAnswerElevation]}>
            <Text style={styles.questionText}>{currentQuestion?.question || 'No question available'}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion?.choices.map((choice, index) => {
                const isCorrectAnswer = currentQuestion.correct_choice === index + 1; // Assuming correct_choice is 1-based
                const isUserAnswer = currentQuestion.previous_answer === index + 1; // Assuming previous_answer is 1-based

                return (
                <View key={index} style={styles.optionWrapper}>
                    <TouchableOpacity
                        style={[
                        styles.optionButton,
                        isCorrectAnswer && styles.correctAnswer,
                        isUserAnswer && !isCorrectAnswer && styles.wrongAnswer,
                        ]}
                        onPress={() => handleOptionSelect(index)}
                    >
                        <Text style={styles.optionText}>{choice}</Text>
                    </TouchableOpacity>
                </View>
                );
  })}
</View>
        </View>

        <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[styles.navigationButton, currentQuestionIndex === 0 ? styles.disabledNavigationButton : null]}
              onPress={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.navigationText}>Previous</Text>
            </TouchableOpacity>

          {currentQuestionIndex === questionCount - 1 ? (
              <TouchableOpacity style={styles.navigationButton} onPress={handleFinish}>
                <Text style={styles.navigationText}>Finish</Text>
              </TouchableOpacity>
          ) : (
              <TouchableOpacity style={styles.navigationButton} onPress={handleNext}>
                <Text style={styles.navigationText}>Next</Text>
              </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: isDark ? '#121212' : 'white',
    },
    navbarContainer: {
      flex: 1,
    },
    page: {
      flex: 9,
      justifyContent: "space-around",
      alignItems: 'stretch',
      backgroundColor: isDark ? '#121212' : 'white',
      padding: 20,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cancelQuizButton: {
      backgroundColor: isDark ? '#8b0000' : '#b22222',
      borderRadius: 10,
      padding: 10,
    },
    cancelQuizText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    progressContainer: {
      justifyContent: 'center',
      backgroundColor: isDark ? '#1a1a4e' : 'blue',
      height: height * 0.05,
      borderRadius: 10,
      paddingHorizontal: 20,
    },
    progressText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    questionWrapper: {
      backgroundColor: isDark ? '#1e1e2e' : 'white',
      borderRadius: 10,
      justifyContent: "space-around",
      padding: 20,
      marginVertical: 10,
      borderColor: isDark ? '#333' : 'transparent',
    },
    questionContainer: {
      justifyContent: 'center',
      backgroundColor: isDark ? '#1e1e2e' : 'white',
      height: height * 0.25,
      marginBottom: 40,
      borderRadius: 10,
      borderColor: isDark ? '#333' : '#222',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    questionText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? 'white' : 'black',
      textAlign: 'center',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      color: isDark ? 'white' : 'black',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    optionWrapper: {
      width: width * 0.35,
      marginBottom: 12,
    },
    optionButton: {
      backgroundColor: isDark ? '#2e2e3e' : 'white',
      borderRadius: 10,
      padding: 10,
      width: width * 0.35,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: isDark ? '#444' : 'transparent',
    },
    selectedOption: {
      backgroundColor: isDark ? '#3944FD' : 'lightblue',
    },
    optionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? 'white' : '#000',
    },
    navigationContainer: {
      flexDirection: 'row',
      color: isDark ? 'white' : 'black',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    navigationButton: {
      backgroundColor: '#3944FD',
      borderRadius: 10,
      padding: 10,
      width: width * 0.4,
      alignItems: 'center',
    },
    disabledNavigationButton: {
      backgroundColor: isDark ? '#555' : 'gray',
      borderRadius: 10,
      padding: 10,
      width: width * 0.4,
      alignItems: 'center',
    },
    navigationText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    elevation: {
      elevation: 20,
      shadowColor: isDark ? 'black' : 'black',
    },
    questionAnswerElevation: {
      elevation: 3,
      shadowColor: isDark ? 'black' : 'black',
    },
    loadingText: {
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
      marginTop: 10,
    },
    errorText: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#121212' : 'white',
      },
      correctAnswer: {
        backgroundColor: 'lightgreen',
      },
      wrongAnswer: {
        backgroundColor: 'lightcoral',
      },
      
  });
  
};



export default QuizQuestion;
