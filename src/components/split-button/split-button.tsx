import React from 'react';
import { CaretDownIcon } from '@stash-ui/light-icons';
import { Dropdown, DropdownItem } from '../dropdown';
import { Button } from '../button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Typography } from '../typography';

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

type MenuItem = {
  title?: string;
  items: Item[];
};

type Item = {
  key: string;
  icon: JSX.Element | undefined;
  label: string;
  onClick: () => void;
};

interface SplitButtonProps {
  prefixIcon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'solid' | 'outline' | 'ghost';
  onPrefixClick: () => void;
  sufixIcon?: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  menuItems: MenuItem[];
}

function SplitButton({
  prefixIcon,
  label,
  variant = 'primary',
  onPrefixClick,
  menuItems,
  sufixIcon,
  className,
  align = 'end'
}: SplitButtonProps) {
  const handlePrefixClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPrefixClick();
  };

  return (
    <Button
      variant={variant}
      className={cn('[&>div]:pr-0', variant !== 'primary' && 'pr-0', className)}
      onClick={handlePrefixClick}
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
          {menuItems.map((group, index) => (
            <div key={index}>
              {group.title && (
                <div className="px-4 h-7 flex items-center">
                  <Typography type="tertiary" size="caption" weight="bold" className="uppercase text-gray-400">
                    {group.title}
                  </Typography>
                </div>
              )}
              {group.items.map((item, index) => (
                <DropdownItem icon={item?.icon} key={index} onClick={item.onClick} data-testid="split-button-menu-item">
                  {item.label}
                </DropdownItem>
              ))}
            </div>
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
