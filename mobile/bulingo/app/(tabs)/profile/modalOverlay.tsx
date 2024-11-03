import React from 'react';
import { View, TouchableOpacity, Button, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';
import {router} from 'expo-router';

type ModalOverlayProps = {
  closeModal: () => void,
};

export function ModalOverlay(props:ModalOverlayProps) {
  const handleLikeQuizzesPress = () => {
    props.closeModal();
    router.push("/(tabs)/profile/likedQuizzes");
  };

  return (
    <TouchableWithoutFeedback onPress={props.closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Option text={'Liked Quizzes'} onPress={handleLikeQuizzesPress}/>
          <Option text={'Bookmarked Quizzes'}/>
          <Option text={'Liked Posts/Comments'}/>   
          <Option text={'Bookmarked Posts/Comments'}/>          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

type OptionProps= {
  text: string
  onPress?: () => void,
};

const Option = (props: OptionProps) => {
  return (
    <TouchableOpacity style={styles.modalButton} onPress={props.onPress}>
      <Text style={styles.modalButtonText}>{props.text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  modalContent: {
    flex: 0,
    justifyContent:'center',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalButton: {
    height: 50,
    justifyContent: 'center',
    margin: 3,
  },
  modalButtonText: {
    fontSize: 16,
  },
});
