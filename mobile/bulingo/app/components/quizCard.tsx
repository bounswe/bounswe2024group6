import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

type QuizCardProps = {
  title: string,
  id: number,
  author: string,
  level: string,
  description: string,
  liked: boolean,
  likes: number,
  handleQuizPress?: (id: number) => void;
  handleLikePress?: (id: number) => void;
  handleBookmarkPress?: (id: number) => void;  
};


export default function QuizCard(props: QuizCardProps){
  const handleQuizPress = (id: number) => {
    props.handleQuizPress && props.handleQuizPress(id);
  };

  const handleLikePress = (id: number) => {
    props.handleLikePress && props.handleLikePress(id);
  };
  const handleBookmarkPress = (id: number) => {
    props.handleBookmarkPress && props.handleBookmarkPress(id);
  };

  return (
    <TouchableOpacity
      style={[styles.quizItem, styles.elevation]}
      onPress={() => handleQuizPress(props.id)}
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
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLikePress(props.id)}>
          <Text style={styles.quizLikes}>
          <Image source={props.liked ? require('@/assets/images/like-2.png') : require('@/assets/images/like-1.png')}style={styles.icon} /> {props.likes}
          </Text>
        </TouchableOpacity>

        {/* Touchable Bookmark Icon at the bottom right */}
        <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleBookmarkPress(props.id)}>
          <Image source={require('@/assets/images/bookmark-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  quizItem: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
  },
  elevation: {
    elevation: 2,
    shadowColor: 'black',
  },
  quizTop: {
    flex: 1
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
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
  },
  quizAuthor: {
    fontSize: 12,
    color: '#999',
  },
  quizLevel: {
    backgroundColor: '#dfe4ea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    marginTop : 4,
    color: '#333',
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
  },
});