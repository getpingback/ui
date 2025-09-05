import React, { InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { CheckCircleIcon, TimesCircleIcon } from '@stash-ui/solid-icons';
import { AsteriskIcon } from '@stash-ui/solid-icons';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  prefix?: React.ReactNode;
  required?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, placeholder, value, onChange, error, success, helperText, disabled, className, required, prefix, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label className="text-tertiary text-xs font-semibold leading-4 flex items-center [&_svg]:text-icon-tertiary">
            {label}
            {required && <AsteriskIcon width={16} height={16} opacity={0.45} />}
          </label>
        )}
        <div className="relative w-full">
          {prefix && (
            <div className={cn('absolute left-2 top-1/2 -translate-y-1/2 [&_svg]:text-icon-tertiary', { 'opacity-45': disabled })}>
              {prefix}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-2xl !bg-surface border h-10 px-3 py-2 text-sm leading-none text-tertiary font-normal transition-all outline-none',
              'placeholder:text-tertiary placeholder:opacity-65 placeholder:font-normal placeholder:text-sm',
              { 'border-invalid focus:border-invalid focus:shadow-input-focus-invalid': error },
              { 'border-default hover:border-hover focus:border-hover focus:shadow-input-focus-neutral': !error },
              { 'border-valid hover:border-valid focus:shadow-input-focus-valid': success },
              { 'border-none bg-neutral cursor-not-allowed opacity-85': disabled },
              { 'pl-10': prefix }
            )}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          {error && <TimesCircleIcon className="w-6 h-6 text-error absolute right-2 top-1/2 -translate-y-1/2" />}
          {success && <CheckCircleIcon className="w-6 h-6 text-success absolute right-2 top-1/2 -translate-y-1/2" />}
        </div>
        {error && <span className="text-error text-xs">{error}</span>}
        {helperText && !error && <span className="text-tertiary leading-4 text-xs opacity-85">{helperText}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };
