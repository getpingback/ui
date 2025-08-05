import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { ExclamationCircleIcon } from '@stash-ui/regular-icons';
import { AsteriskIcon } from '@stash-ui/solid-icons';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  required?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, placeholder, value, onChange, error, helperText, disabled, className, required, prefix, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label className={cn('text-tertiary-foreground text-xs font-semibold leading-4 flex items-center', { 'opacity-85': disabled })}>
            {label}
            {required && <AsteriskIcon color="#52525B" width={16} height={16} opacity={0.45} />}
          </label>
        )}
        <div className="relative w-full">
          {prefix && <div className={cn('absolute left-2 top-1/2 -translate-y-1/2', { 'opacity-45': disabled })}>{prefix}</div>}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-lg border h-10 px-3 py-2 text-sm leading-none text-tertiary-foreground font-normal transition-all outline-none',
              'placeholder:text-tertiary-foreground placeholder:opacity-65 placeholder:font-normal placeholder:text-sm',
              { 'border-divider-error focus:border-divider-error focus:shadow-[0_0_0_3px_var(--background-error)]': error },
              {
                'border-divider hover:border-divider-active focus:border-divider-highlighted focus:shadow-[0_0_0_3px_var(--button-hover-solid-color)]':
                  !error
              },
              { 'border-divider-disabled hover:border-divider-disabled cursor-not-allowed': disabled },
              { 'pl-10': prefix }
            )}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          {error && <ExclamationCircleIcon className="w-6 h-6 text-red-500 absolute right-2 top-1/2 -translate-y-1/2" />}
        </div>
        {error && <span className="text-error-foreground text-xs">{error}</span>}
        {helperText && !error && <span className="text-secondary-foreground leading-4 text-xs opacity-85">{helperText}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };
