import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LifeRingIcon,
  UserCheckIcon,
  SlidersVIcon,
  SignoutAltIcon,
} from '@stash-ui/regular-icons';
import {
  Dropdown,
  DropdownItem,
  DropdownRadioItem,
  DropdownDivider,
} from './dropdown';

const meta = {
  title: 'Components/DropdownMenu',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className='w-[200px] py-2'>
        <DropdownItem>
          <UserCheckIcon className='mr-2' />
          Edit my profile
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem>
          <SlidersVIcon className='mr-2' />
          Settings
        </DropdownItem>
        <DropdownItem>
          <LifeRingIcon className='mr-2' />
          Help
        </DropdownItem>
        <DropdownItem>
          <SignoutAltIcon className='mr-2' />
          Logout
        </DropdownItem>
      </div>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
  },
};

export const Left: Story = {
  args: {
    children: (
      <div className='w-[200px] py-2'>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
      </div>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
    side: 'left',
  },
};

export const Right: Story = {
  args: {
    children: (
      <div className='w-[200px] py-2'>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
      </div>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
    side: 'right',
  },
};

export const Bottom: Story = {
  args: {
    children: (
      <div className='w-[200px] py-2'>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
      </div>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
    side: 'bottom',
  },
};

export const Radio: Story = {
  args: {
    children: (
      <div className='w-[200px] py-2'>
        <DropdownRadioItem isChecked> Show All </DropdownRadioItem>
        <DropdownRadioItem isChecked={false}> Dark mode </DropdownRadioItem>
      </div>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
  },
};
