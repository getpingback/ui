import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary']
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold', null]
    },
    lineHeight: {
      control: 'select',
      options: ['large', 'medium', 'none', null]
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'xsmall', 'caption', null]
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Typography'
  }
};
