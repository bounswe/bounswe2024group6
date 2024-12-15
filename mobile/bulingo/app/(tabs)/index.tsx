import React, {useState, useCallback} from 'react';
import {Image, TouchableOpacity, StyleSheet, Text, View, Dimensions} from 'react-native';
import { router, useFocusEffect } from "expo-router";
import TokenManager from '../TokenManager';
import Notification from '../components/topNotification';
import Alert from '../Alert';
import PressableText from '../pressableText';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const handleRegister = () => {
    router.navigate("/register");
  };
  const username = TokenManager.getUsername();
  const [notification, setNotification] = useState<string | null>(null);



  useFocusEffect(
    // useCallback(() => {
    //   if (searchParams?.notification == 'login_success'){
    //     setNotification("Login Successful!");
    //   } else if (searchParams?.notification == 'register_success'){
    //     setNotification("Registration Successful!");
    //   }
    // }, [])
    useCallback(() => {
      if(Alert.get()){
        setNotification(Alert.get());
        Alert.clear();
      }
    }, [])
  );

  const handleLogOut = () => {
    console.log("logout pressed");
    TokenManager.setUsername(null);
    TokenManager.clearTokens();
    router.replace('/login');
    router.replace('/');
  }


  return (
    <View style={styles.container}>
      {notification && (
          <Notification
              message={notification}
              onHide={() => setNotification(null)} // Clear notification after hiding
          />
      )}
      <View style={styles.page}>
      <View style={styles.profilePictureContainer}>
      <Image
            source={require('@/assets/images/profile-icon.png')}
            style={styles.profilePicture}
        />
      </View>
      <View style={styles.messageContainer}>
        <PressableText style={styles.bigText} text="Welcome!"/>
        <PressableText 
          style={username? styles.username : styles.text}
          text={username ? username :"You are not logged in. Register or Log In to access all features."}
        />
      </View>
      {username ?
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.rectangularButton} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View> :
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.rectangularButton]} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.rectangularButton} onPress={() => { router.navigate("/login") }}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

      }

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: '#fff'
  },
  page: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  profilePictureContainer:{
    justifyContent: 'center',
    margin: 10,
    height: 200,
    alignItems: 'center',
  },
  messageContainer:{
    borderRadius: 16,
    width: width * 0.8,
    height: 120,
    padding: 3,
    backgroundColor: 'white',
    margin: 10,
    elevation: 10,
  },
  profilePicture: {
    width: 192,
    height: 192,
    borderWidth: 4,
    borderColor: '#000',
    borderRadius: 96,
  },
  bigText: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    margin: 3,
    textAlign: 'center',
  },
  rectangularButton: {
    backgroundColor: "#3944FD",
    width: width * 0.65,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  username: {
    fontSize: 28,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});