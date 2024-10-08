import React from 'react';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './pagination.stories';

const { Demo, Radius } = composeStories(stories);
describe('Pagination Component', () => {
  describe('appearence variant', () => {
    test('renders default', () => {
      const { getByTestId, queryByText } = render(<Demo />);
      const pagination = getByTestId('pagination');
      const next = getByTestId('pagination-next');
      const prev = getByTestId('pagination-previous');
      const first = getByTestId('pagination-first');
      const last = getByTestId('pagination-last');

      expect(next).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
      expect(first).toBeInTheDocument();
      expect(last).toBeInTheDocument();

      expect(getByText(pagination, '1')).toBeInTheDocument();
      expect(getByText(pagination, '2')).toBeInTheDocument();
      expect(getByText(pagination, '3')).toBeInTheDocument();
      expect(getByText(pagination, '4')).toBeInTheDocument();
      expect(getByText(pagination, '5')).toBeInTheDocument();
      expect(queryByText(pagination, '6')).not.toBeInTheDocument();
      expect(queryByText(pagination, '7')).not.toBeInTheDocument();
      expect(queryByText(pagination, '8')).not.toBeInTheDocument();
      expect(getByTestId('pagination-dots')).toBeInTheDocument();
      expect(getByText(pagination, '10')).toBeInTheDocument();
    });

    test('active page styles', () => {
      const { getByTestId } = render(<Demo />);
      const pagination = getByTestId('pagination');
      const activePage = getByText(pagination, '2');
      const nextPage = getByText(pagination, '3');

      expect(activePage.className.includes('bg-button-page-solid')).toBe(true);

      fireEvent.click(nextPage);
      expect(activePage.className.includes('bg-button-page-solid')).toBe(false);
      expect(nextPage.className.includes('bg-button-page-solid')).toBe(true);
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
      const { getByTestId } = render(<Radius />);
      const pagination = getByTestId('pagination');
      const activePage = getByText(pagination, '1');

      expect(activePage.className.includes('rounded-full')).toBe(true);
    });
  });
});
