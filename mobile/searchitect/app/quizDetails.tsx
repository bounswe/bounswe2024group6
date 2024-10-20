import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Navbar from './navbar';

const QuizDetails = () => {
  const { params } = useRoute();
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const search = () => {
    // Example of fetching quiz data
    // searchQuery(params.queryText)
    //   .then((res) => {
    //     setResponse(res);
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with buttons aligned horizontally */}
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerButton}>
          <Image source={require('../home-icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, styles.purpleBackground]}>
          <Text style={styles.headerText}>Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, styles.purpleBackground]}>
          <Text style={styles.headerText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Image source={require('../assets/images/profile-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View> */}
      <Navbar/>

      {/* Quiz name and description box */}
      <View style={styles.quizDetailsBox}>
        <Text style={styles.quizTitle}>Foods</Text>
        <Text style={styles.quizDescription}>
          Stats {'\n'}
          Times Taken: 35 {'\n'}
          Number of Questions: 10 {'\n'}
          Average Score: 8 {'\n'}
          Time Limit: No Limit
        </Text>

        {/* Bookmark button in the bottom right corner */}
        <TouchableOpacity style={styles.bookmarkButton}>
          <Image source={require('../assets/images/bookmark-icon.png')} style={styles.bookmarkIcon} />
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <TouchableOpacity style={styles.quizButton} onPress={() => console.log('Take Quiz Pressed')}>
        <Text style={styles.buttonText}>Take Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerButton: {
    padding: 10,
  },
  purpleBackground: {
    backgroundColor: '#C8C8F0', // Light purple color for Quizzes and Forum buttons
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 24,
    height: 24,
  },
  quizDetailsBox: {
    backgroundColor: '#D8EBCF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    position: 'relative', // Required for absolute positioning of bookmark button
  },
  quizTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  quizDescription: {
    fontSize: 16,
    color: '#333',
  },
  quizButton: {
    backgroundColor: '#5DAB44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%', // Take Quiz button smaller than the full width
    alignSelf: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#CCCCCC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '70%', // Go Back button smaller than Take Quiz button
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  bookmarkButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
  },
});

export default QuizDetails;
