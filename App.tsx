import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import CurvedHeader from './src/components/Header';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaySlipListScreen from './src/screens/PaySlipList';
import PaySlipDetailsScreen from './src/screens/PaySlipDetails';

export type RootStackParamList = {
  PaySlipList: undefined;
  PaySlipDetails: { payslipId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: ({ options, route, navigation }) => (
              <CurvedHeader
                title={options?.title || route.name}
                showBackButton={navigation.canGoBack()}
              />
            ),
          }}
        >
          <Stack.Screen
            name="PaySlipList"
            component={PaySlipListScreen}
            options={{
              title: 'Pay Slip List',
            }}
          />
          <Stack.Screen
            name="PaySlipDetails"
            component={PaySlipDetailsScreen}
            options={{
              title: 'Pay Slips Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
