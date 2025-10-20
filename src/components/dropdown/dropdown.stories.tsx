import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserCheckIcon, SlidersVIcon, SignoutAltIcon, GlobeIcon } from '@stash-ui/regular-icons';
import { Dropdown, DropdownItem, DropdownRadioItem } from './dropdown';

const meta = {
  title: 'Components/DropdownMenu',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownItem icon={<GlobeIcon />}>Edit my profile</DropdownItem>
        <DropdownItem icon={<SignoutAltIcon />}>Settings </DropdownItem>
        <DropdownItem icon={<SlidersVIcon />}>Help </DropdownItem>
        <DropdownItem icon={<UserCheckIcon />}>Logout </DropdownItem>
      </>
    ),
    trigger: <button className="bg-neutral p-2 rounded-lg text-inverse">Click here</button>
  }
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
    trigger: <button className="bg-neutral p-2 rounded-lg text-inverse">Click here</button>,
    side: 'left'
  }
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
    trigger: <button className="bg-neutral p-2 rounded-lg text-inverse">Click here</button>,
    side: 'right'
  }
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
    trigger: <button className="bg-neutral p-2 rounded-lg text-inverse">Click here</button>,
    side: 'bottom'
  }
};

export const Radio: Story = {
  args: {
    children: (
      <>
        <DropdownRadioItem icon={<GlobeIcon />} isChecked>
          Show All
        </DropdownRadioItem>
        <DropdownRadioItem icon={<GlobeIcon />} isChecked={false}>
          Dark mode
        </DropdownRadioItem>
      </>
    ),
    trigger: <button className="bg-neutral-foreground p-2 rounded-lg text-inverse-foreground">Click here</button>
  }
};

export const Error: Story = {
  args: {
    children: (
      <>
        <DropdownItem>Edit my profile</DropdownItem>
        <DropdownItem error>Delete account</DropdownItem>
      </>
    ),
    trigger: <button className="bg-neutral-foreground p-2 rounded-lg text-inverse">Click here</button>
  }
};
