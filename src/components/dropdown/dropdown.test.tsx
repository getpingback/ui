import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './dropdown.stories';

const { Left, Right, Default, Bottom, Radio } = composeStories(stories);
describe('Dropdown Component', () => {
  test('renders correctly DropdownItem styles', async () => {
    const { getAllByTestId, getAllByRole } = render(<Default />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByTestId(/dropdown-item/i);
    expect(item[0].className.includes('text-list-label')).toBe(true);
    expect(item[0].className.includes('hover:bg-list-hover')).toBe(true);
  });
  test('Render all items correctly', async () => {
    const { getAllByRole, getAllByTestId } = render(<Default />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByTestId(/dropdown-item/i);
    expect(item[0]).toHaveTextContent('Edit my profile');
    expect(item[1]).toHaveTextContent('Settings');
    expect(item[2]).toHaveTextContent('Help');
    expect(item[3]).toHaveTextContent('Logout');
  });
  test('Render Items with correctly icon', async () => {
    const { getAllByRole, getAllByTestId } = render(<Default />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByTestId(/dropdown-item/i);
    expect(item[0]).toContainHTML('<svg');
    expect(item[1]).toContainHTML('<svg');
    expect(item[2]).toContainHTML('<svg');
    expect(item[3]).toContainHTML('<svg');
  });
  test('Render Left side correctly', async () => {
    const { getAllByRole } = render(<Left />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'left');
  });
  test('Render Right side correctly', async () => {
    const { getAllByRole } = render(<Right />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'right');
  });
  test('Render Bottom side correctly', async () => {
    const { getAllByRole } = render(<Bottom />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'bottom');
  });
  test('Render Radio correctly', async () => {
    const { getAllByRole, getAllByTestId } = render(<Radio />);
    const button = getAllByRole('button')[0];
    fireEvent.click(button);
    const item = getAllByTestId(/dropdown-radio/i);
    expect(item[0]).toHaveAttribute('aria-checked', 'true');
    expect(item[1]).toHaveAttribute('aria-checked', 'false');
    expect(item[0]).toContainHTML('<svg');
    expect(item[1]).toContainHTML('<svg');
  });
});
