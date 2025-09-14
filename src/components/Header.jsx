import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../utils/ColorScheme';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={40} color={Colors.primary} />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>HR CLOUDS</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/700' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.primary
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '900',
  }
});