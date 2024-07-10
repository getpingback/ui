import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as command from './command-cmdk.stories';

const { Default } = composeStories(command);

describe('command', () => {
  describe('Default', () => {
    it('should render the component', () => {
      render(<Default />);
    });

    it('should open the command', () => {
      const { getByText, getByTestId } = render(<Default />);
      const button = getByText('Open Command');
      fireEvent.click(button);
      expect(getByTestId('command')).toBeInTheDocument();
    });

    it('should close the command', () => {
      const { getByText, getByTestId, queryByTestId } = render(<Default />);
      const button = getByText('Open Command');
      fireEvent.click(button);
      expect(getByTestId('command')).toBeInTheDocument();
      fireEvent.click(button);
      expect(queryByTestId('command')).not.toBeInTheDocument();
    });

    it('should filter the command list', () => {
      const { getByText, getByTestId, queryByText } = render(<Default />);
      const button = getByText('Open Command');
      fireEvent.click(button);
      expect(getByTestId('command')).toBeInTheDocument();

      const input = getByTestId('command').querySelector('input');
      expect(input).toBeInTheDocument();
      fireEvent.change(input!, { target: { value: 'Fish' } });
      expect(queryByText('Apple')).not.toBeInTheDocument();
      expect(queryByText('Fish')).toBeInTheDocument();
    });

    it('should select the command item', () => {
      const { getByText } = render(<Default />);
      const consoleSpy = jest.spyOn(console, 'log');
      const button = getByText('Open Command');
      fireEvent.click(button);

      fireEvent.click(getByText('Apple'));

      expect(consoleSpy).toHaveBeenCalledWith('apple');
    });
    it('should show the empty search state when no items are found', () => {
      const { getByText } = render(<Default />);
      const button = getByText('Open Command');
      fireEvent.click(button);

      const input = document.querySelector('input');
      fireEvent.change(input!, { target: { value: 'Grape' } });

      expect(getByText('not found')).toBeInTheDocument;
    });
  });
});
