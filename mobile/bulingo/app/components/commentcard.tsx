import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };



    return (
        <>
        <View style={styles.cardContainer}>
           
           
            <View style={styles.profileSection}>
                <View style={styles.profileIcon}>
                    <FontAwesome name="user" size={24} color="#333" />
                </View>
                <Text style={styles.userName}>{username}</Text>
            </View>
            
            <Text style={styles.commentText}>
                {comment}
            </Text>

            <View style={styles.actionsContainer}>
                {/* Upvote Button and Score */}
                <View style={styles.upvoteContainer}></View>
                 
                    {/* <TouchableOpacity onPress={handleUpvote} style={styles.upvoteButton}>
                        <FontAwesome name="arrow-up" size={20} color="green" />
                    </TouchableOpacity>
                    <Text style={styles.upvoteCount}>{upvoteCount}</Text> */}

            <TouchableOpacity style={styles.likeButton} onPress={() => onUpvote(id)}>
                        <Text style={styles.quizLikes}>
                        <Image source={liked ? require('../../assets/images/like-2.png') : require('../../assets/images/like-1.png')}style={styles.icon} /> 
                                          {/* <Image source={ require('../../assets/images/like-2.png')}style={styles.icon} />  */}

                        {likes}
                        </Text>
                        </TouchableOpacity>



                {/* Bookmark Button */}
                <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
                    <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={20} color="black" />
                </TouchableOpacity>
            </View>
            
        </View>

        
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
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
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        // borderColor: '#e2c48c',
        // borderWidth: 2,
        elevation: 5
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
    commentText: {
        flex: 1,
        fontSize: 12,
        color: '#333',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    upvoteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upvoteButton: {
        marginRight: 5,
    },
    upvoteCount: {
        marginRight: 5,
    },
    bookmarkButton: {
        marginLeft: 5,
    },
});

export default CommentCard;
