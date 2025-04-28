import React from 'react';

import { render, screen } from '@testing-library/react';
import Carousel from './carousel';

test('renders carousel', () => {
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
