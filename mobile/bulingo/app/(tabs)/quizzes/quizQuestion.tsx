import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {router} from "expo-router"
import { QuizResultsProps } from './quizResults';
import { Shadow } from 'react-native-shadow-2';

import { Dimensions } from 'react-native';

import { Appearance, useColorScheme } from 'react-native';


const { width, height } = Dimensions.get('window');


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
  let colorScheme = useColorScheme();

  const [styles, setStyles] = useState(lightStyles);

  useEffect(() => {
    setStyles(colorScheme === 'dark' ? darkStyles : lightStyles);
  }, [colorScheme]);

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
      pathname: '/(tabs)/quizzes/quizResults', 
      params: {'props': JSON.stringify(resultsProps)}
    });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);

  };

  const handleCancel = () => {
    router.dismissAll();
    router.push('/(tabs)/quizzes/');
  };

  return (
    <View style={styles.container}>
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


const lightStyles = StyleSheet.create({
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
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-around",
    padding: 20,
    marginVertical: 10,
  },
  questionContainer: {
    justifyContent: 'center',
    backgroundColor: "white",
    height: height * 0.25,
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
    width: width * 0.35,
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: width * 0.35,
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
    width: width * 0.4,
    alignItems: 'center',
  },
  disabledNavigationButton: {
    backgroundColor: 'gray',
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
    shadowColor: 'black',
  },
  questionAnswerElevation: {
    elevation: 3,
    shadowColor: 'black',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#121212',
  },
  navbarContainer: {
    flex: 1,
  },
  page: {
    flex: 9,
    justifyContent: "space-around",
    alignItems: 'stretch',
    backgroundColor: '#121212',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelQuizButton: {
    backgroundColor: '#8b0000',
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
    backgroundColor: '#1a1a4e',
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
    backgroundColor: '#1e1e2e',
    borderRadius: 10,
    justifyContent: "space-around",
    padding: 20,
    marginVertical: 10,
    borderColor: '#333',
  },
  questionContainer: {
    justifyContent: 'center',
    backgroundColor: '#1e1e2e',
    height: height * 0.25,
    marginBottom: 40,
    borderRadius: 10,
    borderColor: "#333",
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionWrapper: {
    width: width * 0.35,
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#2e2e3e',
    borderRadius: 10,
    padding: 10,
    width: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#444',
  },
  selectedOption: {
    backgroundColor: '#3944FD',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
    width: width * 0.4,
    alignItems: 'center',
  },
  disabledNavigationButton: {
    backgroundColor: '#555',
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
    shadowColor: 'black',
  },
  questionAnswerElevation: {
    elevation: 3,
    shadowColor: 'black',
  },
});



export default QuizQuestion;
