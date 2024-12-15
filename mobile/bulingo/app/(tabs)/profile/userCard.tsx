import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { router } from 'expo-router';
import TokenManager from '@/app/TokenManager';

type UserCardProps = {
  profilePictureUri: string,
  username: string,
  name: string,
  level: string,
  buttonText: string,
  buttonStyleNo: number,  // 1: Gray Button 2: Blue button 3: No button (self)
  onButtonPress?: () => void;
  onCardPress?: () => void;
};

const UserCard = (props: UserCardProps) => {
  const handleButtonPress = async () => {
    const url = `profile/${props.buttonText.toLowerCase()}/`;
    const params = {
      'username': props.username,
    }
    try {
      const response = await TokenManager.authenticatedFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const res = await response.json()
    } catch (error) {
      console.error(error);
    }
    if (props.onButtonPress){
      props.onButtonPress();
    }
  };
  const handleCardPress = () => {
    if (props.onCardPress){ 
      props.onCardPress();
    }

    router.navigate('/(tabs)/profile')
    if (props.buttonStyleNo != 3){
      setTimeout(() => {
        router.push(`/(tabs)/profile/users/${props.username}`);
      }, 0);
    }
  };

  let buttonStyleAddOn;
  let buttonTextColor;
  switch (props.buttonStyleNo){
    case 1:
      buttonStyleAddOn = styles.buttonStyleAddOn1;
      buttonTextColor = "black";
      break;
    case 2:
      buttonStyleAddOn = styles.buttonStyleAddOn2;
      buttonTextColor = 'white';
      break;
    case 3:
      break;
    default: 
      console.log("Wrong 'buttonStyleNo' prop passed to UserCard component!")
      break;
  }
  

  return (
    <TouchableOpacity style={styles.followerContainer} onPress={handleCardPress} testID='card'>
      <View style={styles.profilePictureContainer}>
        {props.profilePictureUri 
          ? (
            <Image 
              source={{
                uri: props.profilePictureUri,
              }} 
              style={styles.profilePicture}
            />
          )
          : (
            <Image 
              source={require('@/assets/images/profile-icon.png')}
              style={styles.profilePicture}
            />
          )}
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{props.username.length <= 12 ? props.username : `${props.username.slice(0, 10)}..`}</Text>
      </View>
      <View style={styles.followerContainerRightCompartment}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>{props.level}</Text>
        </View>
        { props.buttonStyleNo != 3 &&
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonStyle, buttonStyleAddOn]} onPress={handleButtonPress} testID='button'>
              <Text style={[styles.buttonText, {color: buttonTextColor}]}>{props.buttonText}</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  followerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 8,
    backgroundColor:'white',
    elevation: 3,
    shadowColor: 'black',
  },
  profilePictureContainer: {
    flex: 0,
    paddingHorizontal: 0,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
  },
  usernameContainer: {
    flex: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  followerContainerRightCompartment: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  buttonContainer: {
    flex: 0,
    justifyContent: 'center',
  },
  levelContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  levelText: {
    margin: 5,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  buttonStyle: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    width: 80,
  },
  buttonStyleAddOn1: {
    backgroundColor: 'rgba(154, 154, 154, 0.2)',
    borderColor: "rgba(154, 154, 154, 0.4)"
  },
  buttonStyleAddOn2: {
    backgroundColor: 'rgba(29, 102, 255, 1)',
    borderColor: "rgba(22, 70, 215, 1)"
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default UserCard;
