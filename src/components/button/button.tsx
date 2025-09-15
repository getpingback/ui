import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Spinner } from '@/components/spinner';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center whitespace-nowrap text-sm font-semibold font-primary transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:shadow-none transition-all duration-200 ease-in-out data-[loading=true]:hover:shadow-none data-[loading=true]:pointer-events-none relative',
  {
    variants: {
      variant: {
        primary: 'animate-brand-gradient',
        solid: 'bg-button-solid text-button-solid-label hover:bg-button-solid-hover',
        ghost:
          'bg-button-ghost text-button-outlined-label hover:bg-button-ghost-hover focus:bg-button-ghost-pressed active:bg-button-ghost-pressed',
        outline:
          'border border-button-outlined bg-transparent text-button-outlined-label hover:border-button-outlined-hover hover:shadow-outlined disabled:hover:border-button-outlined focus:shadow-none active:shadow-none focus:border-button-outlined-pressed active:border-button-outlined-pressed',
        danger: 'bg-red-500 text-gray-50 hover:bg-red-600',
        clear: 'text-button-clear-label'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-3'
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        xl: 'rounded-xl',
        full: 'rounded-full'
      },
      width: {
        full: 'w-full',
        fit: 'w-fit'
      },
      align: {
        center: '[&>span]:justify-center justify-center',
        between: '[&>span]:justify-between justify-between',
        start: '[&>span]:justify-start justify-start',
        end: '[&>span]:justify-end justify-end'
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'sm',
        className: 'h-8 p-[2px]'
      },
      {
        variant: 'primary',
        size: 'lg',
        className: 'h-10 p-[2px]'
      },
      { variant: 'primary', rounded: 'sm', className: '[&>div]:rounded-sm' },
      { variant: 'primary', rounded: 'md', className: '[&>div]:rounded-[4px]' },
      { variant: 'primary', rounded: 'xl', className: '[&>div]:rounded-[10px]' },
      { variant: 'primary', rounded: 'full', className: '[&>div]:rounded-full' }
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'sm',
      rounded: 'xl',
      width: 'fit',
      align: 'center'
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
  ({ className, variant, size, rounded, width, asChild = false, children, prefix, suffix, isLoading = false, align, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, width, className, align }))}
        ref={ref}
        data-loading={isLoading}
        {...props}
      >
        {variant === 'primary' ? (
          <div
            className={cn(
              'px-3 !h-full transition-all duration-200 ease-in-out hover:translate-y-[-2px] focus:translate-y-[2px] active:translate-y-[2px]',
              buttonVariants({ variant: 'solid', width, align, rounded })
            )}
          >
            <ButtonContent isLoading={isLoading} prefix={prefix} suffix={suffix}>
              {children}
            </ButtonContent>
          </div>
        ) : (
          <ButtonContent isLoading={isLoading} prefix={prefix} suffix={suffix}>
            {children}
          </ButtonContent>
        )}
      </Comp>
    );
  }
);

const ButtonContent = React.forwardRef<
  HTMLSpanElement,
  { children: React.ReactNode; isLoading: boolean; prefix: React.ReactNode; suffix: React.ReactNode }
>(({ children, isLoading, prefix, suffix }, ref) => {
  return (
    <>
      <span ref={ref} className={cn('flex items-center w-full gap-1 h-full [&>span]:h-full', { 'opacity-0': isLoading })}>
        {prefix && <span className="flex items-center">{prefix}</span>}
        {children}
        {suffix && <span className="flex items-center">{suffix}</span>}
      </span>

      {isLoading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <Spinner size="small" variant="gray" />
        </span>
      )}
    </>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
