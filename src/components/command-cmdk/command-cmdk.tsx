import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

const CommandK = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn('flex h-full w-full z-50 flex-col overflow-hidden rounded-xl bg-surface text-popover-foreground', className)}
      data-testid="command"
      {...props}
    />
  )
);

CommandK.displayName = CommandPrimitive.displayName;

const CommandKInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center relative w-full p-3 border-b border-default rounded-t-xl" cmdk-input-wrapper="">
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-10 w-full border-divider border rounded-lg bg-transparent pr-3 pl-4 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out',
        className
      )}
      {...props}
    />
  </div>
));

CommandKInput.displayName = CommandPrimitive.Input.displayName;

const CommandKList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] pb-1 overflow-y-auto scrollbar-style overflow-x-hidden px-3', className)}
    {...props}
  />
));

CommandKList.displayName = CommandPrimitive.List.displayName;

const CommandKEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-tertiary-foreground" {...props} />);

CommandKEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandKGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden py-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-[#A1A1AA] [&_[cmdk-group-heading]]:uppercase',
      className
    )}
    {...props}
  />
));

CommandKGroup.displayName = CommandPrimitive.Group.displayName;

const CommandKSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => <CommandPrimitive.Separator ref={ref} className={cn('-mx-1 h-px bg-border', className)} {...props} />);
CommandKSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandKItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'text-secondary-foreground opacity-90 rounded-md relative flex cursor-pointer select-none items-center px-4 py-2 text-sm outline-none aria-selected:bg-[#71717a14] aria-selected:opacity-100 data-[disabled]:pointer-events-none  transition-all duration-200 ease-in-out',
      className
    )}
    {...props}
  />
));

CommandKItem.displayName = CommandPrimitive.Item.displayName;

const CommandKShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />;
};
CommandKShortcut.displayName = 'CommandShortcut';

export { CommandK, CommandKInput, CommandKList, CommandKEmpty, CommandKGroup, CommandKItem, CommandKShortcut, CommandKSeparator };
