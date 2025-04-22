import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './checkbox-group.stories';
import { CheckboxGroup, CheckboxItem } from './checkbox-group';

const { Default, Highlight } = composeStories(stories);

describe('Checkbox Component', () => {
  test('renders correct number of checkboxes', () => {
    render(<Default />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getAllByRole('checkbox')[0]).toHaveTextContent('Option 1');
    expect(screen.getAllByRole('checkbox')[1]).toHaveTextContent('Option 2');
    expect(screen.getAllByRole('checkbox')[2]).toHaveTextContent('Option 3');
  });

  test('renders disabled checkbox', () => {
    render(<Default />);
    expect(screen.getAllByRole('checkbox')[2]).toHaveAttribute('disabled');
    expect(screen.getAllByRole('checkbox')[0]).not.toHaveAttribute('disabled');
    expect(screen.getAllByRole('checkbox')[1]).not.toHaveAttribute('disabled');
  });

  test('renders default checked option', () => {
    render(<Default />);
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('data-state', 'checked');
    expect(screen.getAllByRole('checkbox')[1]).toHaveAttribute('data-state', 'unchecked');
    expect(screen.getAllByRole('checkbox')[2]).toHaveAttribute('data-state', 'unchecked');
  });

  test('should change checked state', () => {
    render(<Default />);
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toHaveAttribute('data-state', 'unchecked');
    const secondCheckbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(secondCheckbox);
    expect(secondCheckbox).toHaveAttribute('data-state', 'checked');
  });

  test('should reflect controlled value changes and call onValueChange', () => {
    let currentValue: string[] = [];
    const onValueChange = jest.fn((newValue: string[]) => {
      currentValue = newValue;
    });

    const { rerender } = render(
      <CheckboxGroup value={[]} onValueChange={onValueChange}>
        <CheckboxItem id="1" value="opt-1">
          Option 1
        </CheckboxItem>
        <CheckboxItem id="2" value="opt-2">
          Option 2
        </CheckboxItem>
      </CheckboxGroup>
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    const secondCheckbox = screen.getAllByRole('checkbox')[1];

    expect(firstCheckbox).toHaveAttribute('data-state', 'unchecked');
    expect(secondCheckbox).toHaveAttribute('data-state', 'unchecked');

    fireEvent.click(firstCheckbox);
    expect(onValueChange).toHaveBeenCalledWith(['opt-1']);

    rerender(
      <CheckboxGroup value={currentValue} onValueChange={onValueChange}>
        <CheckboxItem id="1" value="opt-1">
          Option 1
        </CheckboxItem>
        <CheckboxItem id="2" value="opt-2">
          Option 2
        </CheckboxItem>
      </CheckboxGroup>
    );

    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('data-state', 'checked');
    expect(screen.getAllByRole('checkbox')[1]).toHaveAttribute('data-state', 'unchecked');
  });

  test('renders highlight checkbox', () => {
    render(<Highlight />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getAllByRole('checkbox')[0]).toHaveTextContent('Option 1');
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('data-state', 'checked');
    expect(screen.getAllByRole('checkbox')[0]).toHaveClass('data-[state=checked]:bg-list-actived');

    expect(screen.getAllByRole('checkbox')[1]).toHaveTextContent('Option 2');
    expect(screen.getAllByRole('checkbox')[1]).toHaveAttribute('data-state', 'unchecked');

    expect(screen.getAllByRole('checkbox')[2]).toHaveTextContent('Option 3');
    expect(screen.getAllByRole('checkbox')[2]).toHaveAttribute('data-state', 'unchecked');
  });
});
