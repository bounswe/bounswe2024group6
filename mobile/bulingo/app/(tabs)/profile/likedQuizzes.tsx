import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import QuizCard from '@/app/components/quizCard';
import { QuizInfo } from '.';
import TokenManager from '@/app/TokenManager';


export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [likedQuizzes, setLikedQuizzes] = useState<QuizInfo[]>([])

  useEffect(() => {

    const fetchFollowers = async () => {
      const url = 'quiz/likes';
      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok){
          const result = await response.json();
          setLikedQuizzes(result);
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

  function remove_from_liked(id: number){
    return () => { setLikedQuizzes(likedQuizzes.filter(item => item.id != id)) };
  }

  return (
    <FlatList
      data={likedQuizzes}
      renderItem={({item}) => { 
        return (
          <QuizCard id={item.id} author={item.author.username} title={item.title} level={item.level} 
              description={item.description} liked={item.is_liked} likes={item.like_count}
              onLikePress={remove_from_liked(item.id)}/>
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Liked Quizzes</Text>
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

