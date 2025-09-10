import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { CaretDownIcon, CaretUpIcon, CheckIcon } from '@stash-ui/regular-icons';
import { AsteriskIcon } from '@stash-ui/solid-icons';
import { buttonVariants } from '../button';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  description?: string;
  isDisabled?: boolean;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onValueChange: (option?: Option) => void;
  disabled?: boolean;
}

export function Select({ label, helperText, placeholder, options, value, defaultValue, onValueChange, disabled, required }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value);

  React.useEffect(() => {
    defaultValue && setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const selectedOption = options.find((option) => option.value === value);
    onValueChange(selectedOption);
  };

  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && (
        <label className="text-tertiary text-xs font-semibold leading-4 flex items-center [&_svg]:text-icon-tertiary">
          {label}
          {required && <AsteriskIcon width={16} height={16} opacity={0.45} />}
        </label>
      )}

      <RadixSelect.Root
        value={selectedValue}
        onValueChange={handleValueChange}
        onOpenChange={setIsOpen}
        disabled={disabled}
        required={required}
      >
        <RadixSelect.Trigger
          aria-label={label}
          className={cn(
            'w-full flex justify-between items-center rounded-2xl bg-surface border h-10 px-3 py-2 text-sm leading-none text-tertiary font-normal transition-all outline-none'
          )}
          data-testid="select-trigger"
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className=" flex items-center justify-center [&_svg_path]:fill-icon-tertiary">
            {isOpen ? <CaretUpIcon className="h-4 w-4 shrink-0 opacity-50" /> : <CaretDownIcon className="h-4 w-4  shrink-0 opacity-50" />}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Content className="w-full z-[9999999999] bg-surface border-default rounded-2xl shadow-modal-5 overflow-hidden">
          <RadixSelect.Viewport className="w-full">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.isDisabled}
                className={`w-full relative flex items-center justify-between p-3 min-h-[48px] hover:outline-none hover:bg-neutral-hover data-[highlighted]:outline-none data-[highlighted]:text-tertiary data-[highlighted]:bg-neutral-active ${
                  option.isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="w-full flex flex-col">
                  <RadixSelect.ItemText>
                    <span className="text-tertiary text-sm font-normal">{option.label}</span>
                  </RadixSelect.ItemText>

                  {option.description ? (
                    <span className="text-tertiary text-xs font-normal mt-1 opacity-65">{option.description}</span>
                  ) : null}
                </div>

                <RadixSelect.ItemIndicator>
                  <CheckIcon />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Root>

      {helperText ? <span className="text-tertiary leading-4 text-xs opacity-85">{helperText}</span> : null}
    </div>
  );
}
