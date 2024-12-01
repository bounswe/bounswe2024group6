import React, {useState} from 'react';
import { View, Pressable, Text, StyleSheet, Modal} from 'react-native';
import ModalDictionary from './components/modalDictionary';


type PressableTextProps = {
  text: string,
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
    <View style={styles.container}>
      {/* Render each word as a Pressable */}
      {props.text.split(' ').map((word, index) => (
        <Pressable
          key={index}
          onLongPress={() => handleLongPress(word)}
          style={styles.wordPressable}
        >
          <Text style={styles.wordText}>{word} </Text>
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
  },
  wordPressable: {
    margin: 2,
  },
  wordText: {
    fontSize: 16,
    color: 'blue',
  },
});