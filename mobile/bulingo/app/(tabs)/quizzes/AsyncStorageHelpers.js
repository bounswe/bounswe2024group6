import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_KEY = 'quizDetails';
const QUESTIONS_KEY = 'quizQuestions';

export const saveQuizDetails = async (details) => {
  try {
    await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(details));
  } catch (error) {
    console.error('Error saving quiz details:', error);
  }
};


export const getQuizDetails = async () => {
  try {
    const details = await AsyncStorage.getItem(QUIZ_KEY);
    return details ? JSON.parse(details) : null;
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    return null;
  }
};

export const clearQuizDetails = async () => {
  try {
    await AsyncStorage.removeItem(QUIZ_KEY);
  } catch (error) {
    console.error('Error clearing quiz details:', error);
  }
};


export const saveQuestions = async (questions) => {
  try {
    await AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error saving questions:', error);
  }
};

export const getQuestions = async () => {
  try {
    const questions = await AsyncStorage.getItem(QUESTIONS_KEY);
    return questions ? JSON.parse(questions) : [];
  } catch (error) {
    console.error('Error retrieving questions:', error);
    return [];
  }
};

export const clearQuestions = async () => {
  try {
    await AsyncStorage.removeItem(QUESTIONS_KEY);
  } catch (error) {
    console.error('Error clearing questions:', error);
  }
};