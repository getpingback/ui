import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {}
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Open</TableHead>
            <TableHead>Click</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-[499px] font-semibold text-secondary">
              Algoritmos como uma fábrica de bolos parte 1 - Como fazer um bolo?
            </TableCell>
            <TableCell className="opacity-[.65]">35%</TableCell>
            <TableCell className="opacity-[.65]">100%</TableCell>
            <TableCell className="opacity-[.65]">22/06</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[499px] font-semibold text-secondary">
              Algoritmos como uma fábrica de bolos parte 2 - Como fazer um bolo?
            </TableCell>
            <TableCell className="opacity-[.65]">35%</TableCell>
            <TableCell className="opacity-[.65]">100%</TableCell>
            <TableCell className="opacity-[.65]">22/06</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[499px] font-semibold text-secondary">
              Algoritmos como uma fábrica de bolos parte 3 - Como fazer um bolo?
            </TableCell>
            <TableCell className="opacity-[.65]">35%</TableCell>
            <TableCell className="opacity-[.65]">100%</TableCell>
            <TableCell className="opacity-[.65]">22/06</TableCell>
          </TableRow>
        </TableBody>
      </>
    )
  }
};
