import React, {useState} from 'react';
import { View, Pressable, Text, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';
import ModalDictionary from './components/modalDictionary';


type PressableTextProps = {
  text: string,
  style?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
};

export default function PressableText(props: PressableTextProps){
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);// Function to handle press and show modal
  const handleLongPress = (word: string) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedWord(null);
  };

  return (
    <View style={props.containerStyle ? props.containerStyle : styles.container}>
      {/* Render each word as a Pressable */}
      {props.text.split(' ').map((word, index) => (
        <Pressable
          key={index}
          onLongPress={() => handleLongPress(word)}
          style={styles.wordPressable}
        >
          <Text style={props.style}>{word} </Text>
        </Pressable>
      ))}

      {/* Modal for additional information */}
      {selectedWord && modalVisible && (
        <ModalDictionary onClose={closeModal} word={selectedWord}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  wordPressable: {
    margin: -4,
    marginRight: 0,
  },
  wordText: {
    fontSize: 16,
    color: 'blue',
  },
});