import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './table.stories';

const { Default } = composeStories(stories);

describe('Table Component', () => {
  test('should render the table', () => {
    render(<Default />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('should render the table body', () => {
    render(<Default />);
    const tableBody = screen.getAllByTestId('table-body');
    expect(tableBody).toHaveLength(1);
  });
  test('should render the table row', () => {
    render(<Default />);
    const tableRow = screen.getAllByTestId('table-row');
    expect(tableRow).toHaveLength(4);
  });

  test('should render the table header', () => {
    render(<Default />);
    const tableHeader = screen.getAllByTestId('table-header');
    expect(tableHeader).toHaveLength(1);
  });
  test('should render the table head', () => {
    render(<Default />);
    const tableHead = screen.getAllByTestId('table-head');
    expect(tableHead).toHaveLength(4);
  });
  test('should render the table cell', () => {
    render(<Default />);
    const tableCell = screen.getAllByTestId('table-cell');
    expect(tableCell).toHaveLength(12);
  });
});
