import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from './dropdown';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DropdownMenu',
    buttonComponent: <button> click here </button>,
  },
};
