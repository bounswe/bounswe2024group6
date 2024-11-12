import React from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RFPercentage } from 'react-native-responsive-fontsize';

type ModalOverlayProps = {
  closeModal: () => void,
  onLeftOption: () => void,
  onRightOption: () => void,
};

export function ImageSourceOverlay(props:ModalOverlayProps) {

  return (
    <TouchableWithoutFeedback onPress={props.closeModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Option text={'Take a Photo'} iconName={'camera'} onPress={props.onLeftOption}/>
          <Option text={'Choose From Gallery'} iconName={'image'} onPress={props.onRightOption}/>       
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

type OptionProps= {
  text: string,
  iconName: any,
  onPress?: () => void,
};

const Option = (props: OptionProps) => {
  return (
    <TouchableOpacity style={styles.modalButton} onPress={props.onPress}>
      <FontAwesome style={styles.modalButtonIcon} size={28} name={props.iconName}/>
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
    flexDirection: 'row',
    justifyContent:'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalButton: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  modalButtonIcon: {
    margin: 3,
  },
  modalButtonText: {
    margin: 3,
    fontSize: RFPercentage(1.8),
  },
});
