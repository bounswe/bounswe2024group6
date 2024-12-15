import React, {useState, createContext, useContext} from 'react';
import {Pressable, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {router} from 'expo-router'
import TokenManager from './TokenManager'; // Import the TokenManager
import Notification from './components/topNotification';
import Alert from './Alert';



const LOGIN_URL = "http://64.226.76.231:8000/login/";

export default function Home() {
  const [username, setUsername] = useState('');    // State for username
  const [password, setPassword] = useState('');  // State for password
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  
  const handleRegister = () => {
    router.navigate('/register')
  };
  

  const handleLogin = async () => {
    setIsLoading(true);
    const params = {
      'username': username,
      'password': password,
    };
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const json = await response.json();
      if ("access" in json){
        const { access, refresh } = json;
        TokenManager.saveTokens(access, refresh);
        TokenManager.setUsername(username);
        Alert.set("Login Successful");
        router.navigate('/');
      } else {
        setNotification("Incorrect Login information.")
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

      {notification && (
          <Notification
              message={notification}
              onHide={() => setNotification(null)} // Clear notification after hiding
              color='red'
          />
      )}

        <View style={styles.page}>
        


          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Log In</Text>
          </View>
            <View style={styles.namedUserInput}>
              <Text style={styles.userInputText}>Username:</Text>
              <View style={styles.inputBox}>
                <TextInput 
                  style={styles.input}
                  value={username} 
                  onChangeText={text => setUsername(text)} 
                  >
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
            <View style={[styles.buttonContainer, {marginTop:10}]}>
                {isErrorVisible && (
                  <Text style={styles.errorMessage}>Wrong Login information</Text>
                )}
              <Pressable style={styles.rectangularButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
            <Text style={styles.smallText}>Don't have an account?</Text>
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.rectangularButton]} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </Pressable>
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
  elevation: {
    elevation: 30,
    shadowColor: 'black',
  },
  navbarContainer: {
    flex: 1,
  },
  page: {
    flex: 9,
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
    flex: 0.6,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },

  namedUserInput: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 36,
    color: '#3944FD',
    fontWeight: 'bold',
  },
  userInputText: {
    fontSize: 16,
    textAlign: 'left',
  },
  inputBox: {
    justifyContent: 'center',
    backgroundColor: "#E8E8E8",
    height: 50,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    fontSize: 16,
    marginLeft: 10,
  },
  smallText:{
    fontSize: 12,
    margin: 3,
    textAlign: 'center',
  },
  rectangularButton: {
    backgroundColor: "#3944FD",
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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