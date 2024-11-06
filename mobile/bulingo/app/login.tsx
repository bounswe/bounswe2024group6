import React, {useState, createContext, useContext} from 'react';
import {Pressable, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import Navbar from "./navbar";
import {router} from 'expo-router'
import TokenManager from './TokenManager'; // Import the TokenManager


const LOGIN_URL = "http://161.35.208.249:8000/login/";

export default function Home() {
  const [email, setEmail] = useState('');    // State for email
  const [password, setPassword] = useState('');  // State for password
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const username = "1";
  const handleRegister = () => {
    router.navigate('/register')
  };
  

  const handleLogin = async () => {
    setIsLoading(true);
   const params = {
    'username': username,
    'password': password,
    'email': email,
   };
    try {
    fetch('https://reactnative.dev/movies.json')
    .then(response => response.json())
    .then(json => {
      // logic to perform if the request succeeds
    })
    .catch(error => {
      console.error(error); // catching the error and handling it the way you see fit.
    }); // retrieved from https://reactnative.dev/docs/network

      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const json = await response.json();
      if ("access" in json){
        const { accessToken, refreshToken } = json;
        TokenManager.setTokens({ accessToken, refreshToken });
        TokenManager.setUsername(username);
        console.log(TokenManager.getTokens())
        router.navigate('/');
      } else {
        setIsErrorVisible(true);
      };
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };


  return (
    <View style={styles.container}>
      {isLoading && (
        <TouchableWithoutFeedback>
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.navbarContainer}><Navbar/></View>
        <View style={styles.page}>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Log In</Text>
          </View>

          <View style={styles.loginContainer}>
            <View style={styles.namedUserInput}>
              <Text style={styles.userInputText}>E-mail:</Text>
              <View style={styles.inputBox}>
                <TextInput 
                  style={styles.input}
                  value={email} 
                  onChangeText={text => setEmail(text)} 
                  keyboardType="email-address">
                </TextInput>
              </View>
            </View>
            <View style={styles.namedUserInput}>
              <Text style={styles.userInputText}>Password:</Text>
              <View style={styles.inputBox}>
                <TextInput 
                  style={styles.input} 
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}>
                </TextInput>
              </View>
            </View>
            <View style={styles.buttonContainer}>
                {isErrorVisible && (
                  <Text style={styles.errorMessage}>Wrong Login information</Text>
                )}
              <Pressable style={styles.rectangularButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.registerContainer} >
            <Text style={styles.smallText}>Don't have an account?</Text>
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.rectangularButton, {backgroundColor: 'gray'}]} onPress={handleRegister} disabled={true}>
                <Text style={styles.buttonText}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    backgroundColor: '#fff'
  },
  navbarContainer: {
    flex: 1,
  },
  page: {
    flex: 7,
    justifyContent: "space-around",
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginBottom: 30,
  },
  namedUserInput: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
  },
  userInputText: {
    fontSize: 16,
    margin: 5,
    textAlign: 'left',
  },
  inputBox: {
    justifyContent: 'center',
    backgroundColor: "#ffec99",
    height: 50,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#222",
  },
  input: {
    flex: 1,
    margin: 5,
    fontSize: 16,
  },
  smallText:{
    fontSize: 12,
    margin: 3,
    textAlign: 'center',
  },
  rectangularButton: {
    backgroundColor: "#9775fa",
    width: '80%',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    padding: 3,
  },
});