import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { QuizInfo } from '.';
import QuizCard from '@/app/components/quizCard';


export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedQuizzes, setBoormarkedQuizzes] = useState<QuizInfo[]>([
    { id: 4, title: 'Plants', description: 'Test your plant knowledge', author: 'Halil', level: 'A2', likes: 300, liked: true },
    { id: 5, title: 'Transport', description: 'Types of transport', author: 'Alex', level: 'B1', likes: 4, liked: false },
    { id: 6, title: 'Food', description: 'Learn about foods', author: 'Oguz', level: 'A2', likes: 135, liked: true },
  ])

  useEffect(() => {
    const ENDPOINT_URL = "http://161.35.208.249:8000/bookmarkedquizzes";  // Placeholder
    const fetchFollowers = async () => {
      const params = {
        // TODO
       };
      try {
        const response = await fetch(ENDPOINT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok){
          setBoormarkedQuizzes(await response.json());
        } else {
          console.log(response.status)
        };
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchFollowers();
  }, []);

  if(isLoading){
    return (
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList
      data={bookmarkedQuizzes}
      renderItem={({item}) => {  // Placeholder, replace with quiz card
        return (
          <QuizCard {...item}/>
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Bookmarked Quizzes</Text>
        </View>
      }
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 0,
    padding: 5,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

