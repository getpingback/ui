import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Pagination
      totalPages={10}
      page={2}
      onPageChange={(page) => console.log(page)}
    />
  ),
};

export const Radius: Story = {
  render: () => (
    <Pagination
      totalPages={3}
      page={1}
      onPageChange={(page) => console.log(page)}
      round
    />
  ),
};
