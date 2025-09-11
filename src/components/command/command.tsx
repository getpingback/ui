'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@stash-ui/light-icons';

const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn('flex h-full max-w-full w-[600px] z-50 flex-col overflow-hidden rounded-2xl bg-surface', className)}
      data-testid="command"
      {...props}
    />
  )
);
Command.displayName = CommandPrimitive.displayName;

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center relative w-full p-4 border-b border-default" cmdk-input-wrapper="">
    <div className="relative w-full">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 [&_svg]:text-icon-tertiary">
        <SearchIcon />
      </div>
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'w-full rounded-2xl !bg-surface border-default border h-10 pr-3 py-2 pl-10 text-sm leading-none text-tertiary font-normal transition-all outline-none',
          'hover:border-hover focus:border-hover focus:shadow-input-focus-neutral',
          'placeholder:text-tertiary placeholder:opacity-65 placeholder:font-normal placeholder:text-sm',
          className
        )}
        {...props}
      />
    </div>
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] pb-1 overflow-y-auto scrollbar-style overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-tertiary" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden py-1 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:leading-3 [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-gray-400 [&_[cmdk-group-heading]]:uppercase',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('h-px bg-border-default', className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex justify-between gap-2 cursor-pointer select-none items-center px-4 py-2 text-sm text-tertiary font-normal outline-none aria-selected:bg-neutral-hover data-[disabled]:pointer-events-none  transition-all duration-200 ease-in-out',
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator };
