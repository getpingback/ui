import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './progress-bar.stories';
import { ProgressBar } from './progress-bar';

const { Default } = composeStories(stories);

describe('ProgressBar Component', () => {
  test('renders default progress bar', () => {
    render(<Default />);
    expect(screen.getByTestId('progress-bar')).not.toBeNull();
  });

  test('renders progress bar with label', () => {
    render(<Default />);
    expect(screen.getByTestId('progress-bar-label')).not.toBeNull();
    expect(screen.getByTestId('progress-bar-label')).toHaveTextContent('Automations');
    expect(screen.getByTestId('progress-bar-label')).toHaveTextContent('60%');
  });

  test('renders progress bar with the correct green color', () => {
    render(<ProgressBar percent={60} color="green" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-green-400');
  });

  test('renders progress bar with the correct dark green color', () => {
    render(<ProgressBar percent={60} color="dark-green" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-green-500');
  });

  test('renders progress bar with the correct red color', () => {
    render(<ProgressBar percent={60} color="red" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-red-500');
  });

  test('renders progress bar with the correct yellow color', () => {
    render(<ProgressBar percent={60} color="yellow" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-yellow-200');
  });

  test('renders progress bar with the correct gray color', () => {
    render(<ProgressBar percent={60} color="gray" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-gray-100');
  });

  test('renders progress bar with the correct orange color', () => {
    render(<ProgressBar percent={60} color="orange" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-orange-400');
  });
});
