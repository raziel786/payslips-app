import { fireEvent, render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { formatPeriod } from '../../utils/DateFormat';
import PaySlipCard from '../PaySlipCard';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('Given a PaySlipCard component', () => {
  const mockNavigate = jest.fn();
  const sampleProps = {
    id: 'A1B2C3',
    fromDate: '2025-01-01',
    toDate: '2025-01-31',
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  test('Then it should render the payslip ID and formatted period', () => {
    const { getByText } = render(<PaySlipCard {...sampleProps} />);

    expect(getByText(sampleProps.id)).toBeTruthy();

    expect(
      getByText(formatPeriod(sampleProps.fromDate, sampleProps.toDate)),
    ).toBeTruthy();
  });

  test('Then it should navigate to PaySlipDetails with correct params when pressed', () => {
    const { getByTestId } = render(<PaySlipCard {...sampleProps} />);

    const touchable = getByTestId('payslip-card');
    fireEvent.press(touchable);

    expect(mockNavigate).toHaveBeenCalledWith('PaySlipDetails', {
      payslipId: sampleProps.id,
    });
  });
});
