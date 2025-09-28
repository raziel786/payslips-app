import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
    canGoBack: jest.fn().mockReturnValue(true),
  })),
}));

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('Given Header is rendered', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('When rendered with showBackButton=true, then it should show the back button', () => {
    const { getByTestId } = render(<Header showBackButton={true} />);
    const backButton = getByTestId('back-button');

    expect(backButton).toBeTruthy();
  });

  test('When the back button is pressed, then it should call navigation.goBack()', () => {
    const mockGoBack = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      canGoBack: jest.fn().mockReturnValue(true),
    });

    const { getByTestId } = render(<Header showBackButton={true} />);
    const backButton = getByTestId('back-button');

    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  test('When showBackButton is false, then back button should not be rendered', () => {
    const { queryByTestId } = render(<Header showBackButton={false} />);
    expect(queryByTestId('back-button')).toBeNull();
  });
});
