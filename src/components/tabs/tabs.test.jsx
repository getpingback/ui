import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';

import * as stories from './tabs.stories';
import exp from 'constants';

const { Default, Secondary } = composeStories(stories);

describe('Tabs Component Default', () => {
  it('renders the Tabs component', () => {
    render(<Default />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders the Tabs component with the correct number of tabs', () => {
    render(<Default />);
    expect(screen.getAllByTestId('tabs-trigger')).toHaveLength(5);
  });

  it('renders the Tabs component with the correct number of panels', () => {
    render(<Default />);
    expect(screen.getAllByTestId('tabs-content')).toHaveLength(5);
  });
  it('render the Tabs component with the default correct active tab', () => {
    render(<Default />);
    const tabs = screen.getAllByTestId(/tabs-trigger/i);
    expect(tabs[0]).toHaveAttribute('data-state', 'active');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');
  });
  it('render the Tabs component with the correct active tab', async () => {
    render(<Default />);
    const user = userEvent.setup();
    const tabs = screen.getAllByTestId(/tabs-trigger/i);
    await user.click(tabs[1]);

    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'active');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');

    await user.click(tabs[2]);
    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'active');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');

    await user.click(tabs[3]);
    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'active');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');

    await user.click(tabs[4]);
    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'active');
  });
  it('render the Tabs component with the correct active panel', async () => {
    render(<Default />);
    const user = userEvent.setup();
    const tabs = screen.getAllByTestId(/tabs-trigger/i);
    const panels = screen.getAllByTestId(/tabs-content/i);
    await user.click(tabs[1]);
    expect(panels[1]).toHaveAttribute('data-state', 'active');
    expect(panels[1]).toHaveTextContent('Tab 2');

    await user.click(tabs[2]);
    expect(panels[2]).toHaveAttribute('data-state', 'active');
    expect(panels[2]).toHaveTextContent('Tab 3');

    await user.click(tabs[3]);
    expect(panels[3]).toHaveAttribute('data-state', 'active');
    expect(panels[3]).toHaveTextContent('Tab 4');

    await user.click(tabs[4]);
    expect(panels[4]).toHaveAttribute('data-state', 'active');
    expect(panels[4]).toHaveTextContent('Tab 5');
  });
});

describe('Tabs Component Secondary', () => {
  it('renders the Tabs component', () => {
    render(<Secondary />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
  it('render the Tabs component with the correct active tab', async () => {
    render(<Secondary />);
    const user = userEvent.setup();
    const tabs = screen.getAllByTestId(/tabs-trigger/i);
    await user.click(tabs[1]);

    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'active');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');

    await user.click(tabs[2]);
    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'active');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');

    await user.click(tabs[3]);
    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'active');
    expect(tabs[4]).toHaveAttribute('data-state', 'inactive');

    await user.click(tabs[4]);
    expect(tabs[0]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[1]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[2]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[3]).toHaveAttribute('data-state', 'inactive');
    expect(tabs[4]).toHaveAttribute('data-state', 'active');
  });
  it('render the Tabs component with the correct active panel', async () => {
    render(<Secondary />);
    const user = userEvent.setup();
    const tabs = screen.getAllByTestId(/tabs-trigger/i);
    const panels = screen.getAllByTestId(/tabs-content/i);
    await user.click(tabs[1]);
    expect(panels[1]).toHaveAttribute('data-state', 'active');
    expect(panels[1]).toHaveTextContent('Tab 2');

    await user.click(tabs[2]);
    expect(panels[2]).toHaveAttribute('data-state', 'active');
    expect(panels[2]).toHaveTextContent('Tab 3');

    await user.click(tabs[3]);
    expect(panels[3]).toHaveAttribute('data-state', 'active');
    expect(panels[3]).toHaveTextContent('Tab 4');

    await user.click(tabs[4]);
    expect(panels[4]).toHaveAttribute('data-state', 'active');
    expect(panels[4]).toHaveTextContent('Tab 5');
  });
});
