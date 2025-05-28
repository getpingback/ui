import React from 'react';

import { render, screen } from '@testing-library/react';
import { SelectList, SelectItem } from './select-list';

describe('SelectList', () => {
  it('should render', () => {
    render(
      <SelectList type="single" onChangeValue={() => {}}>
        <SelectItem value="1" label="Teste" />
      </SelectList>
    );

    expect(screen.getByText('Teste')).toBeInTheDocument();
  });
});
