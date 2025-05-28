import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import { Accordion } from '../accordion';

import { Stepper, Step } from './stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'fullscreen'
  },

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <div className="w-full h-full flex items-center justify-center p-10">
      <Stepper>
        <Step
          label="Registro DNS"
          description="Add your registered domain name below"
          stepName="Step 1"
          status="completed"
          rightElement={<Button>Add</Button>}
        >
          <div className="flex flex-col gap-2">
            <Accordion label="Add your registered domain name below">Content example</Accordion>
            <Accordion label="Add your registered domain name below">Content example</Accordion>
            <Accordion label="Add your registered domain name below">Content example</Accordion>
            <Accordion label="Add your registered domain name below">Content example</Accordion>
          </div>
        </Step>
        <Step label="Registro DNS" description="Add your registered domain name below" stepName="Step 2" status="completed">
          Content example
        </Step>
        <Step
          label="Registro DNS"
          description="Add your registered domain name below"
          stepName="Step 2"
          status="current"
          rightElement={<Button>Logar com a Cloudflare</Button>}
        >
          Content example
        </Step>
        <Step label="Registro DNS" description="Add your registered domain name below" stepName="Step 2" status="pending">
          <div className="flex flex-col gap-2">
            <Accordion label="Add your registered domain name below">Content example</Accordion>
            <Accordion label="Add your registered domain name below">Content example</Accordion>
          </div>
        </Step>
      </Stepper>
    </div>
  )
};

export const OnlyOne: Story = {
  args: { children: null },
  render: () => (
    <div className="w-full h-full flex items-center justify-center p-10">
      <Stepper>
        <Step
          label="Registro DNS"
          description="Add your registered domain name below"
          stepName="Step 1"
          status="current"
          rightElement={<Button>Add</Button>}
        >
          <div className="flex flex-col gap-2">
            <Accordion label="Add your registered domain name below">Content example</Accordion>
          </div>
        </Step>
      </Stepper>
    </div>
  )
};
