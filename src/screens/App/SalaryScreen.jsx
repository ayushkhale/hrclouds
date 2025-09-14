import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/ColorScheme';

const SalaryScreen = () => {
  const salaryDetails = [
    { id: '1', month: 'April 2023', baseSalary: '₹30,000', bonus: '₹5,000', deductions: '₹2,000', totalSalary: '₹33,000' },
    { id: '2', month: 'March 2023', baseSalary: '₹30,000', bonus: '₹4,000', deductions: '₹1,500', totalSalary: '₹32,500' },
    { id: '3', month: 'February 2023', baseSalary: '₹30,000', bonus: 'z₹6,000', deductions: '₹2,500', totalSalary: '₹33,500' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.salaryItem}>
      <Text style={styles.salaryMonth}>{item.month}</Text>
      <View style={styles.salaryDetails}>
        <View style={styles.salaryBlock}>
          <Icon name="cash-outline" size={22} color="#28A745" />
          <Text style={styles.salaryLabel}>Base Salary</Text>
          <Text style={styles.salaryAmount}>{item.baseSalary}</Text>
        </View>
        <View style={styles.salaryBlock}>
          <Icon name="star-outline" size={22} color="#FFD700" />
          <Text style={styles.salaryLabel}>Bonus</Text>
          <Text style={styles.salaryAmount}>{item.bonus}</Text>
        </View>
        <View style={styles.salaryBlock}>
          <Icon name="remove-circle-outline" size={22} color="#DC3545" />
          <Text style={styles.salaryLabel}>Deductions</Text>
          <Text style={styles.salaryAmount}>{item.deductions}</Text>
        </View>
        <View style={styles.salaryBlock}>
          <Icon name="cash-outline" size={22} color="#007BFF" />
          <Text style={styles.salaryLabel}>Total Salary</Text>
          <Text style={styles.salaryAmount}>{item.totalSalary}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.salaryHeader}>
        <Text style={styles.salaryTitle}>Salary Details</Text>
        <Text style={styles.salarySub}>Your salary breakdown for the past months</Text>
      </View>

      <FlatList
        data={salaryDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.salaryList}
      />
    </View>
  );
};

export default SalaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  salaryHeader: {
    marginBottom: 20,
  },
  salaryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
  },
  salarySub: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  salaryList: {
    paddingBottom: 20,
  },
  salaryItem: {
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
  salaryMonth: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  salaryDetails: {
    marginTop: 15,
  },
  salaryBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  salaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#111',
  },
  salaryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginLeft: 8,
  },
});
