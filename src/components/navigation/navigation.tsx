import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDownIcon } from '@stash-ui/regular-icons';

import { cn } from '@/lib/utils';

const navigationVariants = cva(
  'h-[40px] font-primary inline-flex items-center justify-between hover:no-underline w-full p-3 rounded-xl cursor-pointer text-sm font-normal',
  {
    variants: {
      variant: {
        default: 'text-tertiary hover:text-secondary hover:bg-sidebar-item-hover',
        disabled: 'text-tertiary opacity-[0.45] cursor-not-allowed',
        active: 'bg-gradient-to-r from-sidebar-item-pressed to-transparent text-primary font-semibold hover:text-primary'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface NavigationLinkProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Link>,
    VariantProps<typeof navigationVariants> {}

function NavigationLink({ className, variant, ...props }: NavigationLinkProps) {
  return (
    <NavigationMenuPrimitive.Root className={cn('w-full', className)}>
      <NavigationMenuPrimitive.Link
        data-testid="navigation-link"
        className={cn(navigationVariants({ variant }), className, 'justify-start hover:no-underline')}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export interface NavigationItemProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Item>,
    VariantProps<typeof navigationVariants> {}

function NavigationItem({ className, variant, ...props }: NavigationItemProps) {
  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Item data-testid="navigation-item" className={cn(navigationVariants({ variant }))} {...props} />
    </NavigationMenuPrimitive.Root>
  );
}

export interface NavigationSubItemProps extends React.ComponentProps<typeof NavigationMenuPrimitive.Link> {
  position?: 'first' | 'middle' | 'last' | 'only';
  activeItem?: boolean;
}

function NavigationSubItem({ className, position, activeItem, ...props }: NavigationSubItemProps) {
  const renderLeftIconPosition = (position: string) => {
    const baseClasses = 'relative w-6 h-8 flex items-center justify-center';
    const dotClasses = 'absolute left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] rounded-full z-10 top-3.5';
    const activeDotClasses = activeItem ? 'bg-border-filled shadow-modal-1 border-2	border-filled' : 'bg-border-hover opacity-60';
    const lineClasses = 'absolute left-1/2 transform -translate-x-1/2 w-px';

    const topLineClasses = position === 'only' || position === 'first' ? 'bg-transparent' : 'bg-border-hover';
    const bottomLineClasses = position === 'only' || position === 'last' ? 'bg-transparent' : 'bg-border-hover';

    return (
      <div className={baseClasses}>
        <div className={`${lineClasses} ${topLineClasses} ${'top-[-4px] h-[18px]'}`}></div>
        <div className={`${dotClasses} ${activeDotClasses}`} data-testid={position}></div>
        <div className={`${lineClasses} ${bottomLineClasses} ${'bottom-[-4px] h-[16px]'}`}></div>
      </div>
    );
  };

  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Link
        data-testid="navigation-sub-item"
        className={cn(
          'h-[40px] font-primary flex items-center hover:no-underline flex-start w-full px-3 rounded-xl cursor-pointer text-xs font-normal text-primary hover:bg-sidebar-item-hover transition duration-300 ease-in-out',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-[40px] w-full text-xs flex items-center text-tertiary flex-start z-9',
            activeItem ? 'font-semibold' : 'font-normal'
          )}
        >
          {position && renderLeftIconPosition(position)}
          <span className={cn('font-primary ')}>{props.children}</span>
        </div>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Root>
  );
}

interface NavigationTriggerProps extends Omit<AccordionPrimitive.AccordionItemProps, 'value'> {
  items: { label: string; href: string; value: string | number }[];
  onClickItem: (item: { label: string; href: string }) => void;
  activeItem?: string | number;
}

function NavigationTrigger({ className, items, children, onClickItem, activeItem = '', ...props }: NavigationTriggerProps) {
  const handlePosition = (itemIndex: number, itemsLength: number) => {
    if (itemsLength === 1) return 'only';
    else if (itemIndex === 0 && itemsLength > 1) return 'first';
    else if (itemIndex === itemsLength - 1) return 'last';
    else return 'middle';
  };

  const handleClickItem = (
    item: { label: string; href: string; value: string | number },
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    onClickItem(item);
  };
  return (
    <AccordionPrimitive.Root type="single" collapsible data-testid="navigation-trigger" className="w-full">
      <AccordionPrimitive.Item {...props} value="accordion">
        <AccordionPrimitive.Trigger
          className={cn(
            'w-full font-primary h-[40px] inline-flex items-center justify-between cursor-pointer text-sm font-normal text-tertiary  p-3 rounded-xl  hover:text-primary [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:bg-sidebar-item-pressed [&[data-state=open]]:text-primary [&[data-state=open]]:font-semibold hover:bg-sidebar-item-hover transition duration-400 ease-in-out',
            className
          )}
        >
          {children}
          <ChevronDownIcon className="shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content
          className={cn('w-full overflow-hidden data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down')}
        >
          {items.map((item, index) => (
            <NavigationSubItem
              href={item.href}
              onClick={(e) => handleClickItem(item, e)}
              key={index}
              accessKey={index.toString()}
              position={handlePosition(index, items.length)}
              activeItem={activeItem === item.value}
            >
              {item.label}
            </NavigationSubItem>
          ))}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export interface NavigationListProps extends React.ComponentProps<typeof NavigationMenuPrimitive.List> {}

function NavigationList({ className, ...props }: NavigationListProps) {
  return (
    <NavigationMenuPrimitive.Root className="w-full">
      <NavigationMenuPrimitive.List
        className={cn('group font-primary flex list-none flex-col gap-1 w-full overflow-hidden', className)}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export { NavigationLink, navigationVariants, NavigationItem, NavigationTrigger, NavigationSubItem, NavigationList };
