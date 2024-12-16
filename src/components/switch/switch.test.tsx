import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Switch } from './switch';

describe('Switch Component', () => {
  it('should render correctly', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should call onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should display correct checked state', () => {
    render(<Switch checked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should not call onChange when clicked if disabled', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} disabled />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
