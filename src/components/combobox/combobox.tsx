'use client';

import * as React from 'react';
import { CaretDownIcon } from '@stash-ui/regular-icons';
import { ArrowLeftIcon } from '@stash-ui/duotone-icons';

import { Button } from '@/components/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/command';
import { DefaultVariant, DetailedVariant, IconCompactVariant, ImageDetailedVariant, MultipleVariant } from './combobox-variants';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import Loader from './components/loader';
import { cn } from '@/lib/utils';
import { Typography } from '@/index';

interface Item {
  value: string;
  label: string;
  icon?: React.ReactNode;
  leadingElement?: React.ReactNode;
  imageUrl?: string;
  description?: string;
  items?: Option[];
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
  const [selectedStep, setSelectedStep] = React.useState<Item | null>(null);

  const multiple = variant === 'multiple';

  const currentSingleValue = selectedItems[0] || defaultValue;

  const currentMultipleValue = selectedItems || defaultValue;

  const isEmpty = options.every((option) => option.items.length === 0);

  const lastItemRef = React.useRef<HTMLDivElement>(null);

  const isStepped = options.some((option) => option.items.some((item) => item.items));
  const hasSelectedStep = !!selectedStep?.items && selectedStep.items.length > 0;

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
    if (!item.items || hasSelectedStep) {
      if (multiple) {
        const isItemSelected = selectedItems.some((i) => i.value === item.value);
        setSelectedItems((prev) => (isItemSelected ? prev.filter((i) => i.value !== item.value) : [...prev, item]));
      } else {
        setSelectedItems([item]);
      }

      onSelect?.(item);
      setOpen(false);
    } else {
      setSelectedStep(item);
    }
  };

  const renderGroupItems = (items: Item[], heading: string) => {
    return (
      <CommandGroup className="py-2" heading={heading}>
        {items.map((item) => (
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
              React.createElement(isStepped ? comboboxVariants.default : comboboxVariants[variant], {
                item,
                selected: currentSingleValue?.value === item.value,
                hasStep: isStepped && !hasSelectedStep
              })
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    );
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
          {hasSelectedStep ? (
            <div className="w-full gap-3 p-3 flex items-center justify-start border-b border-divider">
              <button onClick={() => setSelectedStep([])}>
                <ArrowLeftIcon color="#52525B" opacity={0.45} />
              </button>
              <Typography size="small" weight="semibold" type="secondary" className="truncate">
                {selectedStep?.label}
              </Typography>
            </div>
          ) : null}
          {isStepped && !hasSelectedStep ? null : (
            <div className="w-full p-4 flex items-center justify-center border-b border-divider">
              <CommandInput placeholder={searchPlaceholder} className="h-9 w-full" defaultValue={searchValue} onInput={handleSearchInput} />
            </div>
          )}

          {!emptyContentRender && <CommandEmpty>{emptySearchPlaceholder}</CommandEmpty>}

          <div className="max-h-[272px] overflow-y-auto scrollbar-style">
            {!hasSelectedStep
              ? options.map((option, index) => (
                  <div key={index}>
                    {renderGroupItems(option.items, option.heading || '')}
                    {index < options.length - 1 && <div className="border-b border-divider" />}
                  </div>
                ))
              : selectedStep?.items?.map((step: Option) => renderGroupItems(step.items, step?.heading || ''))}

            <div ref={lastItemRef} className="flex w-full" />
          </div>

          <Loader isLoading={isLoading} />

          {!isLoading && isEmpty && emptyContentRender ? <>{emptyContentRender}</> : null}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
