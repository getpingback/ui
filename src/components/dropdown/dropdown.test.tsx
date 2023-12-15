import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from './dropdown.stories';

const { Left, Right, Default, Bottom, Radio, Sub } = composeStories(stories);
describe('Dropdown Component', () => {
  test('renders correctly DropdownItem styles', async () => {
    const user = userEvent.setup();
    const { getAllByTestId, getAllByRole } = render(<Default />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const item = getAllByTestId(/dropdown-item/i);
    expect(item[0].className.includes('text-list-label')).toBe(true);
    expect(item[0].className.includes('hover:bg-list-hover')).toBe(true);
  });
  test('render Title', async () => {
    const user = userEvent.setup();
    const { getAllByTestId, getAllByRole } = render(<Default />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const title = getAllByTestId(/dropdown-title/i);
    expect(title[0]).toHaveTextContent('Channel');
  });
  test('Render all items correctly', async () => {
    const user = userEvent.setup();
    const { getAllByRole, getAllByTestId } = render(<Default />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const item = getAllByTestId(/dropdown-item/i);
    expect(item[0]).toHaveTextContent('Edit my profile');
    expect(item[1]).toHaveTextContent('Settings');
    expect(item[2]).toHaveTextContent('Help');
    expect(item[3]).toHaveTextContent('Logout');
  });
  test('Render Left side correctly', async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(<Left />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const item = getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'left');
  });
  test('Render Right side correctly', async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(<Right />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const item = getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'right');
  });
  test('Render Bottom side correctly', async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(<Bottom />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const item = getAllByRole('menu');
    expect(item[0]).toHaveAttribute('data-side', 'bottom');
  });
  test('Render Radio correctly', async () => {
    const user = userEvent.setup();
    const { getAllByRole, getAllByTestId } = render(<Radio />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const item = getAllByTestId(/dropdown-radio/i);
    expect(item[0]).toHaveAttribute('aria-checked', 'true');
    expect(item[1]).toHaveAttribute('aria-checked', 'false');
  });
  test('Render Submenu correctly', async () => {
    const user = userEvent.setup();
    const { getAllByRole, getAllByTestId, getAllByText } = render(<Sub />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const sub = getAllByTestId(/dropdown-sub/i);

    expect(sub[0]).toHaveTextContent('Manage');
    expect(sub[1]).toHaveTextContent('Language');

    fireEvent.click(sub[0]);
    const item = getAllByTestId(/dropdown-item/i);
    expect(item[0]).toHaveTextContent('Dashboard');
    expect(item[1]).toHaveTextContent('Members');
  });
  test('should return to the initial state when closed', async () => {
    const user = userEvent.setup();
    const { getAllByRole, getAllByTestId } = render(<Sub />);
    const button = getAllByRole('button')[0];
    await user.click(button);
    const sub = getAllByTestId(/dropdown-sub/i);

    expect(sub[0]).toHaveTextContent('Manage');
    expect(sub[1]).toHaveTextContent('Language');

    fireEvent.click(sub[0]);

    fireEvent.click(document.body);
    expect(sub[0]).not.toBeInTheDocument();
    expect(sub[1]).not.toBeInTheDocument();
  });
});
