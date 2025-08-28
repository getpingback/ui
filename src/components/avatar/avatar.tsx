import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva('font-black  ', {
  variants: {
    type: {
      gray: 'bg-gray-200 text-gray-800',
      brown: 'bg-brown-200 text-brown-800',
      red: 'bg-red-200 text-red-800',
      orange: 'bg-orange-200 text-orange-800',
      yellow: 'bg-yellow-200 text-yellow-800',
      lime: 'bg-lime-200 text-lime-900',
      green: 'bg-green-200 text-green-800',
      mint: 'bg-mint-200 text-mint-900',
      teal: 'bg-teal-200 text-teal-800',
      cyan: 'bg-cyan-200 text-cyan-900',
      blue: 'bg-blue-200 text-blue-900',
      purple: 'bg-purple-200 text-purple-900',
      fuchsia: 'bg-fucshia-200 text-fucshia-900',
      pink: 'bg-pink-200 text-pink-800'
    },
    size: {
      default: 'w-14 h-14 text-[21px]',
      small: 'w-6 h-6 text-[8px]',
      medium: 'w-8 h-8 text-xs'
    },
    borderSize: {
      none: 'border-none',
      small: 'border-[2px]',
      medium: 'border-[4px]'
    }
  },

  compoundVariants: [
    {
      size: 'default',
      class: 'border-[4px]'
    },
    {
      size: 'small',
      class: 'border-none'
    },
    {
      size: 'medium',
      class: 'border-[2px]'
    }
  ],

  defaultVariants: {
    size: 'default',
    type: 'gray'
  }
});

export const Avatar = ({
  imageUrl,
  fallback,
  size,
  type,
  borderSize
}: {
  imageUrl: string;
  fallback: string;
  size: 'default' | 'small' | 'medium';
  type:
    | 'gray'
    | 'brown'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'mint'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'purple'
    | 'fuchsia'
    | 'pink';
  borderSize?: 'none' | 'small' | 'medium';
}) => {
  return (
    <AvatarPrimitive.Root
      data-testid="avatar-root"
      className={cn(
        avatarVariants({ size, type, borderSize }),
        'inline-flex items-center  border-surface-default justify-center align-middle leading-none tracking-normal overflow-hidden select-none rounded-full'
      )}
    >
      <AvatarPrimitive.Image className="w-full h-full object-cover" src={imageUrl} alt="Avatar" data-testid="avatar-image" />
      <AvatarPrimitive.Fallback
        className="w-full h-full flex items-center justify-center text-inherit"
        delayMs={600}
        data-testid="avatar-fallback"
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
