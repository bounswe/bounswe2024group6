import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Navbar from "./navbar";
import {router} from "expo-router"
import { QuizResultsCardProps, QuizResultsProps } from './quizResults';

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
    question: 'hail',
    type: 2,
    choice1: 'halı',
    choice2: 'yağmur',
    choice3: 'dolu',
    choice4: 'balık',
    correctChoice: 3,
  },
  {
    question: 'extenuate',
    type: 3,
    choice1: 'point, extend, or project in a specified line or course',
    choice2: 'correct by removing errors',
    choice3: 'collect or gather into a mass or whole',
    choice4: 'lessen the strength or effect of',
    correctChoice: 4,
  },
], quizName: "Example Quiz", tags: ['#B1']};

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
        name: 'Foods',
        author: 'Kaan',
        desc: "A simple quiz about foods."
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
          <Pressable style={styles.cancelQuizButton} onPress={handleCancel}>
            <Text style={styles.cancelQuizText}>Cancel Quiz</Text>
          </Pressable>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1}/{questionCount}
            </Text>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{props.questions[currentQuestionIndex].question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <Pressable
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 1 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(1)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice1}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 2 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(2)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice2}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 3 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(3)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice3}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.optionButton,
              selectedChoices[currentQuestionIndex] == 4 ? styles.selectedOption : null,
            ]}
            onPress={() => handleOptionSelect(4)}
          >
            <Text style={styles.optionText}>{props.questions[currentQuestionIndex].choice4}</Text>
          </Pressable>
        </View>

        <View style={styles.navigationContainer}>
          <Pressable style={currentQuestionIndex==0 ? styles.disabledNavigationButton : styles.navigationButton} onPress={handlePrevious} disabled={currentQuestionIndex==0}>
            <Text style={styles.navigationText}>Previous</Text>
          </Pressable>
          { currentQuestionIndex == questionCount-1 ?
              <Pressable style={styles.navigationButton} onPress={handleFinish}>
                <Text style={styles.navigationText}>Finish</Text>
              </Pressable> :
              <Pressable style={styles.navigationButton} onPress={handleNext}>
                <Text style={styles.navigationText}>Next</Text>
              </Pressable>
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
    backgroundColor: '#fff',
  },
  navbarContainer: {
    flex: 1,
  },
  page: {
    flex: 9,
    justifyContent: "space-around",
    alignItems: 'stretch',
    backgroundColor: '#e6ffed',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelQuizButton: {
    backgroundColor: '#d3f8d3',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  cancelQuizText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  progressContainer: {
    justifyContent: 'center',
    backgroundColor: "#ffec99",
    height: 50,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#222",
    paddingHorizontal: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  questionContainer: {
    justifyContent: 'center',
    backgroundColor: "#ffec99",
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#222",
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#ffec99',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#222',
    padding: 10,
    margin: 5,
    flexBasis: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#d1e7dd',
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
    backgroundColor: '#d3f8d3',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '45%',
    alignItems: 'center',
  },
  disabledNavigationButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '45%',
    alignItems: 'center',
  },
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuizQuestion;
