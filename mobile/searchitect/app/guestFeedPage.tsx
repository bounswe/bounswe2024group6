import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { getGuestFeed, getPostsByIds, searchQuery } from './api'; // Assuming you have the API functions in a file called 'api'
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuestFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const search = (text) => {
    router.push(`/landingSearch?queryText=${text}`);
  };

  useEffect(() => {
    // Fetch guest feed when component mounts
    fetchGuestFeed();
  }, []);

  const fetchGuestFeed = async () => {
    try {
      const guestFeed = await getGuestFeed();
      const postIds = guestFeed.post_ids;
      // Fetch posts by IDs
      const postsData = await Promise.all(postIds.map(postId => getPostsByIds(postId)));
      // Set posts state
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching guest feed:', error);
    }
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postContainer}>
      <Image source={item.image ? { uri: item.image } : require('../assets/images/default.png')} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.author}>Author: {item.author_name}</Text>
        <Text style={styles.likes}>Likes Count: {item.likes_count}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="white"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => search(searchText)}>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  input: {
    width: 300,
    color: 'white',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
  },
  postContainer: {
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  likes: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

export default GuestFeedPage;
