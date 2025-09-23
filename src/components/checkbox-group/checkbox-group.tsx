import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@stash-ui/solid-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'w-full flex items-center gap-2 rounded-lg duration-200 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'data-[state=unchecked]:hover:bg-neutral-hover data-[state=checked]:bg-neutral-active data-[state=checked]:hover:bg-neutral-active-hover',
        outsideList: 'bg-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onValueChange'> {
  children: React.ReactNode;
  value: string[];
  onValueChange: (value: string[]) => void;
  variant?: 'default' | 'outsideList';
}

interface CheckboxItemProps extends Omit<CheckboxPrimitive.CheckboxProps, 'onCheckedChange'> {
  id: string;
  label?: string;
  value: string;
  variant?: 'default' | 'outsideList';
}

const CheckboxGroupContext = React.createContext<{
  value: string[];
  onValueChange: (value: string[]) => void;
  variant?: 'default' | 'outsideList';
}>({
  value: [],
  onValueChange: () => {},
  variant: undefined
});

const CheckboxGroup = ({ children, className, value, onValueChange, variant = 'default', ...props }: CheckboxGroupProps) => {
  return (
    <CheckboxGroupContext.Provider value={{ value: value, onValueChange: onValueChange, variant }}>
      <div className={cn('flex flex-col gap-1', className)} {...props}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

const CheckboxItem = ({ disabled, label, value, id, variant, className, defaultChecked, ...props }: CheckboxItemProps) => {
  const { value: groupValue, onValueChange, variant: groupVariant } = React.useContext(CheckboxGroupContext);
  const checked = groupValue.includes(value) || props.checked;

  const initialChecked = groupValue.includes(value) || defaultChecked;

  const handleCheckedChange = (isChecked: boolean) => {
    const newValue = isChecked ? [...groupValue, value] : groupValue.filter((v) => v !== value);
    onValueChange(newValue);
  };

  return (
    <div
      data-state={checked ? 'checked' : 'unchecked'}
      className={cn(checkboxVariants({ variant: variant || groupVariant || 'outsideList' }), className)}
    >
      <div className="flex items-center justify-center w-6 h-6 p-2">
        <CheckboxPrimitive.Root
          defaultChecked={initialChecked}
          disabled={disabled}
          id={value}
          onCheckedChange={handleCheckedChange}
          className={cn(
            'min-w-4 min-h-4 relative border-2 border-icon-secondary opacity-65 rounded-md hover:shadow-selection-hover transition-all duration-200',
            {
              'border-icon-primary bg-icon-primary opacity-100 hover:shadow-selection-active-hover': checked,
              'opacity-65 border-icon-tertiary': disabled && !checked,
              'bg-icon-tertiary opacity-65 border-icon-tertiary': checked && disabled
            }
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CheckIcon className="w-4 h-4 text-inverse-primary" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>

      <label
        className={cn('w-full font-primary flex items-start text-tertiary text-sm', {
          'text-primary': checked,
          'opacity-65 cursor-not-allowed': disabled
        })}
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
};

export { CheckboxItem, CheckboxGroup };
