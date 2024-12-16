import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

type LikedPostAndCommentsInfoPlaceholder = {  // Placeholder, remove when Quiz Card is ready.
  name: string,
};

export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [likedPostAndComments, setLikedPostAndComments] = useState<LikedPostAndCommentsInfoPlaceholder[]>([
    {name: 'Post 1'},  // Placeholder
    {name: 'Comment 1'},  // Placeholder
    {name: 'Comment 2'},  // Placeholder
    {name: 'Post 2'},  // Placeholder
  ])

  useEffect(() => {
    const ENDPOINT_URL = "http://161.35.208.249:800000/likedpostandcomments";  // Placeholder
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
          setLikedPostAndComments(await response.json());
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
      data={likedPostAndComments}
      keyExtractor={(item) => item.name}  // Placeholder, change with quiz card
      renderItem={({item}) => {  // Placeholder, replace with quiz card
        return (
          <View style={{height: 100, borderWidth: 3, borderColor: 'black', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 5,}}>
            <Text>Placeholder Item: {item.name}</Text>
          </View>
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Liked Posts And Comments</Text>
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

