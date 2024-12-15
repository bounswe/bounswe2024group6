import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import TokenManager from '../TokenManager';
import GuestModal from '@/app/components/guestModal';
import {router, useFocusEffect} from "expo-router";

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


const dbg_notifications: any[] = [];

const NotificationItem = ( {activity} : any ) => {
  const ActivityToComponent = (activity: any) => {
    const username = TokenManager.getUsername();
    const handlePress = (user: any) => {
      if (user == username){
        router.navigate("/(tabs)/profile")
      } else {
        router.navigate('/(tabs)/profile')
        setTimeout(() => {
          router.push(`/(tabs)/profile/users/${user}`);
        }, 0);
      }
      console.log("text Pressed");
    };
    return (
      <Text style={styles.notificationText}>
        <Text style={styles.clickableText} onPress={() => handlePress(activity.actor)}>
          {activity.actor==username ? "You" : activity.actor}
        </Text>{' '}
        {activity.verb}{' '}
        <Text style={styles.clickableText} onPress={() => handlePress(activity.affected_username)}>
          {activity.affected_username==username ? "You" : activity.affected_username}
        </Text>{' '}
        {timeDifferenceToString(activity.timestamp)}
      </Text>
    );
  }

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.profileInfoTopPictureContainer}>
        <Image source={require("@/assets/images/profile-icon.png")} style={styles.profileInfoTopPicture}/>
      </View>
      {ActivityToComponent(activity)}
    </View>
  );
}



const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(dbg_notifications);
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  useFocusEffect(
    useCallback(()=>{
      const username = TokenManager.getUsername();
      if (!username){
        setGuestModalVisible(true);
        return
      }
    }, [])
  );

  useEffect(() => {
    const fetchFollowers = async () => {
      if(!TokenManager.getUsername()){
        return;
      }
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
          setNotifications(result.activities);
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


  const onGuestModalClose = () => {
    setGuestModalVisible(false);
    router.replace("/");
  }
  if(guestModalVisible){
    return <GuestModal onClose={onGuestModalClose}/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem activity={item} />}
        keyExtractor={(item) => item.timestamp}
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
    color: 'black',
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
  clickableText: {
    fontSize: 16,
    color: '#1a73e8', // Blue for clickable text
  },
});

export default Notifications;
