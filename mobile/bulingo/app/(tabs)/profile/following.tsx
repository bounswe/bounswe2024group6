import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import UserCard from './userCard';
import TokenManager from '@/app/TokenManager';


type UserInfoCompact = {
  username: string,
  name: string,
  level: string,
  profile_picture: string,
  is_followed: boolean,
};

export default function Following() {
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState<UserInfoCompact[]>([])

  useEffect(() => {
    const fetchFollowing = async () => {
      const username = TokenManager.getUsername();
      if (username === undefined){
        console.error("Username not defined!");
        return;
      }
      const url = `profile/following/${username}/`

      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok){
          const result = await response.json()
          setFollowing(result);
        } else {
          console.log(response.status)
        };
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchFollowing();
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
      data={following}
      keyExtractor={(item) => item.username}
      renderItem={({item}) => {
        return (
          <UserCard 
            name={item.name}
            username={item.username} 
            profilePictureUri={item.profile_picture} 
            level={item.level}
            buttonText={item.is_followed ? 'Unfollow' : 'Follow'}
            buttonStyleNo={item.is_followed ? 1 : 2}
          />
        );
      }}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Following</Text>
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

