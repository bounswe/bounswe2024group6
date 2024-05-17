import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getBuildingView } from '../api';

// export const mockData = () => {
//   return {
//     "name": "Notre-Dame de Paris",
//     "architect": [
//         {
//             "name": "Jean Ravy",
//             "image": "No Image",
//             "id": "Q16645563"
//         },
//         {
//             "name": "Pierre de Chelles",
//             "image": "No Image",
//             "id": "Q3387499"
//         },
//         {
//             "name": "Pierre de Montreuil",
//             "image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Hotel_de_ville_paris028.jpg&width=300",
//             "id": "Q1314747"
//         },
//         {
//             "name": "Jean de Chelles",
//             "image": "No Image",
//             "id": "Q374131"
//         },
//         {
//             "name": "Raymond du Temple",
//             "image": "No Image",
//             "id": "Q2134288"
//         }
//     ],
//     "country": "France",
//     "coordinates": "Point(2.3498 48.853)",
//     "architecturalStyle": [
//         {
//             "name": "classic gothic",
//             "image": "No Image",
//             "id": "Q72553961"
//         },
//         {
//             "name": "Early Gothic",
//             "image": "No Image",
//             "id": "Q33247990"
//         },
//         {
//             "name": "Rayonnant",
//             "image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Gothic-Rayonnant_Rose-6.jpg&width=300",
//             "id": "Q2914850"
//         },
//         {
//             "name": "French Gothic architecture",
//             "image": " https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Chartres_cathedral.jpg&width=300",
//             "id": "Q2245347"
//         }
//     ],
//     "description": "cathedral in Paris",
//     "wikiText": "Notre-Dame de Paris (French: [nɔtʁ(ə) dam də paʁi] ; meaning \"Our Lady of Paris\"), referred to simply as Notre-Dame, is a medieval Catholic cathedral on the Île de la Cité (an island in the Seine River), in the 4th arrondissement of Paris, France. The cathedral, dedicated to the Virgin Mary, is considered one of the finest examples of French Gothic architecture. Several attributes set it apart from the earlier Romanesque style, particularly its pioneering use of the rib vault and flying buttress, its enormous and colourful rose windows, and the naturalism and abundance of its sculptural decoration. Notre-Dame also stands out for its three pipe organs (one historic) and its immense church bells.\nBuilt during the medieval era, construction of the cathedral began in 1163 under Bishop Maurice de Sully and was largely completed by 1260, though it was modified in succeeding centuries. In the 1790s, during the French Revolution, Notre-Dame suffered extensive desecration; much of its religious imagery was damaged or destroyed. In the 19th century, the coronation of Napoleon and the funerals of many of the French Republic's presidents took place at the cathedral. The 1831 publication of Victor Hugo's novel Notre-Dame de Paris (in English: The Hunchback of Notre-Dame) inspired interest which led to restoration between 1844 and 1864, supervised by Eugène Viollet-le-Duc. On 26 August 1944, the Liberation of Paris from German occupation was celebrated in Notre-Dame with the singing of the Magnificat. Beginning in 1963, the cathedral's façade was cleaned of soot and grime. Another cleaning and restoration project was carried out between 1991 and 2000. A fire in April 2019 caused serious damage and forced the cathedral to close for a number of years; it is planned to reopen on 8 December 2024.\nThe cathedral is a widely recognized symbol of the city of Paris and the French nation. In 1805, it was awarded honorary status as a minor basilica. As the cathedral of the archdiocese of Paris, Notre-Dame contains the cathedra of the archbishop of Paris (currently Laurent Ulrich). In the early 21st century, approximately 12 million people visited Notre-Dame annually, making it the most visited monument in Paris. The cathedral is renowned for its Lent sermons, a tradition founded in the 1830s by the Dominican Jean-Baptiste Henri Lacordaire. These sermons have increasingly been given by leading public figures or government-employed academics.\nOver time, the cathedral has gradually been stripped of many decorations and artworks. However, the cathedral still contains Gothic, Baroque, and 19th-century sculptures, 17th- and early 18th-century altarpieces, and some of the most important relics in Christendom – including the Crown of Thorns, and a sliver and nail from the True Cross."
// }
// }

const BuildingWiki = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [wikiText, setWikiText] = useState('');
  const [country, setCountry] = useState('');
  const [architect, setArchitect] = useState([]);
  const [architecturalStyle, setArchitecturalStyle] = useState([]);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const { params } = useRoute();

  const handleBuildingItemClick = async (item_entity_id) => {
    try {
      const data = await getBuildingView(item_entity_id);
      setName(data.name);
      setDescription(data.description);
      setWikiText(data.wikiText);
      setCountry(data.country);
      setArchitect(data.architect);
      setArchitecturalStyle(data.architecturalStyle);
      setCoordinates(data.coordinates);
      setImage(data.image);
  

    console.log(image)
  
    } catch (error) {
      console.error('Error fetching building view data:', error);
    }
  };

  useEffect(() => {
    console.log("BUILDING PARAMS")
    console.log(params)
    console.log(params.viewData)
    handleBuildingItemClick(params.viewData);
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
      <Text style={styles.header}>Country</Text>
      <Text style={styles.information}>{country}</Text>
      <Text style={styles.header}>Architect</Text>

        {/* <View style={styles.architectContainer}>
          <Text style={styles.information}>{architect.name}</Text>
          <Image source={{ uri: arch.image }} style={styles.architectImage} />
        </View> */}


      {architect && architect.map((arch, index) => (
        <View key={index} style={styles.architectContainer}>
          <Text style={styles.information}>{arch.name}</Text>
          <Image source={{ uri: arch.image }} style={styles.architectImage} />
        </View>
      ))}
      <Text style={styles.header}>Architectural Style</Text>
      {architecturalStyle && architecturalStyle.map((style, index) => (
        <Text key={index} style={styles.information}>{style.name}</Text>
      ))}
      <Text style={styles.header}>Coordinates</Text>
      <Text style={styles.information}>Latitude: {coordinates && coordinates.latitude}</Text>
      <Text style={styles.information}>Longitude: {coordinates && coordinates.longitude}</Text>
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
});



export default BuildingWiki;

