import React from 'react';
import { StoryObj } from '@storybook/react';
import { TextField } from './text-field';
import { SearchIcon } from '@stash-ui/light-icons';

const meta = {
  title: 'Components/TextField',
  component: TextField,
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
    label: 'TextField',
    placeholder: 'Placeholder',
    error: 'Error',
    required: true,
    helperText: 'Helper text',
    prefix: <SearchIcon />
  }
};
