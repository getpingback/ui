import React, { useState } from 'react';
import { Button } from '../button/button';
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
  args: { children: null, value: [], onValueChange: () => {} },
  render: () => {
    const [value, setValue] = useState<string[]>(['crm']);

    return (
      <div className="flex flex-col gap-4">
        <CheckboxGroup value={value} onValueChange={setValue}>
          <CheckboxItem label="Option 1" id="opt-1" value="crm" />
          <CheckboxItem label="Option 2" id="opt-2" value="marketing" />
          <CheckboxItem label="Option 3" id="opt-3" value="sales" disabled />
        </CheckboxGroup>
      </div>
    );
  }
};

export const Highlight: Story = {
  args: { children: null, value: [], onValueChange: () => {} },
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <CheckboxGroup value={value} onValueChange={setValue} variant="highlight">
        <CheckboxItem label="Option 1" id="opt-1" value="crm" defaultChecked />
        <CheckboxItem label="Option 2" id="opt-2" value="marketing" />
        <CheckboxItem label="Option 3" id="opt-3" value="sales" disabled />
      </CheckboxGroup>
    );
  }
};
