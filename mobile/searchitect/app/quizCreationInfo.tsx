import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import Navbar from './navbar';

const QuizCreationInfo = () => {
  const [question, setQuestion] = useState('Pasta');
  const [answers, setAnswers] = useState(['pasta', '', '', '']);
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const answerGrid = [
    [answers[0], answers[1]],
    [answers[2], answers[3]],
  ];

  const handleAnswerClick = (index: number) => {
    setSelectedAnswerIndex(index);
  };

  const handleAddAnswer = () => {
    if (newAnswer && selectedAnswerIndex !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[selectedAnswerIndex] = newAnswer;
      setAnswers(updatedAnswers);
      setNewAnswer('');
    }
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Navbar />

      <View style={styles.page}>
        {/* Type Selection Buttons */}
        <View style={styles.typeContainer}>
          {['Type I', 'Type II', 'Type III'].map((type, index) => (
            <Pressable
              key={index}
              style={[
                styles.typeButton,
                selectedType === type ? styles.selectedType : null,
              ]}
              onPress={() => handleTypeSelect(type)}
            >
              <Text style={styles.typeText}>{type}</Text>
            </Pressable>
          ))}
        </View>

        {/* Question and Answers Section */}
        <View style={styles.questionAnswersContainer}>
          {/* Editable question title area */}
          <View style={styles.questionBox}>
            <TextInput
              style={styles.questionText}
              value={question}
              onChangeText={(text) => setQuestion(text)}
              editable={true} 
            />
          </View>
          <View style={styles.answerGridContainer}>
            {answerGrid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.answerRow}>
                {row.map((answer, colIndex) => {
                  const answerIndex = rowIndex * 2 + colIndex;
                  return (
                    <Pressable
                      key={colIndex}
                      style={[
                        styles.answerBox,
                        selectedAnswerIndex === answerIndex
                          ? styles.selectedAnswer
                          : null,
                      ]}
                      onPress={() => handleAnswerClick(answerIndex)}
                    >
                      <Text style={styles.answerText}>{answer}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Add Answer Header */}
        <Text style={styles.label}>Add Answer:</Text>
        <View style={styles.addAnswerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add Answer"
            value={newAnswer}
            onChangeText={setNewAnswer}
          />
          <Pressable style={styles.addButton} onPress={handleAddAnswer}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        {/* Suggestions Header */}
        <Text style={styles.label}>Suggestions:</Text>
        <View style={styles.suggestionsContainer}>
          {['makarna', 'pilav', 'kek','yogurt'].map((suggestion, index) => (
            <Pressable key={index} style={styles.suggestionButton} onPress={() => setNewAnswer(suggestion)}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </Pressable>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtonsContainer}>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>Go Back</Text>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>Add Question</Text>
          </Pressable>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  page: {
    flex: 9,
    backgroundColor: '#e6ffed',
    padding: 20,
    justifyContent: 'flex-start',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    backgroundColor: '#ffec99',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#d1e7dd',
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  questionAnswersContainer: {
    backgroundColor: '#e6ffed',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    padding: 15,
    marginBottom: 20,
  },
  questionBox: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#ffec99',
    borderWidth: 2, 
    borderColor: '#000', 
    borderRadius: 8, 
    padding: 10,
  },
  answerGridContainer: {
    marginBottom: 20,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  answerBox: {
    backgroundColor: '#ffec99',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: '#d1e7dd',
  },
  answerText: {
    fontSize: 18,
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  addAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff6cc',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#b0e57c',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  suggestionButton: {
    backgroundColor: '#d1e7dd',
    padding: 10,
    borderRadius: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: '#000',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#b0e57c',
    padding: 15,
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuizCreationInfo;
