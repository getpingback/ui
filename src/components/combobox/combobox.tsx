'use client';

import * as React from 'react';
import { CheckIcon, CaretDownIcon, CaretUpIcon } from '@stash-ui/regular-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';

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
  isLoading?: boolean;
  label?: string;
  helperText?: string;
  options: Option[];
  shouldFilter?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptySearchPlaceholder?: string;
  variant?: 'default' | 'detailed' | 'icon-compact' | 'image-detailed';
  defaultValue?: string;
  searchValue?: string;
  onSelect?: (item: Item) => void;
  onChangeSearchValue?: (value: string) => void;
  onEndReached?: () => void;
  className?: string;
  shouldFilterFalseEmptyContent?: React.ReactNode;
}

export function Combobox({
  isLoading,
  label,
  helperText,
  options,
  shouldFilter = true,
  variant = 'default',
  placeholder = 'Select an item...',
  searchPlaceholder = 'Search...',
  emptySearchPlaceholder = 'Nothing found.',
  defaultValue,
  searchValue,
  onChangeSearchValue,
  onSelect,
  onEndReached,
  className,
  shouldFilterFalseEmptyContent
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const isEmpty = options.every((option) => option.items.length === 0);

  const lastItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  React.useEffect(() => {
    if (!open) {
      if (onChangeSearchValue) onChangeSearchValue('');
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    let observer: IntersectionObserver;
    setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onEndReached?.();
          }
        },
        { threshold: 1 }
      );

      if (lastItemRef.current) {
        observer?.observe(lastItemRef.current);
      }
    }, 0);

    return () => {
      observer?.disconnect();
    };
  }, [lastItemRef, options, open]);

  const DefaultVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
    <div className={cn('flex items-center h-full w-full', selected && 'justify-between', isButtonLabel && 'w-[calc(100%-30px)]')}>
      <span className={`line-clamp-1 ${isButtonLabel ? 'w-full h-full flex items-center' : ''} ${selected ? 'text-visible' : ''}`}>
        {item.label}
      </span>
      {selected && <CheckIcon />}
    </div>
  );

  const DetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
    <div className={cn('flex items-center w-full', selected && 'justify-between')}>
      <div className="flex items-center">
        {item.leadingElement && !isButtonLabel ? <>{item.leadingElement}</> : null}

        <div className="flex flex-col items-start">
          <div className={`line-clamp-1 text-sm font-medium${isButtonLabel ? ' max-w-[160px]' : ''} ${selected ? 'text-visible' : ''}`}>
            {item.label}
          </div>
          {!isButtonLabel ? <div className="text-xs text-gray-500">{item.description}</div> : null}
        </div>
      </div>

      {selected && <CheckIcon height={20} width={20} />}
    </div>
  );

  const IconCompactVariant = ({ item, selected }: { item: Item; selected: boolean }) => (
    <div className={cn('w-full h-full flex items-center', selected && 'justify-between')}>
      <div className="flex items-center gap-2 h-full">
        <div className="flex items-center justify-center w-6 h-6 rounded-md">{item.icon || null}</div>
        <div className="text-sm font-medium line-clamp-1">{item.label}</div>
      </div>

      {selected && <CheckIcon height={20} width={20} />}
    </div>
  );

  const ImageDetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
    <div className={cn('flex items-center w-full h-full', selected && 'justify-between')}>
      <div className="flex items-center gap-4 h-full">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.label} className="w-[64px] h-[48px] rounded-md object-cover" />
        ) : (
          <div className="w-[64px] h-[48px] rounded-md bg-gray-200" />
        )}
        <div className="flex flex-col gap-1">
          <div className={`line-clamp-2 text-sm${isButtonLabel ? ' max-w-[151px] w-full truncate h-full flex items-center' : ''}`}>
            {item.label}
          </div>
          <div className="text-xs text-gray-500">{item.description}</div>
        </div>
      </div>

      {selected && <CheckIcon height={20} width={20} />}
    </div>
  );

  const getVariant = () => {
    switch (variant) {
      case 'detailed':
        return DetailedVariant;
      case 'icon-compact':
        return IconCompactVariant;
      case 'image-detailed':
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

      if (selectedItem && variant === 'image-detailed') {
        return React.createElement(getVariant(), {
          item: selectedItem,
          selected: false,
          isButtonLabel: true
        });
      }

      if (selectedItem && variant === 'icon-compact') {
        return React.createElement(getVariant(), {
          item: selectedItem,
          selected: false
        });
      }

      if (selectedItem) {
        return React.createElement(getVariant(), {
          item: selectedItem,
          selected: false,
          isButtonLabel: true
        });
      }

      return null;
    }

    return <span className="text-tertiary-foreground text-sm opacity-60 font-normal">{placeholder}</span>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-start gap-1 w-full">
        {label ? <label className="text-xs font-semibold text-tertiary-foreground">{label}</label> : null}

        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="combobox"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background-accent hover:bg-background-accent"
          >
            {renderButtonContent()}

            {open ? (
              <CaretUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            ) : (
              <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>

        {helperText ? <span className="text-xs font-normal text-tertiary-foreground mt-1">{helperText}</span> : null}
      </div>

      <PopoverContent
        className="w-full p-0 bg-background-accent"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-testid="comboxbox-popover-content"
      >
        <Command shouldFilter={shouldFilter} className={className}>
          <div className="w-full p-4 flex items-center justify-center border-b border-divider">
            <CommandInput placeholder={searchPlaceholder} className="h-9 w-full" defaultValue={searchValue} onInput={handleSearchInput} />
          </div>

          <CommandEmpty>{emptySearchPlaceholder}</CommandEmpty>

          <div className="max-h-[272px] overflow-y-auto scrollbar-style">
            {options.map((option, index) => (
              <>
                <CommandGroup key={index} className="py-2" heading={option.heading}>
                  {option.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue: string) => {
                        onSelect?.(item);
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {React.createElement(getVariant(), {
                        item,
                        selected: value === item.value
                      })}
                    </CommandItem>
                  ))}
                </CommandGroup>

                {index < options.length - 1 && <div className="border-b border-divider" />}
              </>
            ))}

            <div
              ref={lastItemRef}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 4, width: '100%' }}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center mb-4 h-10">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-purple-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : null}

          {!isLoading && isEmpty && shouldFilterFalseEmptyContent ? <>{shouldFilterFalseEmptyContent}</> : null}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
