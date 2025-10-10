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
        items: [
          {
            key: 'add',
            icon: <PlusIcon />,
            label: 'Add',
            onClick: () => console.log('add')
          }
        ]
      },
      {
        items: [
          {
            key: 'delete',
            icon: <TrashCanIcon />,
            label: 'Delete',
            onClick: () => console.log('delete')
          }
        ]
      },
      {
        items: [
          {
            key: 'delete',
            icon: <TrashCanIcon />,
            label: 'Delete',
            onClick: () => console.log('delete')
          }
        ]
      }
    ]
  }
};

export const WithTitle: Story = {
  args: {
    prefixIcon: <HeartIcon />,
    variant: 'primary',
    label: 'Button label',
    onPrefixClick: () => console.log('prefix click'),
    menuItems: [
      {
        title: 'Actions',
        items: [{ key: 'add', icon: <PlusIcon />, label: 'Add', onClick: () => console.log('add') }]
      }
    ]
  }
};
