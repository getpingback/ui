import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { VariableInput } from './variable-input';

const meta = {
  title: 'Components/VariableInput',
  component: VariableInput,
  parameters: {},

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof VariableInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  {
    heading: 'Common Variables',
    items: [
      { label: 'Email', value: 'email' },
      { label: 'Name', value: 'name' },
      { label: 'Phone', value: 'phone' }
    ]
  },
  {
    heading: 'Custom Variables',
    items: [
      { label: 'Custom Variable', value: 'customVariable' },
      { label: 'Custom Variable 2', value: 'customVariable2' },
      { label: 'Custom Variable 3', value: 'customVariable3' },
      { label: 'Custom Variable 4', value: 'customVariable4' },
      { label: 'Custom Variable 5', value: 'customVariable5' }
    ]
  }
];

export const Default: Story = {
  args: {
    options,
    onVariablesEndReached: () => console.log('End Reached')
  }
};

export const WithInputProps: Story = {
  args: {
    label: 'URL',
    placeholder: 'https://www.example.com',
    helperText: 'Enter the URL of the page you want to redirect to',
    options
  }
};

export const WithInitialContent: Story = {
  args: {
    label: 'Expression',
    placeholder: 'Enter the expression',
    initialContent: 'Hello {{name}}! How are you?',
    options
  }
};
