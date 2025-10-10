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
  CommandKSeparator,
  CommandKFooter
} from './command-cmdk';
import { Modal } from '../modal';

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
      <Modal open className="!p-0 lg:!rounded-2xl !rounded-t-2xl">
        <CommandK>
          <CommandKInput placeholder="Search language..." />
          <CommandKEmpty>not found</CommandKEmpty>
          <CommandKList>
            <CommandKGroup heading="Fruits">
              <CommandKItem value="apple" onSelect={() => console.log('apple')}>
                Apple
                <div className="flex gap-1">
                  <CommandKShortcut>⌘</CommandKShortcut>
                  <CommandKShortcut>K</CommandKShortcut>
                </div>
              </CommandKItem>
              <CommandKItem value="apple2" onSelect={() => console.log('apple2')}>
                Apple2
                <div className="ml-auto flex gap-1">
                  <CommandKShortcut>⌘</CommandKShortcut>
                  <CommandKShortcut>K</CommandKShortcut>
                </div>
              </CommandKItem>
              <CommandKItem value="orange" onSelect={() => console.log('orange')}>
                Orange
              </CommandKItem>

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
          <CommandKSeparator />
          <CommandKFooter>
            <span>Open Command</span>
            <span>⌘K</span>
          </CommandKFooter>
        </CommandK>
      </Modal>
    </div>
  )
};
