import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from '../button/button';

describe('Popover', () => {
  it('should render and open', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Open')).toBeDefined();

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeDefined();
  });

  it('should render corrrecly position', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start">
          Content
        </PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeDefined();

    expect(screen.getByText('Content')).toHaveClass('origin-bottom-left');
  });
});
