// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import BuildingWiki from './wikiPages/buildingWiki';
// import StyleWiki from './wikiPages/styleWiki';
// import ArchitectWiki from './wikiPages/architectWiki';
// import GuestFeedPage from './guestFeedPage';
// import Landing from './landing';
// import LandingSearch from './landingSearch';
// import LoginScreen from './auth/login';
// import RegisterScreen from './auth/register';
// import Feed from './feed';

// const Stack = createStackNavigator();

// export default function Layout() {
//   console.log("Layout run");
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       {/* Optionally configure static options outside the route.*/}
      
//       <Stack.Screen name="wikiPages/buildingWiki" component={BuildingWiki} options={{headerShown: false}} />
//       <Stack.Screen name="wikiPages/styleWiki" component={StyleWiki} options={{headerShown: false}} />
//       <Stack.Screen name="wikiPages/architectWiki" component={ArchitectWiki} options={{headerShown: false}} />
      
//       <Stack.Screen name="guestFeedPage" component={GuestFeedPage} options={{headerShown: false}} />
      
//       <Stack.Screen name="landing" component={Landing} options={{headerShown: false}} />
//       <Stack.Screen name="landingSearch" component={LandingSearch} options={{headerShown: false}} />
      
//       <Stack.Screen name="auth/login" component={LoginScreen} options={{headerShown: false}} />
//       <Stack.Screen name="auth/register" component={RegisterScreen} options={{headerShown: false}} />
//       <Stack.Screen name="feed" component={Feed} options={{headerShown: false}} />
//     </Stack.Navigator>
//   );
// }

import { Stack } from 'expo-router';

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
      {/* Optionally configure static options outside the route.*/}

      <Stack.Screen name="wikiPages/buildingWiki" options={{headerShown: false}} />
      <Stack.Screen name="wikiPages/styleWiki" options={{headerShown: false}} />
      <Stack.Screen name="wikiPages/architectWiki" options={{headerShown: false}} />

      <Stack.Screen name="guestFeedPage" options={{headerShown: false}} />


      <Stack.Screen name="landing" options={{headerShown: false}} />
      <Stack.Screen name="quizDetails" options={{headerShown: false}} />
      <Stack.Screen name="home" options={{headerShown: false}}/>
      <Stack.Screen name="login" options={{headerShown: false}}/>


      <Stack.Screen name="auth/login" options={{headerShown: false}} />
      <Stack.Screen name="auth/register" options={{headerShown: false}} />

    </Stack>
  );
}
