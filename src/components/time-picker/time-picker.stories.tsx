import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TimePicker } from './time-picker';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithInputProps: Story = {
  args: {
    label: 'Time',
    placeholder: '00:00',
    helperText: 'Choose a time from the date above'
  }
};
