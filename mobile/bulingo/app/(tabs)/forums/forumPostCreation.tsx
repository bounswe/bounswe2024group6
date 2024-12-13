import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { createPost } from '@/app/api/forum';

const ForumPostCreation = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCreatePostEnabled, setIsCreatePostEnabled] = useState(false);


  const handleCancel = () => {
    // Reset title and content or navigate back
    setTitle('');
    setContent('');
    router.back();
  };

  const handleCreatePost = async () => {

    // Handle post creation logic here
    try {
      await createPost(title, content, ["vocab", "business"]);
      console.log('Post Created:', { title, content });
      router.back();
    } catch (error) {
      console.error('Failed to create post:', error);
    }

  };
  
  const isButtonDisabled = !title || !content ;

  return (
    <View style={styles.container}>


      {/* Title Input */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter title here"
        value={title}
        onChangeText={setTitle}
      />

      {/* Content Input with Formatting Options */}
      <Text style={styles.label}>Content</Text>
      <View style={styles.contentContainer}>

        <TextInput
          style={styles.contentInput}
          placeholder="Write your content here..."
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.createPostButton, isButtonDisabled && styles.disabledButton]} 
          onPress={handleCreatePost}
        disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 25
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  navIcon: {
    padding: 8,
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  titleInput: {
    backgroundColor: '#E8E8E8',
    borderColor: '#e6be7e',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    backgroundColor: '#dff0c2',
    borderColor: '#a1d18a',
    borderWidth: 0.01,
    borderRadius: 6,
    marginTop: 8,
  },
  formattingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
    borderBottomWidth: 1,
    borderColor: '#a1d18a',
  },
  formatIcon: {
    marginHorizontal: 4,
  },
  contentInput: {
    backgroundColor: '#E8E8E8',
    height: 200,
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#3944FD',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  createPostButton: {
    flex: 1,
    backgroundColor: '#3944FD',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    // backgroundColor: '#3944FD',
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
});

export default ForumPostCreation;
