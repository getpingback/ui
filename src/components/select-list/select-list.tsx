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
  setSelectedItem: (item: string) => void;
  type: 'single' | 'multiple';
}

const SelectListContext = createContext<SelectListContextType>({
  selectedItem: null,
  setSelectedItem: () => {},
  type: 'single'
});

const SelectList = ({ className, type, defaultValue = '', onChangeValue, children }: SelectListProps) => {
  const [selectedItem, setSelectedItem] = useState<string | string[] | null>(defaultValue);

  const onSelectItem = (value: string) => {
    if (type === 'multiple') {
      if (!selectedItem?.includes(value)) return setSelectedItem((prev) => (Array.isArray(prev) ? [...prev, value] : [value]));

      return setSelectedItem((prev) => (Array.isArray(prev) ? prev.filter((item) => item !== value) : null));
    }

    setSelectedItem(value);
  };

  const handleChangeValue = (value: string) => {
    onSelectItem(value);
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

  const isSelected = type === 'single' ? selectedItem === value : (selectedItem as string[]).includes(value);

  return (
    <div className="w-full">
      <button
        type="button"
        className={cn(
          'w-full flex justify-between border border-default p-4 rounded-2xl gap-2 cursor-pointer transition-all duration-300 hover:border-hover',
          isSelected && 'bg-neutral border-hover shadow-selection-active-hover',
          className
        )}
        onClick={handleClick}
        tabIndex={1}
      >
        <div className={cn('flex gap-4', !description && 'items-center')}>
          {prefix && (
            <span className={cn('text-icon-secondary transition-all duration-300', isSelected && 'text-icon-primary')}>{prefix}</span>
          )}
          <div className="flex flex-col gap-1">
            <Typography weight="semibold" className={cn('transition-all duration-300', isSelected && 'text-primary')}>
              {label}
            </Typography>
            {description && (
              <Typography size="xsmall" type="secondary" className={cn('transition-all duration-300', isSelected && 'text-primary')}>
                {description}
              </Typography>
            )}
          </div>
        </div>

        {(tag || suffix) && (
          <div className="flex items-center gap-2">
            {tag}
            <span className={cn('text-icon-secondary transition-all duration-300', isSelected && 'text-icon-primary')}>{suffix}</span>
          </div>
        )}
      </button>
      <input type="checkbox" className="hidden" value={value} defaultChecked={isSelected} />
    </div>
  );
};

export { SelectList, SelectItem };
