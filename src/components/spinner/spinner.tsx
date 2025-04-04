import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

const spinnerVariants = cva('inline-block ', {
  variants: {
    variant: {
      purple: 'text-purple-500',
      gray: 'text-gray-500',
      purpleGradient: '[&_#gradient-circle]:stroke-[url(#gradient)] [&_#circle]:stroke-[#71717A14]'
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
    variant: 'purple'
  }
});

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  variant?: 'purple' | 'gray' | 'purpleGradient';
  strokeSize?: 'small' | 'medium' | 'large';
  className?: string;
}

const Spinner = ({ size = 'medium', strokeSize = 'small', variant, className }: SpinnerProps) => {
  const strokeSizeMap = {
    small: 3.6,
    medium: 5,
    large: 7
  };

  const stroke = strokeSizeMap[strokeSize];

  return (
    <div role="status" className={cn(spinnerVariants({ size, variant }), className)}>
      <svg className="w-full h-full animate-[spin_1s_linear_infinite]" viewBox="22 22 44 44">
        <defs>
          <linearGradient id="gradient">
            <stop offset="-17.21%" stopColor="#9061F9" />
            <stop offset="62.18%" stopColor="#9061F9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle id="circle" cx="44" cy="44" r="12" fill="none" strokeWidth={stroke} />
        <circle
          id="gradient-circle"
          className="opacity-65"
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
};

export { Spinner };
