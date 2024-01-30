import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@stash-ui/regular-icons';
import { cn } from '@/lib/utils';

interface AccordionProps
  extends Omit<AccordionPrimitive.AccordionItemProps, 'value'> {
  children: React.ReactNode;
  label: React.ReactNode | string;
  isInitialStateOpen?: boolean;
}

function Accordion({
  className,
  children,
  label,
  isInitialStateOpen = false,
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type='single'
      collapsible
      data-testid='navigation-trigger'
      className={cn('w-full', className)}
      defaultValue={isInitialStateOpen ? 'accordion' : undefined}
    >
      <AccordionPrimitive.Item {...props} value='accordion'>
        <AccordionPrimitive.Trigger
          className={cn(
            'w-full h-[40px] inline-flex items-center justify-between cursor-pointer opacity-80 text-sm p-[12px] rounded-lg text-secondary-foreground [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:bg-list-actived [&[data-state=open]]:text-active-foreground font-semibold bg-[#D4D4D840]  transition duration-400 ease-in-out'
          )}
        >
          {label}
          <ChevronDownIcon className='shrink-0 transition-transform duration-200' />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content
          className={cn(
            'w-full flex flex-col overflow-hidden data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down'
          )}
        >
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export { Accordion };
