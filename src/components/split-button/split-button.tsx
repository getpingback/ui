import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDownIcon } from '@stash-ui/light-icons';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { DropdownItem } from '../dropdown';

const containerVariants = cva('flex items-center font-primary max-w-fit h-[32px] text-sm rounded-lg ', {
  variants: {
    type: {
      solid: 'bg-button-solid text-button-solid-foreground  hover:shadow-solid transition-all duration-200 ease-in-out',
      outlined:
        'bg-button-outlined text-secondary-foreground border border-button-outlined-border hover:shadow-outlined transition-all duration-200 ease-in-out',
      ghost:
        'bg-button-ghost-gray text-button-ghost-foreground text-secondary-foreground hover:shadow-ghost transition-all duration-200 ease-in-out'
    }
  },
  defaultVariants: {
    type: 'solid'
  }
});

const leftButtonVariants = cva(
  'h-full w-full flex items-center gap-1 px-3 rounded-l-lg rounded-r-none transition-all duration-200 ease-in-out font-semibold',
  {
    variants: {
      type: {
        solid: 'hover:bg-button-solid-hover',
        outlined: 'hover:bg-button-outlined-hover opacity-85 hover:opacity-100',
        ghost: 'hover:bg-button-ghost-hover opacity-85 hover:opacity-100'
      }
    }
  }
);

const menuTriggerVariants = cva(
  'h-full w-full min-w-[32px] max-w-[32px] border-l flex items-center justify-center rounded-r-lg rounded-l-none border-solid transition-all duration-200 ease-in-out',
  {
    variants: {
      type: {
        solid: 'hover:bg-button-solid-hover border-[#282C2F1F]',
        outlined: 'hover:bg-button-outlined-hover opacity-85 hover:opacity-100 border-[#282C2F1F]',
        ghost: 'hover:bg-button-ghost-hover border-[#282C2F1F]'
      }
    }
  }
);

interface SplitButtonProps {
  primaryIcon: React.ReactNode;
  primaryText: string;
  variant?: 'solid' | 'outlined' | 'ghost';
  onPrimaryClick: () => void;
  secondaryElement?: React.ReactNode;
  className?: string;
  menuItems: {
    key: string;
    icon: JSX.Element | undefined;
    text: string;
    onClick: () => void;
  }[];
}

function SplitButton({ primaryIcon, primaryText, variant, onPrimaryClick, menuItems, secondaryElement, className }: SplitButtonProps) {
  const [isMenuActionsOpen, setIsMenuActionsOpen] = useState(false);

  return (
    <DropdownMenu.Root open={isMenuActionsOpen} modal={false} onOpenChange={(open) => !open && setIsMenuActionsOpen(false)}>
      <DropdownMenu.Trigger asChild>
        <div className={containerVariants({ type: variant })} data-testid="split-button">
          <button className={leftButtonVariants({ type: variant })} onClick={onPrimaryClick} data-testid="split-button-primary">
            {primaryIcon}
            {primaryText}
          </button>
          <button
            onClick={() => setIsMenuActionsOpen(!isMenuActionsOpen)}
            className={menuTriggerVariants({ type: variant })}
            data-testid="split-button-menu-trigger"
          >
            {secondaryElement ? secondaryElement : <CaretDownIcon width={20} height={20} />}
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          data-testid="split-button-menu-content"
          onClick={() => setIsMenuActionsOpen(false)}
          side="bottom"
          className={`rounded-lg w-[252px] flex-col z-50 min-w-fit overflow-hidden  bg-background-accent shadow-modal py-2 ${className}`}
          sideOffset={4}
          align="center"
        >
          {menuItems.map((item, index) => (
            <DropdownItem icon={item?.icon} key={index} onClick={item.onClick} data-testid="split-button-menu-item">
              {item.text}
            </DropdownItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export { SplitButton };

SplitButton.propTypes = {
  primaryIcon: PropTypes.node.isRequired,
  primaryText: PropTypes.string.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })
  ).isRequired
};
