import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'red', headerShown: false}}>
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
            headerShown: false,
            title: 'Quizzes',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="question" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: true,
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
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />, // FontAwesome bell icon for notifications
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          }}
        />


      </Tabs>
    </>
  );
}
