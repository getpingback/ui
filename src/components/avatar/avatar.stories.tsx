import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: 'https://res.cloudinary.com/pingback/image/upload/q_60,c_thumb/imgs/user/193752/gallery/h2erjr6lfzkbmy7rnai2'
  }
};
export const ImageMedium: Story = {
  args: {
    imageUrl: 'https://res.cloudinary.com/pingback/image/upload/q_60,c_thumb/imgs/user/193752/gallery/h2erjr6lfzkbmy7rnai2',
    size: 'medium'
  }
};

export const ImageSmall: Story = {
  args: {
    imageUrl: 'https://res.cloudinary.com/pingback/image/upload/q_60,c_thumb/imgs/user/193752/gallery/h2erjr6lfzkbmy7rnai2',
    size: 'small'
  }
};

export const FallbackDefault: Story = {
  args: {
    fallback: 'J',
    type: 'purple'
  }
};

export const FallbackMedium: Story = {
  args: {
    fallback: 'J',
    type: 'purple',
    size: 'medium'
  }
};

export const FallbackSmall: Story = {
  args: {
    fallback: 'J',
    type: 'purple',
    size: 'small'
  }
};

export const FallbackWithoutBorder: Story = {
  args: {
    fallback: 'J',
    type: 'purple',
    borderSize: 'none'
  }
};
