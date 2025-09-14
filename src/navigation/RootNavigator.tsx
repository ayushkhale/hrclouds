import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import SplashScreen from '../screens/App/SplashScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setAuthenticated(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="App" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
}
