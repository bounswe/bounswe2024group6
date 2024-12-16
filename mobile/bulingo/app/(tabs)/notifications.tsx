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

type Activity = {
  actor: string,
  affected_username: string,
  object_id: number,
  object_name: string,
  object_type: string,
  timestamp: string,
  verb: string,
};

const NotificationItem = ( {activity} : any ) => {
  const ActivityToComponent = (activity: Activity) => {
    const username = TokenManager.getUsername();

    const handlePress = () => {
      if(activity.verb == "deleted"){
        return
      }
      else if(getLast() == "Quiz"){
        goToQuiz();
      }
      else if(getLast() == "Post"){
        goToPost();
      }
      else if(getLast() == "Comment"){
        goToComment();
      }
      else {
        console.error("Unhandled getLast: ", getLast());
      }
    };

    const goToProfile = (_username: string) => {
      router.navigate("/(tabs)/profile")
      if(username != _username){
        setTimeout(() => {
          router.push(`/(tabs)/profile/users/${_username}`);
        }, 0);
      }
    }

    const goToQuiz = () => {
      router.push({
        pathname: '/(tabs)/quizzes/quizDetails',
        params: { id: activity.object_id },
      });
    }

    const goToPost = () => {
      router.push({pathname: '/(tabs)/forums/forumPostPage', params: {"id": activity.object_id }});
    }

    const goToComment = () => {
      console.log("Comment pressed")
    }

    const getMiddle = () => {
      if(activity.verb == 'solved'){
        return 'solved your'
      } 
      else if(activity.verb == "followed") {
        return "followed"
      }
      else if(activity.verb == 'unfollowed'){
        return 'unfollowed'
      }
      else if(activity.verb == "deleted"){
        return "deleted your"
      }
      else if(activity.verb == "liked"){
        return "liked your"
      }
      else if(activity.verb == "created"){
        return "created a"
      }
      else if(activity.verb == 'commented'){
        return "commented under your"
      }
      else if(activity.verb == 'updated'){
        return "updated your"
      }
      else if(activity.verb == "banned"){
        return "was banned!"
      }
      else {
        return "UNH: " + activity.verb
      }
    }

    const getLast = () => {
      if(activity.verb == 'solved'){
        return 'Quiz'
      } 
      else if(activity.verb == "followed" || activity.verb == 'unfollowed') {
        return activity.actor == username ? activity.actor : "You"
      }
      else if(activity.verb == "liked" || activity.verb == "created"){
        if(activity.object_type == "Quiz"){
          return "Quiz";
        } 
        else if(activity.object_type == "Post") {
          return "Post"
        }
        else if (activity.object_type == "Comment"){
          return "Comment"
        } 
        else {
          return "UNH2 " + activity.object_type
        }
      }
      else if(activity.verb == 'commented'){
        return "Post"
      }
      else if(activity.verb == "updated"){
        if(activity.object_type == "Quiz"){
          return "Quiz";
        } 
        else if(activity.object_type == "Post") {
          return "Post"
        }
        else {
          return "UNH2 " + activity.object_type
        }
      }
      else if(activity.verb == 'deleted'){
        if(activity.object_type == "Quiz"){
          return `Quiz (${activity.object_name})`;
        } 
        else if(activity.object_type == "Post") {
          return `Post (${activity.object_name})`
        }
        else if (activity.object_type == "Comment"){
          return `Comment (${activity.object_name})`
        } 
        else {
          return "UNH2 " + activity.object_type
        }
      }
      else if(activity.verb == "banned"){
        return "";
      }
      else {
        return "UNH: " + activity.verb
      }
    }

    return (
      <Text style={styles.notificationText}>
        <Text style={styles.clickableText} onPress={() => goToProfile(activity.actor)}>
          {activity.actor==username ? "You" : activity.actor}
        </Text>
        {' '}
        {getMiddle()}
        {' '}
        <Text style={activity.verb == "deleted" ? null : styles.clickableText} onPress={() => handlePress()}>
          {getLast()}
        </Text>
        {'\n'}
        {timeDifferenceToString(activity.timestamp)}
      </Text>
    );
    // return (
    //   <View style={styles.notificationTextContainer}>
    //     <Text style={styles.notificationText}>
    //       <Text style={styles.clickableText} onPress={() => goToProfile(activity.actor)}>
    //         {activity.actor == username ? "You" : activity.actor}
    //       </Text>
    //       {' '}
    //       {getMiddle()}
    //       {' '}
    //       <Text style={activity.verb == "deleted" ? null : styles.clickableText} onPress={() => handlePress()}>
    //         {getLast()}
    //       </Text>
    //       {' '}
    //       {timeDifferenceToString(activity.timestamp)}
    //     </Text>
    //   </View>
    // );
    // return (
    //   <View style={styles.notificationTextContainer}>
    //     {/* <View> */}
    //       <Text style={styles.clickableText} onPress={() => goToProfile(activity.actor)}>
    //         {activity.actor == username ? "You" : activity.actor}
    //       </Text>
    //       <Text>{' '}</Text>
    //       <Text>{getMiddle()}</Text>
    //       <Text>{' '}</Text>
    //       <Text style={activity.verb == "deleted" ? null : styles.clickableText} onPress={() => handlePress()}>
    //         {getLast()}
    //       </Text>
    //       <Text>{' '}</Text>
    //       <Text>{timeDifferenceToString(activity.timestamp)}</Text>
    //     {/* </View> */}
    //   </View>
    // );

    // return (
    //   <View style={styles.notificationTextContainer}>
    //     <View style={styles.fullWidthContainer}>
    //       <Text style={styles.clickableText} onPress={() => goToProfile(activity.actor)}>
    //         {activity.actor == username ? "You" : activity.actor}
    //       </Text>
    //       <Text>{' '}</Text>
    //       <Text >{getMiddle()}</Text>
    //       <Text>{' '}</Text>
    //       <Text style={activity.verb == "deleted" ? null : styles.clickableText} onPress={() => handlePress()}>
    //         {getLast()}
    //       </Text>
    //       <Text>{' '}</Text>
    //       <Text>{timeDifferenceToString(activity.timestamp)}</Text>
    //     </View>
    //   </View>
    // );
    // return (
    //   <View style={styles.notificationTextContainer}>
    //     <View style={styles.fullWidthContainer}>
    //       <Text style={styles.clickableText} onPress={() => goToProfile(activity.actor)}>
    //         {activity.actor == username ? "You" : activity.actor}
    //       </Text>
    //       <Text> {getMiddle()} </Text>
    //       <Text
    //         style={activity.verb == "deleted" ? null : styles.clickableText}
    //         onPress={() => handlePress()}
    //       >
    //         {getLast()}
    //       </Text>
    //       <Text> {timeDifferenceToString(activity.timestamp)} </Text>
    //     </View>
    //   </View>
    // );
    
  }

  const act: Activity = activity;
  console.log(act);
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.profileInfoTopPictureContainer}>
        <Image source={require("@/assets/images/profile-icon.png")} style={styles.profileInfoTopPicture}/>
      </View>
      <View style={styles.textWrapper}>
        {ActivityToComponent(act)}
      </View>
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
  notificationTextContainer: {
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    // backgroundColor: 'red'
  },
  fullWidthContainer: {
    width: '100%',
  },
  // notificationTextContainer: {
  //   flexDirection: 'row', // Ensures text aligns horizontally
  //   flex: 1,             // Takes full width of the parent container
  //   alignItems: 'center', // Align items vertically centered
  // },
  // fullWidthContainer: {
  //   flexDirection: 'row',  // Forces horizontal alignment
  //   flexShrink: 1,         // Prevents overflow issues
  // },
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
  textWrapper: {
    flexWrap: 'wrap',
    alignItems: 'center',
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
    fontSize: 14,
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
    marginVertical: -3,
    fontSize: 14,
    color: '#1a73e8', // Blue for clickable text
  },
  nonclickableText: {
    marginVertical: -7,
    fontSize: 14,
    // color: '#1a73e8', // Blue for clickable text
  },
});

export default Notifications;
