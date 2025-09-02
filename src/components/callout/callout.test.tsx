import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Callout } from './callout';

describe('Callout', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description'
  };

  it('renders with default props', () => {
    render(<Callout {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass('text-neutral');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Callout {...defaultProps} variant="info" />);
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass('text-info');

    rerender(<Callout {...defaultProps} variant="success" />);
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass('text-success');

    rerender(<Callout {...defaultProps} variant="warning" />);
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass('text-warning');

    rerender(<Callout {...defaultProps} variant="error" />);
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass('text-error');
  });

  it('renders with React node as description', () => {
    const description = <div data-testid="custom-description">Custom Description</div>;
    render(<Callout {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<Callout {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when onClose is not provided', () => {
    render(<Callout {...defaultProps} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Callout {...defaultProps} className="custom-class" />);

    const callout = screen.getByTestId('callout');
    expect(callout).toHaveClass('custom-class');
  });
});
