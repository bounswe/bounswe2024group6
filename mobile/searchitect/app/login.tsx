import React from 'react';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import Navbar from "./navbar";
import {router} from 'expo-router'



export default function Home() {
  const handleRegister = () => {
    router.navigate('/register')
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}><Navbar/></View>
        <View style={styles.page}>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Log In</Text>
          </View>

          <View style={styles.loginContainer}>
            <View style={styles.namedUserInput}>
              <Text style={styles.userInputText}>E-mail:</Text>
              <View style={styles.inputBox}>
                <TextInput style={styles.input}></TextInput>
              </View>
            </View>
            <View style={styles.namedUserInput}>
              <Text style={styles.userInputText}>Password:</Text>
              <View style={styles.inputBox}>
                <TextInput style={styles.input} secureTextEntry={true}></TextInput>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.rectangularButton}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.registerContainer} >
            <Text style={styles.smallText}>Don't have an account?</Text>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.rectangularButton} onPress={handleRegister}>
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
});