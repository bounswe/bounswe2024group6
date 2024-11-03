import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';

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
    router.push('./quizCreationQuestionList');
  };

  // Check if any field is empty
  const isButtonDisabled = !quizTitle || !quizDescription || !selectedLevel;

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {/* Title input */}
        <View style={[styles.wrapper, styles.elevation]}>
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
            <View style={styles.optionWrapper}>
            <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
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
            </Shadow>
            </View>
          ))}
        </View>
          
          <View style={styles.addButtonWrapper}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
        <TouchableOpacity
          style={[styles.addButton, isButtonDisabled && styles.disabledButton]} 
          onPress={handleAddQuestions}
          disabled={isButtonDisabled} 
        >
          <Text style={styles.addButtonText}>Add Questions</Text>
        </TouchableOpacity>
        </Shadow>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  page: {
    flex: 9,
    backgroundColor: 'white',
    padding: 1,
    paddingTop: 100,
    justifyContent: 'flex-start',
  },
  wrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-around",
    alignSelf: 'stretch',
    padding: 15,
  },
  elevation: {
    elevation: 30,
    shadowColor: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#E8E8E8',
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
  optionWrapper: {
    width: 90,
    margin: 10,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 100,
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
  addButton: {
    backgroundColor: '#3944FD',
    padding: 15,
    width: 200,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
  addButtonWrapper: {
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuizCreationSettings;
