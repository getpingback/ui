import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './navigation.stories';

const { Item, Link, Trigger, SubItem } = composeStories(stories);
describe('NavigationItem Component', () => {
  describe('appearence variant', () => {
    test('renders default', () => {
      const { getByTestId } = render(<Item />);
      expect(screen.getByText(/NavigationItem/i)).not.toBeNull();
      const item = getByTestId('navigation-item');
      expect(item.className.includes('text-tertiary')).toBe(true);
    });
  });
});

describe('NavigationLink Component', () => {
  test('renders default variant', () => {
    const { getByTestId } = render(<Link />);

    const link = getByTestId('navigation-link');
    expect(link).toHaveTextContent('NavigationLink');
    expect(link.className.includes('text-tertiary')).toBe(true);
  });
  test('Should be href props', () => {
    const { getByTestId } = render(<Link />);
    const link = getByTestId('navigation-link');
    expect(link).toHaveAttribute('href', 'www.pingback.com');
    expect(link.tagName).toBe('A');
  });
});

describe('NavigationSubItem Component', () => {
  test('should render with the correct properties', () => {
    const { getAllByTestId, getByTestId } = render(<SubItem />);
    const subItem = getAllByTestId(/sub-item/i);
    expect(subItem[0].className.includes('hover:bg-sidebar-item-hover')).toBe(true);
    expect(subItem[0]).toHaveAttribute('href', '/first');
    expect(subItem[0].tagName).toBe('A');
    const firstDot = getByTestId('first');
    expect(firstDot).not.toBeNull();

    expect(subItem[1].className.includes('hover:bg-sidebar-item-hover')).toBe(true);
    expect(subItem[1]).toHaveAttribute('href', '/middle');
    expect(subItem[1].tagName).toBe('A');
    const middle = getByTestId('middle');
    expect(middle).not.toBeNull();

    expect(subItem[2].className.includes('hover:bg-sidebar-item-hover')).toBe(true);
    expect(subItem[2]).toHaveAttribute('href', '/last');
    expect(subItem[2].tagName).toBe('A');
    const lastDot = getByTestId('last');
    expect(lastDot).not.toBeNull();
  });
});

describe('NavigationTrigger Component', () => {
  test('should render with the correct properties and all sub-items', () => {
    const { getByRole, getAllByTestId } = render(<Trigger />);
    const triggerButton = getByRole('button');

    expect(triggerButton).toHaveTextContent('Settings');

    fireEvent.click(triggerButton);
    const account = getAllByTestId('navigation-sub-item')[0];
    expect(account).not.toBeNull();
    expect(account).toHaveAttribute('href', '/account');

    const profile = getAllByTestId('navigation-sub-item')[1];
    expect(profile).not.toBeNull();
    expect(profile).toHaveAttribute('href', '/profile');

    const notifications = getAllByTestId('navigation-sub-item')[2];
    expect(notifications).not.toBeNull();
    expect(notifications).toHaveAttribute('href', '/notifications');
  });

  test('should prevent default behavior and stop propagation', () => {
    const { getByRole, getAllByTestId } = render(<Trigger />);
    const consoleSpy = jest.spyOn(console, 'log');
    const triggerButton = getByRole('button');
    fireEvent.click(triggerButton);
    const account = getAllByTestId('navigation-sub-item')[0];
    fireEvent.click(account);

    expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({ label: 'Account', href: '/account' }));
  });
});
