import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import { ModalOverlay } from '../modalOverlay';

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);


  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'red' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="quizzes"
          options={{
            title: 'Quizzes',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="question" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="forums"
          options={{
            title: 'Forums',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="comment" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
            headerRight: () => (
              <TouchableOpacity onPress={openModal} style={{width: 40}}>
                <FontAwesome size={28} name="ellipsis-v"/>
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
      {isModalVisible && (
        <ModalOverlay closeModal={closeModal} />
      )}
    </>
  );
}
