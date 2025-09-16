import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

const spinnerVariants = cva('inline-block ', {
  variants: {
    variant: {
      gray: 'text-icon-secondary'
    },
    size: {
      small: 'w-5 h-5',
      medium: 'w-10 h-10',
      large: 'w-16 h-16',
      extraLarge: 'w-[165px] h-[165px]'
    }
  },
  defaultVariants: {
    size: 'medium',
    variant: 'gray'
  }
});

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  variant?: 'gray';
  strokeSize?: 'small' | 'medium' | 'large';
  className?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'medium', strokeSize = 'small', variant, className, ...props }, ref) => {
    const strokeSizeMap = {
      small: 4,
      medium: 7,
      large: 9
    };

    const stroke = strokeSizeMap[strokeSize];

    return (
      <div ref={ref} data-testid="spinner" className={cn(spinnerVariants({ size, variant }), className)} {...props}>
        <svg className="w-full h-full animate-[spin_1s_linear_infinite]" viewBox="22 22 44 44">
          <circle id="circle" cx="44" cy="44" r="12" fill="none" className="stroke-background-neutral-active" strokeWidth={stroke} />
          <circle
            id="gradient-circle"
            cx="44"
            cy="44"
            r="12"
            fill="none"
            strokeWidth={stroke}
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray="80, 100"
            strokeDashoffset="45"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
