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

      <Stack.Screen name="landing" options={{headerShown: false}} />
      <Stack.Screen name="auth/login" options={{headerShown: false}} />
      <Stack.Screen name="auth/register" options={{headerShown: false}} />


    </Stack>
  );
}
