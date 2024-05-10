"use client";

import * as React from "react";
import { CheckIcon, CaretDownIcon } from "@stash-ui/regular-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";

interface Item {
  value: string;
  label: string;
  icon?: React.ReactNode;
  leadingElement?: React.ReactNode;
  imageUrl?: string;
  description?: string;
}

interface Option {
  heading?: string;
  items: Item[];
}

interface ComboboxProps {
  label?: string;
  helperText?: string;
  options: Option[];
  shouldFilter?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptySearchPlaceholder?: string;
  variant?: "default" | "detailed" | "icon-compact" | "image-detailed";
  defaultValue?: string;
  searchValue?: string;
  onSelect?: (value: string) => void;
  onChangeSearchValue?: (value: string) => void;
}

export function Combobox({
  label,
  helperText,
  options,
  shouldFilter = true,
  variant = "default",
  placeholder = "Select an item...",
  searchPlaceholder = "Search...",
  emptySearchPlaceholder = "Nothing found.",
  defaultValue,
  searchValue,
  onChangeSearchValue,
  onSelect,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const DefaultVariant = ({
    item,
    selected,
    isButtonLabel,
  }: {
    item: Item;
    selected: boolean;
    isButtonLabel?: boolean;
  }) => (
    <div className={cn("flex items-center w-full", selected && "justify-between")}>
      <span className={`${isButtonLabel ? "max-w-[200px] truncate" : ""}`}>{item.label}</span>
      {selected && <CheckIcon />}
    </div>
  );

  const DetailedVariant = ({
    item,
    selected,
    isButtonLabel,
  }: {
    item: Item;
    selected: boolean;
    isButtonLabel?: boolean;
  }) => (
    <div className={cn("flex items-center w-full", selected && "justify-between")}>
      <div className='flex items-center'>
        {item.leadingElement && !isButtonLabel ? <>{item.leadingElement}</> : null}

        <div className='flex flex-col items-start'>
          <div className={`text-sm font-medium${isButtonLabel ? " max-w-[160px] truncate" : ""}`}>{item.label}</div>
          {!isButtonLabel ? <div className='text-xs text-gray-500'>{item.description}</div> : null}
        </div>
      </div>

      {selected && <CheckIcon />}
    </div>
  );

  const IconCompactVariant = ({
    item,
    selected,
    border = true,
  }: {
    item: Item;
    selected: boolean;
    border?: boolean;
    isButtonLabel?: boolean;
  }) => (
    <div
      className={cn(
        "w-full flex items-center",
        selected && "justify-between",
        border && "border-[1px] border-border-card p-2 rounded-lg"
      )}
    >
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-6 h-6 rounded-md'>{item.icon || null}</div>
        <div className='text-sm font-medium'>{item.label}</div>
      </div>

      {selected && <CheckIcon />}
    </div>
  );

  const ImageDetailedVariant = ({
    item,
    selected,
    isButtonLabel,
  }: {
    item: Item;
    selected: boolean;
    isButtonLabel?: boolean;
  }) => (
    <div className={cn("flex items-center w-full", selected && "justify-between")}>
      <div className='flex items-center gap-4'>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.label} className='w-[64px] h-[48px] rounded-md object-cover' />
        ) : (
          <div className='w-[64px] h-[48px] rounded-md bg-gray-200' />
        )}
        <div>
          <div className={`text-sm${isButtonLabel ? " max-w-[160px] truncate" : ""}`}>{item.label}</div>
          <div className='text-xs text-gray-500'>{item.description}</div>
        </div>
      </div>

      {selected && <CheckIcon />}
    </div>
  );

  const getVariant = () => {
    switch (variant) {
      case "detailed":
        return DetailedVariant;
      case "icon-compact":
        return IconCompactVariant;
      case "image-detailed":
        return ImageDetailedVariant;
      default:
        return DefaultVariant;
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue?.(e.target.value);
  };

  const renderButtonContent = () => {
    if (value) {
      const selectedItem = options.flatMap((option) => option.items).find((item) => item.value === value);

      if (selectedItem && variant === "image-detailed") {
        return React.createElement(getVariant(), {
          item: selectedItem,
          selected: false,
          isButtonLabel: true,
        });
      }

      if (selectedItem && variant === "icon-compact") {
        return React.createElement(getVariant(), {
          item: selectedItem,
          selected: false,
          border: false,
        });
      }

      if (selectedItem) {
        return React.createElement(getVariant(), {
          item: selectedItem,
          selected: false,
          isButtonLabel: true,
        });
      }

      return null;
    }

    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex flex-col items-start gap-1 max-w-[352px] w-full'>
        {label ? <label className='text-xs font-semibold text-tertiary-foreground'>{label}</label> : null}

        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='combobox'
            role='combobox'
            aria-expanded={open}
            className='max-w-[352px] w-full justify-between'
          >
            {renderButtonContent()}
            <CaretDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>

        {helperText ? <span className='text-xs font-normal text-tertiary-foreground mt-1'>{helperText}</span> : null}
      </div>

      <PopoverContent className='p-0 bg-background-accent' data-testid='comboxbox-popover-content'>
        <Command shouldFilter={shouldFilter}>
          <div className='w-full p-4 flex items-center justify-center border-b border-divider'>
            <CommandInput
              placeholder={searchPlaceholder}
              className='h-9 w-full'
              defaultValue={searchValue}
              onInput={handleSearchInput}
            />
          </div>

          <CommandEmpty>{emptySearchPlaceholder}</CommandEmpty>

          <div className='max-h-[272px] overflow-y-auto'>
            {options.map((option, index) => (
              <>
                <CommandGroup key={index} className='py-2' heading={option.heading}>
                  {option.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue: string) => {
                        onSelect?.(currentValue);
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {React.createElement(getVariant(), {
                        item,
                        selected: value === item.value,
                      })}
                    </CommandItem>
                  ))}
                </CommandGroup>

                {index < options.length - 1 && <div className='border-b border-divider' />}
              </>
            ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
