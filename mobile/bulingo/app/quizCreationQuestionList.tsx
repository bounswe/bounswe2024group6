import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
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
    <View style={[styles.questionContainer, styles.elevation]}>
      <Text style={styles.questionText}>{`Question ${index + 1}: ${item.name}`}</Text>
      <TouchableOpacity style={styles.iconButton} onPress={() => handleUpdateQuestion(index)}>
      <Image source={require('../assets/images/update-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteQuestion(index)}>
      <Image source={require('../assets/images/bin-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Food</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
        <Image source={require('../assets/images/add-icon.png')} style={styles.icon} />
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderRadius: 20,
    padding: 10,
    width: 50,
    height: 50,
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
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    marginBottom: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: 'black',
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
    flex : 0.15,
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
    backgroundColor: '#CCCCCC',
    padding: 15,
    borderRadius: 10,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default QuizCreationQuestionList;
