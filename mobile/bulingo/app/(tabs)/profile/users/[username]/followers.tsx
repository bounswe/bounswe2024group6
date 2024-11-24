import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import UserCard from '../../userCard';
import TokenManager from '@/app/TokenManager';
import { useLocalSearchParams, useNavigation } from 'expo-router';

type UserInfoCompact = {
  username: string,
  name: string,
  level: string,
  profilePictureUri: string,
};

export default function Followers() {
  const navigation = useNavigation();
  const { username } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState<UserInfoCompact[]>([
    {username: 'oguz', name: 'Oguz', level: 'NA', profilePictureUri:"https://static.vecteezy.com/system/resources/thumbnails/024/646/930/small_2x/ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg"},
  ])

  useEffect(() => {
    navigation.setOptions({
      title: `${username}'s Followers`, // Set the custom text here
    });
    const fetchFollowers = async () => {
      const url = `profile/followers/${username}/`
      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok){
          const result = await response.json();
          console.log("Followers:", result);
          setFollowers(result);
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
      data={followers}
      keyExtractor={(item) => item.username}
      renderItem={({item}) => {
        return (
          <UserCard 
            name={item.name}
            username={item.username} 
            profilePictureUri={item.profilePictureUri} 
            level={item.level}
            buttonText={'Follow'}
            buttonStyleNo={2}
          />
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Followers</Text>
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

