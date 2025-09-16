import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as command from './command-cmdk.stories';

const { Default } = composeStories(command);

describe('command', () => {
  describe('Default', () => {
    it('should open the command', () => {
      const { getByTestId } = render(<Default />);
      expect(getByTestId('command')).toBeInTheDocument();
    });

    it('should filter the command list', () => {
      const { getByTestId, queryByText } = render(<Default />);

      const input = getByTestId('command').querySelector('input');
      expect(input).toBeInTheDocument();
      fireEvent.change(input!, { target: { value: 'Fish' } });
      expect(queryByText('Apple')).not.toBeInTheDocument();
      expect(queryByText('Fish')).toBeInTheDocument();
    });

    it('should select the command item', () => {
      const { getByText } = render(<Default />);
      const consoleSpy = jest.spyOn(console, 'log');

      fireEvent.click(getByText('Apple'));

      expect(consoleSpy).toHaveBeenCalledWith('apple');
    });
    it('should show the empty search state when no items are found', () => {
      const { getByText } = render(<Default />);

      const input = document.querySelector('input');
      fireEvent.change(input!, { target: { value: 'Grape' } });

      expect(getByText('not found')).toBeInTheDocument;
    });
  });
});
