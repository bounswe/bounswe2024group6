import { Stack } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ModalOverlay } from './modalOverlay';

export default function StackLayout(){
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);


  return (
    <>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'profile',
            headerTitleStyle: styles.titleText,
            headerRight: () => (
              <TouchableOpacity onPress={openModal} style={styles.moreOptions}>
                <FontAwesome size={28} name="ellipsis-v"/>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="followers"
          options={{
            title: 'profile', 
          }}
        />
        <Stack.Screen
          name="following"
          options={{
            title: 'profile', 
          }}
        />
        <Stack.Screen
          name="editProfile"
          options={{
            title: 'profile', 
          }}
        />
      </Stack>
      {isModalVisible && (
        <ModalOverlay closeModal={closeModal} />
      )}
    </>
  );
};

const styles =StyleSheet.create({
  moreOptions: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleText: {
    fontWeight: 'bold',
  },
});