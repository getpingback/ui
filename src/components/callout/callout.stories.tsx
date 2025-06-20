import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

const title = "Big news! We're excited to announce a brand new product.";
const description = 'Enjoy this new feature, click here to know more.';

export const Default: Story = {
  args: {
    title,
    description
  }
};

export const Info: Story = {
  args: {
    title,
    description,
    variant: 'info'
  }
};

export const Primary: Story = {
  args: {
    title,
    description,
    variant: 'primary'
  }
};

export const Success: Story = {
  args: {
    title,
    description,
    variant: 'success'
  }
};

export const Warning: Story = {
  args: {
    title,
    description,
    variant: 'warning'
  }
};

export const Error: Story = {
  args: {
    title,
    description,
    variant: 'error'
  }
};
