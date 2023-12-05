import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsTrigger, TabsList, TabsContent } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'all',
    className: 'w-[440px]',
    children: (
      <>
        <TabsList className='w-full'>
          <TabsTrigger value='all'>Tudo</TabsTrigger>
          <TabsTrigger value='today'>Hoje</TabsTrigger>
          <TabsTrigger value='week'>Semanal</TabsTrigger>
          <TabsTrigger value='month'>Mensal</TabsTrigger>
          <TabsTrigger value='year'>Anual</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>Tab 1</TabsContent>
        <TabsContent value='today'>Tab 2</TabsContent>
        <TabsContent value='week'>Tab 3</TabsContent>
        <TabsContent value='month'>Tab 4</TabsContent>
        <TabsContent value='year'>Tab 5</TabsContent>
      </>
    ),
  },
};
