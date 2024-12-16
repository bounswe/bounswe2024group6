import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, Modal, Pressable, FlatList, Text, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TokenManager from '../TokenManager';

type TagEditProps={
  type: 'Post'|'Quiz';
  id: string,  // The id of the post or quiz
  tags: string[],
  onClose: ()=>void,
  extra?: any,
}


export default function TagEdit(props: TagEditProps){
  const [tags, setTags] = useState<string[]>(props.tags);
  const [filteredTags, setFilteredTags] = useState<string[]>(tags);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addTagModalVisible, setAddTagModalVisible] = useState(false);
  const [addTagInput , setAddTagInput] = useState("");

  useEffect(() => {
    setFilteredTags(tags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [tags, searchQuery]);

  const removeTag = (tag:string) => {
    console.log("HERE2!")
    return (async () => {
      setTags(tags.filter((item) => item !== tag))

      console.log("here4")
      const username = TokenManager.getUsername()
      if (username === null){
        console.error("username is null")
        return
      }
      console.log("HERE3")
      const params = props.type == 'Post' ? {
        tags: tags.filter((item) => item !== tag),
       } : {
        quiz_id: props.id,
        quiz: {
          tags: tags.filter((item) => item !== tag),
          title: props.extra?.title,
          description: props.extra?.description,
          level: props.extra?.level,
        }
       };

      const url = props.type == 'Post' ? `post/update/${props.id}/` : "quiz/update/";
      console.log(url);
      console.log(params);

      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok){
          const res = await response.json();
          console.log(res);
        } else {
          console.log("removeTag failed: ", response.status)
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  const addTag = async () => {
    if (!tags.includes(addTagInput)) {
      setTags([...tags, addTagInput])

      const username = TokenManager.getUsername()
      if (username === null){
        console.error("username is null")
        return
      }
      const params = props.type == 'Post' ? {
        'tags': [...tags, addTagInput],
       } : {
        quiz_id: props.id,
        quiz: {
          tags: [...tags, addTagInput],
          title: props.extra?.title,
          description: props.extra?.description,
          level: props.extra?.level,
        }
       };

      const url = props.type == 'Post' ? `post/update/${props.id}/` : "quiz/update/";      
      console.log(url);
      console.log(params);

      try {
        const response = await TokenManager.authenticatedFetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok){
          const res = await response.json();
          console.log(res);
        } else {
          console.log("addTag failed: ", response.status)
        }
      } catch (error) {
        console.error(error);
      }
    }
    setAddTagModalVisible(false);
  }

  return (
    <Modal
      // animationType="slide"
      transparent={true}
      onRequestClose={props.onClose}
    >
      { addTagModalVisible && 
        <Modal
          // animationType="slide"
          transparent={true}
          onRequestClose={() => setAddTagModalVisible(false)}
        >
          <Pressable style={styles.modalBackground} onPress={() => setAddTagModalVisible(false)}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Add a Tag to {props.type} </Text>
              </View>
              <TextInput
                style={styles.addTagInput}
                placeholder="Enter the tag"
                placeholderTextColor={'#666'}
                onChangeText={(text) => setAddTagInput(text)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButtonRectangle} onPress={addTag}>
                  <Text style={styles.buttonText}>Add Tag</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      }
      <Pressable style={styles.modalBackground} onPress={props.onClose}>
        <View style={styles.modalContent}>
          <FlatList
            data={filteredTags}
            keyExtractor={(_, index)=>index.toString()}
            renderItem={ ({item}) => {
              return (
                <Pressable style={styles.tagContainer}>
                  <TouchableOpacity onPress={removeTag(item)}>
                    <FontAwesome name="times" size={20} color='red' style={styles.xmark}/>
                  </TouchableOpacity>
                  <View style={styles.tagBox}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                </Pressable>
              );
            }}
            ListHeaderComponent={
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>Change {props.type} Tags</Text>
                </View>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search quiz tags"
                    placeholderTextColor={'#555'}
                    onChangeText={(text) => {setSearchQuery(text)}}
                  />
                  <TouchableOpacity style={styles.addButton} onPress={() => setAddTagModalVisible(true)}>
                    <Image source={require('@/assets/images/add-icon.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </>
            }
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create(
  {
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: '80%',
      maxHeight: '60%',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 3,
    },
    headerContainer: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    tagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      backgroundColor: 'white',
    },
    tagBox: {
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagText: {
      fontSize: 16,
    },
    xmark: {
      marginTop: 4,
      margin: 3,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    buttonContainer: {
      alignItems: 'center',
    },
    addButton: {
      marginLeft: 10,
    },
    addButtonRectangle: {
      margin: 10,
      alignItems: 'center',
      flex: 0,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      elevation: 2,
      backgroundColor: 'rgba(31, 23, 225, 0.8)',
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: 'bold',
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: 'black',
    },
    searchBar: {
      flex: 1,
      padding: 10,
      backgroundColor: '#e8e8e8',
      borderRadius: 8,
      color: 'black',
    },
    addTagInput: {
      marginTop: 15,
      margin: 10,
      flex: 0,
      padding: 10,
      backgroundColor: '#e8e8e8',
      borderRadius: 8,
      color: 'black',
    },
});