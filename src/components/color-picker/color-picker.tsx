import * as React from 'react';

import { cn } from '@/lib/utils';
import { HexColorPicker } from 'react-colorful';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { Button } from '../button';
import { getInitialOpacity, opacityToHex } from './utils';
import { THEME_COLORS } from './constants';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  saveText?: string;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export const ColorPicker = ({
  color = '#000000',
  onChange,
  onSave,
  onCancel,
  cancelText = 'Cancel',
  saveText = 'Save',
  side = 'bottom',
  align = 'start',
  className
}: ColorPickerProps) => {
  const initialOpacity = getInitialOpacity(color);
  const [isOpen, setIsOpen] = React.useState(false);
  const [opacity, setOpacity] = React.useState(initialOpacity);

  const handleChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace('%', '');
    const value = Math.min(100, Math.max(0, Number(rawValue) || 0));
    const newOpacity = value / 100;
    setOpacity(newOpacity);

    const baseColor = color.slice(0, 7);

    if (newOpacity < 1) return onChange(baseColor + opacityToHex(newOpacity));

    return onChange(baseColor);
  };

  const handleOpacityInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const valueLength = Math.round(opacity * 100).toString().length;
    input.setSelectionRange(0, valueLength);
  };

  const hasHash = color.startsWith('#');

  const handleHexInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidHex = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6})$/i.test(value);

    if (!hasHash && isValidHex) return onChange(`#${value}`);

    if (!isValidHex) return onChange('#000000');
  };

  const handleChangeHexColor = (color: string) => {
    onChange(color);
    setOpacity(1);
  };

  const handleSave = () => {
    setIsOpen(false);
    onSave?.();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel?.();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          style={{ backgroundColor: hasHash ? color : `#${color}` }}
          className="w-6 h-6 rounded-md shadow-[0px_0px_0px_1.33px_#00000014_inset] cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent side={side} align={align} className={cn('w-[252px] flex flex-col', className)} data-testid="color-picker-dialog">
        <div className="custom-color-picker">
          <HexColorPicker color={color} onChange={handleChangeHexColor} />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex">
            <input
              type="text"
              className="w-full bg-surface border border-default rounded-l-lg rounded-r-none text-gray-600 text-sm py-2 px-3"
              value={color.toUpperCase()}
              onChange={(e) => onChange(e.target.value)}
              onBlur={handleHexInputBlur}
            />
            <input
              type="text"
              className="w-full max-w-[60px] bg-surface border border-default rounded-r-lg rounded-l-none border-l-0 text-gray-600 text-sm py-2 px-[11px]"
              value={`${Math.round(opacity * 100)}%`}
              onChange={handleChangeOpacity}
              onClick={handleOpacityInputClick}
            />
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {THEME_COLORS.map((themeColor) => (
              <div
                key={themeColor}
                data-testid="theme-color"
                style={{ backgroundColor: themeColor }}
                className="w-4 h-4 rounded-[4px] cursor-pointer"
                onClick={() => handleChangeHexColor(themeColor)}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="clear" width="full" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button variant="outline" width="full" onClick={handleSave}>
              {saveText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
