import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}
function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-auto scrollbar-style">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead data-testid="table-header" className={className} {...props} />;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody data-testid="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
function TableRow({ className, ...props }: TableRowProps) {
  return <tr data-testid="table-row" className={className} {...props} />;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {}
function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-testid="table-head"
      className={cn('h-12 text-left align-middle text-xs font-semibold text-tertiary px-2', className)}
      {...props}
    />
  );
}

export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}
function TableCell({ className, ...props }: TableCellProps) {
  return <td data-testid="table-cell" className={cn('px-2 py-3 align-middle font-normal text-sm text-tertiary', className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableCell, TableHead };
