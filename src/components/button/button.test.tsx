import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './button.stories';

const {
  Default,
  Solid,
  DisabledSolid,
  Outline,
  DisabledOutline,
  Ghost,
  DisabledGhost,
  Clear,
  DisabledClear,
  Rounded,
  WithPrefix,
  WithSuffix,
  FullWidth
} = composeStories(stories);

describe('Button Component', () => {
  describe('Default', () => {
    test('renders default button', () => {
      render(<Default />);
      expect(screen.getByText(/button/i)).not.toBeNull();
      expect(screen.getByText(/button/i).className.includes('bg-[#9061F9]')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('h-8')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('w-fit')).toBe(true);
    });
  });
  describe('Solid', () => {
    test('renders solid button', () => {
      render(<Solid />);
      expect(screen.getByText(/button/i).className.includes('bg-[#9061F9]')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('h-8')).toBe(true);
    });
    test('renders disabled solid button', () => {
      render(<DisabledSolid />);
      expect(screen.getByText(/button/i).className.includes('bg-[#E4E4E7]')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('cursor-not-allowed')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('opacity-45')).toBe(true);
      expect(screen.getByText(/button/i)).toHaveAttribute('disabled');
    });
  });
  describe('Outline', () => {
    test('renders outline button', () => {
      render(<Outline />);
      expect(screen.getByText(/button/i).className.includes('border-[#D4D4D8]')).toBe(true);
    });
    test('renders disabled outline button', () => {
      render(<DisabledOutline />);
      expect(screen.getByText(/button/i).className.includes('border-[#D4D4D8]')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('cursor-not-allowed')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('opacity-45')).toBe(true);
      expect(screen.getByText(/button/i)).toHaveAttribute('disabled');
    });
  });
  describe('Ghost', () => {
    test('renders ghost button', () => {
      render(<Ghost />);
      expect(screen.getByText(/button/i).className.includes('bg-[#52525B14]')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('text-[#52525B]')).toBe(true);
    });
    test('renders disabled ghost button', () => {
      render(<DisabledGhost />);
      expect(screen.getByText(/button/i).className.includes('bg-[#E4E4E7]')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('cursor-not-allowed')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('opacity-45')).toBe(true);
      expect(screen.getByText(/button/i)).toHaveAttribute('disabled');
    });
  });
  describe('Clear', () => {
    test('renders clear button', () => {
      render(<Clear />);
      expect(screen.getByText(/button/i).className.includes('bg-transparent')).toBe(true);
    });
    test('renders disabled clear button', () => {
      render(<DisabledClear />);
      expect(screen.getByText(/button/i).className.includes('bg-transparent')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('cursor-not-allowed')).toBe(true);
      expect(screen.getByText(/button/i).className.includes('opacity-45')).toBe(true);
      expect(screen.getByText(/button/i)).toHaveAttribute('disabled');
    });
  });
  describe('Rounded', () => {
    test('renders rounded button', () => {
      render(<Rounded />);
      expect(screen.getByText(/button/i).className.includes('rounded-full')).toBe(true);
    });
  });
  describe('WithPrefix', () => {
    test('renders with prefix button', () => {
      render(<WithPrefix />);
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    });
  });
  describe('WithSuffix', () => {
    test('renders with suffix button', () => {
      render(<WithSuffix />);
      expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    });
  });
  describe('Click Behavior', () => {
    test('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Default onClick={handleClick} />);

      const button = screen.getByText(/button/i);
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('FullWidth', () => {
    test('renders full width button', () => {
      render(<FullWidth />);
      expect(screen.getByText(/button/i).className.includes('w-full')).toBe(true);
    });
  });
});
