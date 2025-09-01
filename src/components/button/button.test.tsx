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
  FullWidth,
  Danger
} = composeStories(stories);

describe('Button Component', () => {
  describe('Default', () => {
    test('renders default button', () => {
      render(<Default />);
      const button = screen.getByRole('button');

      expect(button).not.toBeNull();
      expect(button.className.includes('bg-button-solid')).toBe(true);
      expect(button.className.includes('h-8')).toBe(true);
      expect(button.className.includes('w-fit')).toBe(true);
    });
  });
  describe('Solid', () => {
    test('renders solid button', () => {
      render(<Solid />);
      const button = screen.getByRole('button');
      expect(button.className.includes('bg-button-solid')).toBe(true);
      expect(button.className.includes('h-8')).toBe(true);
    });
    test('renders disabled solid button', () => {
      render(<DisabledSolid />);
      const button = screen.getByRole('button');
      expect(button.className.includes('disabled:bg-button-solid-disabled')).toBe(true);
      expect(button.className.includes('cursor-not-allowed')).toBe(true);
      expect(button.className.includes('opacity-45')).toBe(true);
      expect(button).toHaveAttribute('disabled');
    });
  });
  describe('Outline', () => {
    test('renders outline button', () => {
      render(<Outline />);
      const button = screen.getByRole('button');
      expect(button.className.includes('border-button-outlined')).toBe(true);
    });
    test('renders disabled outline button', () => {
      render(<DisabledOutline />);
      const button = screen.getByRole('button');
      expect(button.className.includes('border-button-outlined')).toBe(true);
      expect(button.className.includes('cursor-not-allowed')).toBe(true);
      expect(button.className.includes('opacity-45')).toBe(true);
      expect(button).toHaveAttribute('disabled');
    });
  });
  describe('Ghost', () => {
    test('renders ghost button', () => {
      render(<Ghost />);
      const button = screen.getByRole('button');
      expect(button.className.includes('bg-button-ghost')).toBe(true);
      expect(button.className.includes('text-secondary-foreground ')).toBe(true);
    });
    test('renders disabled ghost button', () => {
      render(<DisabledGhost />);
      const button = screen.getByRole('button');
      expect(button.className.includes('disabled:bg-button-ghost-disabled')).toBe(true);
      expect(button.className.includes('cursor-not-allowed')).toBe(true);
      expect(button.className.includes('opacity-45')).toBe(true);
      expect(button).toHaveAttribute('disabled');
    });
  });
  describe('Clear', () => {
    test('renders clear button', () => {
      render(<Clear />);
      const button = screen.getByRole('button');
      expect(button.className.includes('bg-transparent')).toBe(true);
    });
    test('renders disabled clear button', () => {
      render(<DisabledClear />);
      const button = screen.getByRole('button');
      expect(button.className.includes('bg-transparent')).toBe(true);
      expect(button.className.includes('cursor-not-allowed')).toBe(true);
      expect(button.className.includes('opacity-45')).toBe(true);
      expect(button).toHaveAttribute('disabled');
    });
  });
  describe('Rounded', () => {
    test('renders rounded button', () => {
      render(<Rounded />);
      const button = screen.getByRole('button');
      expect(button.className.includes('rounded-full')).toBe(true);
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

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('FullWidth', () => {
    test('renders full width button', () => {
      render(<FullWidth />);
      const button = screen.getByRole('button');
      expect(button.className.includes('w-full')).toBe(true);
    });
  });
  describe('Danger', () => {
    test('renders danger button', () => {
      render(<Danger />);
      const button = screen.getByRole('button');
      expect(button.className.includes('bg-button-danger')).toBe(true);
    });
  });
});
