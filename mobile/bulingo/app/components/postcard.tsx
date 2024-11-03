import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PostCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(501);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Word In Detail: Insurance</Text>
        <Text style={styles.author}>by Y.Emre</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>beginner</Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleUpvote} style={styles.upvoteButton}>
            <FontAwesome name="arrow-up" size={20} color="green" />
            <Text style={styles.upvoteCount}>{upvoteCount}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#cce7ff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderColor: '#a0c1d1',
    borderWidth: 2,
    // width: '90%',
    maxWidth: 400,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelBadge: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
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
});

export default PostCard;
