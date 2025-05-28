import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '../typography';

export interface SelectListProps {
  className?: string;
  type: 'single' | 'multiple';
  defaultValue?: string | string[];
  onChangeValue: (value: string | string[]) => void;
  children: React.ReactNode;
}

export interface SelectItemProps {
  className?: string;
  value: string;
  label: string;
  description?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  tag?: React.ReactNode;
  onClick?: () => void;
}

export interface SelectListContextType {
  selectedItem: string | string[] | null;
  setSelectedItem: (item: string | string[]) => void;
  type: 'single' | 'multiple';
}

const SelectListContext = createContext<SelectListContextType>({
  selectedItem: null,
  setSelectedItem: () => {},
  type: 'single'
});

const SelectList = ({ className, type, defaultValue = '', onChangeValue, children }: SelectListProps) => {
  const [selectedItem, setSelectedItem] = useState<string | string[] | null>(defaultValue);

  const handleChangeValue = (value: string | string[]) => {
    setSelectedItem(value);
    onChangeValue(value);
  };

  return (
    <SelectListContext.Provider value={{ selectedItem, setSelectedItem: handleChangeValue, type }}>
      <div className={cn('flex flex-col gap-3', className)}>{children}</div>
    </SelectListContext.Provider>
  );
};

const SelectItem = ({ className, onClick, value, label, description, prefix, suffix, tag }: SelectItemProps) => {
  const { selectedItem, setSelectedItem, type } = useContext(SelectListContext);

  const handleClick = () => {
    setSelectedItem(value);
    onClick?.();
  };

  return (
    <button
      type="button"
      className={cn(
        'flex justify-between border border-border-card-light p-4 rounded-xl gap-2 cursor-pointer',
        selectedItem === value && 'bg-gray-100',
        className
      )}
      onClick={handleClick}
    >
      <div className={cn('flex gap-2', !description && 'items-center')}>
        <span className="text-gray-600">{prefix}</span>
        <div className="flex flex-col gap-1">
          <Typography weight="semibold">{label}</Typography>
          {description && <Typography size="xsmall">{description}</Typography>}
        </div>
      </div>

      {(tag || suffix) && (
        <div className="flex items-center gap-2">
          {tag}
          <span className="text-gray-600">{suffix}</span>
        </div>
      )}
    </button>
  );
};

export { SelectList, SelectItem };
