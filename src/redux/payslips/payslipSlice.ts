import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { payslips } from '../../utils/SampleData';
import { PayslipType } from '../../types/PaySlipTypes';

const initialState: PayslipType[] = payslips;

const payslipSlice = createSlice({
  name: 'payslips',
  initialState,
  reducers: {
    addPayslip: (state, action: PayloadAction<PayslipType>) => {
      state.push(action.payload);
    },
  },
});

export const { addPayslip } = payslipSlice.actions;
export default payslipSlice.reducer;
