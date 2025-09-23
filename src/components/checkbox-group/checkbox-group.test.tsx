import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './checkbox-group.stories';
import { CheckboxGroup, CheckboxItem } from './checkbox-group';

const { Default, OutsideList, CheckedItem } = composeStories(stories);

describe('Checkbox Component', () => {
  test('renders correct number of checkboxes', () => {
    render(<Default />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('renders disabled checkbox', () => {
    render(<Default />);
    expect(screen.getByLabelText('Option 3')).toBeDisabled();
    expect(screen.getByLabelText('Option 1')).not.toBeDisabled();
    expect(screen.getByLabelText('Option 2')).not.toBeDisabled();
  });

  test('renders default checked option', () => {
    render(<Default />);
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByLabelText('Option 3')).toHaveAttribute('aria-checked', 'false');
  });

  test('should change checked state', () => {
    render(<Default />);
    const firstCheckbox = screen.getByLabelText('Option 1');
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toHaveAttribute('aria-checked', 'false');
    const secondCheckbox = screen.getByLabelText('Option 2');
    fireEvent.click(secondCheckbox);
    expect(secondCheckbox).toHaveAttribute('aria-checked', 'true');
  });

  test('should reflect controlled value changes and call onValueChange', () => {
    let currentValue: string[] = [];
    const onValueChange = jest.fn((newValue: string[]) => {
      currentValue = newValue;
    });

    const { rerender } = render(
      <CheckboxGroup value={[]} onValueChange={onValueChange}>
        <CheckboxItem id="1" value="opt-1" label="Option 1" />
        <CheckboxItem id="2" value="opt-2" label="Option 2" />
      </CheckboxGroup>
    );

    const firstCheckbox = screen.getByLabelText('Option 1');
    const secondCheckbox = screen.getByLabelText('Option 2');

    expect(firstCheckbox).toHaveAttribute('aria-checked', 'false');
    expect(secondCheckbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(firstCheckbox);
    expect(onValueChange).toHaveBeenCalledWith(['opt-1']);

    rerender(
      <CheckboxGroup value={currentValue} onValueChange={onValueChange}>
        <CheckboxItem id="1" value="opt-1" label="Option 1" />
        <CheckboxItem id="2" value="opt-2" label="Option 2" />
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-checked', 'false');
  });

  test('renders outsideList variant', () => {
    render(<OutsideList />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'false');
    const wrapper = screen.getByLabelText('Option 1').closest('div[data-state]');
    expect(wrapper).not.toHaveClass('data-[state=unchecked]:hover:bg-neutral-hover');
  });

  test('default variant includes hover background class', () => {
    render(<Default />);
    const wrapper = screen.getByLabelText('Option 1').closest('div[data-state]');
    expect(wrapper).toHaveClass('data-[state=unchecked]:hover:bg-neutral-hover');
  });

  test('renders checked item', () => {
    render(<CheckedItem />);
    expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true');
  });
});
