import * as React from 'react';
import { InfoCircleIcon } from '@stash-ui/light-icons';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

export interface TooltipProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  trigger?: JSX.Element;
  showArrow?: boolean;
}
function Tooltip({
  className,
  sideOffset = 4,
  trigger,
  showArrow,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root delayDuration={200}>
        <TooltipPrimitive.Trigger asChild>
          {trigger ? (
            trigger
          ) : (
            <InfoCircleIcon
              width={16}
              height={16}
              data-testid='tooltip-trigger'
            />
          )}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          data-testid='tooltip-content'
          className={cn(
            'z-50 overflow-hidden max-w-[260px] font-light opacity-90 rounded-lg bg-[#000000] text-[#FFFFFF] text-center pl-[10px] pr-[12px] py-[8px] text-xs',
            className
          )}
          {...props}
        >
          {props.children}
          {showArrow ? (
            <TooltipPrimitive.Arrow className='fill-[#000000]' />
          ) : null}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export { Tooltip };
