import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@stash-ui/light-icons';
import { cn } from '@/lib/utils';

interface NodeFlowProps {
  parent: React.ReactNode;
  children: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  status?: 'active' | 'default';
}

interface NodeLineProps {
  children: React.ReactNode;
  isLast?: boolean;
  conectionHeight?: number;
  className?: string;
  status?: 'active' | 'default';
}

export const NodeLine = ({ children, isLast, conectionHeight, status, className }: NodeLineProps) => {
  return (
    <div className={cn('relative py-2 pl-[7px] transition-all duration-300 ', className)} data-testid="node-line">
      <div
        className={cn(
          'absolute left-[-5px] top-0 bottom-0 w-px',
          isLast && '!hidden',
          status !== 'active' ? 'bg-divider' : 'bg-divider-highlighted '
        )}
        data-testid="node-line-divider"
      />
      <div
        className={cn(
          'absolute left-[-5px] top-0 w-[12px] border-b border-l border-divider-highlighted rounded-bl-[10px]',
          status !== 'active' ? 'border-divider' : 'border-divider-highlighted '
        )}
        style={{
          height: conectionHeight ? `${conectionHeight}px` : '50%'
        }}
        data-testid="node-line-corner"
      />
      {children}
    </div>
  );
};

export const NodeFlow = ({ parent, children, suffix, className, status = 'active' }: NodeFlowProps) => {
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === NodeLine) {
        return React.cloneElement(child as React.ReactElement<NodeLineProps>, {
          isLast: index === React.Children.count(children) - 1,
          status: status
        });
      }
    });
  };

  return (
    <div className={cn('w-full flex pr-3', className)} data-testid="node-flow">
      <AccordionPrimitive.Root type="single" collapsible defaultValue="cascade" className="w-full">
        <AccordionPrimitive.Item value="cascade" className="group relative">
          <AccordionPrimitive.Trigger className="w-full flex items-center justify-between [&[data-state=open]>span>svg]:rotate-180">
            <span className="relative flex items-center gap-[10px]">
              {parent}
              <ChevronDownIcon color="#71717A" className="w-[20px] h-[20px] opacity-65" />
            </span>
            {suffix}
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className="relative overflow-hidden pl-[25px] data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down">
            {renderChildren()}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  );
};
