import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar, SideBarHeader, SideBarFooter, SideBarContent } from './sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    onOpenChange: () => {}
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
      <div className="flex justify-between h-screen">
        <Sidebar isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <SideBarHeader isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            Header
          </SideBarHeader>
          <SideBarContent>
            <div className="h-[40px]">Dashboard</div>
            <div className="h-[40px]">Seetings</div>
            <div className="h-[40px]">Create</div>
            <div className="h-[40px]">Measure</div>
          </SideBarContent>
          <SideBarFooter>Footer</SideBarFooter>
        </Sidebar>
        <button className="p-2 border rounded-lg h-fit mt-3 mr-3" onClick={() => setIsOpen(true)}>
          Click me
        </button>
      </div>
    );
  }
};
