import React, { useState, useEffect} from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Image, TouchableOpacity, useColorScheme, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const QuizCreationInfo = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [showButtonIndex, setShowButtonIndex] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState('Type I');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false);


  const isButtonDisabled = () => {
    const nonEmptyAnswers = answers.filter(answer => answer.trim() !== "");
    const uniqueAnswers = new Set(nonEmptyAnswers);
    return nonEmptyAnswers.length < answers.length || uniqueAnswers.size !== nonEmptyAnswers.length || correctAnswerIndex === null || !question.trim() || !selectedType?.trim();
  };

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const { initialQuestion, initialAnswers, initialCorrectAnswer, type, index, trigger} = useLocalSearchParams();




  useEffect(() => {
    if (initialQuestion && initialAnswers && initialCorrectAnswer) {
      setQuestion(Array.isArray(initialQuestion) ? initialQuestion[0] : initialQuestion);
      setAnswers(JSON.parse(Array.isArray(initialAnswers) ? initialAnswers[0] : initialAnswers));
      setCorrectAnswerIndex(Number(initialCorrectAnswer));
      setSelectedType(type instanceof Array ? type[0] : type);
    }
  }, [initialQuestion, initialAnswers, initialCorrectAnswer]);

  const handleGoBack = () => {
    router.back();
  }

  const selectCorrectAnswer = (index: any) => {
    setCorrectAnswerIndex(index);
    setShowButtonIndex(null); 
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
    router.navigate({ pathname: '/(tabs)/quizzes/quizCreationQuestionList', params: { question: question, answers: JSON.stringify(answers), correctAnswer: correctAnswerIndex, selectedType: selectedType, index: index, trigger: trigger} });
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const resetSelections = () => {
    Keyboard.dismiss();
    setSelectedAnswerIndex(null);
    setShowButtonIndex(null);
  };

  const handleNewSuggestions = async () => {
    try {
      if (selectedType === 'Type I') {
        const response = await TokenManager.authenticatedFetch(`/get-turkish/${question}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          setNewAnswer('');
          return;
        }
        const data = await response.json();
        const translation = data["turkish_translation"];
        setNewAnswer(translation);
        
      }
      else if (selectedType === 'Type II') {
      const response = await TokenManager.authenticatedFetch(`/get-english/${question}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        setNewAnswer('');
        return;
      }
      const data = await response.json();
      console.log(data);
      const translation = data["english_word"];
      setNewAnswer(translation);
  
    }
    } catch (error) {
      console.error('Error fetching word meaning:', error);
      setCurrentSuggestion('');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={resetSelections} accessible={false}>
    <View style={styles.container}>
      <View style={styles.page}>
        {/* Type Selection Buttons */}
      <View style={styles.topContainer}>
                  
      <TouchableOpacity style={styles.infoButton} onPress={() => setShowInfoModal(true)}>
         <Image source={require('@/assets/images/info.png')} style={styles.icon}  />
        </TouchableOpacity>
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
                    <TouchableOpacity
                      style={[
                        styles.answerBox,
                        correctAnswerIndex === answerIndex
                          ? styles.correctAnswer
                          : null, 
                        selectedAnswerIndex === answerIndex
                        ? styles.selectedAnswer
                        : null,
                      ]}
                      onPress={() => handleAnswerClick(answerIndex)}
                      onLongPress={() => handleLongPress(answerIndex)}
                      key={answerIndex}
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
          <TouchableOpacity style={styles.backButton} onPress={() => handleGoBack()}>
            
            <Text style={styles.navButtonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navButton, isButtonDisabled() && styles.disabledButton]} 
            disabled={isButtonDisabled()}
            onPress={() => handleAddQuestion()}
          >
          <Text style={styles.navButtonText}>Add Question</Text>
        </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={showInfoModal}
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowInfoModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Type Information</Text>
                <Text style={styles.modalText}>
                  {selectedType === 'Type I' && 'Type I -> English to Turkish'}
                  {selectedType === 'Type II' && 'Type II -> Turkish to English'}
                  {selectedType === 'Type III' && 'Type III -> Meaning of English Word'}
                </Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowInfoModal(false)}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
    </TouchableWithoutFeedback>
  );
};

const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    page: {
      flex: 9,
      backgroundColor: isDark ? '#121212' : 'white',
      padding: 20,
      paddingTop: 50,
      justifyContent: 'flex-start',
    },
    typeButton: {
      backgroundColor: isDark ? '#2e2e2e' : 'white',
      padding: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: isDark ? '#aaa' : '#000',
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedType: {
      backgroundColor: isDark ? '#3944FD' : 'lightblue',
    },
    typeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    questionAnswersContainer: {
      backgroundColor: isDark ? '#1e1e1e' : 'white',
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
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#333' : '#E8E8E8',
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
      backgroundColor: isDark ? '#333' : 'white',
      borderRadius: 10,
      width: 150,
      padding: 10,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedAnswer: {
      backgroundColor: isDark ? '#555' : 'lightblue',
    },
    answerText: {
      fontSize: 18,
      color: isDark ? '#fff' : '#000',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
      marginBottom: 10,
    },
    addAnswerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      backgroundColor: isDark ? '#333' : '#E8E8E8',
      color: isDark ? '#fff' : '#000',
      borderRadius: 10,
      padding: 10,
      flex: 1,
      marginRight: 10,
    },
    addButton: {
      backgroundColor: isDark ? '#3944FD' : 'lightblue',
      padding: 10,
      borderRadius: 10,
    },
    addButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    suggestionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    suggestionButton: {
      backgroundColor: isDark ? '#444' : '#d1e7dd',
      padding: 5,
      width: 80,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    suggestionText: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
    },
    navButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    navButton: {
      backgroundColor: isDark ? '#3944FD' : '#3944FD',
      padding: 15,
      width: 150,
      alignItems: 'center',
      borderRadius: 10,
    },
    backButton: {
      backgroundColor: isDark ? '#555' : '#CCCCCC',
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
      backgroundColor: isDark ? '#444' : '#ccc',
    },
    selectButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
      backgroundColor: isDark ? '#3944FD' : '#3944FD',
      padding: 5,
      borderRadius: 5,
      zIndex: 1,
    },
    selectButtonText: {
      color: isDark ? '#fff' : '#fff',
      fontSize: 14,
    },
    correctAnswer: {
      backgroundColor: isDark ? '#4caf50' : '#4caf50',
    },
    elevation: {
      elevation: 30,
      shadowColor: isDark ? '#fff' : 'black',
    },
    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    infoButton: {
      width: 25, 
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5, 
    },
    
    icon: {
      width: 25,
      height: 25,
    },
    typeContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    modalCloseButton: {
      backgroundColor: '#3944FD',
      padding: 10,
      borderRadius: 5,
    },
    modalCloseButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    
  
    

  });
};

export default QuizCreationInfo;
