import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import Navbar from "./navbar";

export type QuizQuestionProps = {
  question: string,
  options: string[],
  currentQuestion: number,
  totalQuestions: number,
};

const QuizQuestion = (props: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Logic to go to the next question (e.g., update the currentQuestion index)
  };

  const handlePrevious = () => {
    // Logic to go to the previous question (e.g., update the currentQuestion index)
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <View style={styles.page}>
        <View style={styles.topContainer}>
          <Pressable style={styles.cancelQuizButton}>
            <Text style={styles.cancelQuizText}>Cancel Quiz</Text>
          </Pressable>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {props.currentQuestion}/{props.totalQuestions}
            </Text>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{props.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {props.options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option ? styles.selectedOption : null,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.navigationContainer}>
          <Pressable style={styles.navigationButton} onPress={handlePrevious}>
            <Text style={styles.navigationText}>Previous</Text>
          </Pressable>

          <Pressable style={styles.navigationButton} onPress={handleNext}>
            <Text style={styles.navigationText}>Next</Text>
          </Pressable>
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
  navigationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuizQuestion;
