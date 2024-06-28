import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'Receita: Valor total de monetização do canal. Consideramos os valores de assinaturas',
    side: 'right',
  },
};

export const Right: Story = {
  args: {
    children: 'Tooltip right ',
    side: 'right',
  },
};

export const Left: Story = {
  args: {
    children: 'Tooltip left ',
    side: 'left',
  },
};

export const Top: Story = {
  args: {
    children: 'Tooltip top ',
    side: 'top',
  },
};

export const Bottom: Story = {
  args: {
    children: 'Tooltip bottom ',
    side: 'bottom',
  },
};
