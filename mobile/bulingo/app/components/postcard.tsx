import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GuestModal from './guestModal';
import TokenManager from '../TokenManager';
import PressableText from '../pressableText';

interface PostCardProps {
    id: string;
  title: string;
  author: string;
  likes: number;
  tags: string[];
  liked: boolean;
  isBookmarked: boolean;
  feedOrPost: string;
  onUpvote: (id:any) => void;
  onBookmark: () => void;
  onPress?: () => void;
}


const PostCard: React.FC<PostCardProps> = ({
    id,
  title,
  author,
  likes,
  tags,
  liked,
  isBookmarked,
  feedOrPost,
  onUpvote,
  onBookmark,
  onPress,
}) => {
  const [guestModalVisible, setGuestModalVisible] = useState(false);

  const handleLikePress = () => {
    if(!TokenManager.getUsername()){
      setGuestModalVisible(true);
      return;
    }
    onUpvote(id);
  }

  const handleBookmarkPress = () => {
    if(!TokenManager.getUsername()){
      setGuestModalVisible(true);
      return;
    }
    onBookmark();
  }

  return (
    <>
      {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}
      <TouchableOpacity onPress={onPress} testID='card'>
        <View style={styles.cardContainer}>
          <View style={styles.header}>
            <PressableText style={styles.title} text={title}/>
            <Text style={styles.author}>by {author}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {tags && tags.map((tag, index) => (
              <View key={index} style={styles.levelBadge}>
                <Text style={styles.levelText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <View style={styles.actionsContainer}>
              {/* <TouchableOpacity onPress={onUpvote} style={styles.upvoteButton}>
                <FontAwesome name="arrow-up" size={20} color="green" />
                <Text style={styles.upvoteCount}>{likes}</Text>
              </TouchableOpacity>
              */}
              <TouchableOpacity style={styles.likeButton} onPress={handleLikePress} testID={'likeButton'}>
              <Text style={styles.quizLikes}>
              <Image source={liked ? require('../../assets/images/like-2.png') : require('../../assets/images/like-1.png')}style={styles.icon} /> 
              {likes}
              </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleBookmarkPress} style={styles.bookmarkButton} testID={'bookmarkButton'}>
                <FontAwesome 
                  name={isBookmarked ? 'bookmark' : 'bookmark-o'} 
                  size={20} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

// Updated styles
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    maxWidth: 400,
    elevation: 5
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  levelBadge: {
    backgroundColor: '#dfe4ea',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 5,
    marginBottom: 5,
  },
  levelText: {
    fontSize: 10,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  upvoteCount: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  bookmarkButton: {},
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  }, 
   quizLikes: {
    fontSize: 16,
    marginBottom: 12,
    // lineHeight: 43,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});

export default PostCard;