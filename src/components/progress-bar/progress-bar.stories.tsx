import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar, ProgressLabel, Progress } from './progress-bar';
import { Typography } from '../typography';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({}) => (
    <Progress className="w-full flex-col gap-3">
      <ProgressLabel className="w-full flex justify-between">
        <Typography size="xsmall" type="tertiary">
          Automations
        </Typography>
        60%
      </ProgressLabel>
      <ProgressBar percent={60} showAnimation={true} color="orange" />
    </Progress>
  )
};
