import React, { useState } from 'react';
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

export const OutsideList: Story = {
  args: { children: null, value: [], onValueChange: () => {} },
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <CheckboxGroup value={value} onValueChange={setValue} variant="outsideList">
        <CheckboxItem label="Option 1" id="opt-1" value="crm" />
      </CheckboxGroup>
    );
  }
};

export const CheckedItem: Story = {
  args: { children: null, value: [], onValueChange: () => {} },
  render: () => <CheckboxItem label="Option 1" id="opt-1" value="crm" checked />
};
