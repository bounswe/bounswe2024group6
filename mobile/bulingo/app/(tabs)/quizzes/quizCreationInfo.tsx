import React, { useState, useEffect} from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';

const QuizCreationInfo = () => {
  const [question, setQuestion] = useState('Pasta');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [showButtonIndex, setShowButtonIndex] = useState(null); // Track which tile should show the button
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState('Type II');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null)

  const isButtonDisabled = () => {
    const nonEmptyAnswers = answers.filter(answer => answer.trim() !== "");
    const uniqueAnswers = new Set(nonEmptyAnswers);
    return nonEmptyAnswers.length < answers.length || uniqueAnswers.size !== nonEmptyAnswers.length || correctAnswerIndex === null || !question.trim() || !selectedType?.trim();
  };


  // get params from the previous screen
  const { initialQuestion, initialAnswers, initialCorrectAnswer, type, index} = useLocalSearchParams();

  useEffect(() => {
    if (initialQuestion && initialAnswers && initialCorrectAnswer) {
      setQuestion(Array.isArray(initialQuestion) ? initialQuestion[0] : initialQuestion);
      setAnswers(JSON.parse(Array.isArray(initialAnswers) ? initialAnswers[0] : initialAnswers));
      setCorrectAnswerIndex(JSON.parse(Array.isArray(initialAnswers) ? initialAnswers[0] : initialAnswers).indexOf(initialCorrectAnswer));
      setSelectedType(type instanceof Array ? type[0] : type);
    }
  }, [initialQuestion, initialAnswers, initialCorrectAnswer]);

  const handleGoBack = () => {
    router.back();
  }

  const selectCorrectAnswer = (index: any) => {
    setCorrectAnswerIndex(index);
    setShowButtonIndex(null); // 
  };

  const handleLongPress = (index: any) => {
    setShowButtonIndex(index);
  };

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

  const handleAddQuestion = () => {
    router.navigate({ pathname: '/(tabs)/quizzes/quizCreationQuestionList', params: { question: question, answers: JSON.stringify(answers), correctAnswer: answers[correctAnswerIndex!], selectedType: selectedType, index: index } });
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const resetSelections = () => {
    Keyboard.dismiss();
    setSelectedAnswerIndex(null);
    setShowButtonIndex(null);
  };

  return (
    <TouchableWithoutFeedback onPress={resetSelections} accessible={false}>
    <View style={styles.container}>

      <View style={styles.page}>
        {/* Type Selection Buttons */}
        <View style={styles.typeContainer}>
          {['Type I', 'Type II', 'Type III'].map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.typeButton,
                selectedType === type ? styles.selectedType : null,
              ]}
              onPress={() => handleTypeSelect(type)}
            >
              <Text style={styles.typeText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Question and Answers Section */}
        <View style={[styles.questionAnswersContainer, styles.elevation]}>
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
                    <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
                    <TouchableOpacity
                      key={colIndex}
                      style={[
                        styles.answerBox,
                        correctAnswerIndex === answerIndex
                          ? styles.correctAnswer
                          : null, // Highlight correct answer
                        selectedAnswerIndex === answerIndex
                        ? styles.selectedAnswer
                        : null,
                      ]}
                      onPress={() => handleAnswerClick(answerIndex)}
                      onLongPress={() => handleLongPress(answerIndex)}
                    >
                      <Text style={styles.answerText}
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                      >{answer}</Text>

                                      {/* Show the button if the user long-pressed this tile */}
                    {showButtonIndex === answerIndex && (
                      <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => selectCorrectAnswer(answerIndex)}
                      >
                        <Text style={styles.selectButtonText}>
                          {correctAnswerIndex === answerIndex
                            ? 'Correct Answer Selected'
                            : 'Select as Correct'}
                        </Text>
                      </TouchableOpacity>
                    )}

                    </TouchableOpacity>
                    </Shadow>
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
          <TouchableOpacity style={styles.addButton} onPress={handleAddAnswer}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Suggestions Header */}
        <Text style={styles.label}>Suggestions:</Text>
        <View style={styles.suggestionsContainer}>
          {['makarna', 'pilav', 'kek','yogurt'].map((suggestion, index) => (
            <TouchableOpacity key={index} style={styles.suggestionButton} onPress={() => setNewAnswer(suggestion)}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtonsContainer}>
        <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity style={styles.backButton} onPress={() => handleGoBack()}>
            
            <Text style={styles.navButtonText}>Go Back</Text>
          </TouchableOpacity>
        </Shadow>
          <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
          <TouchableOpacity 
            style={[styles.navButton, isButtonDisabled() && styles.disabledButton]} 
            disabled={isButtonDisabled()}
            onPress={() => handleAddQuestion()}
          >
          <Text style={styles.navButtonText}>Add Question</Text>
        </TouchableOpacity>
        </Shadow>
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
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'flex-start',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    backgroundColor: 'white',
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
    backgroundColor: 'lightblue',
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  questionAnswersContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    backgroundColor: '#E8E8E8',
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
    backgroundColor: 'white',
    borderRadius: 10,
    width: 150,
    padding: 10,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: 'lightblue',
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
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'lightblue',
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
    padding: 5,
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#3944FD',
    padding: 15,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
  },
  backButton: {  
    backgroundColor: '#CCCCCC',
    padding: 15,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  selectButton: {
    position: 'absolute', 
    top: '50%',           
    left: '50%',          
    transform: [{ translateX: -50 }, { translateY: -50 }], 
    backgroundColor: '#3944FD',
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  correctAnswer: {
    backgroundColor: '#4caf50',
  },
  elevation: {
    elevation: 30,
    shadowColor: 'black',
  },
});

export default QuizCreationInfo;
