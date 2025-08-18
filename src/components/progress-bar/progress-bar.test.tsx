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
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-[#96D77C]');
  });

  test('renders progress bar with the correct dark green color', () => {
    render(<ProgressBar percent={60} color="dark-green" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-[#31C48D]');
  });

  test('renders progress bar with the correct red color', () => {
    render(<ProgressBar percent={60} color="red" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-[#F05252]');
  });

  test('renders progress bar with the correct yellow color', () => {
    render(<ProgressBar percent={60} color="yellow" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-[#FCE96A]');
  });

  test('renders progress bar with the correct gray color', () => {
    render(<ProgressBar percent={60} color="gray" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-[#D4D4D840]');
  });

  test('renders progress bar with the correct orange color', () => {
    render(<ProgressBar percent={60} color="orange" />);
    expect(screen.getByTestId('progress-bar')).toHaveClass('bg-[#F69D5E]');
  });
});
