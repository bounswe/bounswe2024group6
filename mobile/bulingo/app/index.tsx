import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { router } from "expo-router";
import Navbar from "./navbar";
import TokenManager from './TokenManager';

export default function Home() {
  const handleRegister = () => {
    router.navigate("/register")
  };
  const username = TokenManager.getUsername();

  const handleLogOut = () => {
    console.log("logout pressed");
    TokenManager.setUsername(null);
    TokenManager.clearTokens();
    router.navigate('/')
  }


  return (
    <View style={styles.container}>
      <Navbar/>
      <View style={styles.page}>
      <View style={styles.profilePictureContainer}>
      <Image
            source={require('@/assets/images/profile-icon.png')}
            style={styles.profilePicture}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.bigText}>Welcome!</Text>
        <Text style={username? styles.username : styles.text}>{username ? username :"You are not logged in. Register or Log In to access all features."}</Text>
      </View>
      {username ?
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.rectangularButton} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        </View> :
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.rectangularButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable style={styles.rectangularButton} onPress={() => { router.navigate("/login") }}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
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
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 16,
    width: "90%",
    height: 120,
    padding: 3,
    backgroundColor: '#b2f2bb',
    margin: 10,
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
    backgroundColor: "#9775fa",
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 3,
    borderColor: "#222",
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