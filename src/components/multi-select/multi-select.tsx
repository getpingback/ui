import * as React from "react";
import { cn } from "@/lib/utils";

import { CheckIcon, TimesIcon, CaretDownIcon, CaretUpIcon } from "@stash-ui/light-icons";
import { Button } from "@/components/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Badge } from "@/components/badge";

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  label?: string;
  helperText?: string;
  options: OptionType[];
  shouldFilter?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptySearchPlaceholder?: string;
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  searchValue?: string;
  onChangeSearchValue?: (value: string) => void;
  loadingSearch?: boolean;
  className?: string;
}

function MultiSelect({
  label,
  helperText,
  options,
  shouldFilter,
  placeholder,
  searchPlaceholder,
  emptySearchPlaceholder,
  selected,
  onChange,
  loadingSearch,
  searchValue,
  onChangeSearchValue,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue?.(e.target.value);
  };

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <div className='flex flex-col items-start gap-1 max-w-[352px] w-full'>
        {label ? <label className='text-xs font-semibold text-tertiary-foreground'>{label}</label> : null}

        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='combobox'
            role='combobox'
            aria-expanded={open}
            className='max-w-[352px] w-full justify-between'
            onClick={() => setOpen(!open)}
          >
            {selected.length === 0 ? placeholder : null}

            <div className='flex gap-1 flex-wrap'>
              {selected.map((item) => (
                <Badge variant='ghost' key={item} className='mr-1' onClick={() => handleUnselect(item)}>
                  {item}
                  <button
                    className='ml-1 ring-offset-background rounded-full outline-none hover:[box-shadow:0px_0px_0px_3px_rgba(240,_82,_82,_0.12)] focus:[box-shadow:0px_0px_0px_3px_rgba(240,_82,_82,_0.12)]'
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUnselect(item);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <TimesIcon className='h-4 w-4' />
                  </button>
                </Badge>
              ))}
            </div>

            {open ? (
              <CaretUpIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            ) : (
              <CaretDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            )}
          </Button>
        </PopoverTrigger>

        {helperText ? <span className='text-xs font-normal text-tertiary-foreground mt-1'>{helperText}</span> : null}
      </div>

      <PopoverContent className='max-w-[352px] w-full p-0 bg-background-accent'>
        <Command className={className} shouldFilter={shouldFilter}>
          <div className='w-full p-4 flex items-center justify-center border-b border-divider'>
            <CommandInput
              placeholder={searchPlaceholder}
              className='h-9 w-full'
              defaultValue={searchValue}
              onInput={handleSearchInput}
            />
          </div>

          {loadingSearch ? (
            <div className='flex items-center justify-center h-32'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin fill-purple-500'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          ) : (
            <>
              <CommandEmpty>{emptySearchPlaceholder}</CommandEmpty>

              <CommandGroup className='max-h-[272px] overflow-y-auto py-2'>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(
                        selected.includes(option.value)
                          ? selected.filter((item) => item !== option.value)
                          : [...selected, option.value]
                      );
                      setOpen(true);
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center w-full h-full",
                        selected.includes(option.value) && "justify-between"
                      )}
                    >
                      {option.label}

                      {selected.includes(option.value) && <CheckIcon height={20} width={20} />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
