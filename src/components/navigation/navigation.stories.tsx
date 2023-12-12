import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserCheckIcon } from '@stash-ui/regular-icons';
import {
  NavigationTrigger,
  NavigationLink,
  NavigationItem,
  NavigationSubItem,
  NavigationList,
} from './navigation';

const meta = {
  title: 'Components/Navigation',
  component: NavigationList,

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof NavigationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <NavigationList>
        <NavigationItem> NavigationItem </NavigationItem>
        <NavigationItem variant='disabled'>
          NavigationItem Disabled
        </NavigationItem>
        <NavigationLink>
          {<UserCheckIcon width={24} height={24} style={{ paddingRight: 5 }} />}
          NavigationLink{' '}
        </NavigationLink>
        <NavigationTrigger
          items={[
            { label: 'Account', href: '/account' },
            { label: 'Profile', href: '/profile' },
            { label: 'Notifications', href: '/notifications' },
          ]}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {
              <UserCheckIcon
                width={24}
                height={24}
                style={{ paddingRight: 5 }}
              />
            }
            Settings
          </div>
        </NavigationTrigger>
        <NavigationTrigger items={[{ label: 'Products', href: '/products' }]}>
          Store
        </NavigationTrigger>
        <NavigationTrigger
          items={[
            { label: 'Product', href: '/product/create' },
            { label: 'Category', href: '/category/create' },
          ]}
        >
          Create
        </NavigationTrigger>
      </NavigationList>
    </div>
  ),
};

export const Item: Story = {
  render: () => <NavigationItem> NavigationItem </NavigationItem>,
};
export const ItemHighlighted: Story = {
  render: () => (
    <NavigationItem variant='highlighted'>
      NavigationItem Highlighted
    </NavigationItem>
  ),
};

export const SubItem: Story = {
  render: () => (
    <>
      <NavigationSubItem position='first' href='/first'>
        NavigationItem
      </NavigationSubItem>
      <NavigationSubItem position='middle' href='/middle'>
        NavigationItem
      </NavigationSubItem>
      <NavigationSubItem position='last' href='/last'>
        NavigationItem
      </NavigationSubItem>
    </>
  ),
};

export const Link: Story = {
  render: () => (
    <NavigationLink href='www.pingback.com' target='__blank'>
      {' '}
      NavigationLink{' '}
    </NavigationLink>
  ),
};

export const LinkHighlighted: Story = {
  render: () => (
    <NavigationLink variant='highlighted'>
      NavigationLink Highlighted
    </NavigationLink>
  ),
};

export const Trigger: Story = {
  render: () => (
    <NavigationTrigger
      items={[
        { label: 'Account', href: '/account' },
        { label: 'Profile', href: '/profile' },
        { label: 'Notifications', href: '/notifications' },
      ]}
      onClickItem={(item) => console.log(item)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {<UserCheckIcon width={24} height={24} style={{ paddingRight: 5 }} />}
        Settings
      </div>
    </NavigationTrigger>
  ),
};
