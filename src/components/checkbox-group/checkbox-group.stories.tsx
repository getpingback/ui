import React, { useState, useEffect } from 'react';
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
  args: { children: null },
  render: () => {
    const [value, setValue] = useState<string[]>(['crm']);
    const [shouldUnselectAll, setShouldUnselectAll] = useState(false);
    const [shouldSelectAll, setShouldSelectAll] = useState(false);

    const handleClear = () => {
      setShouldUnselectAll(true);
      setShouldSelectAll(false);
    };

    const handleSelectAll = () => {
      setShouldSelectAll(true);
      setShouldUnselectAll(false);
    };

    useEffect(() => {
      if (shouldUnselectAll || shouldSelectAll) {
        const timer = setTimeout(() => {
          setShouldUnselectAll(false);
          setShouldSelectAll(false);
        }, 0);
        return () => clearTimeout(timer);
      }
    }, [shouldUnselectAll, shouldSelectAll]);

    return (
      <div className="flex flex-col gap-4">
        <CheckboxGroup
          unselectAll={shouldUnselectAll}
          selectAll={shouldSelectAll}
          defaultValue={value}
          onValueChange={(newValue) => setValue(newValue)}
        >
          <CheckboxItem label="Option 1" id="opt-1" value="crm" />
          <CheckboxItem label="Option 2" id="opt-2" value="marketing" />
          <CheckboxItem label="Option 3" id="opt-3" value="sales" disabled />
        </CheckboxGroup>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outline" onClick={handleSelectAll}>
            Select All
          </Button>
        </div>
      </div>
    );
  }
};

export const Highlight: Story = {
  args: { children: null },
  render: () => (
    <CheckboxGroup onValueChange={(value) => console.log(value)} defaultValue={['crm']} variant="highlight">
      <CheckboxItem label="Option 1" id="opt-1" value="crm" />
      <CheckboxItem label="Option 2" id="opt-2" value="marketing" />
      <CheckboxItem label="Option 3" id="opt-3" value="sales" disabled />
    </CheckboxGroup>
  )
};
