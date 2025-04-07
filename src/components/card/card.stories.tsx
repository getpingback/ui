import React from 'react';
import { GlobeIcon } from '@stash-ui/regular-icons';
import { Badge } from '../badge';
import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardHeader, CardContent, CardFooter } from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-3 w-[224px]">
        <CardHeader>
          <GlobeIcon className="w-[13px] text-tertiary-foreground mr-[8px]" />
          <span className="text-xs text-tertiary-foreground">Open rate</span>
        </CardHeader>
        <CardContent className="pt-[16px] flex justify-between">
          <span className="text-base text-secondary-foreground">67%</span>
          <Badge className="ml-2">15%</Badge>
        </CardContent>
        <CardFooter>
          <span className="text-xs pt-[8px] text-tertiary-foreground">Footer</span>
        </CardFooter>
      </div>
    )
  }
};

export const Active: Story = {
  args: {
    variant: 'active',
    children: (
      <div className="p-3 w-[224px]">
        <CardHeader>
          <GlobeIcon className="w-[13px] text-tertiary-foreground mr-[8px]" />
          <span className="text-xs text-tertiary-foreground">Open rate</span>
        </CardHeader>
        <CardContent>
          <span className="text-base text-secondary-foreground">67%</span>
          <Badge className="ml-2">15%</Badge>
        </CardContent>
        <CardFooter>
          <span className="text-xs pt-[8px] text-tertiary-foreground">Footer</span>
        </CardFooter>
      </div>
    )
  }
};
