import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabTriggerVariants = cva(
  'w-full h-[32px] flex flex-col items-center justify-center focus:outline-none overflow-y-scroll no-scrollbar py-[4px] px-[8px] [&[data-state=active]]:rounded-md  [&[data-state=active]]:opacity-[1] font-semibold text-secondary-foreground text-xs',
  {
    variants: {
      type: {
        purple:
          '[&[data-state=active]]:bg-[#9061F914] [&[data-state=active]]:text-[#7E3AF2] opacity-[.45]',
        clear:
          '[&[data-state=active]]:bg-[#FFFFFF] [&[data-state=active]]:text-[#9061F9] [&[data-state=active]]:[box-shadow:0px_0px_1px_1px_rgba(0,_0,_0,_0.04)] opacity-[.65]',
      },
    },
    defaultVariants: {
      type: 'purple',
    },
  }
);

const tabListVariants = cva(
  'inline-flex  items-center justify-center rounded-md p-1 text-muted-foreground bg-[#71717A0A]',
  {
    variants: {
      size: {
        medium: 'h-[32px]',
        tall: 'h-[40px]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export interface TabsTriggerProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, 'type'>,
    VariantProps<typeof tabTriggerVariants> {}

function TabsTrigger({ className, type, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(tabTriggerVariants({ type }), className)}
      data-testid='tabs-trigger'
      {...props}
    />
  );
}

export interface TabProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'type'>,
    VariantProps<typeof tabTriggerVariants> {}

function TabsList({ className, type, size, ...props }: TabProps) {
  return (
    <TabsPrimitive.List
      className={cn(tabListVariants({ size }), className)}
      data-testid='tabs-list'
      {...props}
    >
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { type });
        }
        return child;
      })}
    </TabsPrimitive.List>
  );
}

export interface TabContentProps
  extends React.ComponentProps<typeof TabsPrimitive.Content> {}

function TabsContent({ className, ...props }: TabContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      data-testid='tabs-content'
      {...props}
    />
  );
}

export { Tabs, TabsTrigger, TabsList, TabsContent };
