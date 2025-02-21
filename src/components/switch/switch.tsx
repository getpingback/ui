import React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  highlight?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Switch({ checked, disabled, highlight, onChange }: SwitchProps) {
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
          'relative w-9 h-5 bg-switch-bg hover:bg-switch-bg-hover transition-all shadow-switch rounded-full peer',
          'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full',
          "after:content-[''] after:bg-switch-thumb after:absolute after:top-[2px] after:start-[2px]",
          'after:rounded-full after:h-4 after:w-4 after:transition-all',
          'after:shadow-[0px_0px_4px_0px_#00000052,0px_1px_1px_0px_#00000014]',
          'peer-focus:after:ring-8 peer-focus:after:ring-[#0000000A]',
          highlight
            ? 'peer-checked:bg-switch-highlight peer-checked:hover:bg-switch-highlight-hover peer-checked:peer-focus:after:ring-switch-highlight-ring'
            : 'peer-checked:bg-switch-checked peer-checked:hover:bg-switch-checked-hover peer-checked:peer-focus:after:ring-switch-checked-ring',
          'peer-disabled:bg-gray-300/0 peer-disabled:cursor-not-allowed',
          'peer-disabled:shadow-[inset_0_0_0_1px_rgb(228,228,231)]',
          'peer-disabled:after:bg-switch-thumb-disabled peer-disabled:after:shadow-none'
        )}
      />
    </label>
  );
}

export { Switch };
