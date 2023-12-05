import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

export interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {}
function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'w-full h-[32px] flex flex-col items-center justify-center focus:outline-none overflow-y-scroll no-scrollbar [&[data-state=active]]:bg-[#9061F914] bg-[#71717A0A] py-[4px] px-[8px] [&[data-state=active]]:rounded-md [&[data-state=active]]:text-[#7E3AF2] [&[data-state=active]]:opacity-[1] font-semibold text-secondary-foreground text-xs opacity-[.45]',
        className
      )}
      data-testid='tabs-trigger'
      {...props}
    />
  );
}

export interface TabProps
  extends React.ComponentProps<typeof TabsPrimitive.List> {}

function TabsList({ className, ...props }: TabProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground',
        className
      )}
      data-testid='tabs-list'
      {...props}
    />
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
