import React from 'react';
import '@testing-library/jest-dom';
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
    expect(screen.getByRole('textbox')).toHaveClass('border-invalid');
  });

  it('should display helper text when no error', () => {
    render(<TextField helperText="Helper message" />);

    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<TextField disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('opacity-85');
  });

  it('should display error message instead of helper text when both are present', () => {
    render(<TextField error="Error message" helperText="Helper text" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-invalid');
  });

  it('should render password input and toggle visibility', async () => {
    render(<TextField type="password" placeholder="Senha" />);

    const input = screen.getByPlaceholderText('Senha');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveClass('pr-10');

    const toggleButton = screen.getByRole('button');
    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });
});
