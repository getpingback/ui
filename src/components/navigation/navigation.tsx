import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDownIcon } from '@stash-ui/regular-icons';

import { cn } from '@/lib/utils';

const navigationVariants = cva(
  'h-[40px] font-primary inline-flex  items-center justify-between hover:no-underline w-full p-[12px] rounded-lg cursor-pointer text-sm font-normal',
  {
    variants: {
      variant: {
        highlighted:
          'shadow shadow-[0px_0px_0px_3px_rgba(14,159,110,0.12)] hover:bg-list-highlighted hover:text-success-foreground text-success-foreground',
        default:
          'text-tertiary-foreground hover:text-active-foreground hover:bg-list-actived',
        disabled: 'text-tertiary-foreground opacity-[0.45] cursor-not-allowed',
        active:
          'bg-active-menu text-active-foreground  font-semibold hover:text-active-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NavigationLinkProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Link>,
    VariantProps<typeof navigationVariants> {
  isActive?: boolean;
}

function NavigationLink({
  className,
  variant,
  isActive,
  ...props
}: NavigationLinkProps) {
  return (
    <NavigationMenuPrimitive.Root className={cn('w-full', className)}>
      <NavigationMenuPrimitive.Link
        data-testid='navigation-link'
        className={cn(
          navigationVariants({ variant }),
          className,
          'justify-start hover:no-underline',
          isActive &&
            variant === 'highlighted' &&
            'text-success-foreground bg-list-highlighted font-semibold',
          isActive &&
            variant !== 'highlighted' &&
            'hover:text-active-foreground text-active-foreground bg-active-menu font-semibold'
        )}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export interface NavigationItemProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Item>,
    VariantProps<typeof navigationVariants> {
  isActive?: boolean;
}

function NavigationItem({
  className,
  variant,
  isActive,
  ...props
}: NavigationItemProps) {
  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Item
        data-testid='navigation-item'
        className={cn(
          navigationVariants({ variant }),
          isActive &&
            variant === 'highlighted' &&
            'text-success-foreground bg-list-highlighted font-semibold',
          isActive &&
            variant !== 'highlighted' &&
            'hover:text-active-foreground text-active-foreground bg-active-menu font-semibold'
        )}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export interface NavigationSubItemProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Link> {
  position?: 'first' | 'middle' | 'last' | 'only';
  activeItem?: boolean;
}

function NavigationSubItem({
  className,
  position,
  activeItem,
  ...props
}: NavigationSubItemProps) {
  const renderLeftIconPosition = (position: string) => {
    const baseClasses = 'relative w-6 h-8 flex items-center justify-center';
    const dotClasses =
      'absolute left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] rounded-full z-10 top-3.5';
    const activeDotClasses = activeItem
      ? 'bg-[#9061F9] shadow-custom border-2 border-solid	border-[#9061F93D]'
      : 'bg-[#A1A1AA] opacity-60';
    const lineClasses = 'absolute left-1/2 transform -translate-x-1/2 w-px';

    const topLineClasses =
      position === 'only' || position === 'first'
        ? 'bg-transparent'
        : 'bg-gray-400/25';
    const bottomLineClasses =
      position === 'only' || position === 'last'
        ? 'bg-transparent'
        : 'bg-gray-400/25';

    return (
      <div className={baseClasses}>
        {/* Top line */}
        <div
          className={`${lineClasses} ${topLineClasses} ${'top-[-4px] h-[18px]'}`}
        ></div>
        {/* circle */}
        <div
          className={`${dotClasses} ${activeDotClasses}`}
          data-testid={position}
        ></div>
        {/* Bottom line */}
        <div
          className={`${lineClasses} ${bottomLineClasses} ${'bottom-[-4px] h-[16px]'}`}
        ></div>
      </div>
    );
  };

  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Link
        data-testid='navigation-sub-item'
        className={cn(
          'h-[40px] font-primary flex items-center hover:no-underline flex-start w-full px-3 cursor-pointer text-xs font-normal text-primary hover:bg-list-hover transition duration-300 ease-in-out',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-[40px] w-full text-xs flex items-center text-tertiary-foreground flex-start z-9',
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

interface NavigationTriggerProps
  extends Omit<AccordionPrimitive.AccordionItemProps, 'value'> {
  items: { label: string; href: string; value: string | number }[];
  onClickItem: (item: { label: string; href: string }) => void;
  activeItem?: string | number;
}

function NavigationTrigger({
  className,
  items,
  children,
  onClickItem,
  activeItem = '',
  ...props
}: NavigationTriggerProps) {
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
    <AccordionPrimitive.Root
      type='single'
      collapsible
      data-testid='navigation-trigger'
      className='w-full'
    >
      <AccordionPrimitive.Item {...props} value='accordion'>
        <AccordionPrimitive.Trigger
          className={cn(
            'w-full font-primary h-[40px] inline-flex items-center justify-between cursor-pointer [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:bg-active-menu [&[data-state=open]]:text-active-foreground [&[data-state=open]]:font-semibold  transition duration-400 ease-in-out'
          )}
        >
          {children}
          <ChevronDownIcon className='shrink-0 transition-transform duration-200' />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content
          className={cn(
            'w-full overflow-hidden data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down'
          )}
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

export interface NavigationListProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.List> {}

function NavigationList({ ...props }: NavigationListProps) {
  return (
    <NavigationMenuPrimitive.Root className={cn('w-full')}>
      <NavigationMenuPrimitive.List
        className={cn(
          'group font-primary flex list-none flex-col gap-1 w-full overflow-hidden gap-0'
        )}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export {
  NavigationLink,
  navigationVariants,
  NavigationItem,
  NavigationTrigger,
  NavigationSubItem,
  NavigationList,
};
