import { Stack, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import QuizDetails from './quizDetails';
import QuizFeed from './quizFeed';
// import Authentication from './auth';

export default function Home() {
    console.log("index.tsx run")

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <QuizFeed/>
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
