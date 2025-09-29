import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './text-area';

describe('TextArea', () => {
  it('should render with label', () => {
    render(<TextArea label="TextArea" />);
    expect(screen.getByText('TextArea')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<TextArea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should handle onChange', async () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('test');
  });

  it('should display error message', () => {
    render(<TextArea error="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-invalid');
  });

  it('should display helper text when no error', () => {
    render(<TextArea helperText="Helper message" />);

    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<TextArea disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('opacity-85');
  });

  it('should display error message instead of helper text when both are present', () => {
    render(<TextArea error="Error message" helperText="Helper text" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-invalid');
  });
});
