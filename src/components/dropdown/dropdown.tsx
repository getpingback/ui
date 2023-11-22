import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { CheckIcon } from '@stash-ui/regular-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const itemVariants = cva(
  'h-[40px] flex items-center select-none outline-none focus:bg-list-hover focus:text-primary-foreground flex-start w-full px-3 cursor-pointer text-sm font-normal text-list-label hover:text-tertiary-foreground hover:bg-list-hover transition duration-300 ease-in-out [&>svg>path]:opacity-[.60]'
);

export interface DropdownDividerProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {}

function DropdownDivider(props: DropdownDividerProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className='w-full h-[1px] bg-list-hover my-[8px]'
      {...props}
    ></DropdownMenuPrimitive.Separator>
  );
}

export interface DropdownItemProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  isSub?: boolean;
}

function DropdownItem({ className, ...props }: DropdownItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(itemVariants(), className)}
      data-testid='dropdown-item'
      {...props}
    ></DropdownMenuPrimitive.Item>
  );
}

export interface DropdownSubProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  isChecked: boolean;
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

function DropdownRadioItem({
  className,
  isChecked,
  setIsChecked,
  ...props
}: DropdownSubProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(itemVariants(), className, 'flex justify-between')}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      data-testid='dropdown-radio'
    >
      {props.children}
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: JSX.Element;
  side?: 'top' | 'bottom' | 'left' | 'right';
  setOpenSub?: React.Dispatch<React.SetStateAction<boolean>>;
  openSub?: boolean;
}

function Dropdown({ className, trigger, side, ...props }: DropdownProps) {
  return (
    <DropdownMenuPrimitive.Root data-testid='dropdown'>
      <DropdownMenuPrimitive.Trigger>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal {...props}>
        <DropdownMenuPrimitive.Content
          side={side || 'top'}
          className={cn(
            'flex flex-col z-50 min-w-fit overflow-hidden rounded-lg bg-background-accent shadow-modal',
            className
          )}
          sideOffset={4}
        >
          {props.children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export { Dropdown, DropdownItem, DropdownRadioItem, DropdownDivider };
