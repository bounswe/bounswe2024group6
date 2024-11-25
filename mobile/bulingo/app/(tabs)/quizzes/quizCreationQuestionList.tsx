import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Image, useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getQuizDetails, clearQuizDetails } from './AsyncStorageHelpers';
import { saveQuestions, getQuestions, clearQuestions } from './AsyncStorageHelpers';
import TokenManager from '@/app/TokenManager';

type Question = {
  id: number;
  name: string;
  correctAnswer: string;
  answers: string[]; 
  type: string;
};

type QuizDetails = {
  title: string;
  description: string;
  level: string;
  tags: string[];
};

const QuizCreationQuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [quizDetails, setQuizDetails] = useState<QuizDetails>({
    title: "",
    description: "",
    level: "",
    tags: []
  });

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
  
  const { question, answers, correctAnswer, selectedType, index, trigger } = useLocalSearchParams();
  const parsedAnswers = Array.isArray(answers) ? answers.join(', ') : answers ? JSON.parse(answers) : [];

  const key = questions.length === 0 ? 0 : questions[questions.length - 1].id + 1;


  useEffect(() => {
    if (question && answers && correctAnswer && selectedType) {
      const newQuestion = {
        id: index !== undefined ? questions[Number(index)].id : key,
        name: Array.isArray(question) ? question[0] : question,
        correctAnswer: Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer,
        answers: parsedAnswers,
        type: Array.isArray(selectedType) ? selectedType[0] : selectedType 
      };

      if (index !== undefined) {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[Number(index)] = newQuestion;
          saveQuestions(questions);
          return updatedQuestions;
        });
        return;
      }

      const newQuest = { ...newQuestion };
      setQuestions((prevQuestions) => [...prevQuestions, newQuest]);
      saveQuestions(questions);
    }
  }, [question, answers, correctAnswer, selectedType, trigger]);

  const handleAddQuestion = () => {
    router.navigate({pathname: '/(tabs)/quizzes/quizCreationInfo', params: { "trigger": key }});
  };

  const handleUpdateQuestion = (index: number) => {
    router.navigate({pathname: '/(tabs)/quizzes/quizCreationInfo', params: { "initialQuestion": questions[index].name , "initialAnswers": JSON.stringify(questions[index].answers), "initialCorrectAnswer": Number(questions[index].correctAnswer), "type": questions[index].type, "index": index, "trigger": key + 50}});
  };

  const handleCreateQuiz = async () => {
    await createQuiz();
    router.navigate('/(tabs)/quizzes/');
  }

  const prepareQuizData = () => {
    if (quizDetails["title"] === '' || questions.length === 0) {
      alert("Please complete quiz details and add questions before submission.");
      return null;
    }

  const formattedTags = [{"name": quizDetails["level"]}];


    return {
      quiz: {
        title: quizDetails["title"],
        description: quizDetails["description"],
        level: quizDetails["level"],
        tags: formattedTags || [], 
      },
      questions: questions.map((q, index) => ({
        question_number: index + 1,
        question_text: q.name,
        choice1: q.answers[0],
        choice2: q.answers[1],
        choice3: q.answers[2],
        choice4: q.answers[3],
        correct_choice: Number(q.correctAnswer) + 1,
      })),
    };
  };

  const createQuiz = async () => {
    const quizData = prepareQuizData();
    if (!quizData) return; // Ensure data is prepared
  
    try {
      const response = await TokenManager.authenticatedFetch(`/quiz/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating quiz:', errorData);
        alert('Failed to create quiz. Please try again.');
      } else {
        const result = await response.json();
        alert('Quiz created successfully!');
        await clearQuizDetails();
        await clearQuestions();
        router.replace('/(tabs)/quizzes/');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('An error occurred while creating the quiz.');
    }
  };
  
  

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
        <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
          <Text style={styles.footerButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleCreateQuiz()}>
          <Text style={styles.footerButtonText}>Create Quiz</Text>
        </TouchableOpacity>
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
      flex: 0.09,
    },
    footerButton: {
      backgroundColor: '#3944FD',
      padding: 12,
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
