import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import HomeScreen from '../screens/App/HomeScreen';
import EngageScreen from '../screens/App/EngageScreen';
import RecordsScreen from '../screens/App/RecordsScreen';
import SalaryScreen from '../screens/App/SalaryScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Colors from '../utils/ColorScheme';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header />,
        drawerIcon: ({ focused, size }) => {
          const map: { [key: string]: [string, string] } = {
            App: ['apps', 'apps-outline'],
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
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: '#999',
        drawerLabelStyle: { fontSize: 15 },
        drawerStyle: { backgroundColor: '#fff', width: 260 },
      })}
    >
      <Drawer.Screen name="App" component={StackNavigator} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Engage" component={EngageScreen} />
      <Drawer.Screen name="Records" component={RecordsScreen} />
      <Drawer.Screen name="Salary" component={SalaryScreen} />
    </Drawer.Navigator>
  );
}
