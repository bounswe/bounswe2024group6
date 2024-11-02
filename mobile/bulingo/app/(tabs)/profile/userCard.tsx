import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native';

type UserCardProps = {
  profilePictureUri: string,
  username: string,
  name: string,
  level: string,
  buttonText: string,
  buttonStyleNo: number,
  onButtonPress?: () => void;
  onCardPress?: () => void;
};

const UserCard = (props: UserCardProps) => {
  const handleButtonPress = () => {
    console.log("Button Pressed: " + props.username);
    if (props.onButtonPress){
      props.onButtonPress();
    }
  };
  const handleCardPress = () => {
    console.log("Card Pressed: " + props.username)
    if (props.onCardPress){ 
      props.onCardPress();
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
    default: 
      console.log("Wrong 'buttonStyleNo' prop passed to UserCard component!")
      break;
  }
  

  return (
    <TouchableOpacity style={styles.followerContainer} onPress={handleCardPress}>
      <View style={styles.profilePictureContainer}>
        <Image 
          source={{
            uri: props.profilePictureUri,
          }} 
          style={styles.profilePicture}
        />
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{props.username}</Text>
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
      <View style={styles.followerContainerRightCompartment}>
        <Text style={styles.levelText}>{props.level}</Text>
        <TouchableOpacity style={[styles.buttonStyle, buttonStyleAddOn]} onPress={handleButtonPress}>
          <Text style={[styles.buttonText, {color: buttonTextColor}]}>{props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  followerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'gray',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2,
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
  levelText: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonStyle: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5, 
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  nameText: {
    fontSize: 14,
  },
});

export default UserCard;
