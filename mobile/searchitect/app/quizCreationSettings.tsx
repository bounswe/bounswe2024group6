import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import Navbar from './navbar';

const QuizCreationSettings = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState(''); 
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  const quizLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };

  const handleAddQuestions = () => {
    console.log('Proceed to add questions...');
  };

  // Check if any field is empty
  const isButtonDisabled = !quizTitle || !quizDescription || !selectedLevel;

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.page}>
        {/* Title input */}
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quiz title"
          value={quizTitle}
          onChangeText={setQuizTitle}
        />

        {/* Description input */}
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter quiz description"
          value={quizDescription}
          onChangeText={setQuizDescription}
          multiline={true}
        />

        <Text style={styles.label}>Quiz Level:</Text>
        <View style={styles.optionsContainer}>
          {quizLevels.map((level, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedLevel === level ? styles.selectedOption : null,
              ]}
              onPress={() => handleLevelSelect(level)}
            >
              <Text style={styles.optionText}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.addButton, isButtonDisabled && styles.disabledButton]} 
          onPress={handleAddQuestions}
          disabled={isButtonDisabled} 
        >
          <Text style={styles.addButtonText}>Add Questions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff6cc',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100, 
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#ffec99',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#222',
    padding: 10,
    margin: 5,
    flexBasis: '30%',
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
  addButton: {
    backgroundColor: '#b0e57c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuizCreationSettings;
