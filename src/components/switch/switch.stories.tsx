import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'Controls the checked state of the switch',
      control: 'boolean',
      value: false
    },
    disabled: {
      description: 'Determines if the switch is disabled',
      control: 'boolean',
      value: false
    },
    highlight: {
      description: 'Applies a highlight style to the switch',
      control: 'boolean',
      value: false
    },
    onChange: {
      description: 'Callback function triggered when the switch state changes',
      control: false
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {}
};

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const Highlight: Story = {
  args: { highlight: true, checked: true }
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true
  }
};
