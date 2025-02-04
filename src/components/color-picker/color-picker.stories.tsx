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
    onChange: (color: string) => console.log('Color changed:', color)
  },
  render: ({ color: defaultColor }) => {
    const [color, setColor] = useState(defaultColor);

    return <ColorPicker color={color} onChange={setColor} />;
  }
};

export const WithInitialColor: Story = {
  args: {
    color: '#FF0000',
    onChange: (color: string) => console.log('Color changed:', color)
  }
};
