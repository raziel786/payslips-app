import { configureStore } from '@reduxjs/toolkit';
import payslipReducer from './payslips/payslipSlice';

export const store = configureStore({
  reducer: {
    payslips: payslipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
