import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './carousel';

describe('Carousel', () => {
  // Setup mock for clientWidth
  const mockGetBoundingClientRect = jest.fn();
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;
  });

  test('renders all carousel items', () => {
    render(
      <Carousel>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('hides navigation buttons when hideNavigationButtons is true', () => {
    render(
      <Carousel settings={{ itemWidth: 224, spaceBetween: 24, hideNavigationButtons: true }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => {
      expect(button).toHaveClass('w-0');
    });
  });

  test('shows navigation buttons by default', () => {
    render(
      <Carousel>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveClass('w-0');
    expect(buttons[1]).toHaveClass('w-10');
  });

  test('renders nothing when there are no children', () => {
    const { container } = render(<Carousel />);
    expect(container.firstChild).toBeNull();
  });
});
