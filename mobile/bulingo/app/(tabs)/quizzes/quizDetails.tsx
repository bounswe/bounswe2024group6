import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
const QuizDetails = () => {
  const { params } = useRoute();
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
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
      <View style={[styles.elevation, styles.quizDetailsBox]}>
        <Text style={styles.quizTitle}>Foods</Text>
        <Text style={styles.quizDescription}>
          Stats {'\n'}
          Times Taken: 35 {'\n'}
          Number of Questions: 10 {'\n'}
          Average Score: 8 {'\n'}
          Time Limit: No Limit {'\n'}
          Tags: B1
        </Text>

        {/* Bookmark button in the bottom right corner */}
        <TouchableOpacity style={styles.bookmarkButton}>
          <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.bookmarkIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <Shadow distance={8} startColor="#00000020" endColor="#00000000" offset={[0, 4]}>
        <TouchableOpacity style={styles.quizButton}
          onPress={() => router.navigate('/(tabs)/quizzes/quizQuestion')}
        >
          <Text style={styles.buttonText}>Take Quiz</Text>
        </TouchableOpacity>
        </Shadow>
        </View>


      {/* Go Back button */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
    
};

const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? '#121212' : 'white',
    },
    quizDetailsBox: {
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      borderRadius: 5,
      padding: 20,
      marginTop: 20,
      marginBottom: 30,
      position: 'relative',
    },
    quizTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#ffffff' : '#333',
    },
    quizDescription: {
      fontSize: 16,
      color: isDark ? '#bbbbbb' : '#333',
    },
    quizButton: {
      backgroundColor: '#3944FD',
      padding: 15,
      borderRadius: 10,
      width: 300,
      alignItems: 'center',
      alignSelf: 'center',
    },
    elevation: {
      elevation: 50,
      shadowColor: isDark ? '#ffffff' : 'black',
    },
    goBackButton: {
      backgroundColor: isDark ? '#555555' : '#CCCCCC',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      width: '70%',
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      alignItems: 'center',
      color: '#ffffff',
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
};

export default QuizDetails;
