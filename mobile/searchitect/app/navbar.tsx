import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {router} from 'expo-router';


const Navbar = () => {
  return (
    <View style={styles.navbar}>
        <Pressable 
          style={[styles.bordered, styles.circularButton, {left: "3%"}]}
          onPress={() => {router.push("/home")}}
          >
            <Image
                source={require('@/assets/images/home-icon.png')}
                style={styles.buttonImage}
            />
        </Pressable>
      <Pressable style={[styles.bordered, styles.rectangularButton, {left: "23%"}]}>
        <Text style={styles.buttonText}>Quizzes</Text>
      </Pressable>
      <Pressable 
        style={[styles.bordered, styles.rectangularButton, {right: "23%"}]}
        >
        <Text style={styles.buttonText}>Forums</Text>
      </Pressable>
      <Pressable style={[styles.bordered, styles.circularButton, {right: '3%'}]}>
        <Image
            source={require('@/assets/images/profile-icon.png')}
            style={styles.buttonImage}
            />
      </Pressable>
    </View>
  );
};

// TODO: Use percentage-based dimensions
// TODO: Use a better font
const styles = StyleSheet.create({
  navbar: {
    height: 60,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#222',
    backgroundColor: '#fff',  // Background color of the navbar
    justifyContent: 'center',     // Center content vertically
    alignItems: 'center',         // Center content horizontally
    zIndex: 1,                    // Keep it on top of other elements
  },
  navText: {
    color: '#000',               // Text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  bordered: {
    borderWidth: 3,
    borderColor: "#222",
  },
  circularButton: {
    position: 'absolute',
    width: "15%",
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangularButton: {
    position: 'absolute',
    backgroundColor: "#9775fa",
    width: '30%',
    height: '150%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 18,
  },
  buttonImage: {
    position: 'absolute', // Position the image to cover the button
    width: '90%',        // Full width of the button
    height: '90%',
  }
})


export default Navbar;