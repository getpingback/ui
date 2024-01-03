import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';

import * as stories from './tooltip.stories';

const { Default, Right, Left, Top, Bottom } = composeStories(stories);

describe('Tooltip Component', () => {
  test('renders default tooltip', async () => {
    render(<Default />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('tooltip-trigger');

    expect(trigger).toBeInTheDocument();

    user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'Receita: Valor total de monetização do canal. Consideramos os valores de assinaturas'
      );
    });
  });
  test('renders right tooltip', async () => {
    render(<Right />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('tooltip-trigger');

    expect(trigger).toBeInTheDocument();

    user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'Tooltip right'
      );
      expect(screen.getByTestId('tooltip-content')).toHaveAttribute(
        'data-side',
        'right'
      );
    });
  });
  test('renders left tooltip', async () => {
    render(<Left />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('tooltip-trigger');

    expect(trigger).toBeInTheDocument();

    user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'Tooltip left'
      );
      expect(screen.getByTestId('tooltip-content')).toHaveAttribute(
        'data-side',
        'left'
      );
    });
  });
  test('renders top tooltip', async () => {
    render(<Top />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('tooltip-trigger');

    expect(trigger).toBeInTheDocument();

    user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'Tooltip top'
      );
      expect(screen.getByTestId('tooltip-content')).toHaveAttribute(
        'data-side',
        'top'
      );
    });
  });

  test('renders bottom tooltip', async () => {
    render(<Bottom />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('tooltip-trigger');

    expect(trigger).toBeInTheDocument();

    user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'Tooltip bottom'
      );
      expect(screen.getByTestId('tooltip-content')).toHaveAttribute(
        'data-side',
        'bottom'
      );
    });
  });
});
