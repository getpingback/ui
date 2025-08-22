import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Popover',
  component: PopoverContent,
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left']
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end']
    }
  }
} satisfies Meta<typeof PopoverContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: 'bottom',
    align: 'center'
  },
  render: (args) => (
    <Popover>
      <div className="w-full h-60 flex items-center justify-center">
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
      </div>
      <PopoverContent side={args.side} align={args.align}>
        Content
      </PopoverContent>
    </Popover>
  )
};
