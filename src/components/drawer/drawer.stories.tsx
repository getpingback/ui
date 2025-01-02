import React, { useState } from 'react';
import { Drawer } from './drawer';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeftIcon } from '@stash-ui/light-icons';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs']
} satisfies Meta<typeof Drawer>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    title: 'Drawer',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    hasDivider: true,
    open: true,
    prefixIcon: <ArrowLeftIcon />,
    children: (
      <div className="flex flex-col gap-4">
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos</div>
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos</div>
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos</div>
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos</div>
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos</div>
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos</div>
      </div>
    ),
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

export const Behavior: Story = {
  args: {
    title: 'Drawer'
  },
  render: ({ title }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer title={title} open={open} onOpenChange={setOpen} />
      </>
    );
  }
};
