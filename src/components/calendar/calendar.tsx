'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/regular-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 text-primary',
        multiple_months: '[&>div>div:last-child]:border-l-[1px] [&>div>div:last-child]:border-default',
        caption: 'flex justify-between gap-2 py-2 relative items-center text-tertiary opacity-85 capitalize',
        caption_end: 'pr-3 pb-3 pl-3',
        caption_start: 'pl-3 pb-3',
        caption_label: 'text-sm font-semibold',
        nav: ' flex items-center',
        nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'border-none',
        nav_button_next: 'border-none',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-button-ghost-foreground rounded-md w-9  text-[12px] opacity-65 font-semibold capitalize ',
        row: 'flex w-full mt-0',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md  first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(buttonVariants({ variant: 'clear' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 opacity-85'),
        day_range_end: '!bg-button-solid !border-none aria-selected:!rounded-s-sm',
        day_range_start: '!bg-button-solid !border-none aria-selected:!rounded-e-sm ',
        day_selected:
          '!text-button-solid-label !border-none rounded-lg hover:bg-button-solid hover:text-button-ghost-foreground focus:bg-button-solid focus:text-button-solid-foreground !font-medium',
        day_outside:
          'day-outside text-button-ghost-foreground opacity-50 aria-selected:bg-button-solid aria-selected:text-button-ghost-foreground',
        day_disabled: 'text-button-ghost-foreground opacity-50',
        day_range_middle:
          'aria-selected:!bg-button-ghost !border-none aria-selected:!rounded-none aria-selected:!text-button-outlined-label ',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
