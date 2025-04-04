import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl leading-[100%] font-bold',
      h2: 'text-[32px] leading-[40px] font-bold',
      h3: 'text-2xl leading-[32px] font-bold',
      h4: 'text-xl leading-[32px] font-bold',
      h5: 'text-lg leading-[24px] font-bold',
      h6: 'text-base leading-[150%] font-semibold',
      p: 'text-sm leading-[170%] font-normal',
      span: 'text-sm leading-[145%] font-normal'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    },
    type: {
      primary: 'text-foreground',
      secondary: 'text-secondary-foreground',
      tertiary: 'text-tertiary-foreground'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    },
    lineHeight: {
      large: 'leading-[170%]',
      medium: 'leading-[145%]',
      none: 'leading-none'
    }
  },
  defaultVariants: {
    variant: 'p',
    align: 'left',
    type: 'primary'
  }
});

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
}

const Typography = ({ children, variant, align, type, weight, lineHeight, className, ...props }: TypographyProps) => {
  const Element = variant || 'span';

  return (
    <Element className={cn(typographyVariants({ variant, align, type, weight, lineHeight }), className)} {...props}>
      {children}
    </Element>
  );
};

export type { TypographyProps };
export { Typography };
