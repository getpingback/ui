import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './button.stories';

const {
  Default,
  Primary,
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
  describe('Primary', () => {
    test('renders primary button', () => {
      render(<Primary />);
      const button = screen.getByRole('button');

      expect(button).not.toBeNull();
      expect(button.className.includes('animate-brand-gradient')).toBe(true);
      expect(button.className.includes('h-8')).toBe(true);
      expect(button.className.includes('p-[2px]')).toBe(true);
    });

    test('renders primary button with correct inner content styling', () => {
      render(<Primary />);
      const button = screen.getByRole('button');
      const innerDiv = button.querySelector('div');

      expect(innerDiv).not.toBeNull();
      expect(innerDiv?.className.includes('px-3')).toBe(true);
      expect(innerDiv?.className.includes('!h-full')).toBe(true);
      expect(innerDiv?.className.includes('!rounded-[10px]')).toBe(true);
      expect(innerDiv?.className.includes('bg-button-solid')).toBe(true);
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
      expect(button.className.includes('text-button-outlined-label')).toBe(true);
    });
    test('renders disabled ghost button', () => {
      render(<DisabledGhost />);
      const button = screen.getByRole('button');
      expect(button.className.includes('cursor-not-allowed')).toBe(true);
      expect(button.className.includes('opacity-45')).toBe(true);
      expect(button).toHaveAttribute('disabled');
    });
  });
  describe('Clear', () => {
    test('renders clear button', () => {
      render(<Clear />);
      const button = screen.getByRole('button');
      expect(button.className.includes('text-button-clear-label')).toBe(true);
    });
    test('renders disabled clear button', () => {
      render(<DisabledClear />);
      const button = screen.getByRole('button');
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
      expect(button.className.includes('bg-red-500')).toBe(true);
      expect(button.className.includes('text-button-solid-label')).toBe(true);
    });
  });
});
