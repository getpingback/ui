import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Command,
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
            <CommandEmpty>not found</CommandEmpty>
            <CommandList>
              <CommandGroup heading='Fruits'>
                <CommandItem
                  value='apple'
                  onSelect={() => console.log('apple')}
                >
                  Apple
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem
                  value='apple2'
                  onSelect={() => console.log('apple2')}
                >
                  Apple2
                  <CommandShortcut className='ml-auto'>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem
                  value='orange'
                  onSelect={() => console.log('orange')}
                >
                  Orange
                </CommandItem>
                <CommandSeparator />
                <CommandItem value='pear' onSelect={() => console.log('pear')}>
                  Pear
                </CommandItem>
                <CommandItem
                  value='blueberry'
                  onSelect={() => console.log('blueberry')}
                >
                  Blueberry
                </CommandItem>
                <CommandItem value='fish' onSelect={() => console.log('fish')}>
                  Fish
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
