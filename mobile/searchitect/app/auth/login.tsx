import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { loginUser } from '../api';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  
  const handleLogin = () => {


      loginUser({username: username,password:password}).then((res)=>{
        console.log(res.token)
        router.replace("feed")
      }).catch((error)=>{
        console.log(error)
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}
          onPress={() => {
            router.replace("auth/register")
          }}
        >Register</Text>
      </TouchableOpacity>


      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Login</Text>
      <Text style={{ fontWeight: '300', fontSize: 12, padding: 12 }}>Enter your username and password to login to your account</Text>



      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  loginButton: {
    width: 300,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  }
});

export default LoginScreen;
