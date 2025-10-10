import React from 'react';
import { render, screen } from '@testing-library/react';
import { Swiper, SwiperContent, SwiperControl } from './swiper';

describe('Swiper', () => {
  const mockGetBoundingClientRect = jest.fn();
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;
  });

  test('renders all swiper items', () => {
    render(
      <Swiper>
        <SwiperControl />
        <SwiperContent>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </SwiperContent>
      </Swiper>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('hides navigation buttons when hideNavigationButtons is true', () => {
    render(
      <Swiper settings={{ itemWidth: 224, spaceBetween: 24, hideNavigationButtons: true }}>
        <SwiperControl />
        <SwiperContent>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </SwiperContent>
      </Swiper>
    );

    const buttons = screen.queryAllByTestId('swiper-control');
    buttons.forEach((button) => {
      expect(button).toHaveClass('hidden');
    });
  });

  test('shows navigation buttons by default', () => {
    render(
      <Swiper>
        <SwiperControl />
        <SwiperContent>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </SwiperContent>
      </Swiper>
    );

    const buttons = screen.queryByTestId('swiper-control');
    const prevButton = screen.queryByTestId('prev-control');
    const nextButton = screen.queryByTestId('next-control');

    expect(buttons).toHaveClass('w-fit flex items-center gap-1');
    expect(prevButton).toHaveClass('w-6');
    expect(nextButton).toHaveClass('w-6');
  });

  test('renders nothing when there are no children', () => {
    render(
      <Swiper>
        <SwiperControl />
        <SwiperContent />
      </Swiper>
    );
    const swiperContent = screen.queryByTestId('swiper-content');
    expect(swiperContent).toBeNull();
  });
});
