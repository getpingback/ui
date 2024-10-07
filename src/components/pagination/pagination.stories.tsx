import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserCheckIcon } from '@stash-ui/regular-icons';
import { Pagination } from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Pagination totalPages={10} page={2} />
    </div>
  ),
};
