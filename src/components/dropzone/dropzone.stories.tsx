import type { Meta, StoryObj } from '@storybook/react';
import { Dropzone } from './dropzone';
import { on } from 'events';

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,

  tags: ['autodocs'],

  argTypes: {
    isLoading: {
      description: 'Controls the loading state of the dropzone',
      control: 'boolean',
      value: false
    },
    accept: {
      description: 'Controls the accept type of the dropzone',
      control: 'text',
      value: 'image/*'
    },
    messages: {
      description: 'Controls the messages of the dropzone',
      control: 'object',
      value: {
        title: 'Drag and drop your image here, or browse',
        description: 'PNG, JPG, JPEG and GIF, max 5 MB size limit.',
        primaryButton: 'Change',
        removeButton: 'Remove'
      }
    }
  }
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (file) => console.log(file),
    accept: '*/*',
    messages: {
      title: 'Drag and drop your image here, or browse',
      description: 'Files with max 5 MB size limit.',
      primaryButton: 'Change',
      removeButton: 'Remove'
    }
  }
};

export const ImageUploaded: Story = {
  args: {
    uploadedFile: {
      name: 'image.png',
      size: 123456,
      src: 'https://picsum.photos/200',
      type: 'image/png'
    },
    messages: {
      title: 'Drag and drop your image here, or browse',
      description: 'PNG, JPG, JPEG and GIF, max 5 MB size limit.',
      primaryButton: 'Change',
      removeButton: 'Remove'
    },
    onChange: (file) => console.log(file)
  }
};

export const Loading: Story = {
  args: {
    isLoading: true,
    messages: {
      title: 'Drag and drop your image here, or browse',
      description: 'PNG, JPG, JPEG and GIF, max 5 MB size limit.',
      primaryButton: 'Change',
      removeButton: 'Remove'
    }
  }
};
