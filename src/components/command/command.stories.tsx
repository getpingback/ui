import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command';

import { Popover, PopoverContent, PopoverTrigger } from '../popover';
const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Command</button>
        </PopoverTrigger>
        <PopoverContent className='w-[600px] p-0'>
          <Command>
            <CommandInput placeholder='Search language...' />
            <CommandList>
              <CommandGroup heading='Fruits'>
                <CommandItem>
                  Apple
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Apple2
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Apple3
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Apple4
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>

                <CommandItem>
                  Apple5
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Apple6
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>

                <CommandItem>Orange</CommandItem>
                <CommandSeparator />
                <CommandItem>Pear</CommandItem>
                <CommandItem>Blueberry</CommandItem>
              </CommandGroup>
              <CommandItem>Fish</CommandItem>
            </CommandList>
            <CommandItem className='border-t border-[#71717A14]'>
              <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
            </CommandItem>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
