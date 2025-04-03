import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxGroup, CheckboxItem } from './checkbox-group';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs']
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['crm']}>
      <CheckboxItem label="Option 1" id="opt-1" value="crm" />
      <CheckboxItem label="Option 2" id="opt-2" value="marketing" />
      <CheckboxItem label="Option 3" id="opt-3" value="sales" disabled />
    </CheckboxGroup>
  )
};

export const Highlight: Story = {
  render: () => (
    <CheckboxGroup onValueChange={(value) => console.log(value)} defaultValue={['crm']} variant="highlight">
      <CheckboxItem label="Option 1" id="opt-1" value="crm" />
      <CheckboxItem label="Option 2" id="opt-2" value="marketing" />
      <CheckboxItem label="Option 3" id="opt-3" value="sales" disabled />
    </CheckboxGroup>
  )
};
