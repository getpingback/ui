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
        <Toaster position="top-center" richColors />
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Toaster>;

export default meta;

const ToastDemo = ({
  title,
  description,
  variant,
  action
}: {
  title: string;
  description: string;
  variant: 'success' | 'error' | 'warning';
  action?: { label: string; onClick: () => void };
}) => {
  const showToast = () => {
    const options = { description, action };
    if (variant === 'success') {
      toast.success(title, options);
    } else if (variant === 'error') {
      toast.error(title, options);
    } else if (variant === 'warning') {
      toast.warning(title, options);
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
  render: () => <ToastDemo title="Copied successfully" description="Text copied to clipboard" variant="success" />
};

export const ToastError: Story = {
  render: () => <ToastDemo title="Error to copy text" description="Please try again" variant="error" />
};

export const ToastWarning: Story = {
  render: () => <ToastDemo title="Warning" description="Please try again" variant="warning" />
};
