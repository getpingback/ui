/// <reference types="jest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner } from './spinner';

describe('Spinner Component', () => {
  describe('Sizes', () => {
    test('should render spinner with small size', () => {
      render(<Spinner size="small" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner.className.includes('w-5')).toBe(true);
      expect(spinner.className.includes('h-5')).toBe(true);
    });

    test('should render spinner with medium size', () => {
      render(<Spinner />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner.className.includes('w-10')).toBe(true);
      expect(spinner.className.includes('h-10')).toBe(true);
    });

    test('should render spinner with large size', () => {
      render(<Spinner size="large" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner.className.includes('w-16')).toBe(true);
      expect(spinner.className.includes('h-16')).toBe(true);
    });

    test('should render spinner with extraLarge size', () => {
      render(<Spinner size="extraLarge" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner.className.includes('w-[165px]')).toBe(true);
      expect(spinner.className.includes('h-[165px]')).toBe(true);
    });
  });

  describe('Variants', () => {
    test('should render spinner with gray variant', () => {
      render(<Spinner variant="gray" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner.className.includes('text-icon-secondary')).toBe(true);
    });
  });

  describe('Stroke Sizes', () => {
    test('should render with small stroke size', () => {
      render(<Spinner />);
      const circle = screen.getByTestId('spinner').querySelector('circle');
      expect(circle).toHaveAttribute('stroke-width', '4');
    });

    test('should render with medium stroke size', () => {
      render(<Spinner strokeSize="medium" />);
      const circle = screen.getByTestId('spinner').querySelector('circle');
      expect(circle).toHaveAttribute('stroke-width', '7');
    });

    test('should render with large stroke size', () => {
      render(<Spinner strokeSize="large" />);
      const circle = screen.getByTestId('spinner').querySelector('circle');
      expect(circle).toHaveAttribute('stroke-width', '9');
    });
  });
});
