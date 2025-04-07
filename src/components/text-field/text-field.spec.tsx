import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './text-field';

describe('TextField', () => {
  it('should render with label', () => {
    render(<TextField label="TextField" />);
    expect(screen.getByText('TextField')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should handle user input', async () => {
    const handleChange = jest.fn();
    render(<TextField onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test');
  });

  it('should display error message and icon', () => {
    render(<TextField error="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-divider-error');
  });

  it('should display helper text when no error', () => {
    render(<TextField helperText="Helper message" />);

    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<TextField disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('border-divider-disabled');
  });

  it('should display error message instead of helper text when both are present', () => {
    render(<TextField error="Error message" helperText="Helper text" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-divider-error');
  });
});
