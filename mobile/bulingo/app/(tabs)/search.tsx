import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import QuizCard from '../components/quizCard';
import UserCard from './profile/userCard';
import TokenManager, { BASE_URL } from '../TokenManager';
import PostCard from '../components/postcard';
import CommentCard from '../components/commentcard';


export default function Tab() {
  const [searchResults, setSearchResults] = useState<any>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [userInput, setUserInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [option, setOption] = useState("Users");
  const [isLoading, setIsLoading] = useState(false);


  const search = async () => {
    if (userInput.length == 0){
      setSearchResults(undefined);
      return;
    }

    setIsLoading(true);
    const url = `search/?q=${userInput}&t=${option.toLowerCase()}`
    try {
      const response = await fetch(BASE_URL + "/" + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok){
        let dataType: string;
        switch (option){
          case 'Users':
            dataType = 'user';
            break;
          case 'Quizzes':
            dataType = 'quiz';
            break;
          case 'Posts':
            dataType = 'post';
            break;
          case 'Comments':
            dataType = 'comment';
            break;
          default:
            dataType = 'ERROR'
            break;
        }
        const data = await response.json();
        const real_data = data[option.toLowerCase()]
        let transformed_data = real_data.map((item:any) => ({
          type: dataType,
          data: item,
        }));
        if (dataType == 'quiz'){
          transformed_data = transformed_data.map((item:any) => ({
            ...item,
            data: {
              ...item.data,
              level: item.data.tags[0]
            }
          }));
          console.log(transformed_data[0].data.tags)
        } else if (dataType == "user"){
          const username = TokenManager.getUsername();
          transformed_data = transformed_data.map((item:any) => ({
            ...item,
            data: {
              ...item.data,
              buttonText: item.data.isFollowing ? "Unfollow" : "Follow",
              buttonStyleNo: item.data.username == username ? 3 : (item.data.isFollowing ? 1 : 2),
              profilePictureUri: item.data.profile_picture ? "http://64.226.76.231:8000" + item.data.profile_picture : "",
            }
          }));
          console.log(transformed_data)
        } else if (dataType == "post"){
          transformed_data = transformed_data.map((item:any) => ({
            ...item,
            data: {
              ...item.data,
              isBookmarked: item.data.is_bookmarked,
              liked: item.data.is_liked,
              likes: item.data.like_count,
            }
          }));
        } else if (dataType == "comment"){
          transformed_data = transformed_data.map((item:any) => ({
            ...item,
            data: {
              ...item.data,
              isBookmarked: false,  // Placeholder!!
              liked: item.data.isLiked,
              likes: item.data.like_count,
              comment: item.data.body,
              username: item.data.author,
            }
          }));
        }
        setSearchResults(transformed_data);
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const renderSearchResults = () => {
    if (searchResults === undefined){
      return (
        <View style={styles.reminderContainer}>
          <FontAwesome name='search' style={styles.reminderIcon}/>
          <Text style={styles.reminderText}>Use the search bar above to search for quizzes, forums and users!</Text>
        </View>
      );
    } else if (searchResults.length == 0){
      return (
        <View style={styles.reminderContainer}>
          <Text style={styles.noResultsText}>No results found. Try changing what you searched for or adjusting the filters!</Text>
        </View>
      );
    } 
    else {
      return (
        <FlatList
          data={searchResults}
          renderItem={({item}) => {
            if (item.type == "user"){
              return (<UserCard {...item.data}/>);
            }
            else if (item.type == "quiz"){
              return (<QuizCard {...item.data} />);
            }
            else if (item.type == "post"){
              return (<PostCard {...item.data} />);
            }
            else if (item.type == "comment"){
              return (<CommentCard {...item.data} />);
            }
            return null;
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchBox}>
            <TextInput style={styles.searchText} placeholder='Search' onChangeText={setUserInput} onEndEditing={() => setSearchQuery(userInput)}/>
            <TouchableOpacity style={{padding: 5}}onPress={async () => {setSearchQuery(userInput); await search()}}>
              <FontAwesome name="search" style={styles.searchButton}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsBar}>
          <Text>Search For: </Text>
          <TouchableOpacity style={styles.optionBox} onPress={() => setModalOpen(true)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderSearchResults()}
      {modalOpen &&
        <SimpleModal options={['Users', 'Quizzes', 'Posts', 'Comments']} setOption={setOption} setModalOpen={setModalOpen}/>
      }
      {isLoading && 
        <View style={styles.modalOverlay}>
          <ActivityIndicator/>
        </View>

      }
    </View>
  );
}

type SimpleModalProps = {
  options: string[],
  setOption: (option: string) => void;
  setModalOpen: (arg0: boolean) => void;
};

const SimpleModal = (props: SimpleModalProps) => {
  return (
    <Pressable style={styles.modalOverlay} onPress={() => {props.setModalOpen(false)}}>
      <View style={styles.modalContent}>
        {props.options.map((item, index) => (
          <TouchableOpacity key={index} style={styles.simpleModalItem} onPress={() => {props.setModalOpen(false); props.setOption(item == 'Clear' ? 'Sort by' : item)}}>
              <Text style={[styles.simpleModalText, item == 'Clear' && {color: 'red'}]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  );
};

type MultiChoiceModalProps = {
  options: {active: boolean, name: string}[],
  setOptions: (options: {active: boolean, name: string}[]) => void;
  setModalOpen: (arg0: boolean) => void;
};

const MultiChoiceModal = (props: MultiChoiceModalProps) => {
  const [tempOptions, setTempOptions] = useState(props.options);

  return (
    <Pressable style={styles.modalOverlay} onPress={() => {props.setModalOpen(false); props.setOptions(tempOptions)}}>
      <View style={styles.modalContent}>
        {tempOptions.map((item, index) => (
          <Pressable key={index} style={styles.multiChoiceModalItem} >
              <TouchableOpacity 
                style={[styles.checkbox, item.active && styles.checkboxActiveAddOn]}
                onPress={() => {
                  setTempOptions(
                    tempOptions.map(
                      (it, idx) => (idx === index ? {name: it.name, active: !it.active} : it)))}}
                />
              <Text style={styles.simpleModalText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </Pressable>
  );
};

// Helper function to chunk the array
const chunkArray = (array: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const MultiChoiceModalType2 = (props: MultiChoiceModalProps) => {
  const [tempOptions, setTempOptions] = useState(props.options);
  let chunkedOptions = chunkArray(tempOptions, 3);

  useEffect(() => {
    chunkedOptions = chunkArray(tempOptions, 3);
  }, [tempOptions]);
  

  return (
    <Pressable style={styles.modalOverlay} onPress={() => {props.setModalOpen(false); props.setOptions(tempOptions)}}>
      <View style={styles.modalContent}>
        {chunkedOptions.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tagModalRow}>
            {row.map((item, colIndex) => (
              <TouchableOpacity
              key={colIndex} 
                style={[styles.tagBox, item.active && styles.tagBoxActive]}
                onPress={() => {
                  setTempOptions(
                    tempOptions.map(
                      (it, idx) => (it == item ? {name: it.name, active: !it.active} : it)))}}
                >
                <Text style={[styles.tagText, item.active && styles.tagTextActive]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
  },
  searchBar: {
    flex: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  searchBox: {
    flex: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchText: {
    fontSize: RFPercentage(2.2),
    width: '90%',
  },
  searchButton: {
    fontSize: RFPercentage(2.8),
  },
  optionsBar: {
    flex: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  optionBox: {
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    flex: 1,
    height: RFPercentage(5.5),
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  reminderIcon: {
    color: 'gray',
    fontSize: RFPercentage(20),
    margin: 20,
  },
  reminderText: {
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    width: '70%',
  },
  passiveOptionText: {
    fontSize: RFPercentage(2),
  },
  activeOptionText: {
    color: 'blue',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  modalContent: {
    flex: 0,
    justifyContent:'center',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
  },
  simpleModalItem: {
    height: RFPercentage(7),
    justifyContent: 'center',
    margin: 3,
  },
  multiChoiceModalItem: {
    height: RFPercentage(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    elevation: 2,
    height: 20,
    width: 20,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 2,
  },
  checkboxActiveAddOn: {
    backgroundColor: 'blue',
  },
  simpleModalText: {
    fontSize: RFPercentage(2.5),
  },
  tagBox: {
    height: RFPercentage(3.5),
    borderRadius: RFPercentage(1.5),
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    marginVertical: 5,
    width: '30%',
  },
  tagBoxActive: {
    borderColor: 'blue',
  },
  tagText: {
    fontSize: RFPercentage(2),
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  tagTextActive: {
    color: 'blue',
  },
  tagModalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noResultsText: {
    fontSize: RFPercentage(2.8),
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    margin: 40,
  },
});

const tempStyles = StyleSheet.create({
  box: {
    height: 100,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  }
});