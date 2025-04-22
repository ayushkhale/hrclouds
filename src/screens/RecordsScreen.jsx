import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/ColorScheme';

const RecordsScreen = () => {
  const records = [
    { id: '1', date: '25 April 2023', checkIn: '09:00', checkOut: '18:00', totalHours: '9hr' },
    { id: '2', date: '24 April 2023', checkIn: '09:00', checkOut: '17:30', totalHours: '8.5hr' },
    { id: '3', date: '23 April 2023', checkIn: '09:15', checkOut: '18:00', totalHours: '8.75hr' },
    { id: '4', date: '22 April 2023', checkIn: '09:00', checkOut: '17:45', totalHours: '8.75hr' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.recordItem}>
      <Text style={styles.recordDate}>{item.date}</Text>
      <View style={styles.recordDetails}>
        <View style={styles.timeBlock}>
          <Icon name="log-in-outline" size={22} color="#28A745" />
          <Text style={styles.timeLabel}>{item.checkIn}</Text>
          <Text style={styles.timeText}>Check in</Text>
        </View>
        <View style={styles.timeBlock}>
          <Icon name="log-out-outline" size={22} color="#DC3545" />
          <Text style={styles.timeLabel}>{item.checkOut}</Text>
          <Text style={styles.timeText}>Check out</Text>
        </View>
        <View style={styles.timeBlock}>
          <Icon name="hourglass-outline" size={22} color="#007BFF" />
          <Text style={styles.timeLabel}>{item.totalHours}</Text>
          <Text style={styles.timeText}>Total hr</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.attendanceHeader}>
        <Text style={styles.attendanceTitle}>Attendance Records</Text>
        <Text style={styles.attendanceSub}>Your attendance records over time</Text>
      </View>

      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recordList}
      />
    </View>
  );
};

export default RecordsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  attendanceHeader: {
    marginBottom: 20,
  },
  attendanceTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
  },
  attendanceSub: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  recordList: {
    paddingBottom: 20,
  },
  recordItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  recordDate: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  recordDetails: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeBlock: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
    color: '#111',
  },
  timeText: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
});
