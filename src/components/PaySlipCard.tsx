import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatPeriod } from '../utils/DateFormat';
import { StackNavigationProp } from '@react-navigation/stack';
import { PayslipType } from '../types/PaySlipTypes';

type RootStackParamList = {
  PaySlipDetails: { payslipId: string };
};

type PaySlipCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PaySlipDetails'
>;

export default function PaySlipCard({ id, fromDate, toDate }: PayslipType) {
  const navigation = useNavigation<PaySlipCardNavigationProp>();

  return (
    <TouchableOpacity
      testID="payslip-card"
      onPress={() =>
        navigation.navigate('PaySlipDetails', {
          payslipId: id,
        })
      }
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.idText}>{id}</Text>
          <Text style={styles.periodText}>
            {formatPeriod(fromDate, toDate)}
          </Text>
        </View>
        <Text>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '95%',
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: '#C1E1C1',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    minHeight: 70,
  },
  textBlock: {
    flexShrink: 1,
  },
  idText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  periodText: {
    fontSize: 16,
    color: '#333',
    marginTop: 6,
  },
});
