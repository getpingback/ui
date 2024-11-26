import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  direction?: 'horizontal' | 'vertical';
}

interface RadioItemProps extends RadioGroupPrimitive.RadioGroupItemProps {
  children?: React.ReactNode;
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ children, direction = 'horizontal', ...props }, ref) => (
    <RadioGroupPrimitive.Root ref={ref} className={cn('flex gap-1', { 'flex-col': direction === 'horizontal' })} {...props}>
      {children}
    </RadioGroupPrimitive.Root>
  )
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioItem = ({ id, value, children, disabled, ...props }: RadioItemProps) => (
  <div className="flex items-center gap-2 h-8 rounded-lg w-fit transition duration-200 py-1 px-2">
    <RadioGroupPrimitive.Item
      value={value}
      id={id}
      disabled={disabled}
      className="peer border border-solid border-input-outline w-4 h-4 rounded-full enabled:hover:ring-8 enabled:hover:ring-input-outline-hover aria-checked:ring-input-selected-hover aria-checked:border-4 enabled:aria-checked:border-input-selected transition duration-200 enabled:hover:cursor-pointer disabled:border-input-outline/45 disabled:hover:cursor-not-allowed"
      {...props}
    >
      <RadioGroupPrimitive.Indicator />
    </RadioGroupPrimitive.Item>

    <label
      className="text-secondary-foreground text-sm peer-hover:cursor-pointer peer-disabled:hover:cursor-not-allowed peer-focus:underline duration-200 transition peer-enabled:peer-aria-checked:text-highlighted-foreground peer-enabled:peer-aria-checked:decoration-input-selected peer-disabled:text-secondary-foreground/45"
      htmlFor={id}
    >
      {children}
    </label>
  </div>
);

export { RadioGroup, RadioItem };
