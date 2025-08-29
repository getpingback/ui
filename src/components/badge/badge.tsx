import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { BADGE_TYPES, BADGE_VARIANTS } from './constants';

const toNullMap = <T extends readonly string[]>(arr: T) => Object.fromEntries(arr.map((v) => [v, null])) as Record<T[number], null>;

const badgeVariants = cva('flex items-center rounded-full font-bold text-[10px] leading-[1.75] h-6 px-2 uppercase', {
  variants: {
    type: toNullMap(BADGE_TYPES),
    variant: toNullMap(BADGE_VARIANTS)
  },

  compoundVariants: [
    {
      type: 'gray',
      variant: 'solid',
      className: 'bg-gray-600 text-gray-50'
    },
    {
      type: 'gray',
      variant: 'ghost',
      className: 'bg-neutral text-neutral'
    },
    {
      type: 'gray',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-neutral text-neutral'
    },
    {
      type: 'green',
      variant: 'solid',
      className: 'bg-green-600 text-green-50'
    },
    {
      type: 'green',
      variant: 'ghost',
      className: 'bg-success text-success'
    },
    {
      type: 'green',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-success text-success'
    },
    {
      type: 'red',
      variant: 'solid',
      className: 'bg-red-600 text-red-50'
    },
    {
      type: 'red',
      variant: 'ghost',
      className: 'bg-error text-error'
    },
    {
      type: 'red',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-error text-error'
    },
    {
      type: 'yellow',
      variant: 'solid',
      className: 'bg-yellow-500 text-yellow-50'
    },
    {
      type: 'yellow',
      variant: 'ghost',
      className: 'bg-warning text-warning'
    },
    {
      type: 'yellow',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-warning text-warning'
    },
    {
      type: 'orange',
      variant: 'solid',
      className: 'bg-orange-500 text-orange-50'
    },
    {
      type: 'orange',
      variant: 'ghost',
      className: 'bg-caution text-caution'
    },
    {
      type: 'orange',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-caution text-caution'
    },
    {
      type: 'purple',
      variant: 'solid',
      className: 'bg-purple-600 text-purple-50'
    },
    {
      type: 'purple',
      variant: 'ghost',
      className: 'bg-info text-info'
    },
    {
      type: 'purple',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-info text-info'
    },
    {
      type: 'lime',
      variant: 'solid',
      className: 'bg-lime-600 text-lime-50'
    },
    {
      type: 'lime',
      variant: 'ghost',
      className: 'bg-lime text-lime'
    },
    {
      type: 'lime',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-lime text-lime'
    },
    {
      type: 'mint',
      variant: 'solid',
      className: 'bg-mint-500 text-mint-50'
    },
    {
      type: 'mint',
      variant: 'ghost',
      className: 'bg-mint text-mint'
    },

    {
      type: 'mint',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-mint text-mint'
    },
    {
      type: 'teal',
      variant: 'solid',
      className: 'bg-teal-500 text-teal-50'
    },
    {
      type: 'teal',
      variant: 'ghost',
      className: 'bg-teal text-teal'
    },
    {
      type: 'teal',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-teal text-teal'
    },
    {
      type: 'cyan',
      variant: 'solid',
      className: 'bg-cyan-600 text-cyan-50'
    },
    {
      type: 'cyan',
      variant: 'ghost',
      className: 'bg-cyan text-cyan'
    },
    {
      type: 'cyan',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-cyan text-cyan'
    },
    {
      type: 'blue',
      variant: 'solid',
      className: 'bg-blue-500 text-blue-50'
    },
    {
      type: 'blue',
      variant: 'ghost',
      className: 'bg-blue text-blue'
    },
    {
      type: 'blue',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-blue text-blue'
    },
    {
      type: 'fuchsia',
      variant: 'solid',
      className: 'bg-fuchsia-500 text-fuchsia-50'
    },
    {
      type: 'fuchsia',
      variant: 'ghost',
      className: 'bg-fuchsia text-fuchsia'
    },
    {
      type: 'fuchsia',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-fuchsia text-fuchsia'
    },
    {
      type: 'pink',
      variant: 'solid',
      className: 'bg-pink-500 text-pink-50'
    },
    {
      type: 'pink',
      variant: 'ghost',
      className: 'bg-pink text-pink'
    },
    {
      type: 'pink',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-pink text-pink'
    },
    {
      type: 'surface',
      variant: 'solid',
      className: 'bg-surface-inverse text-inverse-primary'
    },
    {
      type: 'surface',
      variant: 'ghost',
      className: 'bg-neutral text-primary'
    },
    {
      type: 'surface',
      variant: 'outline',
      className: 'bg-transparent border-2 border-background-neutral text-primary'
    }
  ],
  defaultVariants: {
    type: 'gray',
    variant: 'ghost'
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, type, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, type }), className)} {...props} />;
}

export { Badge, badgeVariants };
