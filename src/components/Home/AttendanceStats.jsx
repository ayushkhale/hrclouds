import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/ColorScheme';

const LeaveCard = ({ title, value }) => (
  <View style={[styles.card, {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  }]}>
    <Text style={[styles.value, { color: Colors.primary }]}>{value}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function AttendanceStats() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <LeaveCard title="Leave Days" value="20" />
        <LeaveCard title="Present Days" value="26" />  
        <LeaveCard title="Absent Days" value="20" />
        <LeaveCard title="Total Working Days" value="26" />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '900',
  },
  TitleText: {
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '900',
  }
});
