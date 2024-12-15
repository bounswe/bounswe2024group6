import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GuestModal from './guestModal';
import TokenManager from '../TokenManager';
import PressableText from '../pressableText';
import {router} from 'expo-router';
import { fetchCommentAuthorImage } from '../api/forum';
import { bookmarkComment, unbookmarkComment } from '../api/forum';

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
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [guestModalVisible, setGuestModalVisible] = useState(false);


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetchCommentAuthorImage(username);
                console.log(response.profile_picture)
                setImageLink(response.profile_picture);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [username]);




const toggleBookmark = async () => {
    try {
        if (isBookmarked) {
            await unbookmarkComment(id);
        } else {
            await bookmarkComment(id);
        }
        setIsBookmarked(!isBookmarked);
    } catch (error) {
        console.error('Failed to toggle bookmark:', error);
    }
    console.log(isBookmarked)
};

  const redirectToAuthorProfilePage = () =>{
     router.navigate('/(tabs)/profile')
        setTimeout(() => {
          router.push(`/(tabs)/profile/users/${username}`);
        }, 0);
  }

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
    // TODO: Implement bookmark here!
    toggleBookmark();
}

  return (
    <>
      {guestModalVisible && <GuestModal onClose={() => setGuestModalVisible(false)}/>}
      <View style={styles.cardContainer}>

        <TouchableOpacity onPress={redirectToAuthorProfilePage}>
        <View style={styles.profileSection}>
          <View style={styles.profileIcon}>
            {imageLink ? (
                <Image source={{ uri: imageLink }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            ) : (
                <FontAwesome name="user" size={24} color="#333" />
            )}
            {/* <FontAwesome name="user" size={24} color="#333" /> */}
          </View>
          <Text style={styles.userName}>{username}</Text>
        </View>
        </TouchableOpacity>

        <View style={styles.commentSection}>
          <PressableText style={styles.commentText} text={comment} />
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.likeButton} onPress={handleLikePress} testID='likeButton'>
            <Text style={styles.quizLikes}>
              <Image source={liked ? require('../../assets/images/like-2.png') : require('../../assets/images/like-1.png')} style={styles.icon} />
              {likes}
            </Text>
          </TouchableOpacity>



                {/* Bookmark Button */}
                <TouchableOpacity onPress={handleBookmarkPress} style={styles.bookmarkButton}>
                    <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={20} color="black" />
                </TouchableOpacity>
            </View>
            
        </View>

        
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