import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import TokenManager from '../TokenManager';

function timeDifferenceToString(isoTimestamp: string): string {
  const now: Date = new Date();
  const target: Date = new Date(isoTimestamp);

  if (isNaN(target.getTime())) {
      return "Invalid timestamp";
  }

  const diffMs: number = target.getTime() - now.getTime(); // Difference in milliseconds
  const absDiffMs: number = Math.abs(diffMs); // Absolute value
  const isFuture: boolean = diffMs > 0; // True if target is in the future

  // Calculate time units
  const seconds: number = Math.floor(absDiffMs / 1000);
  const minutes: number = Math.floor(absDiffMs / (1000 * 60));
  const hours: number = Math.floor(absDiffMs / (1000 * 60 * 60));
  const days: number = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));

  let timeString: string;
  if (days > 0) {
      timeString = `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
      timeString = `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
      timeString = `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
      timeString = `${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  return isFuture ? `in ${timeString}` : `${timeString} ago`;
}


const dbg_notifications = [
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
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(dbg_notifications);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await TokenManager.authenticatedFetch("user-activities-as-object/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok){
          const result = await response.json()
          console.log(result);
          console.log();
        } else {
          console.log(response.status)
        };
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchFollowers();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notifications</Text>
      </View>
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
    paddingTop: 40,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    flex: 0,
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default Notifications;
