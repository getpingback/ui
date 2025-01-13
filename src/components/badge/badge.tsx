import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center px-2.5 py-0.5 text-xs font-semibold w-fit', {
  variants: {
    type: {
      green: 'bg-badge-green text-badge-green-foreground',
      gray: 'bg-badge-gray text-badge-gray-foreground',
      teal: 'bg-badge-teal text-badge-teal-foreground',
      red: 'bg-badge-red text-badge-red-foreground',
      yellow: 'bg-badge-yellow text-badge-yellow-foreground',
      purple: 'bg-badge-purple text-badge-purple-foreground',
      orange: 'bg-badge-orange text-badge-orange-foreground'
    },
    variant: {
      outline: 'bg-transparent',
      ghost: 'border-none'
    },
    radius: {
      full: 'rounded-full',
      medium: 'rounded-md'
    },
    transform: {
      uppercase: 'uppercase'
    }
  },
  compoundVariants: [
    {
      variant: 'outline',
      type: 'green',
      className: 'border border-badge-green'
    },
    {
      variant: 'outline',
      type: 'gray',
      className: 'border border-badge-gray'
    },
    {
      variant: 'outline',
      type: 'teal',
      className: 'border border-badge-teal'
    },
    {
      variant: 'outline',
      type: 'red',
      className: 'border border-badge-red'
    },
    {
      variant: 'outline',
      type: 'yellow',
      className: 'border border-badge-yellow'
    },
    {
      variant: 'outline',
      type: 'purple',
      className: 'border border-badge-purple'
    }
  ],
  defaultVariants: {
    type: 'purple',
    radius: 'full',
    variant: 'ghost'
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, type, radius, transform, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, type, radius, transform }), className)} {...props} />;
}

export { Badge, badgeVariants };
