import React from 'react';

import { render, screen } from '@testing-library/react';
import { TextField } from './text-field';

describe('TextField', () => {
  it('should render', () => {
    render(<TextField label="TextField" />);
    expect(screen.getByText('TextField')).toBeInTheDocument();
  });
});
