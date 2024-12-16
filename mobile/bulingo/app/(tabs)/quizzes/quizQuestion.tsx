import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import TokenManager from '@/app/TokenManager';
import { Dimensions, useColorScheme } from 'react-native';
import PressableText from '@/app/pressableText';

const { width, height } = Dimensions.get('window');

export type QuizQuestion = {
  question_number: number;
  question: string;
  question_image: string | null;
  choices: string[];
  previous_answer: number | null;
};

export type QuizData = {
  quiz_progress_id: number;
  quiz_title: string;
  question_count: number;
  questions: QuizQuestion[];
};

const QuizQuestion = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const quizId = useLocalSearchParams().quizId;
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<number[] >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isDark = colorScheme === 'dark';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (error) 
        { return; }
          
        setLoading(true);
        const response = await TokenManager.authenticatedFetch(`/quiz/start/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quiz_id: Number(quizId) }),
        });
        
        const data = await response.json();
        if (response.ok) {
          setQuizData(data);
          
          const updatedChoices = Array(data.question_count).fill(null).map((_, index) => {
            if (data.questions[index].previous_answer !== null) {
              return data.questions[index].previous_answer - 1;
            } else {
              return -1;
            }
          });
          
          setSelectedChoices(updatedChoices);
        } else {
          setError(data.error || 'Failed to fetch quiz data');
        }
      } catch (error: any) {
        setError(error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleCancel = () => {
    router.back();
  };

  const handleOptionSelect = (choiceIndex: number) => {
    console.log(choiceIndex);
    const updatedChoices = [...selectedChoices];
    updatedChoices[currentQuestionIndex] = choiceIndex;
    setSelectedChoices(updatedChoices);
  };

  const submitQuiz = async (quizProgressId: number): Promise<{ success: boolean; resultUrl?: string; error?: string }> => {
    try {
      const response = await TokenManager.authenticatedFetch(`/quiz/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quiz_progress_id: quizProgressId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, resultUrl: data.result_url };
      } else {
        return { success: false, error: data.error || 'Failed to submit quiz.' };
      }
    } catch (error: any) {
      console.error('Unexpected error:', error.message);
      return { success: false, error: error.message || 'Unknown error occurred' };
    }
  };
  

  const submitAnswer = async (quizProgressId: number, questionNumber: number, answer: number) => {
    try {
      const response = await TokenManager.authenticatedFetch(`/quiz/question/solve/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_progress_id: quizProgressId,
          question_number: questionNumber + 1,
          answer: answer + 1,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return true;
      } else {
        console.error('Error submitting answer:', data);
        return false;
      }
    } catch (error: any) {
      console.error('Unexpected error:', error.message);
      return false;
    }
  };

  const handleNext = async () => {
    const currentAnswer = selectedChoices[currentQuestionIndex];

    if (currentAnswer === -1 || quizData === null) {
      return;
    }
    console.log(currentAnswer);
    const success = await submitAnswer(
      quizData.quiz_progress_id,
      currentQuestionIndex,
      currentAnswer
    );

    if (success) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.error('Failed to submit answer. Check logs.');
    }
  };

  const handleFinish = async () => {
    const currentAnswer = selectedChoices[currentQuestionIndex];

    if (currentAnswer === -1 || quizData === null) {
      alert('Please select an answer before finishing the quiz.');
      return;
    }

    console.log(currentAnswer);
    console.log(currentQuestionIndex);
    const success = await submitAnswer(
      quizData.quiz_progress_id,
      currentQuestionIndex,
      currentAnswer 
    );

  

    if (success) {
      const result = await submitQuiz(quizData.quiz_progress_id);
      if (result.success) {
        router.push(
          {
          pathname:'/(tabs)/quizzes/quizResults',
          params: { resultUrl: result.resultUrl, quizId: quizId }, 
        });
      } else {
        console.error('Failed to submit quiz:', result.error);
        alert('Failed to submit quiz.' + result.error);
      }
      router.push(
        {
        pathname:'/(tabs)/quizzes/quizResults',
        params: { resultUrl: result.resultUrl, quizId: quizId }, 
      });
    } else {
      console.error('Failed to submit answer. Check logs.');
    }
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
            <View
              style={[
                styles.questionContainer,
                styles.questionAnswerElevation,
                !currentQuestion?.question_image && styles.centerContent, // Add centering style when no image
              ]}
            >
              {/* Conditionally Render Image */}
              {currentQuestion?.question_image ? (
                <Image
                  source={{ uri: currentQuestion.question_image }}
                  style={styles.questionImage}
                  resizeMode="contain"
                />
              ) : (
                // If no image, ensure text centers vertically
                <PressableText
                  style={[styles.questionText, styles.centerText]} // Additional centering
                  text={currentQuestion?.question || 'No question available'}
                />
              )}
            </View>

            {/* If image exists, show text below it */}
            {currentQuestion?.question_image && (
              <PressableText
                style={[styles.questionText, styles.textBelowImage]}
                text={currentQuestion?.question || 'No question available'}
              />
            )}



          <View style={styles.optionsContainer}>
            {currentQuestion?.choices.map((choice, index) => (
              <View key={index} style={styles.optionWrapper}>
                  <Pressable
                    style={[
                      styles.optionButton,
                      selectedChoices[currentQuestionIndex] === index ? styles.selectedOption : null,
                    ]}
                    onPress={() => handleOptionSelect(index)}
                  >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.textContainer}
                    >
                      <PressableText 
                      style={styles.optionText}  
                      onPress={() => handleOptionSelect(index)}
                      text={choice}/>
                    </ScrollView>
                    {/* <Text style={styles.optionText}>{choice}</Text> */}
                  </Pressable>
              </View>
            ))}
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
    questionWrapper: {
      backgroundColor: isDark ? '#1e1e2e' : 'white',
      borderRadius: 10,
      marginVertical: 10,
      borderColor: isDark ? '#333' : 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    questionContainer: {
      width: '100%',
      minHeight: 200, // Set a minimum height to reserve space for image or text
      alignItems: 'center',
      justifyContent: 'flex-start', // Align items at the top by default
      backgroundColor: isDark ? '#1e1e2e' : 'white',
      marginBottom: 40,
      borderRadius: 10,
    },
    questionImage: {
      width: '100%',
      height: 200,
      marginBottom: 10,
      borderRadius: 10,
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

    questionText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? 'white' : 'black',
      textAlign: 'center',
      alignContent: 'center',
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
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: isDark ? '#444' : 'black',
    },
    selectedOption: {
      backgroundColor: isDark ? '#3944FD' : 'lightblue',
    },
    optionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? 'white' : 'black',
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

    centerContent: {
      justifyContent: 'center',
    },
    centerText: {
      textAlign: 'center', 
    },
    textBelowImage: {
      textAlign: 'center',
      marginTop: 10, 
    },
    textContainer: {
      marginHorizontal: 5,
    },
    
    
  });
};



export default QuizQuestion;
