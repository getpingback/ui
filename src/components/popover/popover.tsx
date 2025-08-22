'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { POPOVER_POSITIONS } from './constants';

const popoverVariants = cva(
  'z-50 w-80 origin-top-left rounded-xl border bg-background-accent p-4 text-primary-foreground shadow-md outline-none data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-fade-out',
  {
    variants: {
      position: {
        [POPOVER_POSITIONS.TOP_START]: 'origin-bottom-left',
        [POPOVER_POSITIONS.TOP_CENTER]: 'origin-bottom',
        [POPOVER_POSITIONS.TOP_END]: 'origin-bottom-right',
        [POPOVER_POSITIONS.BOTTOM_START]: 'origin-top-left',
        [POPOVER_POSITIONS.BOTTOM_CENTER]: 'origin-top',
        [POPOVER_POSITIONS.BOTTOM_END]: 'origin-top-right',
        [POPOVER_POSITIONS.LEFT_START]: 'origin-top-right',
        [POPOVER_POSITIONS.LEFT_CENTER]: 'origin-right',
        [POPOVER_POSITIONS.LEFT_END]: 'origin-bottom-right',
        [POPOVER_POSITIONS.RIGHT_START]: 'origin-top-left',
        [POPOVER_POSITIONS.RIGHT_CENTER]: 'origin-left',
        [POPOVER_POSITIONS.RIGHT_END]: 'origin-bottom-left'
      }
    }
  }
);

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'start', side = 'bottom', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        popoverVariants({ position: `${side}-${align}` }),
        'z-50 w-80 rounded-xl border bg-background-accent p-4 text-primary-foreground shadow-md outline-none data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-fade-out',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose };
