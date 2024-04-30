import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {Image} from 'react-native'

const LandingImage = (imageUri: string ) => {
 

  return (

      <View>
             {/* <Image style={styles.image} source={{ uri: imageUri }} /> */}

      </View>

    );

};

const styles = StyleSheet.create({
  safeAreaContainer: {
      flex: 1,
  },
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'black',
  },
  row: {
      position: 'absolute',
      top: 20,
      // right: 20,
      // left:20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      width: "100%",
  },
  centerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      width: "100%",
  },
  input: {
      width: 300,
      color:'white',
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
  },
  button: {
      // backgroundColor: "pink",
      padding: 10,
      borderRadius: 5,
  },
  buttonText: {
      color: "white",
      fontWeight: "bold",
  },
  buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      flex: 1,
  },
  image: {
      width: 50,
      height: 50,
  }
});




export default LandingImage;
