import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from './color-picker';

describe('ColorPicker', () => {
  const defaultProps = {
    color: '#000000',
    onChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<ColorPicker {...defaultProps} />);

    const trigger = screen.getByTestId('color-picker-trigger');
    expect(trigger).toHaveStyle({ backgroundColor: '#000000' });
  });

  it('opens color picker dropdown when clicked', () => {
    render(<ColorPicker {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(screen.getByTestId('color-picker-dialog')).toBeInTheDocument();
  });

  it('updates color value when hex input changes', () => {
    render(<ColorPicker {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const hexInput = screen.getByDisplayValue('#000000');
    fireEvent.change(hexInput, { target: { value: '#FF0000' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('updates opacity when opacity input changes', () => {
    render(<ColorPicker {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const opacityInput = screen.getByDisplayValue('100%');
    fireEvent.change(opacityInput, { target: { value: '50' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith('#00000080');
  });

  it('correctly displays opacity when color has alpha channel', () => {
    render(<ColorPicker {...defaultProps} color="#FF000080" />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const opacityInput = screen.getByDisplayValue('50%');
    expect(opacityInput).toBeInTheDocument();
  });

  it('calls onSave when save button is clicked', () => {
    const onSave = jest.fn();
    render(<ColorPicker {...defaultProps} onSave={onSave} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(<ColorPicker {...defaultProps} onCancel={onCancel} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });

  it('updates color when theme color is clicked', () => {
    render(<ColorPicker {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const themeColors = screen.getAllByTestId('theme-color');
    fireEvent.click(themeColors[0]);

    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
