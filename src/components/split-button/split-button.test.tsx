import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';

import * as stories from './split-button.stories';

const { Solid, Outlined, Ghost } = composeStories(stories);

describe('SplitButton Component', () => {
  it('should render the SplitButton component', () => {
    render(<Solid />);
    const buttonContainer = screen.getByTestId('split-button');
    const primaryButton = screen.getByTestId('split-button-primary');
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');
    expect(buttonContainer).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
    expect(menuTrigger).toBeInTheDocument();

    expect(primaryButton).toHaveStyle({ backgroundColor: 'var(--buttons-solid_default)' });
    expect(menuTrigger).toHaveStyle({ backgroundColor: 'var(--buttons-solid_default)' });
  });

  it('should render the SplitButton menu items', async () => {
    render(<Solid />);
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');

    const user = userEvent.setup();
    await user.click(menuTrigger);
    const menuContent = screen.getByTestId('split-button-menu-content');
    const menuItems = screen.getAllByTestId(/split-button-menu-item/i);
    expect(menuContent).toBeInTheDocument();
    expect(menuItems[0]).toHaveTextContent('Add');
    expect(menuItems[1]).toHaveTextContent('Delete');
  });

  it('should call the onClick function when a menu item is clicked', async () => {
    const onClickMock = jest.fn();
    render(
      <Solid
        {...{
          menuItems: [
            {
              key: 'add',
              text: 'Add',
              onClick: () => onClickMock('add')
            },
            {
              key: 'delete',
              text: 'Delete',
              onClick: () => onClickMock('delete')
            }
          ]
        }}
      />
    );

    const user = userEvent.setup();
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');
    await user.click(menuTrigger);
    const menuItems = screen.getAllByTestId(/split-button-menu-item/i);
    await user.click(menuItems[0]);

    expect(onClickMock).toHaveBeenCalledWith('add');
  });

  it('should call the onClick function when a primary button is clicked', async () => {
    const onClickMock = jest.fn();
    render(<Solid {...{ onPrimaryClick: () => onClickMock('primary action') }} />);
    const user = userEvent.setup();
    const primaryButton = screen.getByTestId('split-button-primary');
    await user.click(primaryButton);

    expect(onClickMock).toHaveBeenCalledWith('primary action');
  });

  it('should render the outlined SplitButton component', () => {
    render(<Outlined />);
    const buttonContainer = screen.getByTestId('split-button');
    const primaryButton = screen.getByTestId('split-button-primary');
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');

    expect(buttonContainer).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
    expect(menuTrigger).toBeInTheDocument();

    expect(primaryButton).toHaveStyle({ backgroundColor: 'var(--buttons-outlined_default)' });
    expect(menuTrigger).toHaveStyle({ backgroundColor: 'var(--buttons-outlined_default)' });
  });

  it('should render the ghost SplitButton component', () => {
    render(<Ghost />);
    const buttonContainer = screen.getByTestId('split-button');
    const primaryButton = screen.getByTestId('split-button-primary');
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');

    expect(buttonContainer).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
    expect(menuTrigger).toBeInTheDocument();

    expect(primaryButton).toHaveStyle({ backgroundColor: 'var(--buttons-ghost_bg-color)' });
    expect(menuTrigger).toHaveStyle({ backgroundColor: 'var(--buttons-ghost_bg-color)' });
  });
});
