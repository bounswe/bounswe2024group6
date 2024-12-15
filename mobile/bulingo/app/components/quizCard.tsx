import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, useColorScheme } from 'react-native';
import GuestModal from './guestModal';
import TokenManager from '../TokenManager';

type QuizCardProps = {
  title: string,
  id: number,
  author: string,
  level: string,
  description: string,
  liked: boolean,
  likes: number,
  onQuizPress?: (id: number) => void;
  onLikePress?: (id: number) => void;
  onBookmarkPress?: (id: number) => void;  
};


export default function QuizCard(props: QuizCardProps){
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(props.liked);
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  

  const handleQuizPress = (id: number) => {
    props.onQuizPress && props.onQuizPress(id);
  };

  const handleLikePress = (id: number) => {
    if(!TokenManager.getUsername()){
      setGuestModalVisible(true);
      return
    }

    props.onLikePress && props.onLikePress(id);
    if(liked){
      setLiked(false);
      setLikes(likes - 1);
    } 
    else {
      setLiked(true);
      setLikes(likes + 1);
    };
  };

  const handleBookmarkPress = (id: number) => {
    if(!TokenManager.getUsername()){
      setGuestModalVisible(true);
      return
    }
    props.onBookmarkPress && props.onBookmarkPress(id);
  };

  return (
    <>
      {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}
      <TouchableOpacity
        style={[styles.quizItem, styles.elevation]}
        onPress={() => handleQuizPress(props.id)}
        testID='quiz'
      >
        <View style={styles.quizTop}>
          <Text style={styles.quizTitle}>{props.title}</Text>
          <Text style={styles.quizDescription}>{props.description}</Text>
        </View>
        <View style={styles.quizBottom}>
          <View style={styles.quizBottomLeft}>
            <Text style={styles.quizAuthor}>by {props.author}</Text>
            <Text style={styles.quizLevel}>{props.level}</Text>
          </View>
          <TouchableOpacity style={styles.likeButton} onPress={() => handleLikePress(props.id)} testID='likeButton'>
            <Text style={styles.quizLikes}>
            <Image source={liked ? require('@/assets/images/like-2.png') : require('@/assets/images/like-1.png')}style={styles.icon} /> {likes}
            </Text>
          </TouchableOpacity>

          {/* Touchable Bookmark Icon at the bottom right */}
          <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleBookmarkPress(props.id)} testID='bookmarkButton'>
            <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
}

const getStyles = (colorScheme: any) => {
  const isDark = colorScheme === 'dark';

  return StyleSheet.create({
    quizItem: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      marginBottom: 8,
      marginHorizontal: 12,
      borderRadius: 8,
    },
    elevation: {
      elevation: 2,
      shadowColor: isDark ? '#fff' : 'black',
    },
    quizTop: {
      flex: 1,
    },
    quizBottom: {
      flex: 1,
      flexDirection: 'row',
    },
    quizBottomLeft: {
      flex: 3,
    },
    quizTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    quizDescription: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#666',
    },
    quizAuthor: {
      fontSize: 12,
      color: isDark ? '#888' : '#999',
    },
    quizLevel: {
      backgroundColor: isDark ? '#333' : '#dfe4ea',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12,
      marginTop: 4,
      color: isDark ? '#ddd' : '#333',
      alignSelf: 'flex-start',
    },
    quizActions: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      height: 50,
      padding: 4,
    },
    quizLikes: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
    },
    likeButton: {
      flex: 2,
    },
    bookmarkButton: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      tintColor: isDark ? '#fff' : '#000',
    },
  });
};
