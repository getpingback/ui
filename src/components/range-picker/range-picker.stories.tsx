import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { RangePicker, Inputs } from './range-picker';

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
      <RangePicker type='range' onChange={(date) => console.log(date)} />
    </div>
  );
};

export const SingleType: Story = {
  args: {
    onChange: (date) => console.log(date),
    type: 'single',
  },
};

export const MobileType: Story = {
  args: {
    onChange: (date) => console.log(date),
    hideMenu: true,
    hideInputs: true,
    type: 'range',
    numberOfMonths: 1,
  },
};

export const ShowInputsOnTop: Story = () => {
  return (
    <div className='w-full flex justify-center'>
      <RangePicker
        type='range'
        onChange={(date) => console.log(date)}
        inputPosition='top'
        hideMenu
        numberOfMonths={1}
      />
    </div>
  );
};
