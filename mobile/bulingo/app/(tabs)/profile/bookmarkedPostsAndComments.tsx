import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import TokenManager from '@/app/TokenManager';

export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedPostsAndComments, setBoormarkedPostAndComments] = useState<any[]>([])

  useEffect(() => {
    const fetchFollowers = async () => {
      const username = TokenManager.getUsername();
      if(username === undefined){
        console.error('username is undefined!');
        return
      }
      const params = {
        'user': username,
      }
      try {
        const response = await TokenManager.authenticatedFetch("get_bookmarked_posts/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok){
          const result = await response.json();
          setBoormarkedPostAndComments(result);
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
      data={bookmarkedPostsAndComments}
      keyExtractor={(item) => item.name}  // Placeholder, change with post/comment card
      renderItem={({item}) => {  // Placeholder, replace with post/comment card
        return (
          <View style={{height: 100, borderWidth: 3, borderColor: 'black', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 5,}}>
            <Text>Placeholder Item: {item.name}</Text>
          </View>
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Bookmarked Posts And Comments</Text>
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

