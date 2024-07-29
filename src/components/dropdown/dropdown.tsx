import React, { ReactElement, useState } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@stash-ui/regular-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const itemVariants = cva(
  'h-[40px] flex items-center select-none outline-none focus:bg-list-hover flex-start w-full px-[16px] cursor-pointer text-sm font-normal text-list-label hover:text-primary-foreground hover:bg-list-hover transition duration-300 ease-in-out [&>svg>path]:opacity-[.45] [&>svg]:mr-2'
);
export interface DropdownItemProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  icon?: JSX.Element;
}

function DropdownItem({ className, ...props }: DropdownItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(itemVariants(), className)}
      data-testid='dropdown-item'
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </DropdownMenuPrimitive.Item>
  );
}

export interface DropdownRadioProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  isChecked: boolean;
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element;
}

function DropdownRadioItem({
  className,
  isChecked,
  setIsChecked,
  ...props
}: DropdownRadioProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(itemVariants(), className, 'flex justify-between')}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      data-testid='dropdown-radio'
    >
      {props.icon && props.icon}
      {props.children}
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export interface DropdownProps
  extends React.Component<typeof DropdownMenuPrimitive.Root>,
    React.HTMLAttributes<HTMLDivElement> {
  trigger?: JSX.Element;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'end';
}

function Dropdown({
  className,
  trigger,
  side,
  align,
  ...props
}: DropdownProps) {
  const children = props.children as ReactElement;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenuPrimitive.Root
      data-testid='dropdown'
      open={isOpen}
      modal={false}
      onOpenChange={(open) => !open && setIsOpen(false)}
    >
      <DropdownMenuPrimitive.Trigger onClick={() => setIsOpen(true)}>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          onClick={() => setIsOpen(false)}
          side={side || 'top'}
          className={cn(
            ' w-[252px] py-[12px] flex flex-col z-50 min-w-fit overflow-hidden rounded-lg bg-background-accent shadow-modal',
            className
          )}
          sideOffset={4}
          align={align || 'center'}
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export { Dropdown, DropdownItem, DropdownRadioItem };
