import { Stack } from 'expo-router';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {

    console.log("Layout run")
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="quizFeed" options={{headerShown: false}} />
      <Stack.Screen name="register" options={{headerShown: false}} />
      <Stack.Screen name="quizDetails" options={{headerShown: false}} />
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="quizResults" options={{headerShown: false}}/>
      {/* <Stack.Screen name="index" options={{headerShown: false}}/> */}
      <Stack.Screen name="quizQuestion" options={{headerShown: false}}/>
      <Stack.Screen name="quizCreationQuestionList" options={{headerShown: false}}/>
      <Stack.Screen name="quizCreationSettings" options={{headerShown: false}}/>
      <Stack.Screen name="quizCreationInfo" options={{headerShown: false}}/>
    </Stack>
  );
}
