import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/App/HomeScreen';
import RecordsScreen from '../screens/App/RecordsScreen';
import SalaryScreen from '../screens/App/SalaryScreen';
import EngageScreen from '../screens/App/EngageScreen';
import Colors from '../utils/ColorScheme';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header />,
        tabBarIcon: ({ focused, size }) => {
          const map: { [k: string]: [string, string] } = {
            Home: ['planet', 'planet-outline'],
            Engage: ['flame', 'flame-outline'],
            Records: ['albums', 'albums-outline'],
            Salary: ['wallet', 'wallet-outline'],
          };
          const [filled, outline] = map[route.name] ?? ['alert-circle', 'alert-circle-outline'];
          return (
            <Ionicons
              name={focused ? filled : outline}
              size={size}
              color={focused ? Colors.primary : '#999'}
            />
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Engage" component={EngageScreen} />
      <Tab.Screen name="Records" component={RecordsScreen} />
      <Tab.Screen name="Salary" component={SalaryScreen} />
    </Tab.Navigator>
  );
}
