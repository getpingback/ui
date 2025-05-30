import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Spinner } from '@/components/spinner';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium font-primary transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:shadow-none transition-all duration-200 ease-in-out data-[loading=true]:hover:shadow-none data-[loading=true]:pointer-events-none relative',
  {
    variants: {
      variant: {
        outline:
          'border border-button-outlined-border bg-transparent !text-secondary-foreground text-opacity-10 hover:shadow-[0_0_0_3px_var(--button-hover-color)] data-[loading=true]:!bg-button-ghost data-[loading=true]:!border-none',
        ghost:
          'text-secondary-foreground hover:shadow-[0_0_0_3px_var(--button-hover-color)] bg-button-ghost opacity-85 hover:opacity-100 disabled:bg-button-ghost-disabled',
        solid:
          'bg-button-solid text-inverse-foreground hover:shadow-[0_0_0_3px_var(--button-hover-solid-color)] disabled:bg-button-solid-disabled disabled:text-secondary-foreground disabled:opacity-45 active:bg-button-solid-hover data-[loading=true]:!bg-button-ghost',
        clear: 'bg-transparent text-secondary-foreground opacity-85 hover:opacity-100 data-[loading=true]:!bg-button-ghost'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-3'
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
      },
      width: {
        full: 'w-full',
        fit: 'w-fit'
      }
    },
    defaultVariants: {
      variant: 'solid',
      size: 'sm',
      rounded: 'lg',
      width: 'fit'
    }
  }
);

type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'suffix'>;

export interface ButtonProps extends ButtonBaseProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, width, asChild = false, children, prefix, suffix, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, size, rounded, width, className }))} ref={ref} data-loading={isLoading} {...props}>
        <span className={cn('flex items-center w-full justify-between h-full', { 'opacity-0': isLoading })}>
          {prefix && <span className="mr-1">{prefix}</span>}
          {children}
          {suffix && <span className="ml-1">{suffix}</span>}
        </span>

        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <Spinner size="small" variant="gray" />
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
