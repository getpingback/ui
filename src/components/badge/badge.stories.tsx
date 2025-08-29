import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge'
  }
};

export const Solid: Story = {
  args: {
    children: 'Solid',
    variant: 'solid'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline'
  }
};
