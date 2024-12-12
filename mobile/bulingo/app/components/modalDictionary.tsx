import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, Pressable, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import TokenManager from '../TokenManager';
import PressableText from '../pressableText';
import { FontAwesome } from '@expo/vector-icons';


type ModalDictionaryProps = {
  word: string,
  onClose: ()=>void,
}

type WordInfo = {
  meanings: Meaning[],
  translations: string[],
}

type Meaning  = {
  explanation: string,
  examples: string[],
}

function getCorrectForm(input: string) {
  return input.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '').toLowerCase();

}

export default function ModalDictionary(props: ModalDictionaryProps){
  const [isLoading, setIsLoading] = useState(true);
  const [wordInfo, setWordInfo] = useState<WordInfo>({meanings: [], translations: []});
  const [isWordBookmarked, setIsWordBookmarked] = useState(false);

  useEffect(() => {
    const fetchWordInfo = async () => {
      const url = `get-lexvo-info/${getCorrectForm(props.word)}/`
      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok){
          const result = await response.json();
          const meanings: Meaning[] = []
          result.final_info.meanings.forEach((meaning: any) => {
            const [explanation, ...raw_examples] = meaning.comment.split(';')
            const examples = raw_examples.map((item: any) => item.trim().replace(/^"|"$/g, ''));
            meanings.push({explanation: explanation, examples: examples})
          })
          const translations = result.final_info.turkish_translations;
          setWordInfo({meanings, translations});
        } else {
          console.error(response.status)
        };
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    
    fetchWordInfo();
  }, []);


  const onBookmarkPress = async () => {
    const wasWordBookmarked = isWordBookmarked;
    setIsWordBookmarked(!isWordBookmarked);

    try{
      const url = `word/${wasWordBookmarked ? 'unbookmark' : 'bookmark'}/${getCorrectForm(props.word)}/`
      const response = await TokenManager.authenticatedFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok){
        console.log("Word successfully (un)bookmarked")
      } else {
        console.log("Word could not be (un)bookmarked")
        console.error(response.status)
      };
    } catch (error) {
      console.error(error);
    }
  }
  

  const renderContent = () => {
    if (isLoading){
      return (<ActivityIndicator size={40} style={{margin: 40}}/>);
    }
    return (
      <ScrollView>
        <Pressable style={styles.section}>
          <PressableText 
            style={[styles.sectionHeader, {color: 'rgba(8, 8, 186, 1)'}]} 
            text="Meanings" 
            containerStyle={styles.sectionPressableContainer}
          />
        </Pressable>
        { renderMeanings() }
        <Pressable style={styles.section}>
          <Text style={[styles.sectionHeader, {color: 'rgba(186, 8, 8, 1)'}]}>Translations</Text>
        </Pressable>
        { renderTranslations() }
      </ScrollView>
    );
  }

  const renderMeanings = () => {
    if (!wordInfo.meanings || wordInfo.meanings.length === 0) {
      return (<Text>No meanings found for "{getCorrectForm(props.word)}".</Text>)
    }

    return wordInfo.meanings.map((meaning, index) => (
      <Pressable key={index} style={styles.meaningContainer}>
        <PressableText 
          style={styles.normalText}
          containerStyle={styles.normalTextContainer}
          text={`${index+1}. ${meaning.explanation}`}
        />
        {meaning.examples.map((example, index) => (
          <PressableText 
            style={styles.exampleText} 
            key={index}
            containerStyle={styles.normalTextContainer}
            text={example}
          />
        ))}
      </Pressable>
    ));
  }

  const renderTranslations = () => {
    if (!wordInfo.translations || wordInfo.translations.length === 0) {
      return (<Text>No translation found for "{getCorrectForm(props.word)}".</Text>)
    }

    return wordInfo.translations.map((translation, index) => (
      <Pressable key={index} style={styles.meaningContainer}>
        <Text style={styles.normalText}>{index+1}. {translation}</Text>
      </Pressable>
    ));
  }

  return (
    <Modal
      // animationType="slide"
      transparent={true}
      onRequestClose={props.onClose}
    >
      <Pressable style={styles.modalBackground} onPress={props.onClose}>
        <Pressable style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{getCorrectForm(props.word)}</Text>
            <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmarkPress}>
              <FontAwesome name={isWordBookmarked ? "bookmark" : "bookmark-o"} size={30}/>
              {/* <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.icon} /> */}
            </TouchableOpacity>
          </View>
          {renderContent()}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create(
  {
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      maxHeight: '60%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    normalText: {
      fontSize: 16,
      margin: 3,
      textAlign: 'left',
    },
    normalTextContainer: {
      marginVertical: 5,
      flexDirection: 'row', 
      flexWrap: 'wrap'
    },
    exampleText: {
      fontSize: 14,
      color: "rgba(0, 50, 200, 0.8)",
      fontWeight: "300",
      margin: 1,
      marginLeft: 10,
    },
    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      flex: 0,
      fontSize: 24,
      fontWeight: 'bold',
    },
    bookmarkButton: {
      flex: 0,
      alignItems: 'center',
    },
    icon: {
      flex: 0,
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: "600",
    },
    section: {
      width: '100%',
    },
    sectionPressableContainer: {
      margin: 6,
    },
    meaningContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },
});