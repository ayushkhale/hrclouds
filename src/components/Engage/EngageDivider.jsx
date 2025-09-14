import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import EngageAlerts from './EngageAlerts';
import EngageFeed from './EngageFeed';
import Colors from '../../utils/ColorScheme'; // adjust path as needed

const EngageDivider = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeText]}>
            Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'alerts' && styles.activeTab]}
          onPress={() => setActiveTab('alerts')}
        >
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeText]}>
            Alerts
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'alerts' ? <EngageAlerts /> : <EngageFeed />}
      </View>
    </View>
  );
};

export default EngageDivider;

const styles = StyleSheet.create({
  container: {
    padding:5
  },
  toggleContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  activeText: {
    color: '#fff',
  },
  content: {
    paddingHorizontal: 16,
  },
});
