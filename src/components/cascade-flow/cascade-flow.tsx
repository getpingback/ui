import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@stash-ui/light-icons';
import { cn } from '@/lib/utils';

interface CascadeProps {
  parent: React.ReactNode;
  children: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
}

interface NodeLineProps {
  children: React.ReactNode;
  isLast?: boolean;
  conectionHeight?: number;
}

export const NodeLine = ({ children, isLast, conectionHeight }: NodeLineProps) => {
  return (
    <div className="relative py-2 pl-[10px] hover:bg-[#71717A0A] pr-3 pl-[10px] transition-all duration-300">
      <div
        className={cn(
          'absolute left-[-5px] top-0 bottom-0 w-px bg-[#9061F9] group-data-[state=open]:block hidden -z-10',
          isLast && '!hidden'
        )}
      ></div>
      <div
        className={cn(
          'absolute left-[-5px] top-0 w-[15px]  border-b border-l border-[#9061F9] rounded-bl-lg group-data-[state=open]:block hidden'
        )}
        style={{
          height: conectionHeight ? `${conectionHeight}px` : '50%'
        }}
      ></div>
      <span>{children}</span>
    </div>
  );
};

export const CascadeFlow = ({ parent, children, suffix, className }: CascadeProps) => {
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === NodeLine) {
        return React.cloneElement(child as React.ReactElement<NodeLineProps>, { isLast: index === React.Children.count(children) - 1 });
      }
    });
  };

  return (
    <div className={cn('w-full flex pr-3', className)}>
      <AccordionPrimitive.Root type="single" collapsible defaultValue="cascade" value="cascade" className="w-full">
        <AccordionPrimitive.Item value="cascade" className="group relative">
          <AccordionPrimitive.Trigger className="w-full flex items-center justify-between [&[data-state=open]>span>svg]:rotate-180">
            <span className="relative flex items-center gap-[10px]">
              {parent}
              <ChevronDownIcon color="#71717A" className="w-[20px] h-[20px] opacity-65" />
            </span>
            {suffix}
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className="relative overflow-visible pl-[25px]">{renderChildren()}</AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  );
};
