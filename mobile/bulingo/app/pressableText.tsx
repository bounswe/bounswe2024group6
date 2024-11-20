import React, {useState} from 'react';
import { View, Pressable, Text, StyleSheet, Modal} from 'react-native';


type PressableTextProps = {
  text: string,
  getWordInfo: (word: string) => string;
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
      {selectedWord && (
        <Modal
          // animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {props.getWordInfo(selectedWord)}
              </Text>
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});