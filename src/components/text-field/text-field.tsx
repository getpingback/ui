import { cn } from '@/lib/utils';
import React, { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const TextField = ({ label, placeholder, value, onChange, error, helperText, className }: TextFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label>{label}</label>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
      {error && <p className="text-red-500">{error}</p>}
      {helperText && !error && <p className="text-gray-500">{helperText}</p>}
    </div>
  );
};

export { TextField };
