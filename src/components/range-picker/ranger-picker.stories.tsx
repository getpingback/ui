import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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

export const Default: Story = () => {
  return (
    <div className='w-full flex justify-center'>
      <RangePicker
        type='range'
        onChange={(date) => console.log(date)}
        createdAt='Thu Aug 22 2022 15:21:32 GMT-0300 (Brasilia Standard Time)'
      />
    </div>
  );
};

export const SingleType: Story = {
  args: {
    createdAt: 'Thu Aug 22 2022 15:21:32 GMT-0300 (Brasilia Standard Time)',
    onChange: (date) => console.log(date),
    type: 'single',
  },
};

export const MobileType: Story = {
  args: {
    createdAt: 'Thu Aug 22 2022 15:21:32 GMT-0300 (Brasilia Standard Time)',
    onChange: (date) => console.log(date),
    hideMenu: true,
    hideInputs: true,
    type: 'range',
    numberOfMonths: 1,
  },
};
