import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {}
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => console.log('Switch toggled:')
  }
};

export const Highlight: Story = {
  args: { highlight: true, checked: true }
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: () => console.log('Switch toggled:')
  }
};
