import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../../utils/ColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const announcements = [
  {
    id: '1',
    title: 'Tree Plantation Drive',
    date: 'Apr 20, 2025',
    description: 'Join us at Bhopal Lakefront for a community tree plantation initiative organized by Dakshi Foundation.',
  },
  {
    id: '2',
    title: 'Women Empowerment Workshop',
    date: 'Apr 18, 2025',
    description: 'A skill-building session for local women entrepreneurs. Volunteers welcome!',
  },
  {
    id: '3',
    title: 'Dakshi Health Camp',
    date: 'Apr 25 - Apr 26, 2025',
    description: 'Free health check-ups and medicine distribution in collaboration with Bhopal General Hospital.',
  },
];

const AnnouncementCard = ({ title, date, description }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Icon name="megaphone-outline" size={20} color={Colors.primary} />
      <Text style={styles.title}>{title}</Text>
    </View>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

export default function AnnouncementFeed({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Engage')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <AnnouncementCard {...item} />}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  viewAllButton: {
    padding: 8,
    borderRadius: 4,
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: `${Colors.primary}10`,
    borderLeftWidth: 4,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#333',
  },
});
