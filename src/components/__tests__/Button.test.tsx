import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Button from '../Button';

describe('Given the Button is enabled', () => {
  test('When pressed, then it should call the onPress handler', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Click Me'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

describe('Given a title prop', () => {
  test('When rendered, then it should display the correct text', () => {
    const title = 'Submit';
    const { getByText } = render(<Button title={title} onPress={jest.fn()} />);

    expect(getByText(title)).toBeTruthy();
  });
});
