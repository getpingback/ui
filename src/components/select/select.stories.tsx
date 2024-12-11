import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select an option',
    options: [
      { value: '1', label: 'Intervalo' },
      { value: '2', label: 'Data' }
    ],
    onValueChange: (option) => console.log(option)
  }
};

export const Description: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select an option',
    options: [
      { value: '1', label: 'Intervalo', description: 'Ex: Espera de 1 dia e 3h para enviar o próximo email.' },
      { value: '2', label: 'Data', description: 'Ex: Espera até dia 15/10/2024 para enviar o email.' }
    ],
    onValueChange: (option) => console.log(option)
  }
};

export const WithHelperText: Story = {
  args: {
    label: 'Select',
    helperText: 'Escolha um intervalo ou data para agendar o envio do email.',
    placeholder: 'Select an option',
    options: [
      { value: '1', label: 'Intervalo' },
      { value: '2', label: 'Data' }
    ],
    onValueChange: (option) => console.log(option)
  }
};
