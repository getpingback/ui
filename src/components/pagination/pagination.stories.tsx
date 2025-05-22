import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    totalPages: 10,
    page: 1,
    onPageChange: (page) => console.log(page)
  },
  render: (args) => <Pagination {...args} />
};

export const Radius: Story = {
  args: {
    totalPages: 10,
    page: 1,
    onPageChange: (page) => console.log(page),
    round: true
  },
  render: (args) => <Pagination {...args} />
};
