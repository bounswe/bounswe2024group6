import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import Navbar from './navbar';

const QuizCreationQuestionList = () => {
  const [questions, setQuestions] = useState([
    'Pasta',
    'Salt',
    'Beef',
    'Lettuce',
  ]);

  const handleAddQuestion = () => {
    const newQuestion = `Question ${questions.length + 1}`;
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const renderQuestionItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{`Question ${index + 1}: ${item}`}</Text>
      <Pressable style={styles.iconButton}>
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
        <Pressable style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.footerButton}>
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
