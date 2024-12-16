import React, {useState} from 'react';
import { View, Pressable, Text, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';


type PressableTextProps = {
  text: string,
  style?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (word: string) => void
};

export default function PressableText(props: PressableTextProps){
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);// Function to handle press and show modal
  const ModalDictionary = React.lazy(() => import('./components/modalDictionary'));


  const handleLongPress = (word: string) => {
    setSelectedWord(word);
    setModalVisible(true);
  };
  // let wordCount = 0;
  let wordCount = props.text.split(' ').length;

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
          onPress={() => {props.onPress && props.onPress(word)}}
          // style={}
        >
            <Text style={props.style}>
            {word}
            {/* {"Add a space after each word except the last"} */}
            {index < wordCount - 1 ? ' ' : ''}
          </Text>

          {/* <Text style={props.style}>{word} </Text> */}
        </Pressable>
      ))}

      
   




      {/* Modal for additional information */}
      {selectedWord && modalVisible && (
        <React.Suspense>
          <ModalDictionary onClose={closeModal} word={selectedWord} />
        </React.Suspense>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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