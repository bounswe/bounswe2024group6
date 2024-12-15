import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Dimensions } from 'react-native';
import TokenManager from '@/app/TokenManager';

const { width, height } = Dimensions.get('window');

const QuizResults = () => {
  const { resultUrl, quizId } = useLocalSearchParams<{ resultUrl: string, quizId: string }>();
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const [resultQuizLiked, setResultQuizLiked] = useState<boolean>(false);
  const [reccQuizLiked, setReccQuizLiked] = useState<boolean>(false);

  const [quizResult, setQuizResult] = useState<{
    questions: {
      choice_images: any[];
      choices: any[]; 
      correct_choice: number;
      is_correct: boolean;
      question_image: string | null;
      question_number: number;
      question_text: string;
      user_answer: number | null;
    }[];
    quiz_result: {
      author: { id: number; username: string };
      id: number;
      is_bookmarked: boolean;
      is_liked: boolean;
      level: string;
      like_count: number;
      question_count: number;
      quiz: { id: number; title: string };
      quiz_progress: number;
      score: number;
      time_taken: number;
      user: { id: number; username: string };
    };
    quiz_title_image: string | null;
  } | null>(null);
  

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quizResultNum, setQuizResultNum] = useState<string>("-1");

  const [recommendedQuiz, setRecommendedQuiz] = useState<{
    id: number;
    title: string;
    description: string;
    author : string;
    level: string;
    likes: number;
    liked: boolean;
  } | null>(null);


  const handleLikePress = async (liked: any, quizId: any) => {
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
        console.log(quizId);
        data = await response.json();
        console.log(data);
        if (response.ok) {
          liked = !liked;
          if (quizId === quizResult?.quiz_result.quiz.id) {
            setResultQuizLiked(liked);
          }
          else {
            setReccQuizLiked(liked);
          };
        }
      }
      catch(error: any)
      {
        setError('Failed to fetch quizzes. Please try again. Error: ' + JSON.stringify(data));
      }
    };

  useEffect(() => {
    const fetchQuizResult = async () => {
      setLoading(true);
      try {
        const response = await TokenManager.authenticatedFetch(resultUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const url = resultUrl.split('/');
        const resultNum = url[url.length - 1];
        setQuizResultNum(resultNum)

        if (response.ok) {
          const data = await response.json();
          setQuizResult(data);
          setResultQuizLiked(data.quiz_result.is_liked);

        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Failed to fetch quiz result.');
        }
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
      } finally {
      }
    };

    fetchQuizResult();
  }, [resultUrl]);


  useEffect(() => {
    const fetchQuizzes = async () => {    
      try {
        const response = await TokenManager.authenticatedFetch(`/quiz/recommend/` + quizId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const quiz = await response.json();
        if (response.ok && quiz) {
          const formattedResults = {
            id: Number(quiz.id),
            title: quiz.title,
            description: quiz.description,
            author: quiz.author.username,
            level: quiz.level,
            likes: quiz.like_count,
            liked: quiz.is_liked,
          };
          setReccQuizLiked(quiz.is_liked);
          setRecommendedQuiz(formattedResults);
          setError(null);
        } else {
          setRecommendedQuiz(null); 
        }
      } catch (error: any) {
        setError('An error occurred while fetching quizzes. Please try again. Error: ' + (error.message || 'Unknown error'));
      }
      finally {
        setLoading(false);
      }
    };
  
    fetchQuizzes(); 
  }, []);

    const QuizResultsCard = (props: QuizResultsCardProps) => {
      const { styles } = props.styles;
    return (
      <View style={[styles.resultsCard, styles.elevation]}>
        <View style={styles.resultsTitleContainer}>
          <Text style={styles.resultsTitle}>{props.quizName}</Text>
        </View>
        <View style={[styles.resultsScoreContainer, styles.elevation]}>
          <Text style={styles.scoreText}>Score</Text>
          <View style={[styles.scoreBox, styles.elevation]}>
            <Text style={styles.scoreBoxText}>{props.score}/{props.maxScore}</Text>
          </View>
        </View>
        <View style={styles.bottomMessageContainer}>
            <Text style={styles.bottomMessage}>Congrats!</Text>
            <Text style={styles.bottomMessage}>Keep it up!</Text>
          </View>
        <View style={styles.resultsBottomContainer}>
        <View style={styles.resultsTagsContainer}>
          {props.tags.map((item, index) => (
              <View style={styles.tagBox} key={index}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
          ))}
        </View>
            <TouchableOpacity onPress={() => handleLikePress(resultQuizLiked, quizResult?.quiz_result.quiz.id)}>
            <Image source={resultQuizLiked ? require('@/assets/images/like-2.png') : require('@/assets/images/like-1.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image style={[styles.bottomButtonBookmark, {borderWidth: 0}]} source={require('@/assets/images/bookmark-icon.png')}/>
            </TouchableOpacity>
          </View>
      </View>
    );
  };

  const QuizCard = (props: {
    name: string;
    desc: string;
    author: string;
    tags: string[];
    styles: any;
    id?: number;
  }) => {
    const { styles } = props.styles;
    return (
      <TouchableOpacity
      style={[styles.quizItem, styles.elevation]}
      onPress={() => router.navigate({
        pathname: '/(tabs)/quizzes/quizDetails', 
        params:{id : props?.id},})}
    >
      <View style={styles.quizInfo}>
        <Text style={styles.quizTitle}>{props.name}</Text>
        <Text style={styles.quizDescription}>{props.desc}</Text>
        <Text style={styles.quizAuthor}>by {props.author}</Text>
        <Text style={styles.quizLevel}>{props.tags}</Text>
      </View>
      <View style={styles.quizActions}>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLikePress(reccQuizLiked, props.id)}>
        <Image source={reccQuizLiked ? require('@/assets/images/like-2.png') : require('@/assets/images/like-1.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookmarkButton}>
          <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
    {loading ? (
      <Text style={styles.loadingText}>Loading...</Text>
    ) : error ? (
      <Text style={styles.errorText}>Error: {error}</Text>
    ) : (
      <View style={styles.page}>
      <View style={styles.resultsCardContainer}>
        {quizResult ? (
          <QuizResultsCard
            quizName={quizResult.quiz_result.quiz.title}
            tags={[quizResult.quiz_result.level || 'A1']}
            score={quizResult.quiz_result.score}
            maxScore={quizResult.quiz_result.question_count}
            styles={{ styles }}
          />
        ) : (
          <Text style={styles.errorText}>No results found for this quiz.</Text>
        )}
      </View>
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>Recommended Quiz</Text>
          {recommendedQuiz ? (
            <QuizCard
              name={recommendedQuiz.title}
              author={recommendedQuiz.author}
              desc={recommendedQuiz.description}
              tags={[recommendedQuiz.level]}
              id={recommendedQuiz.id}
              styles={{ styles }}
            />
          ) : (
            <Text style={styles.errorText}>No recommendations available.</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retakeQuizButton} onPress={() => {router.push(
        {
        pathname:'/(tabs)/quizzes/quizQuestion',
        params: { quizId: quizId }, 
      });}}>
            <Text style={styles.retakeQuizText}>Retake Quiz</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.mainMenuButton} onPress={() => {router.navigate("/")}}>
            <Text style={styles.mainMenuText}>Main Menu</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.mainMenuButton, { backgroundColor: '#FFA500' }]}
                  onPress={() =>
                    router.push({pathname: '/(tabs)/quizzes/quizReview', params: { quizId: quizResultNum }})
                  }
                >
              <Text style={styles.mainMenuText}>Review Quiz</Text>
            </TouchableOpacity>
        </View>


          </View>
    )}
  </View>
  );
};

export type QuizResultsCardProps = {
  quizName: string,
  score: number,
  maxScore: number,
  tags: string[],
  styles?: any,
  id?: number,
}


const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      paddingTop: 30,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    page: {
      flex: 9,
      justifyContent: "space-around",
      alignItems: 'stretch',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    resultsCardContainer: {
      flex: 3,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    resultsCard: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      alignItems: 'stretch',
    },
    resultsTitleContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultsTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
    },
    resultsTagsContainer: {
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagBox: {
      backgroundColor: isDark ? '#333' : '#dfe4ea',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12,
      alignSelf: 'flex-start',
    },
    tagText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    resultsScoreContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scoreText: {
      textAlign: 'center',
      fontSize: 24,
      color: isDark ? '#bbb' : '#000',
    },
    scoreBox: {
      width: width * 0.24,
      height: height * 0.05,
      borderRadius: 15,
      backgroundColor: isDark ? '#3944FD' : 'blue',
      paddingHorizontal: 5,
      paddingVertical: 6,
      margin: 15,
    },
    scoreBoxText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'white',
      fontSize: 20,
    },
    bottomMessageContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMessage: {
      textAlign: 'center',
      fontSize: 24,
      color: isDark ? '#fff' : '#000',
    },
    resultsBottomContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bottomButtonLike: {
      alignItems: 'center',
      width: width * 0.1,
      height: height * 0.06,
      borderRadius: 25,
      tintColor: isDark ? '#fff' : '#000',
    },
    bottomButtonBookmark: {
      alignItems: 'center',
      width: width * 0.10,
      height: height * 0.06,
      borderRadius: 25,
      tintColor: isDark ? '#fff' : '#000',
    },
    recommendationContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'stretch',
      marginLeft: 20,
      marginRight: 20,
      padding: 15,
    },
    recommendationText: {
      fontSize: 18,
      fontFamily: 'sans-serif',
      paddingLeft: 5,
      color: isDark ? '#fff' : '#000',
    },
    quizItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      marginBottom: 5,
      marginTop: 8,
      borderRadius: 8,
      position: 'relative',
    },
    retakeQuizButton: {
      backgroundColor: '#3944FD',
      padding: 15,
      borderRadius: 10,
      width: width * 0.7,
      alignItems: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    retakeQuizText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    mainMenuButton: {
      backgroundColor: isDark ? '#333' : '#CCCCCC',
      padding: 15,
      borderRadius: 10,
      width: width * 0.5,
      alignItems: 'center',
      alignSelf: 'center',
    },
    mainMenuText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    elevation: {
      elevation: 10,
      shadowColor: isDark ? '#fff' : 'black',
    },
    quizInfo: {
      flex: 1,
    },
    quizTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    quizDescription: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#666',
    },
    quizAuthor: {
      fontSize: 12,
      color: isDark ? '#888' : '#999',
    },
    quizLevel: {
      backgroundColor: isDark ? '#444' : '#dfe4ea',
      marginTop: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      fontSize: 12,
      color: isDark ? '#fff' : '#333',
      alignSelf: 'flex-start',
    },
    quizActions: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      padding: 4,
    },
    likeButton: {
      position: 'absolute',
      bottom: height * 0.02,
      left: -width * 0.15,
    },
    bookmarkButton: {
      position: 'absolute',
      bottom: height * 0.02,
      right: width * 0.03,
    },
    icon: {
      width: width * 0.07,
      height: height * 0.05,
      resizeMode: 'contain',
      tintColor: isDark ? '#fff' : '#000',
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
  });
};

export default QuizResults;
