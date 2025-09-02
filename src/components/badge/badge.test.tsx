import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './badge.stories';

const { Default, Ghost, Outline, Solid } = composeStories(stories);

describe('Badge Component', () => {
  describe('appearence variant', () => {
    test('renders default badge', () => {
      render(<Default />);
      expect(screen.getByText(/Badge/i)).not.toBeNull();
    });

    test('renders outline appearence badge', () => {
      render(<Outline data-testid="outline" />);

      const outline = screen.getByTestId('outline');
      expect(outline.className.includes('border')).toBe(true);
      expect(outline.className.includes('bg-transparent')).toBe(true);
    });

    test('renders ghost appearence badge', () => {
      render(<Ghost data-testid="ghost" />);

      const ghost = screen.getByTestId('ghost');
      expect(ghost.className.includes('bg-neutral')).toBe(true);
      expect(ghost.className.includes('text-neutral')).toBe(true);
    });

    test('renders solid appearence badge', () => {
      render(<Solid data-testid="solid" />);

      const solid = screen.getByTestId('solid');
      expect(solid.className.includes('bg-gray-600')).toBe(true);
      expect(solid.className.includes('text-gray-50')).toBe(true);
    });
  });
});
