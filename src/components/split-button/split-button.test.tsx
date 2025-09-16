import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './split-button.stories';
import { PlusIcon, TrashCanIcon } from '@stash-ui/light-icons';

beforeAll(() => {
  window.PointerEvent = MouseEvent as typeof PointerEvent;
});

const { Solid } = composeStories(stories);

describe('SplitButton Component', () => {
  it('should render the SplitButton component', () => {
    render(<Solid />);
    const primaryButton = screen.getByRole('button');
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');
    expect(primaryButton).toBeInTheDocument();
    expect(menuTrigger).toBeInTheDocument();

    expect(primaryButton).toHaveStyle({ backgroundColor: 'var(--button-solid-background-default)' });
    expect(menuTrigger).toHaveStyle({ backgroundColor: 'var(--button-solid-background-default)' });
  });

  it('should render the SplitButton menu items', () => {
    render(<Solid />);
    const menuTrigger = screen.getByTestId('split-button-menu-trigger');

    fireEvent.pointerDown(menuTrigger);
    const menuContent = screen.getByTestId('dropdown');
    const menuItems = screen.getAllByTestId(/split-button-menu-item/i);
    expect(menuContent).toBeInTheDocument();
    expect(menuItems[0]).toHaveTextContent('Add');
    expect(menuItems[1]).toHaveTextContent('Delete');
  });

  it('should call the onClick function when a menu item is clicked', () => {
    const onClickMock = jest.fn();
    render(
      <Solid
        {...{
          menuItems: [
            {
              key: 'add',
              icon: <PlusIcon />,
              text: 'Add',
              onClick: () => onClickMock('add')
            },
            {
              key: 'delete',
              icon: <TrashCanIcon />,
              text: 'Delete',
              onClick: () => onClickMock('delete')
            }
          ]
        }}
      />
    );

    const menuTrigger = screen.getByTestId('split-button-menu-trigger');
    fireEvent.pointerDown(menuTrigger);
    const menuItems = screen.getAllByTestId(/split-button-menu-item/i);
    fireEvent.click(menuItems[0]);

    expect(onClickMock).toHaveBeenCalledWith('add');
  });

  it('should call the onClick function when a primary button is clicked', () => {
    const onClickMock = jest.fn();
    render(<Solid {...{ onPrefixClick: () => onClickMock('primary action') }} />);
    const primaryButton = screen.getByRole('button');
    fireEvent.click(primaryButton);

    expect(onClickMock).toHaveBeenCalledWith('primary action');
  });

  it('should not call onPrefixClick when clicking the dropdown trigger', () => {
    const onPrefixClickMock = jest.fn();
    render(<Solid {...{ onPrefixClick: onPrefixClickMock }} />);

    const menuTrigger = screen.getByTestId('split-button-menu-trigger');
    fireEvent.pointerDown(menuTrigger);

    expect(onPrefixClickMock).not.toHaveBeenCalled();
  });
});
