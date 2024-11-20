import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const notifications = [
    { id: '1', text: 'Oguz bookmarked your quiz.' },
    { id: '2', text: 'Halil followed you.' },
    { id: '3', text: 'Anil followed you.' },
    { id: '4', text: 'Aras bookmarked your quiz.' },
    { id: '5', text: 'Oguz followed you.' },
    { id: '6', text: 'Ozan liked your comment.' },
    { id: '7', text: 'Sait bookmarked your quiz.' },
    { id: '8', text: 'Kasap liked your post.' },
    { id: '9', text: 'Ozan followed you.' },
    { id: '10', text: 'Kasap followed you.' },
    { id: '11', text: 'Sait liked your quiz.' },
    { id: '12', text: 'Ozan bookmarked your post.' },
    { id: '13', text: 'Kasap liked your recent quiz.' },
    { id: '14', text: 'Sait followed you.' },
    { id: '16', text: 'Halil bookmarked your comment.' },
    { id: '17', text: 'Anil liked your post.' },
  ];

const NotificationItem = ( {text} : any ) => (
  <View style={styles.notificationContainer}>
    <View style={styles.profileInfoTopPictureContainer}>
      <Image source={require('@/assets/images/profile-icon.png')} style={styles.profileInfoTopPicture} />
    </View>
    <Text style={styles.notificationText}>{text}</Text>
  </View>
);

const Notifications = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem text={item.text} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileInfoTopPictureContainer: {
    marginRight: 12,
  },
  profileInfoTopPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationText: {
    fontSize: 16,
    color: '#1a73e8', // Blue for title text
  },
});

export default Notifications;
