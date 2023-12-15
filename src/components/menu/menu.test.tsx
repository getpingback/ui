import React from 'react';
import { fireEvent, getAllByText, render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from './menu.stories';

const { Default } = composeStories(stories);
describe('Menu Component', () => {
  test('renders correctly MenuItem styles', async () => {
    const { getAllByTestId } = render(<Default />);
    const item = getAllByTestId(/menu-item/i);
    expect(item[0].className.includes('text-list-label')).toBe(true);
    expect(item[0].className.includes('hover:bg-list-hover')).toBe(true);
  });
  test('Render all items correctly', async () => {
    const { getAllByTestId } = render(<Default />);
    const item = getAllByTestId(/menu-item/i);
    expect(item[0]).toHaveTextContent('Edit my profile');
    expect(item[1]).toHaveTextContent('Settings');
    expect(item[2]).toHaveTextContent('Help');
    expect(item[3]).toHaveTextContent('Logout');
  });
  test('Render title correctly', async () => {
    const { getByTestId } = render(<Default />);
    const item = getByTestId('menu-title');
    expect(item).toHaveTextContent('Channel');
  });
  test('Render divider correctly', async () => {
    const { getByTestId } = render(<Default />);
    const item = getByTestId('menu-divider');
    expect(item).toHaveAttribute(
      'class',
      'w-full h-[1px] bg-list-hover my-[8px]'
    );
  });
  test('Render Sub correctly', async () => {
    const { getAllByTestId } = render(<Default />);
    const item = getAllByTestId(/menu-sub/i);
    expect(item[0]).toHaveTextContent('Idiom');
    expect(item[0]).toHaveAttribute('id', 'sub');
  });
  test('On subItem click should be render SubItems correctly', async () => {
    const { getAllByTestId } = render(<Default />);
    const item = getAllByTestId(/menu-sub/i);
    fireEvent.click(item[0]);
    const subItem = getAllByTestId(/menu-item/i);
    expect(subItem[0]).toHaveTextContent('English');
    expect(subItem[1]).toHaveTextContent('French');
    expect(subItem[2]).toHaveTextContent('Spanish');
  });
});
