import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Link } from "expo-router";
import Navbar from "./navbar";

export default function Home() {
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
        <Text style={styles.text}>You are not logged in. Register or Log In to access all features.</Text>
      </View>
      <Pressable style={styles.rectangularButton}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Pressable style={styles.rectangularButton}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
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
});