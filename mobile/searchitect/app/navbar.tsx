import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { router } from "expo-router";

type NavbarProps = {
  homeOnPress?: () => void,
  quizOnPress?: () => void,
  forumOnPress?: () => void,
  profileOnPress?: () => void,
  homeOnPressOverride?: () => void,
  quizOnPressOverride?: () => void,
  forumOnPressOverride?: () => void,
  profileOnPressOverride?: () => void,
}

const Navbar = (props: NavbarProps) => {
  return (
    <View style={styles.navbar}>
      <Pressable
        style={({ pressed }) => [
          styles.bordered,
          styles.circularButton,
          { left: "3%" },
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() => {
          if (props.homeOnPressOverride){
            props.homeOnPressOverride();
          }
          else {
            if (props.homeOnPress) {
              props.homeOnPress();
            };
            router.navigate("/");
          }
        }}
      >
        <Image
          source={require("@/assets/images/home-icon.png")}
          style={styles.buttonImage}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.bordered,
          styles.rectangularButton,
          { left: "23%" },
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress = {() => {
          if (props.quizOnPressOverride){
            props.quizOnPressOverride();
          }
          else {
            if (props.quizOnPress) {
              props.quizOnPress();
            };
          }
        }}
      >
        <Text style={styles.buttonText}>Quizzes</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.bordered,
          styles.rectangularButton,
          { right: "23%" },
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress = {() => {
          if (props.forumOnPressOverride){
            props.forumOnPressOverride();
          }
          else {
            if (props.forumOnPress) {
              props.forumOnPress();
            };
          }
        }}
      >
        <Text style={styles.buttonText}>Forums</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.bordered,
          styles.circularButton,
          { right: "3%" },
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress = {() => {
          if (props.profileOnPressOverride){
            props.profileOnPressOverride();
          }
          else {
            if (props.profileOnPress) {
              props.profileOnPress();
            };
          }
        }}
      >
        <Image
          source={require("@/assets/images/profile-icon.png")}
          style={styles.buttonImage}
        />
      </Pressable>
    </View>
  );
};

// TODO: Use percentage-based dimensions
// TODO: Use a better font
const styles = StyleSheet.create({
  navbar: {
    height: 60,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#222",
    backgroundColor: "#fff", // Background color of the navbar
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    zIndex: 1, // Keep it on top of other elements
  },
  navText: {
    color: "#000", // Text color
    fontSize: 18,
    fontWeight: "bold",
  },
  bordered: {
    borderWidth: 3,
    borderColor: "#222",
  },
  circularButton: {
    position: "absolute",
    width: "15%",
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangularButton: {
    position: "absolute",
    backgroundColor: "#9775fa",
    width: "30%",
    height: "150%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 18,
  },
  buttonImage: {
    position: "absolute", // Position the image to cover the button
    width: "90%",
    height: "90%",
  },
});

export default Navbar;
