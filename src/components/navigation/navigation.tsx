import * as React from 'react';
import Image from 'next/image';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDownIcon } from '@stash-ui/regular-icons';
const subItem1SVG = require('@/assets/images/sub-item1.svg');
const subItem2SVG = require('@/assets/images/sub-item2.svg');
const subItem3SVG = require('@/assets/images/sub-item3.svg');
const subItem4SVG = require('@/assets/images/sub-item4.svg');

import { cn } from '@/lib/utils';

const navigationVariants = cva(
  'inline-flex justify-between w-full p-3 rounded-lg cursor-pointer text-sm font-normal',
  {
    variants: {
      variant: {
        highlighted:
          'shadow shadow-[0px_0px_0px_3px_rgba(14,159,110,0.12)] hover:bg-list-highlighted text-success-foreground active:font-semibold',
        default:
          'text-tertiary-foreground hover:text-active-foreground hover:bg-list-actived active:font-semibold active:bg-active-menu active:text-active-foreground',
        disabled: 'text-tertiary-foreground opacity-45 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NavigationLinkProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Link>,
    VariantProps<typeof navigationVariants> {}

function NavigationLink({ className, variant, ...props }: NavigationLinkProps) {
  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Link
        data-testid='navigation-link'
        className={cn(navigationVariants({ variant }), className)}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export interface NavigationItemProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Item>,
    VariantProps<typeof navigationVariants> {}

function NavigationItem({ className, variant, ...props }: NavigationItemProps) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Item
        data-testid='navigation-item'
        className={cn(
          navigationVariants({ variant }),
          className,
          isActive &&
            !variant &&
            'text-active-foreground bg-active-menu font-semibold',
          isActive &&
            variant === 'highlighted' &&
            'text-success-foreground bg-list-highlighted font-semibold'
        )}
        onClick={() => setIsActive(!isActive)}
        {...props}
      />
    </NavigationMenuPrimitive.Root>
  );
}

export interface NavigationSubItemProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Link> {
  position?: 'first' | 'middle' | 'last' | 'only';
}

function NavigationSubItem({
  className,
  position,
  ...props
}: NavigationSubItemProps) {
  const handleIcon = (position: string) => {
    if (position === 'first') {
      return <Image src={subItem1SVG} alt='dot-icon' data-testid='first-dot' />;
    } else if (position === 'last') {
      return <Image src={subItem3SVG} alt='dot-icon' data-testid='last-dot' />;
    } else if (position === 'only') {
      return <Image src={subItem4SVG} alt='dot-icon' data-testid='only-dot' />;
    } else
      return <Image src={subItem2SVG} alt='dot-icon' data-testid='middle' />;
  };

  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Link
        data-testid='navigation-sub-item'
        className={cn(
          'flex items-center flex-start w-full px-3 cursor-pointer text-xs font-normal text-primary opacity-60 hover:bg-list-hover transition duration-300 ease-in-out',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'opacity-60 hover:opacity-100 flex items-center flex-start transition-all duration-300'
          )}
        >
          {position && handleIcon(position)}
          {props.children}
        </div>
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationTrigger({
  className,
  items,
  title,
  ...props
}: {
  title: string | JSX.Element;
  items: { label: string; href: string }[];
  className?: string;
}) {
  const handlePosition = (itemIndex: number, itemsLength: number) => {
    if (itemsLength === 1) return 'only';
    else if (itemIndex === 0 && itemsLength > 1) return 'first';
    else if (itemIndex === itemsLength - 1) return 'last';
    else return 'middle';
  };

  return (
    <AccordionPrimitive.Root
      type='single'
      collapsible
      className={className}
      data-testid='navigation-trigger'
    >
      <AccordionPrimitive.Item
        className='AccordionItem'
        value='accordion'
        {...props}
      >
        <AccordionPrimitive.Trigger
          className={cn(
            'inline-flex justify-between w-full cursor-pointer text-sm font-normal text-tertiary-foreground  p-3 rounded-lg  hover:text-active-foreground [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:bg-active-menu [&[data-state=open]]:text-active-foreground [&[data-state=open]]:font-semibold hover:text-opacity-100 hover:bg-list-actived transition duration-400 ease-in-out',
            className
          )}
        >
          {title}
          <ChevronDownIcon className='h-4 w-4 shrink-0 transition-transform duration-200' />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content
          className={cn(
            'w-full overflow-hidden data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down'
          )}
        >
          {items.map((item, index) => (
            <NavigationSubItem
              href={item.href}
              key={index}
              position={handlePosition(index, items.length)}
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
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.List
        className={cn(
          'group flex list-none flex-col gap-1 w-full overflow-hidden'
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
