import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Toaster, toast } from './toast';

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px' }}>
        <Story />
        <Toaster position="top-center" />
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Toaster>;

export default meta;

const ToastDemo = ({ message, variant }: { message: string; variant: 'success' | 'error' }) => {
  const showToast = () => {
    if (variant === 'success') {
      toast.success(message);
    } else if (variant === 'error') {
      toast.error(message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button variant="outline" onClick={showToast}>
        {`Show toast ${variant}`}
      </Button>
    </div>
  );
};

type Story = StoryObj<typeof ToastDemo>;

export const ToastSuccess: Story = {
  render: () => <ToastDemo message="Copied successfully" variant="success" />
};

export const ToastError: Story = {
  render: () => <ToastDemo message="Error to copy text" variant="error" />
};
