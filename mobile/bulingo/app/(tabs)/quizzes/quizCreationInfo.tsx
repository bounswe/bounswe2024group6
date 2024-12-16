import React, { useState, useEffect} from 'react';
import { ScrollView, Keyboard, Pressable, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Image, TouchableOpacity, useColorScheme, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import TokenManager from '@/app/TokenManager';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const QuizCreationInfo = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [showButtonIndex, setShowButtonIndex] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState('Type I');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null)
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [prevWord, setPrevWord] = useState('');
  const [verticalOptions, setVerticalOptions] = useState<string[]>([]);
  const [meaningList, setMeaningList] = useState<any>([]);
  const [meaningIndex, setMeaningIndex] = useState(0);
  const [error, setError] = useState('');
  const [localImage, setLocalImage] = useState<string | null>(null); // Local file URI

  const isButtonDisabled = () => {
    const nonEmptyAnswers = answers.filter(answer => answer.trim() !== "");
    const uniqueAnswers = new Set(nonEmptyAnswers);
    return nonEmptyAnswers.length < answers.length || uniqueAnswers.size !== nonEmptyAnswers.length || correctAnswerIndex === null || !question.trim() || !selectedType?.trim();
  };

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const { initialQuestion, initalQuestionImage, initialAnswers, initialCorrectAnswer, type, index, trigger} = useLocalSearchParams();


  const fetchVerticalOptions = async () => {
    try {
      let endpoint = '';
      if (selectedType === 'Type I') {
        endpoint = `/quiz/choices/${question}/EN_TO_TR/`;
      } else if (selectedType === 'Type II') {
        endpoint = `/quiz/choices/${question}/TR_TO_EN/`;
      } else if (selectedType === 'Type III') {
        endpoint = `/quiz/choices/${question}/EN_TO_MEANING/`;
      }
      
      const response = await TokenManager.authenticatedFetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setVerticalOptions([]);
        setError('Options not available.');
        return;
      }

      
      const options = [...data.options];
      setVerticalOptions(options);
      setError('');
    } catch (error) {
      console.error('Error fetching vertical options:', error);
      setVerticalOptions([]);
      setError('Options not available.');
    }
  };


  useEffect(() => {
    if (initialQuestion && initialAnswers && initialCorrectAnswer) {
      setQuestion(Array.isArray(initialQuestion) ? initialQuestion[0] : initialQuestion);
      setAnswers(JSON.parse(Array.isArray(initialAnswers) ? initialAnswers[0] : initialAnswers));
      setCorrectAnswerIndex(Number(initialCorrectAnswer));
      setSelectedType(type instanceof Array ? type[0] : type);
      if (initalQuestionImage === ''){
        setLocalImage(null);
      }
      else{
        setLocalImage(initalQuestionImage instanceof Array ? initalQuestionImage[0] : initalQuestionImage);
      }
      
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
    router.navigate({ pathname: '/(tabs)/quizzes/quizCreationQuestionList', params: { question: question, answers: JSON.stringify(answers), correctAnswer: correctAnswerIndex, selectedType: selectedType, index: index, trigger: trigger, questionImage: localImage} });
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
          setError('Meaning not available.');
          return;
        }
        const data = await response.json();
        const translation = data["turkish_translation"];
        setNewAnswer(translation);
        setError('');
        
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
        setError('Meaning not available.');
        return;
      }
      const data = await response.json();
      const translation = data["english_word"];
      setNewAnswer(translation);
      setError('');
  
    }
    else if (selectedType === 'Type III') {
      if (prevWord !== question) {
        setMeaningIndex(0);
        setMeaningList([]);
        const response = await TokenManager.authenticatedFetch(`/get-meaning/${question}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        setPrevWord(question);
          
        if (!response.ok) {
          setNewAnswer('');
          setError('Meaning not available.');
          return;
        }
        const data = await response.json();
        let meaning = data["meaning"];

        if (meaning === undefined) {
          setNewAnswer('');
          setError('Meaning not available.');
          return;
        }
        let tempList = [];
        if (meaning.includes(',')) {
          tempList = meaning.split(',');
          for (let i = 0; i < tempList.length; i++) {
            tempList[i] = tempList[i].trim();
          }
          for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].charAt(tempList[i].length - 1) === ';') {
              tempList[i] = tempList[i].substring(0, tempList[i].length - 1);
            }
          }
        } 
        else {
          meaning = meaning.trim();
          if (meaning.charAt(meaning.length - 1) === ';') {
            meaning = meaning.substring(0, meaning.length - 1);
          }
          tempList.push(meaning);
        }

        for (let i = 0; i < tempList.length; i++) {
          if (tempList[i] === 'None') {
            tempList.splice(i, 1);
          }
        }
        setMeaningList(tempList); 
        setNewAnswer(tempList[0]);
        setError('');
    }
    else{
      let tempIndex = 0
      if (meaningIndex >= meaningList.length - 1) {
        setMeaningIndex(0);
      }
      else{
        tempIndex = meaningIndex + 1;
        setMeaningIndex(tempIndex);
      }
      if (meaningList.length > 0){
        setNewAnswer(meaningList[tempIndex]);
        setError('');
      }
      else{ 
        setNewAnswer('');
        setError('Meaning not available.')
      }
    }

      
    }
    } catch (error) {
      console.error('Error fetching word meaning:', error);
      setNewAnswer('');
      setError('Meaning not available.');
    }
  };

  const handlePickQuestionImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const originalUri = result.assets[0].uri;

        const fileName = originalUri.split('/').pop();
        const newUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.moveAsync({
          from: originalUri,
          to: newUri,
        });

        setLocalImage(newUri);
      }
    } catch (error) {
      console.error('Error saving image locally:', error);
    }
  };
  
  const handleRemoveQuestionImage = () => {
    setLocalImage(null);
  };
  

  return (
    <TouchableWithoutFeedback onPress={resetSelections} accessible={false}>
    <View style={styles.container}>
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
        <ScrollView>
        <TouchableWithoutFeedback>
        <View style={styles.page}>

        {/* Question and Answers Section */}
        <View style={[styles.questionAnswersContainer, styles.elevation]}>
          {/* Editable question title area */}
          <View style={styles.questionBox}>
              <TextInput
                style={styles.questionText}
                value={question}
                onChangeText={(text) => setQuestion(text)}
                editable={true}
                placeholder="Type your question here..."
              />

            {localImage && (
              <View>
                <Image
                  source={{ uri: localImage }}
                  style={styles.questionImageStyle}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={handleRemoveQuestionImage}
                >
                  <Text style={styles.removeImageButtonText}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.addImageButton}
              onPress={handlePickQuestionImage}
            >
              <Text style={styles.addImageButtonText}>
                {localImage ? 'Change Image' : 'Add Image'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.answerGridContainer}>
            {answerGrid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.answerRow}>
                {row.map((answer, colIndex) => {
                  const answerIndex = rowIndex * 2 + colIndex;
                  return (
                    <Pressable
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
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.textContainer}
                      >
                        <View onStartShouldSetResponder={() => true}>
                          <Text style={styles.answerText}
                          onPress={() => handleAnswerClick(answerIndex)}
                          onLongPress={() => handleLongPress(answerIndex)}
                          >{answer}</Text>
                          
                        </View>
                    </ScrollView>

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

                    </Pressable>
                    );
                })}
              </View>
            ))}
          </View>
        </View>

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

        <View style={styles.suggestionsContainer}>
          <TouchableOpacity
            style={styles.newSuggestionButton}
            onPress={() => 
              {
                handleNewSuggestions();
              }
          }
          >
            <Text style={styles.newSuggestionText}>New Suggestion!</Text>
          </TouchableOpacity>
          <View style={{ minHeight: 18 }}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        </View>

        <View style={styles.verticalOptionsContainer}>
          <TouchableOpacity style={styles.newSuggestionButton} onPress={fetchVerticalOptions}>
            <Text style={styles.newSuggestionText}>Fetch Options</Text>
          </TouchableOpacity>
          <ScrollView style={styles.verticalOptions}>
            {verticalOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => setNewAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


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
      </TouchableWithoutFeedback>
      </ScrollView>
      
      
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
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    suggestionButton: {
      backgroundColor: isDark ? '#444' : '#d1e7dd',
      padding: 5,
      width: 250,
      height: 150,
      alignSelf: 'center',
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
    scrollableContent: {
      flex: 1,
      width: '100%',
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
    textContainer: {
      marginHorizontal: 5,
    },
    currentSuggestionText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    newSuggestionButton: {
      paddingVertical: 10,
      paddingHorizontal: 6,
      alignSelf: 'center',
      width: 200,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    newSuggestionText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollViewStyle: {  
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    error: {
      color: '#FF0000',
      fontSize: 13,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    verticalOptionsContainer: {
      marginBottom: 40,
    },
    verticalOptions: {
    },
    optionButton: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#ccc',
    },
    optionText: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
    },
    questionImageStyle: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    imageTypeText: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
      marginVertical: 5,
    },
    addImageButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    addImageButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    removeImageButton: {
      backgroundColor: '#FF0000',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    removeImageButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    
  });
};

export default QuizCreationInfo;
