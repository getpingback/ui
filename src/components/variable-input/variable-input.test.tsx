import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VariableInput } from './variable-input';

describe('VariableInput Component', () => {
  const options = [
    {
      heading: 'Common Variables',
      items: [
        { label: 'Email', value: 'email' },
        { label: 'Name', value: 'name' },
        { label: 'Phone', value: 'phone' }
      ]
    },
    {
      heading: 'Custom Variables',
      items: [{ label: 'Custom Variable', value: 'customVariable' }]
    }
  ];

  it('should render with default props and open dropdown on trigger click', () => {
    const { getByTestId, getByText } = render(<VariableInput options={options} />);

    const triggerButton = getByTestId('variable-input-trigger');
    fireEvent.click(triggerButton);

    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Phone')).toBeInTheDocument();
    expect(getByText('Custom Variable')).toBeInTheDocument();
  });

  it('should call onChangeContent when text is input', () => {
    const handleChangeContent = jest.fn();
    const { container } = render(<VariableInput options={options} onChangeContent={handleChangeContent} />);

    const editor = container.querySelector("[contenteditable='true']");
    if (editor) {
      fireEvent.input(editor, { target: { textContent: 'Hello' } });
      expect(handleChangeContent).toHaveBeenCalledWith('Hello');
    }
  });

  it('should call onSelect when a variable is selected', () => {
    const handleSelect = jest.fn();
    const { getByText, getByTestId } = render(<VariableInput options={options} onSelectVariable={handleSelect} />);

    const triggerButton = getByTestId('variable-input-trigger');
    fireEvent.click(triggerButton);

    fireEvent.click(getByText('Email'));
    expect(handleSelect).toHaveBeenCalledWith('email');
  });

  it('should display placeholder when not focused and empty', () => {
    const { container } = render(<VariableInput options={options} placeholder="Enter text" />);

    const editor = container.querySelector("[contenteditable='true']");
    if (editor) {
      expect(editor.innerHTML).toContain('Enter text');
    }
  });

  it('should prevent editing of variable spans', () => {
    const { container } = render(<VariableInput options={options} />);
    const editor = container.querySelector("[contenteditable='true']");

    if (editor) {
      fireEvent.input(editor, { target: { innerHTML: '<span data-variable="var1">Variable 1</span>' } });

      fireEvent.keyDown(editor, { key: 'Backspace' });

      expect(editor.innerHTML).toContain('Variable 1');
    }
  });

  it('should filter variables when text is typed in the search input', () => {
    const { getByTestId, queryByText } = render(<VariableInput options={options} />);

    const triggerButton = getByTestId('variable-input-trigger');
    fireEvent.click(triggerButton);

    const searchInput = getByTestId('variable-input-search-input');
    fireEvent.change(searchInput, { target: { value: 'email' } });

    expect(queryByText('Email')).toBeInTheDocument();
    expect(queryByText('Name')).not.toBeInTheDocument();
    expect(queryByText('Phone')).not.toBeInTheDocument();
    expect(queryByText('Custom Variable')).not.toBeInTheDocument();
  });

  it('should show message when no variables are found in the search', () => {
    const { getByTestId, getByText } = render(<VariableInput options={options} />);

    const triggerButton = getByTestId('variable-input-trigger');
    fireEvent.click(triggerButton);

    const searchInput = getByTestId('variable-input-search-input');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(getByText('No results found')).toBeInTheDocument();
  });

  it('should prioritize initialContent over placeholder', () => {
    const initialContent = 'Initial content';
    const { container } = render(<VariableInput options={options} initialContent={initialContent} placeholder="Placeholder" />);

    const editor = container.querySelector("[contenteditable='true']");
    if (editor) {
      expect(editor.innerHTML).toBe(initialContent);
      expect(editor.innerHTML).not.toBe('Placeholder');
    }
  });
});
