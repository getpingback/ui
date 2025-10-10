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
      info: 'bg-info text-info',
      primary: 'bg-neutral text-neutral',
      success: 'bg-success text-success',
      warning: 'bg-warning text-warning',
      error: 'bg-error text-error'
    }
  }
});

const Callout = ({ title, description, onClose, variant = 'primary', className }: CalloutProps) => {
  const iconColor = {
    info: 'text-info',
    primary: 'text-neutral',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  const currentTextColor = iconColor[variant];

  const currentIconColor = `min-w-6 min-h-6 ${iconColor[variant]} opacity-45`;

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
          {title && (
            <Typography variant="h6" className={currentTextColor}>
              {title}
            </Typography>
          )}
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
