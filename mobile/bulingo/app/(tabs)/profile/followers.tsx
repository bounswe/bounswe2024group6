import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import UserCard from './userCard';

type UserInfoCompact = {
  username: string,
  name: string,
  level: string,
  profilePictureUri: string,
};

export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState<UserInfoCompact[]>([])

  useEffect(() => {
    const ENDPOINT_URL = "http://161.35.208.249:8000/followers";  // Placeholder
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
          setFollowers(await response.json());
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
            buttonText={'Unfollow'}
            buttonStyleNo={1}
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

