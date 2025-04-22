import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import RecordsScreen from './src/screens/RecordsScreen';
import SalaryScreen from './src/screens/SalaryScreen';
import Header from './src/components/Header';
import Colors from './src/utils/ColorScheme';
import LoginScreen from './src/screens/Auth/LoginScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        header: () => <Header />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'alert-circle-outline'; // default fallback icon

          if (route.name === 'Home') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'Records') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Salary') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          return <Ionicons name={iconName} size={size} color={Colors.primary} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Records" component={RecordsScreen} />
      <Tab.Screen name="Salary" component={SalaryScreen} />
    </Tab.Navigator>
  );
};

export default App;
