import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './pagination.stories';

const { Demo, Radius } = composeStories(stories);
describe('Pagination Component', () => {
  describe('appearence variant', () => {
    test('renders default', () => {
      render(<Demo />);
      const next = screen.getByTestId('pagination-next');
      const prev = screen.getByTestId('pagination-previous');
      const first = screen.getByTestId('pagination-first');
      const last = screen.getByTestId('pagination-last');

      expect(next).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
      expect(first).toBeInTheDocument();
      expect(last).toBeInTheDocument();

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.queryByText('6')).not.toBeInTheDocument();
      expect(screen.queryByText('7')).not.toBeInTheDocument();
      expect(screen.queryByText('8')).not.toBeInTheDocument();
      expect(screen.getByTestId('pagination-dots')).toBeInTheDocument();
    });

    test('active page styles', () => {
      render(<Demo />);
      const activePage = screen.getAllByRole('button');
      const nextPage = screen.getByText('3');

      expect(activePage[3].className.includes('bg-button-solid')).toBe(true);

      fireEvent.click(nextPage);
      expect(activePage[4].className.includes('bg-button-solid')).toBe(true);
      expect(activePage[3].className.includes('bg-button-solid')).toBe(false);
      expect(activePage[2].className.includes('bg-button-solid')).toBe(false);
    });

    test('onChange event', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const { getByTestId } = render(<Demo />);
      const nextPage = getByTestId('pagination-next');

      fireEvent.click(nextPage);
      expect(consoleSpy).toHaveBeenCalledWith(3);
    });
  });

  describe('rounded variant', () => {
    test('radius styles', () => {
      render(<Radius />);
      const activePage = screen.getAllByRole('button');

      expect(activePage[0].className.includes('rounded-full')).toBe(true);
    });
  });
});
