'use client';

import * as React from 'react';
import { CaretDownIcon } from '@stash-ui/regular-icons';

import { Button } from '@/components/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { DetailedVariant, IconCompactVariant, ImageDetailedVariant, DefaultVariant, MultipleVariant } from './combobox-variants';
import { cn } from '@/lib/utils';

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
  placeholder?: string;
  searchPlaceholder?: string;
  emptySearchPlaceholder?: string;
  variant?: 'default' | 'detailed' | 'icon-compact' | 'image-detailed' | 'multiple';
  defaultValue?: Item | Item[];
  searchValue?: string;
  onSelect?: (item: Item) => void;
  onChangeSearchValue?: (value: string) => void;
  onEndReached?: () => void;
  className?: string;
  emptyContentRender?: React.ReactNode;
}

export function Combobox({
  isLoading,
  label,
  helperText,
  options,
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
  emptyContentRender
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const multiple = variant === 'multiple';

  const currentSingleValue = selectedItems[0] || defaultValue;

  const currentMultipleValue = selectedItems || defaultValue;

  const isEmpty = options.every((option) => option.items.length === 0);

  const lastItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open && !!searchValue && onChangeSearchValue) onChangeSearchValue('');
  }, [open, searchValue, onChangeSearchValue]);

  React.useEffect(() => {
    if (!open || !onEndReached) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) onEndReached();
    };

    const observer = new IntersectionObserver(observerCallback);

    setTimeout(() => {
      if (lastItemRef.current) {
        observer.observe(lastItemRef.current);
      }
    }, 100);

    return () => observer.disconnect();
  }, [open, options, onEndReached]);

  const comboboxVariants = {
    default: DefaultVariant,
    detailed: DetailedVariant,
    'icon-compact': IconCompactVariant,
    'image-detailed': ImageDetailedVariant,
    multiple: MultipleVariant
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue?.(e.target.value);
  };

  const renderButtonContent = () => {
    if (currentSingleValue) {
      if (variant === 'image-detailed') {
        return React.createElement(comboboxVariants[variant], {
          item: currentSingleValue,
          selected: false,
          isButtonLabel: true
        });
      }

      if (variant === 'icon-compact') {
        return React.createElement(comboboxVariants[variant], {
          item: currentSingleValue,
          selected: false
        });
      }

      if (variant === 'multiple') {
        return React.createElement(comboboxVariants[variant], {
          items: currentMultipleValue,
          handleUnselect: (item) => setSelectedItems((prev) => prev.filter((i) => i.value !== item.value))
        });
      }

      return React.createElement(comboboxVariants[variant], {
        item: currentSingleValue,
        selected: false,
        isButtonLabel: true
      });
    }

    return <span className="text-tertiary-foreground text-sm opacity-60 font-normal">{placeholder}</span>;
  };

  const handleSelectItem = (item: Item) => {
    if (multiple) {
      const isItemSelected = selectedItems.some((i) => i.value === item.value);
      setSelectedItems((prev) => (isItemSelected ? prev.filter((i) => i.value !== item.value) : [...prev, item]));
    } else {
      setSelectedItems([item]);
    }

    onSelect?.(item);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-start gap-1 w-full">
        {label ? <label className="text-xs font-semibold text-tertiary-foreground">{label}</label> : null}

        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            rounded="lg"
            size="lg"
            aria-expanded={open}
            suffix={<CaretDownIcon className={cn('ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform', { 'rotate-180': open })} />}
            className="w-full min-h-[40px] h-auto px-3 py-2 justify-between bg-background-accent hover:bg-background-accent"
          >
            {renderButtonContent()}
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
        <Command shouldFilter={!onChangeSearchValue} className={className}>
          <div className="w-full p-4 flex items-center justify-center border-b border-divider">
            <CommandInput placeholder={searchPlaceholder} className="h-9 w-full" defaultValue={searchValue} onInput={handleSearchInput} />
          </div>

          {!emptyContentRender && <CommandEmpty>{emptySearchPlaceholder}</CommandEmpty>}

          <div className="max-h-[272px] overflow-y-auto scrollbar-style">
            {options.map((option, index) => (
              <div key={index}>
                <CommandGroup className="py-2" heading={option.heading}>
                  {option.items.map((item) => (
                    <CommandItem
                      className="flex items-center justify-between h-full w-full gap-4"
                      key={item.value}
                      value={item.value}
                      onSelect={() => handleSelectItem(item)}
                    >
                      {multiple ? (
                        <DefaultVariant
                          item={item}
                          selected={currentMultipleValue.find((currentValue) => currentValue.value === item.value) !== undefined}
                        />
                      ) : (
                        React.createElement(comboboxVariants[variant], {
                          item,
                          selected: currentSingleValue?.value === item.value
                        })
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>

                {index < options.length - 1 && <div className="border-b border-divider" />}
              </div>
            ))}
            <div ref={lastItemRef} className="flex w-full" />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center mb-4 h-10" data-testid="combobox-loading">
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

          {!isLoading && isEmpty && emptyContentRender ? <>{emptyContentRender}</> : null}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
