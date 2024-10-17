import { Stack, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import Landing from './landing';
import BuildingWiki from './wikiPages/buildingWiki';
import StyleWiki from './wikiPages/styleWiki';
import ArchitectWiki from './wikiPages/architectWiki';
import GuestFeedPage from './guestFeedPage';
import Feed from './feed';
import QuizDetails from './quizDetails';
// import Authentication from './auth';

export default function Home() {
    console.log("index.tsx run")

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <QuizDetails/>
</>
  );
}




// <Link
// href={{
//     pathname: "/details",
//     // /* 1. Navigate to the details route with query params */
//     params: { id: 86, other: "anything you want here" },
// }}>
// Go to Details
// </Link>

{/* <Link href="/authentication/register" asChild>
<Pressable>
 <Text> REGISTER</Text>
</Pressable>
</Link> */}
