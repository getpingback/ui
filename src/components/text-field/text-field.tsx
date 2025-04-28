import React, { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { ExclamationCircleIcon } from '@stash-ui/solid-icons';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
}

const TextField = ({ label, placeholder, value, onChange, error, helperText, disabled, className, prefix, ...props }: TextFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="text-tertiary-foreground text-xs font-semibold leading-4">{label}</label>
      <div className="relative w-full">
        {prefix && <div className="absolute left-2 top-1/2 -translate-y-1/2">{prefix}</div>}
        <input
          className={cn(
            'w-full rounded-lg border h-10 px-3 py-2 text-base leading-none text-tertiary-foreground font-normal transition-all outline-none',
            'placeholder:text-tertiary-foreground placeholder:opacity-65 placeholder:font-normal placeholder:text-sm',
            { 'border-divider-error focus:border-divider-error focus:shadow-text-field-error': error },
            { 'border-divider hover:border-divider-active focus:border-divider-highlighted focus:shadow-text-field': !error },
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
      {error && <span className="text-error-foreground text-sm mt-1">{error}</span>}
      {helperText && !error && <span className="text-secondary-foreground leading-4 text-sm mt-1 opacity-85">{helperText}</span>}
    </div>
  );
};

export { TextField };
