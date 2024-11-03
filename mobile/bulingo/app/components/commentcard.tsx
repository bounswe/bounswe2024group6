import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CommentCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(23); // Example score

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileIcon}>
          <FontAwesome name="user" size={24} color="#333" />
        </View>
        <Text style={styles.userName}>Aras</Text>
      </View>
      
      <Text style={styles.commentText}>
        In modern use, insurance refers to a contract where an individual or entity receives financial protection against potential future losses from an insurer.
      </Text>

      <View style={styles.actionsContainer}>
        {/* Upvote Button and Score */}
        <View style={styles.upvoteContainer}>
          <TouchableOpacity onPress={handleUpvote} style={styles.upvoteButton}>
            <FontAwesome name="arrow-up" size={20} color="green" />
          </TouchableOpacity>
          <Text style={styles.upvoteCount}>{upvoteCount}</Text>

        {/* Bookmark Button */}
        <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
          <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={20} color="black" />
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3b0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderColor: '#e2c48c',
    borderWidth: 2,
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
    alignItems: 'center',
    marginLeft: 10,
  },
  upvoteContainer: {
    alignItems: 'center',
    // marginRight: 15, // Adds space between the upvoteContainer and bookmark button
  },
  upvoteButton: {
    marginBottom: 5, // Adds space between the upvote button and score
  },
  upvoteCount: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  bookmarkButton: {},
});

export default CommentCard;
