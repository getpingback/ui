import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon, HeartIcon } from '@stash-ui/regular-icons';

import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button'
  }
};

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'primary'
  }
};

export const Solid: Story = {
  args: {
    children: 'Button',
    variant: 'solid'
  }
};

export const Danger: Story = {
  args: {
    children: 'Button',
    variant: 'danger'
  }
};

export const DisabledSolid: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    disabled: true
  }
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline'
  }
};
export const DisabledOutline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    disabled: true
  }
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost'
  }
};
export const DisabledGhost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    disabled: true
  }
};

export const Clear: Story = {
  args: {
    children: 'Button',
    variant: 'clear'
  }
};
export const DisabledClear: Story = {
  args: {
    children: 'Button',
    variant: 'clear',
    disabled: true
  }
};

export const Rounded: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'sm',
    rounded: 'full'
  }
};

export const WithPrefix: Story = {
  args: {
    children: 'Button',
    width: 'full',
    prefix: <HeartIcon data-testid="heart-icon" />
  }
};
export const WithSuffix: Story = {
  args: {
    children: 'Button',
    suffix: <PlusIcon data-testid="plus-icon" />
  }
};

export const FullWidth: Story = {
  args: {
    children: 'Button',
    width: 'full',
    onClick: () => console.log('clicked')
  }
};

export const SolidLoading: Story = {
  args: {
    children: 'Button',
    isLoading: true,
    variant: 'solid'
  }
};
export const GhostLoading: Story = {
  args: {
    children: 'Button',
    isLoading: true,
    variant: 'ghost'
  }
};
