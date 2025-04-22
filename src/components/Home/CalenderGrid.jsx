import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../utils/ColorScheme';

const getWeekDates = () => {
    const result = [];
    const today = new Date();
    const todayIndex = today.getDay(); // 0 (Sun) to 6 (Sat)
  
    const start = new Date();
    start.setDate(today.getDate() - todayIndex); // Start from Sunday
  
    for (let i = 0; i < 7; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
  
      result.push({
        day: current.getDate(),
        weekday: current.toLocaleString('default', { weekday: 'short' }),
        isToday: current.toDateString() === today.toDateString(),
      });
    }
  
    // Reorder so that today is at index 3
    const offset = 3 - todayIndex;
    if (offset !== 0) {
      return result.map((_, i) => {
        const newIndex = (i - offset + 7) % 7;
        return result[newIndex];
      });
    }
  
    return result;
  };  

const CalendarStripCard = () => {
  const week = getWeekDates();

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {week.map((item, idx) => (
          <View key={idx} style={styles.dateItem}>
            <Text
              style={[
                styles.dayText,
                item.isToday && { color: Colors.primary },
              ]}
            >
              {item.weekday}
            </Text>

            <View
              style={[
                styles.dateCircle,
                item.isToday && {
                  backgroundColor: Colors.primary,
                  shadowColor: Colors.primary,
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 7 },
                  shadowRadius: 8,
                  elevation: 8,
                  transform: [{ scale: 1 }],
                },
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  item.isToday && { color: '#fff', fontWeight: 'bold',  },
                ]}
              >
                {item.day}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalendarStripCard;

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 5,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: '#2c2c2c',
    fontSize: 12,
    fontWeight: '700',
    paddingBottom:5,
  },
  dateCircle: {
    width: 38,
    height: 38,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  }
});
