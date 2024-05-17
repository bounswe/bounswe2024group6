import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getArchitectView } from '../api';
import { useRoute } from '@react-navigation/native';

// export const mockData = () => {
//   return {
//     "name": "Mimar Sinan",
//     "description": [
//       "16th-century Ottoman chief architect and civil engineer"
//     ],
//     "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Mimar%20Sinan%2C%20architecte%20de%20Soliman%20le%20Magnifique.jpg",
//     "workLocations": [
//       "Višegrad",
//       "Edirne",
//       "Cairo",
//       "Aleppo",
//       "Istanbul"
//     ],
//     "notableWorks": [
//       {
//         "id": "Q1267134",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/NKD138%20Ferhadija2.jpg",
//         "coordinateLocation": {
//           "latitude": "17.187344444",
//           "longitude": "44.767413888"
//         }
//       },
//       {
//         "id": "Q184534",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Edirne%207333%20Nevit.JPG",
//         "coordinateLocation": {
//           "latitude": "26.559444",
//           "longitude": "41.678056"
//         }
//       },
//       {
//         "id": "Q188528",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Old%20Bridge%20in%20Mostar%20during%20sunset.jpg",
//         "coordinateLocation": {
//           "latitude": "17.815027777",
//           "longitude": "43.337277777"
//         }
//       },
//       {
//         "id": "Q210055",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Visegrad%20Drina%20Bridge%201.jpg",
//         "coordinateLocation": {
//           "latitude": "19.28794",
//           "longitude": "43.78248"
//         }
//       },
//       {
//         "id": "Q790052",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/681px-Banya.JPG",
//         "coordinateLocation": {
//           "latitude": "23.322575",
//           "longitude": "42.699511111"
//         }
//       },
//       {
//         "id": "Q644677",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Princova%20me%C5%A1ita.jpg",
//         "coordinateLocation": {
//           "latitude": "28.957175",
//           "longitude": "41.013794444"
//         }
//       },
//       {
//         "id": "Q178643",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/S%C3%BCleymaniyeMosqueIstanbul%20%28cropped%29.jpg",
//         "coordinateLocation": {
//           "latitude": "28.963888888",
//           "longitude": "41.016111111"
//         }
//       }
//     ],
//     "movements": [
//       {
//         "id": "Q527449",
//         "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Exterior%20of%20Sultan%20Ahmed%20I%20Mosque%2C%20%28old%20name%20P1020390.jpg%29.jpg",
//         "name": "Ottoman architecture"
//       }
//     ],
//     "wikiText": "Mimar Sinan (Ottoman Turkish: معمار سينان, romanized: Mi'mâr Sinân; Turkish: Mimar Sinan, pronounced [miːˈmaːɾ siˈnan]; c. 1488/1490 – 17 July 1588) also known as Koca Mi'mâr Sinân Âğâ, (\"Sinan Agha the Grand Architect\" or \"Grand Sinan\") was the chief Ottoman architect, engineer and mathematician for sultans Suleiman the Magnificent, Selim II and Murad III. He was responsible for the construction of more than 300 major structures, including the Selimiye Mosque in Edirne, the Kanuni Sultan Suleiman Bridge in Büyükçekmece, and the Mehmed Paša Sokolović Bridge in Višegrad, as well as other more modest projects such as madrasa's, külliyes, and bridges. His apprentices would later design the Sultan Ahmed Mosque in Istanbul and the Stari Most bridge in Mostar.\nThe son of a stonemason, he received a technical education and became a military engineer. He rose rapidly through the ranks to become first an officer and finally a Janissary commander, with the honorific title of Sinan. He refined his architectural and engineering skills while on campaign with the Janissaries, becoming expert at constructing fortifications of all kinds, as well as military infrastructure projects, such as roads, bridges and aqueducts. At about the age of fifty, he was appointed as chief royal architect, applying the technical skills he had acquired in the army to the \"creation of fine religious buildings\" and civic structures of all kinds. He remained in this post for almost fifty years.\nHis masterpiece is the Selimiye Mosque in Edirne, although his most famous work is the Suleiman Mosque in Istanbul. He headed an extensive governmental department and trained many assistants who, in turn, distinguished themselves; these  include Sedefkar Mehmed Agha, architect of the Sultan Ahmed Mosque and Mimar Hayruddin, architect of the Stari Most. He is considered the greatest architect of the classical period of Ottoman architecture and has been compared to Michelangelo, his contemporary in the West. Michelangelo and his plans for St. Peter's Basilica in Rome were well known in Istanbul, since Leonardo da Vinci and he had been invited, in 1502 and 1505 respectively, by the Sublime Porte to submit plans for a bridge spanning the Golden Horn. Mimar Sinan's works are among the most influential buildings in history."
//   }
// }

const ArchitectWiki = () => {

  const { params } = useRoute();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [wikiText, setWikiText] = useState('');
  const [workLocations, setWorkLocations] = useState([]);
  const [notableWorks, setNotableWorks] = useState([]);
  const [movements, setMovements] = useState([]);


  const handleArchitectItemClick = async (item_entity_id) => {
    try {
      const data = await getArchitectView(item_entity_id);
      setName(data.name);
      setDescription(data.description.join('\n'));
      setWikiText(data.wikiText);
      setWorkLocations(data.workLocations);
      setNotableWorks(data.notableWorks);
      setMovements(data.movements);
      setImage(data.image);
    } catch (error) {
      console.error('Error fetching architect view data:', error);
    }
  };

  useEffect(() => { 
    handleArchitectItemClick(params.viewData);
  },[]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.header}>Name</Text>
      <Text style={styles.information}>{name}</Text>
      <Text style={styles.header}>Description</Text>
      <Text style={styles.information}>{description}</Text>
      <Text style={styles.header}>Wiki Text</Text>
      <Text style={styles.information}>{wikiText}</Text>
      <Text style={styles.header}>Work Locations</Text>
      {workLocations.map((location, index) => (
        <Text key={index} style={styles.information}>{location}</Text>
      ))}
      <Text style={styles.header}>Notable Works</Text>
      {notableWorks.map((work, index) => (
        <View key={index} style={styles.workContainer}>
          <Image source={{ uri: work.image }} style={styles.workImage} />
          <Text style={styles.information}>Coordinates: {work.coordinateLocation.latitude}, {work.coordinateLocation.longitude}</Text>
        </View>
      ))}
      <Text style={styles.header}>Movements</Text>
      {movements.map((movement, index) => (
        <View key={index} style={styles.movementContainer}>
          <Image source={{ uri: movement.image }} style={styles.movementImage} />
          <Text style={styles.information}>{movement.name}</Text>
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
  workContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  workImage: {
    width: 200,
    height: 150,
    marginBottom: 8,
  },
  movementContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  movementImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
});



export default ArchitectWiki;
