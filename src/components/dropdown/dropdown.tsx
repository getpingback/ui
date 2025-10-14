import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@stash-ui/regular-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DROPDOWN_POSITIONS } from './constants';

const positionVariants = cva(
  'z-50 w-80 origin-top-left flex flex-col gap-1 rounded-xl bg-surface p-2 text-primary shadow-modal-2 outline-none data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-fade-out',
  {
    variants: {
      position: {
        [DROPDOWN_POSITIONS.TOP_START]: 'origin-bottom-left',
        [DROPDOWN_POSITIONS.TOP_CENTER]: 'origin-bottom',
        [DROPDOWN_POSITIONS.TOP_END]: 'origin-bottom-right',
        [DROPDOWN_POSITIONS.BOTTOM_START]: 'origin-top-left',
        [DROPDOWN_POSITIONS.BOTTOM_CENTER]: 'origin-top',
        [DROPDOWN_POSITIONS.BOTTOM_END]: 'origin-top-right',
        [DROPDOWN_POSITIONS.LEFT_START]: 'origin-top-right',
        [DROPDOWN_POSITIONS.LEFT_CENTER]: 'origin-right',
        [DROPDOWN_POSITIONS.LEFT_END]: 'origin-bottom-right',
        [DROPDOWN_POSITIONS.RIGHT_START]: 'origin-top-left',
        [DROPDOWN_POSITIONS.RIGHT_CENTER]: 'origin-left',
        [DROPDOWN_POSITIONS.RIGHT_END]: 'origin-bottom-left'
      }
    }
  }
);

export interface DropdownItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  icon?: JSX.Element;
}

function DropdownItem({ className, onClick, ...props }: DropdownItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'h-[40px] flex items-center font-normal text-secondary text-sm px-3 rounded-xl select-none outline-none hover:bg-sidebar-item-hover transition duration-300 ease-in-out [&>svg]:mr-2',
        className
      )}
      data-testid="dropdown-item"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </DropdownMenuPrimitive.Item>
  );
}

export interface DropdownRadioProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  isChecked: boolean;
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element;
}

function DropdownRadioItem({ className, isChecked, setIsChecked, ...props }: DropdownRadioProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        'flex justify-between h-[40px] items-center font-normal text-secondary text-sm px-3 rounded-xl select-none outline-none hover:bg-sidebar-item-hover transition duration-300 ease-in-out',
        className
      )}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      data-testid="dropdown-radio"
    >
      <div className="flex items-center gap-2 text-secondary [&>svg]:mr-2">
        {props.icon && props.icon}
        {props.children}
      </div>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: JSX.Element;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'end' | 'center';
  triggerAsChild?: boolean;
  children?: React.ReactNode;
  sideOffset?: number;
}

function Dropdown({
  className,
  trigger,
  side = 'top',
  align = 'center',
  triggerAsChild,
  sideOffset = 4,
  children,
  ...props
}: DropdownProps) {
  return (
    <DropdownMenuPrimitive.Root modal={false}>
      <DropdownMenuPrimitive.Trigger asChild={triggerAsChild} onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          side={side}
          className={cn(positionVariants({ position: `${side}-${align}` }), className)}
          sideOffset={sideOffset}
          align={align}
          data-testid="dropdown"
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export { Dropdown, DropdownItem, DropdownRadioItem };
