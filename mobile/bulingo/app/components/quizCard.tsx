import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, useColorScheme } from 'react-native';
import AdminOptions from './adminOptions';
import TagEdit from './tagEdit';
import TokenManager from '../TokenManager';
import { router } from 'expo-router';
import GuestModal from './guestModal';
import { FontAwesome } from '@expo/vector-icons';
import PressableText from '../pressableText';
import Alert from '../Alert';

type QuizCardProps = {
  title: string,
  id: number,
  author: string,
  level: string,
  description: string,
  liked: boolean,
  likes: number,
  bookmarked: boolean,
  onQuizPress?: (id: number) => void;
  onLikePress?: (id: number) => void;
  onBookmarkPress?: (id: number) => void;
  image?: string;  
};


export default function QuizCard(props: QuizCardProps){
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(props.liked);
  const [isAdminOptionsVisible, setIsAdminOptionsVisible] = useState(false);
  const [isTagEditVisible, setIsTagEditVisible] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [guestModalVisible, setGuestModalVisible] = useState(false);
  const [level, setLevel] = useState(props.level);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);

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

  const handleAdminDeleteQuiz = async () => {
    const url = 'quiz/delete/';
    const params = {
      'quiz_id': props.id,
    }
    try{
      const response = await TokenManager.authenticatedFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (response.ok){
        console.log("Quiz Deletion successful")
      } else {
        console.log(response.status)
      };
      Alert.set("Quiz Deleted Successfully")
      router.replace('/');
    } catch(error) {
      console.warn(error)
      Alert.set("Quiz Deleted Successfully")
      router.replace('/');
    }
  }

  useEffect(() => {
    fetchQuizTags();
    console.log(props.level)
  },[])

  const fetchQuizTags = async () => {
    const url = `quiz/${props.id}/`;
    try {
      const response = await TokenManager.authenticatedFetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        const res = await response.json()
        setTags(res.quiz.tags);
        setLevel(res.quiz.level);
        setUniqueTags(Array.from(new Set([...res.quiz.tags, res.quiz.level])))
        console.log(res);
      } else{
        console.warn(response.status)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}
      { isTagEditVisible && 
        <TagEdit type="Quiz" id={props.id.toString()} onClose={() => setIsTagEditVisible(false)} tags={tags}
          extra={{title: props.title, description: props.description, level: level}}
        />
      }
      { isAdminOptionsVisible &&
        <AdminOptions onClose={()=>setIsAdminOptionsVisible(false)} options={[
          {
            text: "Delete Quiz", 
            onPress: handleAdminDeleteQuiz
          }, 
          {
            text: "Change Quiz Tags", 
            onPress: ()=>{
              setIsTagEditVisible(true);
              console.log("Change Quiz Tags Pressed"); /* Placeholder until endpoint is ready */ 
            }
          }, 
        ]}
        />
      }
      <TouchableOpacity
        style={[styles.quizItem, styles.elevation]}
        onPress={() => handleQuizPress(props.id)}
        onLongPress={() => TokenManager.getIsAdmin() && setIsAdminOptionsVisible(true)}
        testID='quiz'
      >
        {props.image && (
          <Image
            source={
              typeof props.image === 'string'
                ? { uri: props.image }
                : props.image 
            }
            style={{ width: '100%', height: 100, borderRadius: 8, marginBottom: 8,  }}
          />
        )}
        <View style={styles.quizTop}>
          <PressableText style={styles.quizTitle} text={props.title}/>
          <PressableText style={styles.quizDescription} text={props.description}/>
        {/* <Text style={styles.quizTitle}>{props.title}</Text>
        <Text style={styles.quizDescription}>{props.description}</Text> */}
        </View>
        <View style={styles.quizBottom}>
          <View style={styles.quizBottomLeft}>
            <Text style={styles.quizAuthor}>by {props.author}</Text>
            <View style={{flexDirection: 'row'}}>
              {uniqueTags.map((tag, index) => (
                <Text key={index} style={styles.quizTag}>
                  {tag}
                </Text>
              ))}
            </View>
            {/* {level && <Text style={styles.quizLevel}>{level}</Text>} */}
          </View>
          <TouchableOpacity style={styles.likeButton} onPress={() => handleLikePress(props.id)} testID='likeButton'>
            <Text style={styles.quizLikes}>
            <Image source={liked ? require('@/assets/images/like-2.png') : require('@/assets/images/like-1.png')}style={styles.icon} /> {likes}
            </Text>
          </TouchableOpacity>

        {/* Touchable Bookmark Icon at the bottom right */}
        <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleBookmarkPress(props.id)} testID='bookmarkButton'>
          <FontAwesome 
            name={props.bookmarked ? 'bookmark' : 'bookmark-o'} 
            size={20}
            color="black" 
          />
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
    quizTag: {
      backgroundColor: isDark ? '#333' : '#dfe4ea',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 12,
      marginTop: 4,
      color: isDark ? '#ddd' : '#333',
      alignSelf: 'flex-start',
      marginHorizontal: 1,
    },
    quizActions: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      height: 35,
    },
    quizLikes: {
      fontSize: 16,
      color: isDark ? '#fff' : '#000',
    },
    likeButton: {
      height: 35,
      width: 35,
      bottom: -5,
    },
    bookmarkButton: {
      height: 25,
      width: 25,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      bottom: -15,
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      tintColor: isDark ? '#fff' : '#000',
    },
  });
};
