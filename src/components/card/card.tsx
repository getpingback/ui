import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'flex flex-col rounded-lg border bg-background-accent border-border-card',
  {
    variants: {
      radius: {
        none: 'rounded-none',
        rounded: 'rounded-lg',
      },
    },

    defaultVariants: {
      radius: 'rounded',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, radius, ...props }: CardProps) {
  return (
    <div
      data-testid='card'
      className={cn(cardVariants({ radius }), className)}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-testid='card-header'
      className={cn('inline-flex items-center', className)}
      {...props}
    />
  );
}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div data-testid='card-content' className={cn('', className)} {...props} />
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-testid='card-footer'
      className={cn('flex items-center', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter };
