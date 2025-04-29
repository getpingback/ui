import React from 'react';

import Carousel from './carousel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    settings: {
      control: 'object',
      description: 'Configurações do carousel',
      defaultValue: {
        itemWidth: 224,
        spaceBetween: 24,
        hideNavigationButtons: false
      },
      table: {
        type: {
          summary: '{ itemWidth?: number; spaceBetween?: number; hideNavigationButtons?: boolean; }'
        },
        defaultValue: {
          summary: JSON.stringify({
            itemWidth: 224,
            spaceBetween: 24,
            hideNavigationButtons: false
          })
        }
      }
    }
  }
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const Card = ({ color, number }: { color: string; number: number }) => (
  <div className={`w-full h-56 rounded-xl ${color} flex items-center justify-center text-white text-2xl`}>{number}</div>
);

export const Default: Story = {
  args: {
    settings: {
      itemWidth: 224,
      spaceBetween: 24,
      hideNavigationButtons: false
    }
  },
  render: (args) => (
    <Carousel {...args}>
      <Card color="bg-red-500" number={1} />
      <Card color="bg-blue-500" number={2} />
      <Card color="bg-green-500" number={3} />
      <Card color="bg-yellow-500" number={4} />
      <Card color="bg-purple-500" number={5} />
      <Card color="bg-red-500" number={6} />
      <Card color="bg-blue-500" number={7} />
      <Card color="bg-green-500" number={8} />
    </Carousel>
  )
};
