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
          <CheckboxItem id="opt-1" value="crm">
            Option 1
          </CheckboxItem>
          <CheckboxItem id="opt-2" value="marketing">
            Option 2
          </CheckboxItem>
          <CheckboxItem id="opt-3" value="sales" disabled>
            Option 3
          </CheckboxItem>
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
        <CheckboxItem id="opt-1" value="crm">
          Option 1
        </CheckboxItem>
      </CheckboxGroup>
    );
  }
};

export const CheckedItem: Story = {
  args: { children: null, value: [], onValueChange: () => {} },
  render: () => (
    <CheckboxItem id="opt-1" value="crm" checked>
      Option 1
    </CheckboxItem>
  )
};
