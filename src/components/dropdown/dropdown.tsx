import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        outline: 'bg-transparent',
        ghost: 'border-none',
      },
    },
  }
);

export interface DropdownMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof DropdownVariants> {
  buttonComponent?: JSX.Element;
}

function DropdownMenu({
  className,
  variant,
  buttonComponent,
  ...props
}: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger>
        {buttonComponent}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal {...props}>
        <DropdownMenuPrimitive.Content
          className={cn(
            'z-50 min-w-[252px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
        >
          {props.children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export { DropdownMenu, DropdownVariants };
