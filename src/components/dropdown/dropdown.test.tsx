import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './dropdown.stories';

beforeAll(() => {
  window.PointerEvent = MouseEvent as typeof PointerEvent;
});

const { Left, Right, Default, Bottom, Radio, Error } = composeStories(stories);
describe('Dropdown Component', () => {
  test('renders correctly DropdownItem styles', () => {
    render(<Default />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByTestId(/dropdown-item/i);
    expect(item[0].className.includes('text-secondary')).toBe(true);
    expect(item[0].className.includes('hover:bg-sidebar-item-hover')).toBe(true);
  });
  test('Render all items correctly', () => {
    render(<Default />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByTestId(/dropdown-item/i);
    expect(item[0]).toHaveTextContent('Edit my profile');
    expect(item[1]).toHaveTextContent('Settings');
    expect(item[2]).toHaveTextContent('Help');
    expect(item[3]).toHaveTextContent('Logout');
  });
  test('Render Items with correctly icon', async () => {
    render(<Default />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByTestId(/dropdown-item/i);
    expect(item[0]).toContainHTML('<svg');
    expect(item[1]).toContainHTML('<svg');
    expect(item[2]).toContainHTML('<svg');
    expect(item[3]).toContainHTML('<svg');
  });
  test('Render Left side correctly', async () => {
    render(<Left />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'left');
  });
  test('Render Right side correctly', async () => {
    render(<Right />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'right');
  });
  test('Render Bottom side correctly', async () => {
    render(<Bottom />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'bottom');
  });
  test('Render Radio correctly', async () => {
    render(<Radio />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByTestId(/dropdown-radio/i);
    expect(item[0]).toHaveAttribute('aria-checked', 'true');
    expect(item[1]).toHaveAttribute('aria-checked', 'false');
    expect(item[0]).toContainHTML('<svg');
    expect(item[1]).toContainHTML('<svg');
  });
  test('Render Error correctly', async () => {
    render(<Error />);
    fireEvent.pointerDown(screen.getByText('Click here'));
    const item = screen.getAllByTestId(/dropdown-item/i);
    expect(item[0]).toHaveClass('text-secondary');
    expect(item[1]).toHaveClass('text-error');
  });
});
