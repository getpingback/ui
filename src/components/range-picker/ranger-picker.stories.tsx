import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import { CalendarIcon } from '@stash-ui/regular-icons';

import { RangePicker } from './range-picker';

const meta = {
  title: 'Components/RangePicker',
  component: RangePicker,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof RangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    createdAt: 'Thu Aug 22 2022 15:21:32 GMT-0300 (Brasilia Standard Time)',
    onApply: (data) => console.log(data),
    onClose: () => console.log('close'),
    trigger: (
      <Button
        id='date'
        variant='outline'
        className='w-full flex justify-start text-left text-sm font-semibold'
      >
        <CalendarIcon className='w-4 h-4 mr-2' />
        Select a date
      </Button>
    ),
  },
};

export const SingleType: Story = {
  args: {
    createdAt: 'Thu Aug 22 2022 15:21:32 GMT-0300 (Brasilia Standard Time)',
    onApply: (date) => console.log(date),
    onClose: () => console.log('close'),
    type: 'single',
    numberOfMonths: 1,
    trigger: (
      <Button
        id='date'
        variant='outline'
        className='w-full flex justify-start text-left text-sm font-semibold'
      >
        <CalendarIcon className='w-4 h-4 mr-2' />
        Select a date
      </Button>
    ),
  },
};

export const MobileType: Story = {
  args: {
    createdAt: 'Thu Aug 22 2022 15:21:32 GMT-0300 (Brasilia Standard Time)',
    onApply: (date) => console.log(date),
    onClose: () => console.log('close'),
    hideInputs: true,
    hideMenu: true,
    numberOfMonths: 1,
    trigger: (
      <Button
        id='date'
        variant='outline'
        className='w-full flex justify-start text-left text-sm font-semibold'
      >
        <CalendarIcon className='w-4 h-4 mr-2' />
        Select a date
      </Button>
    ),
  },
};
