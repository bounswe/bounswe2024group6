import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
import { saveQuizDetails } from './AsyncStorageHelpers';

const QuizCreationSettings = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState(''); 
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const isDark = colorScheme === 'dark';

  const quizLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };

  

  const handleAddQuestions = async () => {
    const details = {
      title: quizTitle,
      description: quizDescription,
      level: selectedLevel,
    };

    await saveQuizDetails(details);

    router.push('/(tabs)/quizzes/quizCreationQuestionList');
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
          placeholderTextColor={isDark ? 'white' : 'dark'}
          value={quizTitle}
          onChangeText={setQuizTitle}
        />

        {/* Description input */}
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter quiz description"
          placeholderTextColor={isDark ? 'white' : 'dark'}
          value={quizDescription}
          onChangeText={setQuizDescription}
          multiline={true}
        />

        <Text style={styles.label}>Quiz Level:</Text>
        <View style={styles.optionsContainer}>
          {quizLevels.map((level, index) => (
            <View style={styles.optionWrapper} key={index}>
            <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
            <TouchableOpacity
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

const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#fff',
      justifyContent: 'flex-start',
    },
    page: {
      flex: 9,
      backgroundColor: isDark ? '#121212' : 'white',
      padding: 1,
      paddingTop: 100,
      justifyContent: 'flex-start',
    },
    wrapper: {
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      borderRadius: 10,
      justifyContent: "space-around",
      alignSelf: 'stretch',
      padding: 15,
    },
    elevation: {
      elevation: 30,
      shadowColor: isDark ? '#ffffff' : 'black',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000',
      marginBottom: 10,
    },
    input: {
      backgroundColor: isDark ? '#333' : '#E8E8E8',
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      marginBottom: 20,
      color: isDark ? '#ffffff' : '#000',
    },
    placeholder: {
      color: isDark ? '#aaaaaa' : '#555555',
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
      backgroundColor: isDark ? '#2e2e2e' : 'white',
      borderRadius: 10,
      padding: 10,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedOption: {
      backgroundColor: isDark ? '#3944FD' : 'lightblue',
    },
    optionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000',
    },
    addButton: {
      backgroundColor: '#3944FD',
      padding: 15,
      width: 200,
      borderRadius: 10,
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: isDark ? '#444' : '#ccc',
    },
    addButtonWrapper: {
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000',
    },
  });
};

export default QuizCreationSettings;
