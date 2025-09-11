import * as React from 'react';
import { InfoCircleIcon } from '@stash-ui/light-icons';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

export interface TooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  trigger?: JSX.Element;
  showArrow?: boolean;
}
function Tooltip({ className, sideOffset = 4, trigger, showArrow, ...props }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root delayDuration={200} onOpenChange={setOpen} open={open}>
        <TooltipPrimitive.Trigger asChild onClick={() => setOpen(!open)}>
          {trigger ? trigger : <InfoCircleIcon className="text-icon-tertiary" width={16} height={16} data-testid="tooltip-trigger" />}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          data-testid="tooltip-content"
          className={cn(
            'z-50 overflow-hidden max-w-[260px] font-normal rounded-xl bg-surface-inverse text-inverse-primary text-center pl-[10px] pr-[12px] py-[8px] text-xs',
            className
          )}
          {...props}
        >
          {props.children}
          {showArrow ? <TooltipPrimitive.Arrow className="text-surface-inverse" /> : null}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export { Tooltip };
