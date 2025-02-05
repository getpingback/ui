import * as React from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../button';
import { THEME_COLORS } from './constants';
import { opacityToHex } from './utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  opacity: number;
  onChangeOpacity: (opacity: number) => void;
  onSave?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  saveText?: string;
}

export const ColorPicker = ({
  color = '#000000',
  onChange,
  opacity = 1,
  onChangeOpacity,
  onSave,
  onCancel,
  cancelText = 'Cancel',
  saveText = 'Save'
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace('%', '');
    const value = Math.min(100, Math.max(0, Number(rawValue) || 0));
    const newOpacity = value / 100;
    onChangeOpacity(newOpacity);

    if (newOpacity < 1) {
      const baseColor = color.slice(0, 7);
      onChange(baseColor + opacityToHex(newOpacity));
    }
  };

  const handleOpacityInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const valueLength = Math.round(opacity * 100).toString().length;
    input.setSelectionRange(0, valueLength);
  };

  const handleChangeHexColor = (color: string) => {
    onChange(color);
    onChangeOpacity(1);
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
    <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        <div style={{ backgroundColor: color }} className="w-6 h-6 rounded-md shadow-[0px_0px_0px_1.33px_#00000014_inset] cursor-pointer" />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Content side="bottom" align="start" className="w-[252px] p-4 flex flex-col z-50 rounded-lg shadow-modal">
        <div className="custom-color-picker">
          <HexColorPicker color={color} onChange={handleChangeHexColor} />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex">
            <input
              type="text"
              className="w-full border border-gray-500/10 rounded-l-lg rounded-r-none text-gray-600 text-sm py-2 px-3"
              value={color.toUpperCase()}
              onChange={(e) => onChange(e.target.value)}
            />
            <input
              type="text"
              className="w-full max-w-[60px] border border-gray-500/10 rounded-r-lg rounded-l-none border-l-0 text-gray-600 text-sm py-2 px-[11px]"
              value={`${Math.round(opacity * 100)}%`}
              onChange={handleChangeOpacity}
              onClick={handleOpacityInputClick}
            />
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {THEME_COLORS.map((themeColor) => (
              <div
                key={themeColor}
                style={{ backgroundColor: themeColor }}
                className="w-[13px] h-[13px] rounded-sm cursor-pointer"
                onClick={() => handleChangeHexColor(themeColor)}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="w-full" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleSave}>
              {saveText}
            </Button>
          </div>
        </div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Root>
  );
};
