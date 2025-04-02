import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium font-primary transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:shadow-none transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        outline:
          'border border-[#D4D4D8] bg-transparent !text-secondary-foreground text-opacity-10 hover:bg-[rgba(112,119,128,0.00)] hover:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] focus-visible:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] ',
        ghost:
          'text-[#52525B] bg-[#52525B14] opacity-85 hover:bg-[#52525B14] hover:opacity-100 disabled:text-[#52525B] disabled:bg-[#E4E4E7]',
        solid:
          'bg-[#9061F9] text-[#FFFFFF] hover:shadow-solid disabled:bg-[#E4E4E7] disabled:text-[#52525B] disabled:opacity-45 active:bg-[#7E3AF2]',
        clear: 'bg-transparent text-[#52525B] opacity-85 hover:opacity-100 '
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-3',
        icon: 'h-9 w-9 rounded-full',
        combobox: 'min-h-[36px] px-3 py-2'
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'solid',
      size: 'sm',
      rounded: 'lg'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, children, prefix, suffix, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props}>
        {prefix && <span className="mr-1">{prefix}</span>}
        {children}
        {suffix && <span className="ml-1">{suffix}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
