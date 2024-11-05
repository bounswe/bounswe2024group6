import { View, Text, StyleSheet } from 'react-native';
import QuizFeed from '../quizFeed';

export default function Tab() {
  return (
    <QuizFeed/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
