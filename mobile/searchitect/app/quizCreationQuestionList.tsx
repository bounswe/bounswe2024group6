import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import Navbar from './navbar';
import { router, useLocalSearchParams } from 'expo-router';

const QuizCreationQuestionList = () => {
  const [questions, setQuestions] = useState([
    {id: 1, name: 'Pasta', correctAnswer: 'makarna', answers: ['makarna', 'pizza', 'hamburger', 'sushi'], type: 'Type II'},
    {id: 2, name: 'Salt', correctAnswer: 'tuz', answers: ['tuz', 'seker', 'un', 'sut'], type: 'Type II'},
    {id: 3, name: 'Beef', correctAnswer: 'dana eti', answers: ['dana eti', 'kuzu eti', 'tavuk eti', 'balik'], type: 'Type II'},
    {id: 4, name:'Lettuce', correctAnswer: 'marul', answers: ['marul', 'domates', 'salatalik', 'biber'], type: 'Type II'},
  ]);
  
  
  

  
  const { question, answers, correctAnswer, selectedType, index } = useLocalSearchParams();

  const parsedAnswers = Array.isArray(answers) ? answers.join(', ') : answers ? JSON.parse(answers) : [];

  useEffect(() => {
    if (question && answers && correctAnswer && selectedType) {
      const newQuestion = {
        id: questions.length + 1,
        name: Array.isArray(question) ? question[0] : question, // Handle case if question is an array
        correctAnswer: Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer, // Handle case if correctAnswer is an array
        answers: parsedAnswers, // This should now be an array
        type: Array.isArray(selectedType) ? selectedType[0] : selectedType // Convert selectedType to a string
      };

      if (index !== undefined) {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[Number(index)] = newQuestion;
          return updatedQuestions;
        });
        return;
      }

      // Update the state to add the new question
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  }, [question, answers, correctAnswer, selectedType]);

  const handleAddQuestion = () => {
    router.navigate('./quizCreationInfo');
  };

  const handleUpdateQuestion = (index: number) => {
    router.navigate({pathname: './quizCreationInfo', params: { "initialQuestion": questions[index].name , "initialAnswers": JSON.stringify(questions[index].answers), "initialCorrectAnswer": questions[index].correctAnswer, "type": questions[index].type, "index": index}});
  };

  const handleCreateQuiz = () => {
    router.navigate('./quizFeed');
  }

  const handleCancel = () => {
    router.navigate("./quizFeed");
  }



  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const renderQuestionItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{`Question ${index + 1}: ${item.name}`}</Text>
      <Pressable style={styles.iconButton} onPress={() => handleUpdateQuestion(index)}>
        <Text style={styles.iconText}>♻️</Text>
      </Pressable>
      <Pressable style={styles.iconButton} onPress={() => handleDeleteQuestion(index)}>
        <Text style={styles.iconText}>🗑️</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Food</Text>
        <Pressable style={styles.addButton} onPress={handleAddQuestion}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Questions List */}
      <FlatList
        data={questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.questionList}
      />

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <Pressable style={styles.footerButton} onPress={() => handleCancel()}>
          <Text style={styles.footerButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.footerButton} onPress={() => handleCreateQuiz()}>
          <Text style={styles.footerButtonText}>Create Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#000',
  },
  addButton: {
    backgroundColor: '#d1e7dd',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  questionList: {
    flex: 1,
    marginBottom: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6ffed',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 2,
  },
  questionText: {
    flex: 3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerButton: {
    backgroundColor: '#b0e57c',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuizCreationQuestionList;
