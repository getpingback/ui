import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';
import { BADGE_TYPES, BADGE_VARIANTS } from './constants';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {
    type: {
      control: 'select',
      options: BADGE_TYPES
    },
    variant: {
      control: 'select',
      options: BADGE_VARIANTS
    }
  }
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
