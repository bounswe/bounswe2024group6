import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TokenManager from '../TokenManager';
import AdminOptions from './adminOptions';
import PressableText from '../pressableText';

interface CommentCardProps {
  id: number;
  isBookmarked: boolean;
  onUpvote: (id: number) => void;
  username: string;
  comment: string;
  liked: boolean;
  likes: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ id, isBookmarked: initialBookmark, username, comment, onUpvote, liked, likes }) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmark);
    const [isAdminOptionsVisible, setIsAdminOptionsVisible] = useState(false);


  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

    return (
        <>
        { isAdminOptionsVisible &&
            <AdminOptions onClose={()=>setIsAdminOptionsVisible(false)} options={[
            {
                text: "Delete Comment",
                onPress: ()=>{console.log("Delete Comment Pressed") /* Placeholder until endpoint is ready */ }
            },
            ]}
            />
        }
        <Pressable 
            style={styles.cardContainer}
            onLongPress={() => TokenManager.getIsAdmin() && setIsAdminOptionsVisible(true)}
        >  
            <View style={styles.profileSection}>
                <View style={styles.profileIcon}>
                    <FontAwesome name="user" size={24} color="#333" />
                </View>
                <Text style={styles.userName}>{username}</Text>
            </View>
            
            <View style={styles.commentSection}>
              <PressableText style={styles.commentText} text={comment} />
            </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.likeButton} onPress={() => onUpvote(id)} testID='likeButton'>
            <Text style={styles.quizLikes}>
              <Image source={liked ? require('../../assets/images/like-2.png') : require('../../assets/images/like-1.png')} style={styles.icon} />
              {likes}
            </Text>
          </TouchableOpacity>



                {/* Bookmark Button */}
                <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
                    <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={20} color="black" />
                </TouchableOpacity>
            </View>
            
        </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginRight: 10,
  },
  profileIcon: {
    backgroundColor: '#a4e0b2',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  commentSection: {
    flex: 1,
    marginRight: 10,
  },
  commentText: {
    fontSize: 12,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quizLikes: {
    fontSize: 16,
    marginBottom: 12,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  bookmarkButton: {
    marginLeft: 5,
  },
});

export default CommentCard;