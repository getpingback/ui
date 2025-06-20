import { cva } from 'class-variance-authority';
import React from 'react';
import { Typography } from '../typography';
import { Button } from '../button';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesCircleIcon } from '@stash-ui/solid-icons';
import { cn } from '@/lib/utils';

interface CalloutProps {
  title: string;
  description: string | React.ReactNode;
  onClose?: () => void;
  variant?: 'info' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const calloutVariants = cva('flex gap-4 justify-between rounded-lg p-4', {
  variants: {
    variant: {
      info: 'bg-callout-info text-callout-info-foreground',
      primary: 'bg-callout-primary text-callout-primary-foreground',
      success: 'bg-callout-success text-callout-success-foreground',
      warning: 'bg-callout-warning text-callout-warning-foreground',
      error: 'bg-callout-error text-callout-error-foreground'
    }
  }
});

const Callout = ({ title, description, onClose, variant = 'info', className }: CalloutProps) => {
  const iconColor = {
    info: 'text-callout-info-foreground',
    primary: 'text-callout-primary-foreground',
    success: 'text-callout-success-foreground',
    warning: 'text-callout-warning-foreground',
    error: 'text-callout-error-foreground'
  };

  const currentTextColor = iconColor[variant];

  const currentIconColor = `${iconColor[variant]} opacity-45`;

  const icon = {
    info: <InfoCircleIcon className={currentIconColor} />,
    primary: <InfoCircleIcon className={currentIconColor} />,
    success: <CheckCircleIcon className={currentIconColor} />,
    warning: <ExclamationTriangleIcon className={currentIconColor} />,
    error: <ExclamationCircleIcon className={currentIconColor} />
  };

  return (
    <div className={cn(calloutVariants({ variant }), className)} data-testid="callout">
      <div className="flex gap-4">
        {icon[variant]}
        <div className="flex flex-col gap-1">
          <Typography variant="h6" className={currentTextColor}>
            {title}
          </Typography>
          <Typography variant="span" className={currentTextColor}>
            {description}
          </Typography>
        </div>
      </div>
      {onClose && (
        <Button variant="clear" size="sm" onClick={onClose} className="p-0">
          <TimesCircleIcon className={currentIconColor} />
        </Button>
      )}
    </div>
  );
};

export { Callout };
