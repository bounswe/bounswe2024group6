import React from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';

type GuestModalProps = {
  onClose: () => void;
}

export default function GuestModal(props: GuestModalProps){
  const onLoginPress = () => {
    router.replace("/login");
  }

  const onRegisterPress = () => {
    router.replace("/register");
  }

  return (
    <Modal
      // animationType="slide"
      transparent={true}
      onRequestClose={props.onClose}
    >
      <Pressable style={styles.modalBackground} onPress={props.onClose}>
        <Pressable style={styles.modalContent}>
          <Text style={styles.text}>You need to be logged in to perform this action. Please login, or register if you don't have an account.</Text>
          <TouchableOpacity onPress={onLoginPress} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRegisterPress} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create(
  {
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      maxHeight: '60%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    button: {
      borderRadius: 15,
      width: "80%",
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      backgroundColor: "#3944FD",
    },
    buttonText: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 20,
    },
});