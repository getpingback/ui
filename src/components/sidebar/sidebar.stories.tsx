import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Sidebar,
  SideBarHeader,
  SideBarFooter,
  SideBarContent,
} from './sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex justify-center'>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideBarContent>
          <SideBarHeader>Header</SideBarHeader>
          <div className='h-[40px]'>Dashboard</div>
          <div className='h-[40px]'>Seetings</div>
          <div className='h-[40px]'>Create</div>
          <div className='h-[40px]'>Measure</div>
        </SideBarContent>

        <SideBarFooter>Footer</SideBarFooter>
      </Sidebar>
      <button
        className='p-2 border rounded-lg'
        onClick={() => setIsOpen(!isOpen)}
      >
        Click me
      </button>
    </div>
  );
};
