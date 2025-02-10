import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './color-picker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    color: '#000000',
    saveText: 'Save',
    cancelText: 'Cancel'
  },
  render: ({ color: defaultColor, ...args }) => {
    const [color, setColor] = useState(defaultColor);

    return <ColorPicker {...args} color={color} onChange={setColor} />;
  }
};
