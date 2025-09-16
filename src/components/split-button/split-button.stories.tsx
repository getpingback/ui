import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton } from './split-button';
import { TrashCanIcon, PlusIcon } from '@stash-ui/light-icons';
import { HeartIcon } from '@stash-ui/regular-icons';

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {}
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    prefixIcon: <HeartIcon />,
    variant: 'primary',
    label: 'Button label',
    onPrefixClick: () => console.log('prefix click'),
    menuItems: [
      {
        key: 'add',
        icon: <PlusIcon />,
        text: 'Add',
        onClick: () => console.log('add')
      },
      {
        key: 'delete',
        icon: <TrashCanIcon />,
        text: 'Delete',
        onClick: () => console.log('delete')
      }
    ]
  }
};
