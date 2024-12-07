import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, TouchableWithoutFeedback, ActivityIndicator, Pressable } from 'react-native';
import PressableText from '@/app/pressableText';
import TokenManager from '@/app/TokenManager';
import ModalDictionary from '@/app/components/modalDictionary';

export default function BookmarkedWords() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);// Function to handle press and show modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedWord(null);
  };

  const wordPress = (word:string) => {
    setModalVisible(true);
    setSelectedWord(word);
  }

  useEffect(() => {
    const fetchFollowers = async () => {
      const url = "bookmarked-words/"  // Placeholder
      try {
        // const response = await TokenManager.authenticatedFetch(url, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (response.ok){
        //   const result = await response.json()
        //   setBookmarkedWords(result);  // Placeholder
        // } else {
        //   console.log(response.status)
        // };
        setBookmarkedWords(['plane', 'welcome', 'brother', 'mediocre'])  // Here for testing only
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
    <>
      <FlatList
        data={bookmarkedWords}
        renderItem={({item}) => {  // Placeholder, replace with quiz card
          return (
            <Pressable style={styles.box} onPress={() => wordPress(item)}>
              <Text style={styles.text}>{item}</Text>
            </Pressable>
          );
        }}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Bookmarked Words</Text>
          </View>
        }
        style={styles.list}
      />
      {selectedWord && modalVisible && (
        <ModalDictionary onClose={closeModal} word={selectedWord}/>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 10,
    padding: 5,
  },
  box: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
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

