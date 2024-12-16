import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { QuizInfo } from '.';
import QuizCard from '@/app/components/quizCard';
import TokenManager from '@/app/TokenManager';


export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedQuizzes, setBookmarkedQuizzes] = useState<QuizInfo[]>([])

  useEffect(() => {
    const fetchFollowers = async () => {
      const url = "quiz/bookmarks/"
      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok){
          const result = await response.json()
          console.log(result)
          setBookmarkedQuizzes(result);
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
          <QuizCard id={item.id} author={item.author.username} title={item.title} level={item.level} 
              description={item.description} liked={item.is_liked} likes={item.like_count} bookmarked={item.is_bookmarked}/>
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

