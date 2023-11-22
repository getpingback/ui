import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LifeRingIcon,
  UserCheckIcon,
  SlidersVIcon,
  SignoutAltIcon,
  GlobeIcon,
} from '@stash-ui/regular-icons';
import {
  Dropdown,
  DropdownItem,
  DropdownRadioItem,
  DropdownDivider,
  DropdownSub,
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
      <>
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
      </>
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
      <>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
      </>
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
      <>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
      </>
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
      <>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
      </>
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
      <>
        <DropdownRadioItem isChecked> Show All </DropdownRadioItem>
        <DropdownRadioItem isChecked={false}> Dark mode </DropdownRadioItem>
      </>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
  },
};

export const Sub: Story = {
  args: {
    children: (
      <>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem>Settings </DropdownItem>
        <DropdownItem>Help </DropdownItem>
        <DropdownItem>Logout </DropdownItem>
        <DropdownSub label='Manage' value='1' icon={<SlidersVIcon />}>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Members</DropdownItem>
        </DropdownSub>
        <DropdownSub label='Language' value='2' icon={<GlobeIcon />}>
          <DropdownRadioItem isChecked> English </DropdownRadioItem>
          <DropdownRadioItem isChecked={false}> Portuguese </DropdownRadioItem>
        </DropdownSub>
      </>
    ),
    trigger: (
      <button className='bg-active-foreground p-2 rounded-lg text-inverse-foreground'>
        Click here
      </button>
    ),
    subHeight: 250,
  },
};
