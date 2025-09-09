import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './accordion.stories';

const { Default } = composeStories(stories);

describe('Accordion Component', () => {
  test('renders default Accordion', () => {
    render(<Default />);
    expect(screen.getByText('Accordion Label')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Accordion Label'));

    expect(screen.getByText('Accordion item 1')).toBeInTheDocument();
    expect(screen.getByText('Accordion item 2')).toBeInTheDocument();
    expect(screen.getByText('Accordion item 3')).toBeInTheDocument();
  });
  test('renders Accordion styles', () => {
    render(<Default />);
    expect(screen.getByText('Accordion Label')).toBeInTheDocument();
    expect(screen.getByText('Accordion Label')).toHaveClass('bg-neutral');
    expect(screen.getByText('Accordion Label')).toHaveClass('text-secondary');
    expect(screen.getByText('Accordion Label')).toHaveClass('[&[data-state=open]]:bg-neutral-active ');
    expect(screen.getByText('Accordion Label')).toHaveClass('[&[data-state=open]]:hover:bg-neutral-active-hover');
  });
});
