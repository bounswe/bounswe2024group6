import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getArchitectView, getBuildingView, getStyleView, searchQuery } from './api';
import { useLocalSearchParams, useRouter } from 'expo-router';

const LandingSearch = () => {
  const { params } = useRoute();
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const search = () => {
    searchQuery(params.queryText)
      .then((res) => {
        if (
          res &&
          ((res.style !== null && res.style.length > 0) ||
            (res.architect !== null && res.architect.length > 0) ||
            (res.building && res.building.length > 0))
        ) {
          console.log(res.building.Image);
          setResponse(res);
        } else {
          console.log('Response does not contain the expected structure');
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    search();
  }, []);


    
//   const handleBuildingItemClick = async (item) => {
//     try {
//       const viewData = await getBuildingView(item.entity_id);
//       console.log('VIEW DATA');
//         console.log(viewData);
//       router.push(`/wikiPages/buildingWiki?viewData=${viewData}`);
//     } catch (error) {
//       console.error('Error fetching building view data:', error);
//     }
//   };
  
//   const handleArchitectItemClick = async (item) => {
//     try {
//       const viewData = await getArchitectView(item.entity_id);
//       router.push(`wikiPages/architectWiki?data=${viewData}`);
//     } catch (error) {
//       console.error('Error fetching architect view data:', error);
//     }
//   };
  
//   const handleStyleItemClick = async (item) => {
//     try {
//       const viewData = await getStyleView(item.entity_id);
//       router.push(`wikiPages/styleWiki?data=${viewData}`);
//     } catch (error) {
//       console.error('Error fetching style view data:', error);
//     }
//   };


  const renderBuildingItem = ({ item }) => {
    const itemLink = item['image'];
    console.log(' BUILDING itemLink');
    console.log(itemLink);
    console.log(item.entity_id);

    return (
      <TouchableOpacity onPress={() => router.push(`/wikiPages/buildingWiki?viewData=${item.entity_id}`)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item['name']}</Text>
          <Image
            source={{ uri: itemLink }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderArchitectItem = ({ item }) => {
    const itemLink = item['image'];
    return (
      <TouchableOpacity onPress={() => router.push(`wikiPages/architectWiki?viewData=${item.entity_id}`)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item['name']}</Text>
          <Image
            source={{ uri: itemLink }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderStyleItem = ({ item }) => {
    const itemLink = item['image'];
    console.log(' STYLE itemLink ');
    console.log(itemLink);

    return (
      <TouchableOpacity onPress={() => router.push(`wikiPages/styleWiki?viewData=${item.entity_id}`)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item['name']}</Text>
          <Image
            source={{ uri: itemLink }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };

  

  return (
    <View style={styles.container}>
      {!response && <Text style={{ color: 'white' }}>Loading...</Text>}

      {response &&
        response.architect &&
        response.architect.length > 0 && (
          <>
            <Text style={styles.header}>Architect</Text>
            <FlatList
              data={response.architect}
              renderItem={renderArchitectItem}
              keyExtractor={(item) => item['entity_id']}
              />
          </>
        )}
      {response && response.style && response.style.length > 0 && (
        <>
          <Text style={styles.header}>Style</Text>
          <FlatList
            data={response.style}
            renderItem={renderStyleItem}
            keyExtractor={(item) => item['entity_id']}
          />
        </>
      )}
      {response && response.building && response.building.length > 0 && (
        <>
          <Text style={styles.header}>Building</Text>
          <FlatList
            data={response.building}
            renderItem={renderBuildingItem}
            keyExtractor={(item) => item['entity_id']}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default LandingSearch;
