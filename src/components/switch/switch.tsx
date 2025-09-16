import React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Switch({ checked, disabled, onChange }: SwitchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event);
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only fixed peer" checked={checked} disabled={disabled} onChange={handleChange} />
      <div
        className={cn(
          'relative w-9 h-5 border-inset border-[0.5px] border-[#00000014] bg-button-ghost hover:bg-button-ghost-hover transition-all rounded-full peer transition-all',
          'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full',
          "after:content-[''] after:bg-gray-50 after:absolute after:top-[1px] after:left-[1px] after:right-[1px] after:bottom-[1px] after:start-[1px] after:end-[2px]",
          'after:rounded-full after:h-4 after:w-4 after:transition-all',
          'after:shadow-toggle-indicator',
          'peer-focus:after:shadow-toggle-hover',
          'peer-checked:bg-green-500 peer-checked:hover:bg-green-400 peer-checked:peer-focus:after:shadow-toggle-active-hover',
          'peer-disabled:opacity-65 peer-disabled:cursor-not-allowed '
        )}
      />
    </label>
  );
}

export { Switch };
