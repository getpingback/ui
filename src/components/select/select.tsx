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
      {label ? (
        <label className="flex items-center text-xs font-semibold text-tertiary-foreground">
          {label}
          {required && <AsteriskIcon color="#52525B" width={16} height={16} opacity={0.45} />}
        </label>
      ) : null}

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
            buttonVariants({
              variant: 'outline',
              size: 'lg',
              className:
                'bg-background-accent hover:bg-background-accent w-full justify-between data-[state=open]:border-[#9061F9] data-[state=open]:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] data-[placeholder]:text-tertiary-foreground data-[placeholder]:opacity-60 data-[placeholder]:font-normal'
            })
          )}
          data-testid="select-trigger"
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            {isOpen ? <CaretUpIcon className="h-4 w-4 shrink-0 opacity-50" /> : <CaretDownIcon className="h-4 w-4 shrink-0 opacity-50" />}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Content className="w-full z-[9999999999] bg-background-accent border-divider rounded-lg shadow-modal overflow-hidden">
          <RadixSelect.Viewport className="w-full">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.isDisabled}
                className={`w-full relative flex items-center justify-between p-3 min-h-[48px] hover:outline-none data-[highlighted]:outline-none data-[highlighted]:text-primary-foreground data-[highlighted]:bg-list-hover ${
                  option.isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="w-full flex flex-col">
                  <RadixSelect.ItemText>
                    <span className="text-secondary-foreground text-sm font-medium">{option.label}</span>
                  </RadixSelect.ItemText>

                  {option.description ? (
                    <span className="text-tertiary-foreground text-xs font-normal mt-1">{option.description}</span>
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

      {helperText ? <span className="text-xs font-normal text-tertiary-foreground mt-1">{helperText}</span> : null}
    </div>
  );
}
