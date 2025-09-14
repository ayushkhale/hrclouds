import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
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

export default function AttendanceSection() {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [containerColor, setContainerColor] = useState(Colors.secondary);
  const swipeAnim = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !attendanceMarked,
    onMoveShouldSetPanResponder: () => !attendanceMarked,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dx > 0 && gestureState.dx <= 250) {
        swipeAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx >= 250) {
        setAttendanceMarked(true);
        setContainerColor('#353160');
      }
      Animated.spring(swipeAnim, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance Stats</Text>
      <View style={styles.grid}>
      <LeaveCard title="Leave Days" value="0" />
        <LeaveCard title="Present Days" value="10" />  
        <LeaveCard title="Absent Days" value="4" />
        <LeaveCard title="Work Durations" value="09 : 03" />  
      </View>

      <Text style={[styles.attendanceText, attendanceMarked && { opacity: 1 }]}>
        {attendanceMarked ? 'Attendance Marked' : 'Swipe To Mark Your Attendance'}
      </Text>

      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: containerColor, opacity: attendanceMarked ? 1 : 1 },
        ]}
      >
        <Animated.View
          style={[
            styles.swipeButton,
            { transform: [{ translateX: swipeAnim }] },
          ]}
          {...(!attendanceMarked ? panResponder.panHandlers : {})}
        >
          <Text style={styles.buttonText}>
            {attendanceMarked ? '✓ Marked' : 'Swipe Me'}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 30,
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
  attendanceText: {
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  swipeButton: {
    width: 100,
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: 'bold',
  },
});
