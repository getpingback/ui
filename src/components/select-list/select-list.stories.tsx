import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SelectList, SelectItem } from './select-list';
import { Badge } from '../badge';
import { UserAvatarIcon, ChevronRightIcon } from '@stash-ui/light-icons';

const meta = {
  title: 'SelectList',
  component: SelectList,
  tags: ['autodocs'],
  subcomponents: {
    SelectItem: SelectItem as React.ComponentType<unknown>
  }
} satisfies Meta<typeof SelectList>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    type: 'single',
    defaultValue: '1',
    children: (
      <>
        <SelectItem
          value="1"
          description="lorem ipsum dolor sit amet"
          tag={<Badge type="green">Teste</Badge>}
          prefix={<UserAvatarIcon width={24} height={24} />}
          suffix={<ChevronRightIcon width={24} height={24} />}
          label="Titulo 1"
        />
        <SelectItem
          value="2"
          description="lorem ipsum dolor sit amet"
          tag={<Badge type="green">Teste</Badge>}
          prefix={<UserAvatarIcon width={24} height={24} />}
          suffix={<ChevronRightIcon width={24} height={24} />}
          label="Titulo 2"
        />
        <SelectItem
          value="3"
          prefix={<UserAvatarIcon width={24} height={24} />}
          suffix={<ChevronRightIcon width={24} height={24} />}
          label="Titulo 3"
        />
      </>
    )
  }
};
