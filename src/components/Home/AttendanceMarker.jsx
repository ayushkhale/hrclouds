import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import Colors from '../../utils/ColorScheme'; 

const AttendanceMarker = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [containerColor, setContainerColor] = useState(Colors.secondary);
  const swipeAnim = useRef(new Animated.Value(0)).current;

  // Disable panResponder if attendance is already marked
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
        Animated.spring(swipeAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(swipeAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonContainer: {
    width: '100%',
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
  },
  attendanceText: {
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '900',
  },
});

export default AttendanceMarker;
