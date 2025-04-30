import React from 'react';
import { render, screen } from '@testing-library/react';
import { Swiper } from './swiper';

describe('Swiper', () => {
  const mockGetBoundingClientRect = jest.fn();
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;
  });

  test('renders all swiper items', () => {
    render(
      <Swiper>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('hides navigation buttons when hideNavigationButtons is true', () => {
    render(
      <Swiper settings={{ itemWidth: 224, spaceBetween: 24, hideNavigationButtons: true }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => {
      expect(button).toHaveClass('w-0');
    });
  });

  test('shows navigation buttons by default', () => {
    render(
      <Swiper>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveClass('w-0');
    expect(buttons[1]).toHaveClass('w-10');
  });

  test('renders nothing when there are no children', () => {
    const { container } = render(<Swiper />);
    expect(container.firstChild).toBeNull();
  });
});
