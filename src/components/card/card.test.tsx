import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './card.stories';

const { Default } = composeStories(stories);

describe('Card Component', () => {
  test('renders default card', () => {
    render(<Default />);
    expect(screen.getByTestId('card')).not.toBeNull();
  });
  test('renders card header', () => {
    render(<Default />);
    expect(screen.getByTestId('card-header')).not.toBeNull();
    expect(screen.getByTestId('card-header')).toHaveTextContent('Open rate');
  });
  test('renders card content', () => {
    render(<Default />);
    expect(screen.getByTestId('card-content')).not.toBeNull();
    expect(screen.getByTestId('card-content')).toHaveTextContent('67%');
  });
  test('renders card footer', () => {
    render(<Default />);
    expect(screen.getByTestId('card-footer')).not.toBeNull();
    expect(screen.getByTestId('card-footer')).toHaveTextContent('Footer');
  });
});
