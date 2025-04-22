import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Colors from '../../utils/ColorScheme';

const screenWidth = Dimensions.get('window').width;

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
  const data = {
    labels: ['Attended', 'Working'],
    datasets: [{ data: [20, 26] }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <LeaveCard title="Days Attended" value="20" />
        <LeaveCard title="Working Days" value="26" />
      </View>

      <Text style={styles.graphTitle}>Attendance Overview</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={220}
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          fillShadowGradient: Colors.primary,
          fillShadowGradientOpacity: 1,
          color: () => Colors.primary,
          labelColor: () => '#333',
          barPercentage: 0.5,
        }}
        style={styles.graphStyle}
      />
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
    marginTop: 6,
  },
  value: {
    fontSize: 30,
    fontWeight: '900',
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 24,
    marginBottom: 12,
  },
  graphStyle: {
    borderRadius: 16,
  },
});
