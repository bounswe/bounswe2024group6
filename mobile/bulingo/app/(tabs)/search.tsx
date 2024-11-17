import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import QuizCard from '../components/quizCard';
import UserCard from './profile/userCard';

const TAGS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'TAG1', 'TAG2', 'TAG3', 'GRAMMAR'];
const CONTENT_TYPES = ["Users", "Quizzes", "Posts", "Comments"]
const MOCK_SEARCH_RESULT = [
  {type: "quiz", data: { id: 13, title: 'Furniture', description: 'Essential furniture', author: 'Kaan', level: 'A2', likes: 3, liked: false }},
  {type: "user", data: { id: 18, username: 'ygz2', name: 'Yagiz Guldal', level: 'A1', profilePictureUri:"https://static.vecteezy.com/system/resources/thumbnails/024/646/930/small_2x/ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg"}},
  {type: "post", data: { id: 36, name: "Placeholder Post"}},
  {type: "comment", data: { id: 326, name: "Placeholder Comment"}},
];

export default function Tab() {
  const [searchResults, setSearchResults] = useState<any>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [userInput, setUserInput] = useState("");
  const [sortByOption, setSortByOption] = useState<string>('Sort by');
  const [contentTypesOption, setContentTypesOption] = useState<{name: string, active: boolean}[]>(
    CONTENT_TYPES.map(ct => ({name: ct, active: true}))
  );
  const [tagsOption, setTagsOptions] = useState<{name: string, active: boolean}[]>(
    TAGS.map(tag => ({name: tag, active:true}))
  );
  const [sortByModalOpen, setSortByModalOpen] = useState(false);
  const [contentTypeModalOpen, setContentTypeModalOpen] = useState(false);
  const [tagsModalOpen, setTagsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Temporary, will be changed when connection with backend is made.
  useEffect(() => {
    const fetchResults = async (params: any) => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));  // Simulates a network call, can safely be removed later
      console.log("fetchResults called, returning mock data")
      if (searchQuery.length == 0){
        setSearchResults(undefined);
      } else if (searchQuery !== "Empty") {
        setSearchResults(MOCK_SEARCH_RESULT);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    };
    fetchResults({});
  }, [sortByOption, contentTypesOption, tagsOption, searchQuery]);

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
          keyExtractor={(item) => item.data.id}
          renderItem={({item}) => {
            if (item.type == "user"){
              return (<UserCard {...item.data} buttonText='Follow' buttonStyleNo={1}/>);
            }
            else if (item.type == "quiz"){
              return (<QuizCard {...item.data} />);
            }
            else if (item.type == "post"){
              return (<View style={tempStyles.box}><Text>Placeholder post card component.</Text></View>);
            }
            else if (item.type == "comment"){
              return (<View style={tempStyles.box}><Text>Placeholder comment card component.</Text></View>);
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
            <TouchableOpacity onPress={() => setSearchQuery(userInput)}>
              <FontAwesome name="search" style={styles.searchButton}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsBar}>
          <TouchableOpacity style={styles.optionBox} onPress={() => setSortByModalOpen(true)}>
            <Text style={sortByOption == 'Sort by' ? styles.passiveOptionText : styles.activeOptionText}>{sortByOption}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={() => setContentTypeModalOpen(true)}>
            <Text style={styles.passiveOptionText}>Content</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={() => setTagsModalOpen(true)}>
            <Text style={styles.passiveOptionText}>Tags</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderSearchResults()}
      {sortByModalOpen && 
        <SimpleModal options={["Newest", "Most Liked"]} setOption={setSortByOption} setModalOpen={setSortByModalOpen}/>
      }
      {contentTypeModalOpen && 
        <MultiChoiceModal options={contentTypesOption} setOptions={setContentTypesOption} setModalOpen={setContentTypeModalOpen}/>
      }
      {tagsModalOpen && 
        <MultiChoiceModalType2 options={tagsOption} setOptions={setTagsOptions} setModalOpen={setTagsModalOpen}/>
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
          <TouchableOpacity key={index} style={styles.simpleModalItem} onPress={() => {props.setModalOpen(false); props.setOption(item)}}>
              <Text style={styles.simpleModalText}>{item}</Text>
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
    padding: 4,
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
    width: RFPercentage(14),
    borderWidth: RFPercentage(0.2),
    borderColor: 'gray',
    justifyContent: 'center',
    margin: 5,
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