import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { getGuestFeed, getPostsByIds, searchQuery } from './api'; // Assuming you have the API functions in a file called 'api'
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuestFeedPage = () => {

  const [response, setResponse] = useState(null);
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("")


  const search = (text: string) => {    
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
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
      <Text>Title: {item.title}</Text>
      <Text>Text: {item.text}</Text>
      <Text>Author: {item.author_name}</Text>
      <Text>Likes Count: {item.likes_count}</Text>
      {/* Add more fields as needed */}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>

        <View style={{    
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        width: "100%",
    }}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={'white'}
            value={searchText}
            onChangeText={setSearchText}
          />


          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { search(searchText) }}>
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
  row: {
    position: 'absolute',
    top: 20,
    // right: 20,
    // left:20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
  button: {
    // backgroundColor: "pink",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  }
});

export default GuestFeedPage;
