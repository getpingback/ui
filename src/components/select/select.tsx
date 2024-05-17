import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { CaretDownIcon, CaretUpIcon, CheckIcon } from "@stash-ui/regular-icons";
import { buttonVariants } from "../button";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onValueChange: (option?: Option) => void;
}

export function Select({ label, helperText, placeholder, options, value, onValueChange }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const selectedOption = options.find((option) => option.value === value);
    onValueChange(selectedOption);
  };

  return (
    <div className='flex flex-col items-start gap-1 w-full'>
      {label ? <label className='text-xs font-semibold text-tertiary-foreground'>{label}</label> : null}

      <RadixSelect.Root value={selectedValue} onValueChange={handleValueChange} onOpenChange={setIsOpen}>
        <RadixSelect.Trigger
          aria-label={label}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "combobox",
              className:
                "bg-background-accent hover:bg-background-accent w-full justify-between data-[state=open]:border-[#9061F9] data-[state=open]:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] data-[placeholder]:text-tertiary-foreground data-[placeholder]:opacity-60 data-[placeholder]:font-normal",
            })
          )}
          data-testid='select-trigger'
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            {isOpen ? (
              <CaretUpIcon className='h-4 w-4 shrink-0 opacity-50' />
            ) : (
              <CaretDownIcon className='h-4 w-4 shrink-0 opacity-50' />
            )}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Content className='z-[9999999999] bg-background-accent border-divider rounded-lg shadow-modal overflow-hidden'>
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className='relative flex items-center justify-between p-3 min-h-[48px] hover:outline-none data-[highlighted]:outline-none data-[highlighted]:text-primary-foreground data-[highlighted]:bg-list-hover'
              >
                <div className='flex flex-col'>
                  <RadixSelect.ItemText>
                    <span className='text-secondary-foreground text-sm font-medium'>{option.label}</span>
                  </RadixSelect.ItemText>

                  {option.description ? (
                    <span className='text-tertiary-foreground text-xs font-normal mt-1'>{option.description}</span>
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

      {helperText ? <span className='text-xs font-normal text-tertiary-foreground mt-1'>{helperText}</span> : null}
    </div>
  );
}
