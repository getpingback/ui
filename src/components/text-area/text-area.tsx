import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { AsteriskIcon } from '@stash-ui/solid-icons';
import { cn } from '@/lib/utils';
import { Tooltip } from '../tooltip';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode | string;
  error?: string;
  helperText?: string;
  defaultHeight?: number;
  tooltipText?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, placeholder, value, onChange, error, helperText, disabled, className, defaultHeight = 112, tooltipText, required, ...props },
    ref
  ) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label className="text-tertiary text-xs font-semibold leading-4 flex items-center [&_svg]:text-icon-tertiary [&_[data-testid='tooltip-trigger']]:ml-1">
          {label}
          {tooltipText && <Tooltip>{tooltipText}</Tooltip>}
          {required && <AsteriskIcon width={16} height={16} opacity={0.45} />}
        </label>
        <div className="relative w-full">
          <textarea
            ref={ref}
            className={cn(
              'w-full rounded-2xl bg-surface border h-10 px-3 py-2 text-sm leading-5 text-tertiary font-normal transition-all outline-none',
              'placeholder:text-tertiary placeholder:opacity-65 placeholder:font-normal placeholder:text-sm',
              { 'border-invalid focus:border-invalid focus:shadow-input-focus-invalid': error },
              {
                'border-default hover:border-hover focus:border-hover focus:shadow-input-focus-neutral': !error
              },
              { 'bg-neutral cursor-not-allowed opacity-85 hover:border-default': disabled },
              'resize-none'
            )}
            style={{ height: defaultHeight }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
        </div>
        {error && <span className="text-error text-xs">{error}</span>}
        {helperText && !error && <span className="text-tertiary leading-4 text-xs opacity-85">{helperText}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
