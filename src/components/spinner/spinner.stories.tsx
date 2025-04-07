import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium'
  }
};

export const Gradient: Story = {
  args: {
    size: 'large',
    variant: 'purpleGradient'
  }
};
