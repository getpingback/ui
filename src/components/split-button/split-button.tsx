import React from 'react';
import { CaretDownIcon } from '@stash-ui/light-icons';
import { Dropdown, DropdownItem } from '../dropdown';
import { Button } from '../button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const dropdownTriggerVariants = cva('border-l border-default h-full ml-2 w-8 flex items-center justify-center rounded-e-[11px]', {
  variants: {
    variant: {
      primary: 'bg-button-solid hover:bg-button-solid-hover',
      solid: 'bg-button-solid hover:bg-button-solid-hover',
      ghost: 'bg-button-ghost/10',
      outline: ''
    }
  }
});

interface SplitButtonProps {
  prefixIcon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'solid' | 'outline' | 'ghost';
  customMenu?: React.ReactNode;
  onPrefixClick: () => void;
  sufixIcon?: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  menuItems: {
    key: string;
    icon: JSX.Element | undefined;
    text: string;
    onClick: () => void;
  }[];
}

function SplitButton({
  prefixIcon,
  label,
  variant = 'primary',
  onPrefixClick,
  menuItems,
  sufixIcon,
  className,
  align = 'end',
  customMenu
}: SplitButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn('[&>div]:pr-0', variant !== 'primary' && 'pr-0', className)}
      onClick={onPrefixClick}
      suffix={
        <Dropdown
          trigger={
            <div className={dropdownTriggerVariants({ variant })} data-testid="split-button-menu-trigger">
              {sufixIcon || <CaretDownIcon />}
            </div>
          }
          triggerAsChild
          side="bottom"
          align={align}
          sideOffset={variant !== 'primary' ? 4 : 8}
          className="w-60"
        >
          {customMenu
            ? customMenu
            : menuItems.map((item, index) => (
                <DropdownItem icon={item?.icon} key={index} onClick={item.onClick} data-testid="split-button-menu-item">
                  {item.text}
                </DropdownItem>
              ))}
        </Dropdown>
      }
    >
      {prefixIcon}
      {label}
    </Button>
  );
}

export { SplitButton };
