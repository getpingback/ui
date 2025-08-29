import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeTypesOptions = [
  'gray',
  'green',
  'red',
  'yellow',
  'orange',
  'purple',
  'lime',
  'mint',
  'teal',
  'cyan',
  'blue',
  'fuchsia',
  'pink',
  'surface'
];
const badgeVariantOptions = ['solid', 'ghost', 'outline'];

const toNullMap = <T extends readonly string[]>(arr: T) => Object.fromEntries(arr.map((v) => [v, null])) as Record<T[number], null>;

const badgeVariants = cva('flex items-center rounded-full font-bold text-[10px] leading-[1.75] h-6 px-2 uppercase', {
  variants: {
    type: toNullMap(badgeTypesOptions),
    variant: toNullMap(badgeVariantOptions)
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
