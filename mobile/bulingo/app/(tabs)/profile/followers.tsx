import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, FlatList, View, Image, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';


type UserInfoCompact = {
  username: string,
  name: string,
  level: string,
  profilePictureUri: string,
};

export default function Followers() {
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState<UserInfoCompact[]>([
    {username: 'ygz', name: 'Yagiz Guldal', level: 'C1', profilePictureUri: "https://reactnative.dev/docs/assets/p_cat1.png"},
  ])


  const handleImageError = () => {
    
  };

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
          <View style={styles.followerContainer}>
            <View style={styles.profilePictureContainer}>
              <Image 
                source={{
                  uri: item.profilePictureUri,
                }} 
                style={styles.profilePicture}
              />
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
            <View style={styles.followerContainerRightCompartment}>
              <Text style={styles.levelText}>{item.level}</Text>
            </View>
          </View>
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
    margin: 15,
    padding: 10,
  },
  followerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2,
  },
  profilePictureContainer: {
    flex: 0,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
  },
  usernameContainer: {
    flex: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  followerContainerRightCompartment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  nameText: {
    fontSize: 14,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

