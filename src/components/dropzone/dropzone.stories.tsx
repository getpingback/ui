import type { Meta, StoryObj } from '@storybook/react';
import { Dropzone } from './dropzone';
import { on } from 'events';

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ImageUploaded: Story = {
  args: {
    uploadedFile: {
      name: 'image.png',
      size: 123456,
      src: 'https://picsum.photos/200',
    },
    onChange: (file) => console.log(file),
  },
};
