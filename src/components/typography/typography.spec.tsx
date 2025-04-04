import { render, screen } from '@testing-library/react';
import { Typography } from './typography';

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Test Content</Typography>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with default props as a paragraph', () => {
    render(<Typography>Test Content</Typography>);
    const element = screen.getByText('Test Content');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('text-sm', 'leading-[170%]', 'font-normal', 'text-left', 'text-foreground');
  });

  it('renders different HTML elements based on variant', () => {
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;

    variants.forEach((variant) => {
      render(<Typography variant={variant}>Test {variant}</Typography>);
      const element = screen.getByText(`Test ${variant}`);
      expect(element.tagName).toBe(variant.toUpperCase());
    });
  });

  it('applies alignment classes correctly', () => {
    const { rerender } = render(<Typography align="center">Centered Text</Typography>);
    expect(screen.getByText('Centered Text')).toHaveClass('text-center');

    rerender(<Typography align="right">Right Text</Typography>);
    expect(screen.getByText('Right Text')).toHaveClass('text-right');

    rerender(<Typography align="left">Left Text</Typography>);
    expect(screen.getByText('Left Text')).toHaveClass('text-left');
  });

  it('applies type classes correctly', () => {
    const { rerender } = render(<Typography type="primary">Primary Text</Typography>);
    expect(screen.getByText('Primary Text')).toHaveClass('text-foreground');

    rerender(<Typography type="secondary">Secondary Text</Typography>);
    expect(screen.getByText('Secondary Text')).toHaveClass('text-secondary-foreground');

    rerender(<Typography type="tertiary">Tertiary Text</Typography>);
    expect(screen.getByText('Tertiary Text')).toHaveClass('text-tertiary-foreground');
  });

  it('applies weight classes correctly', () => {
    const { rerender } = render(<Typography weight="normal">Normal Text</Typography>);
    expect(screen.getByText('Normal Text')).toHaveClass('font-normal');

    rerender(<Typography weight="medium">Medium Text</Typography>);
    expect(screen.getByText('Medium Text')).toHaveClass('font-medium');

    rerender(<Typography weight="bold">Bold Text</Typography>);
    expect(screen.getByText('Bold Text')).toHaveClass('font-bold');
  });

  it('applies line height classes correctly', () => {
    const { rerender } = render(<Typography lineHeight="large">Large Height</Typography>);
    expect(screen.getByText('Large Height')).toHaveClass('leading-[170%]');

    rerender(<Typography lineHeight="medium">Medium Height</Typography>);
    expect(screen.getByText('Medium Height')).toHaveClass('leading-[145%]');

    rerender(<Typography lineHeight="none">No Height</Typography>);
    expect(screen.getByText('No Height')).toHaveClass('leading-none');
  });

  it('combines custom className with variant classes', () => {
    render(<Typography className="custom-class">Custom Class Text</Typography>);
    const element = screen.getByText('Custom Class Text');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('text-sm'); // Default variant class
  });
});
