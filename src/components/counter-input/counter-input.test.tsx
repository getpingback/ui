import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './counter-input.stories';

const { Default, WithInputProps, MinAndMaxValue } = composeStories(stories);

describe('CounterInput', () => {
  describe('Default', () => {
    it('should render the component', () => {
      const { getByTestId } = render(<Default />);
      expect(getByTestId('counter-input')).toBeInTheDocument();
    });

    it('should increment the value', () => {
      const { getByTestId } = render(<Default />);
      const incrementButton = getByTestId('counter-input-increment-button');

      fireEvent.click(incrementButton);
      expect(getByTestId('counter-input')).toHaveValue(1);
    });

    it('should decrement the value', () => {
      const { getByTestId } = render(<Default />);
      const decrementButton = getByTestId('counter-input-decrement-button');

      fireEvent.click(decrementButton);
      expect(getByTestId('counter-input')).toHaveValue(-1);
    });
  });

  describe('WithInputProps', () => {
    it('should render with the correct label', () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText('Days')).toBeInTheDocument();
    });

    it('should display the placeholder text', () => {
      const { getByPlaceholderText } = render(<WithInputProps />);
      expect(getByPlaceholderText('0')).toBeInTheDocument();
    });

    it('should show the help text', () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText('Choose the number of days')).toBeInTheDocument();
    });
  });

  describe('MinAndMaxValue', () => {
    it('should not decrement the value below 0', () => {
      const { getByTestId } = render(<MinAndMaxValue />);
      const decrementButton = getByTestId('counter-input-decrement-button');

      fireEvent.click(decrementButton);
      expect(getByTestId('counter-input')).toHaveValue(0);
    });

    it('should not increment the value above 10', () => {
      const { getByTestId } = render(<MinAndMaxValue />);
      const input = getByTestId('counter-input');

      fireEvent.change(input, { target: { value: 10 } });

      const incrementButton = getByTestId('counter-input-increment-button');
      fireEvent.click(incrementButton);

      expect(getByTestId('counter-input')).toHaveValue(10);
    });
  });
});
