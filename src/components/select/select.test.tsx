import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './select.stories';

window.Element.prototype.scrollIntoView = () => {};

const { Default, WithHelperText } = composeStories(stories);

describe('Select', () => {
  describe('Default', () => {
    it('should render the label and placeholder', () => {
      render(<Default />);
      expect(screen.getByText('Select')).toBeInTheDocument();
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it.skip('should render the options', () => {
      render(
        <form>
          <Default />
        </form>
      );
      const trigger = screen.getByTestId('select-trigger');

      fireEvent.click(trigger);
      expect(screen.getByText('Intervalo')).toBeInTheDocument();
      expect(screen.getByText('Data')).toBeInTheDocument();
    });
  });

  describe('WithHelperText', () => {
    it('should render the helperText', () => {
      render(<WithHelperText />);
      expect(screen.getByText('Escolha um intervalo ou data para agendar o envio do email.')).toBeInTheDocument();
    });
  });
});
