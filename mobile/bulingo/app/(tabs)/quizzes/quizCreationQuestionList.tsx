import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Image, useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
import { getQuizDetails, clearQuizDetails } from './AsyncStorageHelpers';
import { saveQuestions, getQuestions, clearQuestions } from './AsyncStorageHelpers';

type Question = {
  id: number;
  name: string;
  correctAnswer: string;
  answers: string[]; 
  type: string;
};

let uniqueQuestionKey = 0;

const QuizCreationQuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    const fetchStoredQuestions = async () => {
      const storedQuestions = await getQuestions();
      setQuestions(storedQuestions);
    };
    fetchStoredQuestions();
  }, []);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const details = await getQuizDetails();
      setQuizDetails(details);
    };

    fetchQuizDetails();
  }, []);

  useEffect(() => {
    saveQuestions(questions);
  }
  , [questions]);


  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  const { question, answers, correctAnswer, selectedType, index } = useLocalSearchParams();

  const parsedAnswers = Array.isArray(answers) ? answers.join(', ') : answers ? JSON.parse(answers) : [];

  useEffect(() => {
    if (question && answers && correctAnswer && selectedType) {
      const newQuestion = {
        id: index !== undefined ? questions[Number(index)].id : uniqueQuestionKey,
        name: Array.isArray(question) ? question[0] : question,
        correctAnswer: Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer,
        answers: parsedAnswers,
        type: Array.isArray(selectedType) ? selectedType[0] : selectedType 
      };

      if (index !== undefined) {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[Number(index)] = newQuestion;
          console.log(questions);
          saveQuestions(questions);
          return updatedQuestions;
        });
        return;
      }
      uniqueQuestionKey++;
      console.log(questions);
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      saveQuestions(questions);
    }
  }, [question, answers, correctAnswer, selectedType]);

  const handleAddQuestion = () => {
    router.navigate('/(tabs)/quizzes/quizCreationInfo');
  };

  const handleUpdateQuestion = (index: number) => {
    router.navigate({pathname: '/(tabs)/quizzes/quizCreationInfo', params: { "initialQuestion": questions[index].name , "initialAnswers": JSON.stringify(questions[index].answers), "initialCorrectAnswer": questions[index].correctAnswer, "type": questions[index].type, "index": index}});
  };

  const handleCreateQuiz = () => {
    router.navigate('/(tabs)/quizzes/');
  }

  const handleCancel = async () => {
    await clearQuizDetails(); 
    await clearQuestions();
    router.navigate("/(tabs)/quizzes/");

  }



  const handleDeleteQuestion = async (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    await saveQuestions(updatedQuestions);
  };

  const renderQuestionItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.questionContainer, styles.elevation]}>
      <Text style={styles.questionText}>{`Question ${index + 1}: ${item.name}`}</Text>
      <TouchableOpacity style={styles.iconButton} onPress={() => handleUpdateQuestion(index)}>
      <Image source={require('@/assets/images/update-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteQuestion(index)}>
      <Image source={require('@/assets/images/bin-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        {quizDetails && quizDetails["title"] ? quizDetails["title"] : "Default Title"}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
        <Image source={require('@/assets/images/add-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>


      <FlatList
        data={questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.questionList}
      />

      <View style={styles.footer}>
      <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
          <Text style={styles.footerButtonText}>Cancel</Text>
        </TouchableOpacity>
        </Shadow>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleCreateQuiz()}>
          <Text style={styles.footerButtonText}>Create Quiz</Text>
        </TouchableOpacity>
        </Shadow>
      </View>
    </View>
  );
};

const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : 'white',
      padding: 20,
      justifyContent: 'flex-start',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000',
    },
    addButton: {
      borderRadius: 20,
      padding: 10,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    questionList: {
      flex: 1,
      marginBottom: 20,
    },
    questionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      marginTop: 10,
      padding: 20,
      marginBottom: 10,
    },
    elevation: {
      elevation: 10,
      shadowColor: isDark ? '#ffffff' : 'black',
    },
    questionText: {
      flex: 3,
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000',
    },
    iconButton: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      flex: 0.15,
    },
    footerButton: {
      backgroundColor: '#3944FD',
      padding: 15,
      borderRadius: 10,
      justifyContent: 'center',
      width: 170,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: isDark ? '#555555' : '#CCCCCC',
      padding: 15,
      borderRadius: 10,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000',
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
  });
};


export default QuizCreationQuestionList;
