import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CounterInput } from './counter-input';

const meta = {
  title: 'Components/CounterInput',
  component: CounterInput,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {
    label: {
      control: 'Label'
    },
    helperText: {
      control: 'HelperText'
    },
    placeholder: {
      control: 'Placeholder'
    }
  }
} satisfies Meta<typeof CounterInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithInputProps: Story = {
  args: {
    label: 'Days',
    placeholder: '0',
    helperText: 'Choose the number of days'
  }
};

export const MinAndMaxValue: Story = {
  args: {
    min: 0,
    max: 10
  }
};
