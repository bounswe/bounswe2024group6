import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getStyleView } from '../api';
import { useRoute } from '@react-navigation/native';

const StyleWiki = () => {

  const { params } = useRoute();

  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [wikiText, setWikiText] = useState('');
  const [architects, setArchitects] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [subclassOf, setSubclassOf] = useState([]);




  const handleStyleItemClick = async (item_entity_id) => {
    try {
      const data = await getStyleView(item_entity_id);
      setName(data.name);
      setDescription(data.description);
      setImage(data.image);
      setWikiText(data.wikiText);
      setArchitects(data.architects);
      setBuildings(data.buildings);
      setSubclassOf(data.subclassOf);
      
      // router.push(`wikiPages/styleWiki?data=${viewData}`);
    } catch (error) {
      console.error('Error fetching style view data:', error);
    }
  };

  useEffect(() => {
    handleStyleItemClick(params.viewData);
  }, []);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.header}>Name</Text>
      <Text style={styles.information}>{name}</Text>
      <Text style={styles.header}>Description</Text>
      <Text style={styles.information}>{description}</Text>
      <Text style={styles.header}>Wiki Text</Text>
      <Text style={styles.information}>{wikiText}</Text>
      <Text style={styles.header}>Architects</Text>
      {architects.map((architect, index) => (
        <View key={index} style={styles.architectContainer}>
          <Text style={styles.information}>{architect.name}</Text>
          {architect.image !== "NULL" && <Image source={{ uri: architect.image }} style={styles.architectImage} />}
        </View>
      ))}
      <Text style={styles.header}>Subclass Of</Text>
      {subclassOf.map((subclass, index) => (
        <View key={index} style={styles.subclassOfContainer}>
          <Text style={styles.information}>{subclass.name}</Text>
          <Image source={{ uri: subclass.image }} style={styles.subclassOfImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  information: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  architectContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  architectImage: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
  subclassOfContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  subclassOfImage: {
    width: 150,
    height: 100,
    marginTop: 8,
  },
});

export default StyleWiki;
