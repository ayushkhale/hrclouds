import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../utils/ColorScheme';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/500' }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome Employee</Text>
          <Text style={styles.subText}>Start your work</Text>
        </View>
      </View>
      <Icon name="bell" size={24} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
});

export default Header;
