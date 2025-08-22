import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  CommandK,
  CommandKInput,
  CommandKList,
  CommandKEmpty,
  CommandKGroup,
  CommandKItem,
  CommandKShortcut,
  CommandKSeparator
} from './command-cmdk';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
const meta = {
  title: 'Components/CommandK',
  component: CommandK,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof CommandK>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Command</button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-0" align="center">
          <CommandK>
            <CommandKInput placeholder="Search language..." />
            <CommandKEmpty>not found</CommandKEmpty>
            <CommandKList>
              <CommandKGroup heading="Fruits">
                <CommandKItem value="apple" onSelect={() => console.log('apple')}>
                  Apple
                  <CommandKShortcut className="ml-auto">⌘K</CommandKShortcut>
                </CommandKItem>
                <CommandKItem value="apple2" onSelect={() => console.log('apple2')}>
                  Apple2
                  <CommandKShortcut className="ml-auto">⌘K</CommandKShortcut>
                </CommandKItem>
                <CommandKItem value="orange" onSelect={() => console.log('orange')}>
                  Orange
                </CommandKItem>
                <CommandKSeparator />
                <CommandKItem value="pear" onSelect={() => console.log('pear')}>
                  Pear
                </CommandKItem>
                <CommandKItem value="blueberry" onSelect={() => console.log('blueberry')}>
                  Blueberry
                </CommandKItem>
                <CommandKItem value="fish" onSelect={() => console.log('fish')}>
                  Fish
                </CommandKItem>
              </CommandKGroup>
            </CommandKList>
          </CommandK>
        </PopoverContent>
      </Popover>
    </div>
  )
};
