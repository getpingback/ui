import { StoryObj } from '@storybook/react';
import { TextField } from './text-field';

const meta = {
  title: 'TextField',
  component: TextField,
  argTypes: {
    label: {
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'TextField'
  }
};
