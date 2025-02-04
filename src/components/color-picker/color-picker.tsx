import * as React from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { RgbaColorPicker } from 'react-colorful';
import { Button } from '../button';
import { THEME_COLORS } from './constants';
import { convertToHex, convertToRgba } from './utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  saveText?: string;
}

export const ColorPicker = ({
  color = '#000000',
  onChange,
  onSave,
  onCancel,
  cancelText = 'Cancel',
  saveText = 'Save'
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const transparencyColor = convertToRgba(color).a * 100;

  const handleTransparencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
          <RgbaColorPicker color={convertToRgba(color)} onChange={(color) => onChange(convertToHex(color))} />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex">
            <input
              type="text"
              className="w-full border border-gray-500/10 rounded-l-md rounded-r-none color-gray-600 text-sm p-2"
              value={color.toUpperCase()}
              onChange={(e) => onChange(e.target.value)}
            />
            <input
              type="text"
              className="w-full max-w-[60px] border border-gray-500/10 rounded-r-md rounded-l-none border-l-0 color-gray-600 text-sm p-2"
              value={`${transparencyColor}%`}
              onChange={handleTransparencyChange}
            />
          </div>
          <div className="flex flex-wrap gap-[9px]">
            {THEME_COLORS.map((themeColor) => (
              <div
                key={themeColor}
                style={{ backgroundColor: themeColor }}
                className="w-[13px] h-[13px] rounded-sm cursor-pointer"
                onClick={() => onChange(themeColor)}
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
