import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import PaySlipCard from '../components/PaySlipCard';
import { RootState } from '../redux/store';

export default function Index() {
  const payslips = useSelector((state: RootState) => state.payslips);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{payslips.length} records available</Text>
      <FlatList
        data={payslips}
        renderItem={({ item }) => <PaySlipCard {...item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items to show</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 48,
  },
  header: {
    textAlign: 'right',
    padding: 12,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#555',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
