import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { router } from 'expo-router';
import { createPost } from '@/app/api/forum';

const ForumPostCreation = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCreatePostEnabled, setIsCreatePostEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [tags, setTags] = useState<string[]>([
    "#Grammar",
    "#Vocabulary",
    "#Vocabulary Tips",
    "#Cultural Insights",
    "#Idioms & Expressions",
    "#Challenges",
    "#Learning Material",
    "#Common Mistakes",
    "#General",
    "#Fun","#A1", "#A2", "#B1", "#B2", "#C1", "#C2"

  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([
  ]);

  const handleCancel = () => {
    // Reset title and content or navigate back
    setTitle('');
    setContent('');
    router.back();
  };

  const handleCreatePost = async () => {
    // Handle post creation logic here
    try {
      await createPost(title, content, selectedTags);
      console.log('Post Created:', { title, content });
      router.back();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleAddTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, "#"+customTag]);
      setCustomTag('');
    }
  };

  const handleTagPress = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
            console.log(selectedTags)

      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isButtonDisabled = !title || !content;

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


      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Tags</Text>
      </TouchableOpacity>

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

      {/* Modal for adding tags */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
  <View style={styles.modalView}>
    <Text style={styles.modalTitle}>Add Tags</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter custom tag"
      value={customTag}
      onChangeText={setCustomTag}
    />
    <View style={styles.flatListContainer}>
      <FlatList
        data={tags}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tagItem,
              selectedTags.includes(item) && styles.selectedTagItem,
            ]}
            onPress={() => handleTagPress(item)}
          >
            <Text style={styles.tagText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag}>
        <Text style={styles.buttonText}>Add Tag</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    maxHeight: 300, // Adjust the height as needed
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 25,
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
  contentInput: {
    backgroundColor: '#E8E8E8',
    height: 200,
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addTagButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  tagItem: {
    backgroundColor: '#E8E8E8',
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  selectedTagItem: {
    backgroundColor: '#add8e6',  
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ForumPostCreation;