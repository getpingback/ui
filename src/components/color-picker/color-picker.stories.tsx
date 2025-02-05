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
    opacity: 1,
    saveText: 'Save',
    cancelText: 'Cancel'
  },
  render: ({ color: defaultColor, opacity: defaultOpacity, ...args }) => {
    const [color, setColor] = useState(defaultColor);
    const [opacity, setOpacity] = useState(defaultOpacity);

    return <ColorPicker {...args} color={color} onChange={setColor} opacity={opacity} onChangeOpacity={setOpacity} />;
  }
};
