import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Navbar from "./navbar";
import {router} from "expo-router"
import { QuizResultsProps } from './quizResults';
import { Shadow } from 'react-native-shadow-2';

const mockQuiz = {questions: [
  {
    question: 'kuzu',
    type: 1,
    choice1: 'lamp',
    choice2: 'cow',
    choice3: 'chimp',
    choice4: 'lamb',
    correctChoice: 4,
  },
  {
    question: 'dairy',
    type: 2,
    choice1: 'süt ürünleri',
    choice2: 'et',
    choice3: 'mısır',
    choice4: 'buğday',
    correctChoice: 1,
  },
  {
    question: 'mercimek',
    type: 1,
    choice1: 'chickpeas',
    choice2: 'lentils',
    choice3: 'beans',
    choice4: 'legumes',
    correctChoice: 2,
  },
], quizName: "Foods", tags: ['#B1']};

export type QuizQuestion = {
  question: string,
  type: number,
  choice1: string,
  choice2: string,
  choice3: string,
  choice4: string,
  correctChoice: number,

};

export type QuizQuestionProps = {
  questions: QuizQuestion[];
  quizName: string,
  tags: string[],
}

const QuizQuestion = () => {
  const props: QuizQuestionProps = mockQuiz;
  const questionCount = props.questions.length
  const [selectedChoices, setSelectedChoices] = useState<number[]>(Array(questionCount).fill(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  

  const handleOptionSelect = (option: number) => {
    const newChoices = [...selectedChoices];
    newChoices[currentQuestionIndex] = option;
    setSelectedChoices(newChoices);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const getScore = () => {
    let score = 0
    for(let i=0; i<props.questions.length; i++){
      if(props.questions[i].correctChoice == selectedChoices[i]){
        score++;
      }
    }
    return score;
  };

  const handleFinish = () => {
    router.dismissAll();
    const resultsProps: QuizResultsProps = {
      quizResultsProps: {
        quizName: props.quizName,
        tags: props.tags,
        maxScore: props.questions.length,
        score: getScore(),
      },
      recommendationProps: {
        tags: ['#A2'],
        name: 'Furniture',
        author: 'Kaan',
        desc: "A simple quiz about furniture."
      }
    }
    router.push({
      pathname: '/quizResults', 
      params: {'props': JSON.stringify(resultsProps)}
    });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleCancel = () => {
    router.dismissAll();
    router.push('/quizFeed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <View style={styles.page}>
        <View style={styles.topContainer}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity style={styles.cancelQuizButton} onPress={handleCancel}>
            <Text style={styles.cancelQuizText}>Cancel Quiz</Text>
          </TouchableOpacity>
          </Shadow>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1}/{questionCount}
            </Text>
          </View>
        </View>
        <View style={[styles.questionWrapper, styles.elevation]}>
        <View style={[styles.questionContainer, styles.questionAnswerElevation]}>
          <Text style={styles.questionText}>{props.questions[currentQuestionIndex].question}</Text>
        </View>

        <View style={styles.optionsContainer}>
        <View style={styles.optionWrapper}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 1 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(1)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice1}</Text>
          </TouchableOpacity>
          </Shadow>
          </View>

          <View style={styles.optionWrapper}>
          <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 2 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(2)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice2}</Text>
          </TouchableOpacity>
          </Shadow>
          </View>

          <View style={styles.optionWrapper}>
          <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 3 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(3)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice3}</Text>
          </TouchableOpacity>
          </Shadow>
          </View>
          <View style={styles.optionWrapper}>
          <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 4 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(4)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice4}</Text>
          </TouchableOpacity>
          </Shadow>
          </View>

        </View>
        </View>
        <View style={styles.navigationContainer}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity style={currentQuestionIndex==0 ? styles.disabledNavigationButton : styles.navigationButton} onPress={handlePrevious} disabled={currentQuestionIndex==0}>
            <Text style={styles.navigationText}>Previous</Text>
          </TouchableOpacity>
          </Shadow>
          { currentQuestionIndex == questionCount-1 ?
          <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
              <TouchableOpacity style={styles.navigationButton} onPress={handleFinish}>
                <Text style={styles.navigationText}>Finish</Text>
              </TouchableOpacity> 
              </Shadow> :
              <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
              <TouchableOpacity style={styles.navigationButton} onPress={handleNext}>
                <Text style={styles.navigationText}>Next</Text>
              </TouchableOpacity>
              </Shadow>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  navbarContainer: {
    flex: 1,
  },
  page: {
    flex: 9,
    justifyContent: "space-around",
    alignItems: 'stretch',
    backgroundColor: 'white',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelQuizButton: {
    backgroundColor: '#b22222',
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
    backgroundColor: "blue",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  questionWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-around",
    padding: 20,
    marginVertical: 10,
  },
  
  questionContainer: {
    justifyContent: 'center',
    backgroundColor: "white",
    height: 200,
    marginBottom: 40,
    borderRadius: 10,
    borderColor: "#222",
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionWrapper: {
    width: 160,
    marginBottom: 12,
  },

  optionButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: '#3944FD',
    borderRadius: 10,
    padding: 10,
    width: 160,
    alignItems: 'center',
  },
  disabledNavigationButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    width: 160,
    alignItems: 'center',
  },
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  elevation: {
    elevation: 20,
    shadowColor: 'black',
  },
  questionAnswerElevation: {
    elevation: 3,
    shadowColor: 'black',
  },
});

export default QuizQuestion;
