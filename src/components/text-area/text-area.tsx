import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { AsteriskIcon } from '@stash-ui/solid-icons';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  defaultHeight?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, value, onChange, error, helperText, disabled, className, defaultHeight = 112, required, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label className={cn('text-tertiary-foreground text-xs font-semibold leading-4 flex items-center', { 'opacity-85': disabled })}>
          {label}
          {required && <AsteriskIcon color="#52525B" width={16} height={16} opacity={0.45} />}
        </label>
        <div className="relative w-full">
          <textarea
            ref={ref}
            className={cn(
              'w-full rounded-lg border h-10 px-3 py-2 text-sm leading-none text-tertiary-foreground font-normal transition-all outline-none',
              'placeholder:text-tertiary-foreground placeholder:opacity-65 placeholder:font-normal placeholder:text-sm',
              { 'border-divider-error focus:border-divider-error focus:shadow-text-field-error': error },
              { 'border-divider hover:border-divider-active focus:border-divider-highlighted focus:shadow-text-field': !error },
              { 'border-divider-disabled hover:border-divider-disabled cursor-not-allowed': disabled },
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
        {error && <span className="text-error-foreground text-xs ">{error}</span>}
        {helperText && !error && <span className="text-secondary-foreground leading-4 text-xs opacity-85">{helperText}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
