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
  ({ children, direction = 'vertical', ...props }, ref) => (
    <RadioGroupPrimitive.Root ref={ref} className={cn('w-full flex gap-1', { 'flex-col': direction === 'vertical' })} {...props}>
      {children}
    </RadioGroupPrimitive.Root>
  )
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioItem = ({ id, value, children, disabled, ...props }: RadioItemProps) => (
  <RadioGroupPrimitive.Item
    value={value}
    className="w-full flex items-center gap-2 h-8 rounded-lg w-fit transition duration-200 py-1 px-2 aria-checked:bg-neutral-active enabled:hover:bg-neutral-hover aria-checked:hover:bg-neutral-active-hover disabled:opacity-65"
    disabled={disabled}
    {...props}
  >
    <RadioGroupPrimitive.Item
      value={value}
      id={id}
      disabled={disabled}
      className="peer border border-solid enabled:hover:shadow-selection-hover border-icon-tertiary w-4 h-4 rounded-full shadow-sm aria-checked:ring-icon-primary aria-checked:border-4 aria-checked:border-icon-primary transition duration-200 enabled:hover:cursor-pointer  disabled:hover:cursor-not-allowed"
      {...props}
    >
      <RadioGroupPrimitive.Indicator />
    </RadioGroupPrimitive.Item>

    <label
      className="text-tertiary font-semibold text-sm peer-hover:cursor-pointer peer-enabled:hover:text-secondary peer-enabled:peer-aria-checked:text-primary duration-200 transition peer-enabled:peer-aria-checked:text-primary peer-enabled:peer-aria-checked:decoration-input-selected"
      htmlFor={id}
    >
      {children}
    </label>
  </RadioGroupPrimitive.Item>
);

export { RadioGroup, RadioItem };
