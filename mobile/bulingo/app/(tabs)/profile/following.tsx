import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import UserCard from './userCard';

type UserInfoCompact = {
  username: string,
  name: string,
  level: string,
  profilePictureUri: string,
  status: string,
};

export default function Following() {
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState<UserInfoCompact[]>([
    {username: 'yagiz', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Following'},
    {username: 'yagiz1', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Not Following'},
    {username: 'yagiz2', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Following'},
    {username: 'yagiz3', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Not Following'},
    {username: 'yagiz4', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Following'},
    {username: 'yagiz5', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Following'},
    {username: 'yagiz6', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Not Following'},
    {username: 'yagiz7', name: 'Yagiz Guldal', level:'C2', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat2.png", status: 'Not Following'},
  ])

  useEffect(() => {
    const ENDPOINT_URL = "http://161.35.208.249:8000/following";  // Placeholder
    const fetchFollowing = async () => {
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
          setFollowing(await response.json());
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
            profilePictureUri={item.profilePictureUri} 
            level={item.level}
            buttonText={item.status == 'Following' ? 'Unfollow' : 'Follow'}
            buttonStyleNo={item.status == 'Following' ? 1 : 2}
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

