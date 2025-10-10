import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Modal, ModalClose, ModalTitle } from './modal';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 300
      }
    }
  }
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    children: (
      <>
        <ModalClose />
        <ModalTitle>Modal</ModalTitle>
        <span className="text-sm text-tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
      </>
    )
  }
};

export const Behavior: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)} variant="solid">
          Open Modal
        </Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <ModalClose />
          <ModalTitle>Modal</ModalTitle>
          <span className="text-sm text-tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
        </Modal>
      </>
    );
  }
};
