import React from 'react';
import { Drawer } from './drawer';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeftIcon } from '@stash-ui/light-icons';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer
} satisfies Meta<typeof Drawer>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    title: 'Drawer',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    hasDivider: true,
    open: true,
    preffixIcon: <ArrowLeftIcon />,
    children: <div>content</div>,
    footer: (
      <div className="flex gap-4">
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
        <Button variant="solid" className="w-full">
          Save
        </Button>
      </div>
    )
  }
};
