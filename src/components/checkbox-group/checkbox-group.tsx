import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@stash-ui/solid-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'w-full flex items-center gap-4 duration-200 transition py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        highlight: 'enabled:data-[state=unchecked]:hover:bg-list-hover data-[state=checked]:bg-list-actived'
      },
      rounded: {
        default: 'rounded-md',
        lg: 'rounded-lg',
        none: 'rounded-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default'
    }
  }
);

interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onValueChange'> {
  children: React.ReactNode;
  value: string[];
  onValueChange: (value: string[]) => void;
  variant?: 'default' | 'highlight';
  rounded?: 'default' | 'lg' | 'none';
}

interface CheckboxItemProps extends Omit<CheckboxPrimitive.CheckboxProps, 'checked' | 'onCheckedChange'> {
  id: string;
  label?: string;
  value: string;
  variant?: 'default' | 'highlight';
  rounded?: 'default' | 'lg' | 'none';
}

const CheckboxGroupContext = React.createContext<{
  value: string[];
  onValueChange: (value: string[]) => void;
  variant: 'default' | 'highlight';
  rounded: 'default' | 'lg' | 'none';
}>({
  value: [],
  onValueChange: () => {},
  variant: 'default',
  rounded: 'default'
});

const CheckboxGroup = ({
  children,
  className,
  value,
  onValueChange,
  variant = 'default',
  rounded = 'default',
  ...props
}: CheckboxGroupProps) => {
  return (
    <CheckboxGroupContext.Provider value={{ value: value, onValueChange: onValueChange, variant: variant, rounded: rounded }}>
      <div className={cn('flex flex-col gap-1', className)} {...props}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

const CheckboxItem = ({ disabled, label, value, variant = 'default', rounded, ...props }: CheckboxItemProps) => {
  const { value: groupValue, onValueChange, variant: groupVariant, rounded: groupRounded } = React.useContext(CheckboxGroupContext);
  const checked = groupValue.includes(value);

  const handleCheckedChange = (isChecked: boolean) => {
    const newValue = isChecked ? [...groupValue, value] : groupValue.filter((v) => v !== value);
    onValueChange(newValue);
  };

  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={handleCheckedChange}
      className={cn(checkboxVariants({ variant: groupVariant, rounded: groupRounded }))}
      data-checked={checked}
      disabled={disabled}
      {...props}
    >
      <div className="relative group">
        <div
          className="absolute inset-0 rounded-full transition-all group-hover:[&:not([data-disabled=true])]:data-[state=checked]:shadow-[0px_0px_0px_8px_#9061F914] group-hover:[&:not([data-disabled=true])]:data-[state=unchecked]:shadow-[0px_0px_0px_8px_#6B728014]"
          data-state={checked ? 'checked' : 'unchecked'}
          data-disabled={disabled}
        />
        <div className="relative flex items-center justify-center opacity-85 w-[15.5px] h-[15.5px] max-h-[15.5px] aria-checked:ring-input-selected-hover rounded border border-input-hover data-[state=checked]:border-none bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-border-card-active data-[state=checked]:text-primary-foreground">
          <CheckboxPrimitive.Indicator className="flex items-center z-10 justify-center data-[state=checked]:text-inverse-foreground rounded data-[state=checked]:bg-border-card-active w-[15.5px] h-[15.5px]">
            <CheckIcon className="w-4 h-4" />
          </CheckboxPrimitive.Indicator>
        </div>
      </div>

      <label
        className={cn(' w-full font-primary flex items-start text-list-label text-sm', {
          'text-list-label-active': checked,
          'opacity-50 cursor-not-allowed': disabled
        })}
        htmlFor={value}
      >
        {label}
      </label>
    </CheckboxPrimitive.Root>
  );
};

export { CheckboxItem, CheckboxGroup };
