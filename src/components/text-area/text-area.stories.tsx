import React from 'react';
import { StoryObj } from '@storybook/react';
import { TextArea } from './text-area';
import { SearchIcon } from '@stash-ui/light-icons';
const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text'
    },
    error: {
      control: 'text'
    },
    helperText: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    disabled: false,
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Placeholder',
    disabled: true
  }
};

export const Error: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Placeholder',
    error: 'Error',
    helperText: 'Helper text',
    disabled: false
  }
};
