import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LifeRingIcon,
  UserCheckIcon,
  SlidersVIcon,
  SignoutAltIcon,
  GlobeIcon,
} from '@stash-ui/regular-icons';
import { MenuDivider, MenuItem, MenuTitle, MenuSubItem, Menu } from './menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuTitle>Channel</MenuTitle>
        <MenuItem icon={<UserCheckIcon />}>Edit my profile</MenuItem>
        <MenuDivider />
        <MenuItem icon={<SlidersVIcon />}>Settings</MenuItem>
        <MenuItem icon={<LifeRingIcon />}>Help</MenuItem>
        <MenuItem icon={<SignoutAltIcon />}>Logout</MenuItem>
        <MenuSubItem value='1' icon={<GlobeIcon />} label='Idiom'>
          <MenuItem>English</MenuItem>
          <MenuItem>French</MenuItem>
          <MenuItem>Spanish</MenuItem>
        </MenuSubItem>
      </>
    ),
    subHeight: 390,
    className: 'w-[500px]',
  },
};
