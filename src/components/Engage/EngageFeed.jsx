import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/ColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';

const dummyEvents = [
  {
    _id: '680211ee6909ba50dc10db6e',
    title: 'Clean Bhopal, Green Bhopal',
    purpose: 'Promoting Sustainability',
    description:
      'Dakshi Foundation is hosting a community-driven event aimed at raising awareness about environmental sustainability. Join us in cleaning our beautiful city and creating a greener tomorrow!',
    image1:
      'https://i.ibb.co/WPwmmSh/IMG-202410293-230936482.jpg', 
    image2:
      'https://i.ibb.co/HHf6Bqp/IMG-20241019-WA0035.jpg',
    location: 'Bhopal',
    event_date: '20 May 2025',
    created_by: 'Dakshi Foundation',
  },
  {
    _id: '680211ee6909ba50dc10db6f',
    title: 'Sustainability and You',
    purpose: 'Building Green Leaders',
    description:
      'An inspiring seminar hosted by Dakshi Foundation to empower individuals with the knowledge to lead a sustainable lifestyle. Learn from experts on how to reduce waste, save energy, and make impactful changes in your daily life.',
      image1:
      'https://i.ibb.co/HHf6Bqp/IMG-20241019-WA0035.jpg', 
    image2:
      'https://i.ibb.co/WPwmmSh/IMG-202410293-230936482.jpg',
    location: 'Bhopal',
    event_date: '5 June 2025',
    created_by: 'Dakshi Foundation',
  },
];

const EngageFeed = () => {
  return (
    <FlatList
      data={dummyEvents}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 0 }}
      renderItem={({ item }) => <EventCard event={item} />}
    />
  );
};

const EventCard = ({ event }) => {
  return (
    <View style={styles.card}>
      {/* User profile info */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.ibb.co/WkMf7pt/Rohit-Chouhan-Director-Founder.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{event.created_by}</Text>
      </View>

      {/* Event images carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[event.image1, event.image2, event.image3, event.image4]
          .filter(Boolean)
          .map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
      </ScrollView>

      {/* Event title and description */}
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subText}>
          {event.event_date} | {event.location}
        </Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </View>
  );
};

export default EngageFeed;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
    color: Colors.primary,
  },
  image: {
    width: Dimensions.get('window').width * 0.75,
    height: 250,
    borderRadius: 12,
    marginRight: 8,
  },
  content: {
    paddingTop: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  icons: {
    flexDirection: 'row',
  },
  likes: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 8,
  },
  subText: {
    fontSize: 13,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});
