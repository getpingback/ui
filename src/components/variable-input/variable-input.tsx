import * as React from 'react';
import { VariableIcon } from '@stash-ui/editor-icons';
import { CaretDownIcon, CaretUpIcon } from '@stash-ui/light-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/command';

interface Item {
  value: string;
  label: string;
}

interface Option {
  heading?: string;
  items: Item[];
}

interface Props {
  isLoadingVariables?: boolean;
  label?: string;
  helperText?: string;
  placeholder?: string;
  initialContent?: string;
  options: Option[];
  variablesSearchValue?: string;
  variablesShouldFilter?: boolean;
  variablesSearchPlaceholder?: string;
  variablesEmptySearchPlaceholder?: string;
  onChangeContent?: (content: string) => void;
  onSelectVariable?: (selectedVariable: string) => void;
  onChangeVariablesSearchValue?: (variablesSearchValue: string) => void;
  onVariablesEndReached?: () => void;
  direction?: 'vertical' | 'horizontal';
  previewButton?: React.ReactNode;
  popoverPosition?: {
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  };
}

export type VariableInputProps = Props & React.HTMLAttributes<HTMLDivElement>;

export function VariableInput({
  isLoadingVariables,
  label,
  placeholder,
  helperText,
  initialContent,
  options,
  className,
  variablesSearchValue,
  variablesShouldFilter = true,
  direction = 'horizontal',
  variablesSearchPlaceholder = 'Search...',
  variablesEmptySearchPlaceholder = 'No results found',
  onChangeContent,
  onSelectVariable,
  onChangeVariablesSearchValue,
  onVariablesEndReached,
  popoverPosition,
  previewButton,
  ...props
}: VariableInputProps) {
  const [open, setOpen] = React.useState(false);
  const [contentValue, setContentValue] = React.useState(initialContent);
  const [isFocused, setIsFocused] = React.useState(false);
  const [lastRange, setLastRange] = React.useState<Range | null>(null);

  const editorRef = React.useRef<HTMLDivElement>(null);
  const lastItemRef = React.useRef<HTMLDivElement>(null);

  const { side = 'bottom', align = 'end' } = popoverPosition || {};

  const placeholderTag = `<span data-pb-placeholder="" class="opacity-50">${placeholder || ''}</span>`;

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const plainText = transformContentToPlainText(target.innerHTML);

    onChangeContent?.(plainText);
    setContentValue(plainText);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeVariablesSearchValue?.(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const closestSpan = range.startContainer.parentElement?.closest('span[data-variable]');
      if (closestSpan && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
      }
    }
  };

  const handleVariableSelect = (selectedVariable: string) => {
    const editor = editorRef.current;

    if (!editor) return;

    editor.focus();

    if (editor.innerHTML === placeholderTag) editor.innerHTML = '';

    const selection = window.getSelection();
    if (!lastRange || !editor.contains(lastRange.commonAncestorContainer)) {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else {
      selection?.removeAllRanges();
      selection?.addRange(lastRange);
    }

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.className =
        'inline-flex items-center bg-transparent text-[#52525B] rounded-md border border-[#D4D4D8] px-1 py-0 text-sm font-medium mx-0.5';
      span.contentEditable = 'false';
      span.dataset.variable = selectedVariable;
      span.textContent =
        options
          .find((option) => option.items.find((item) => item.value === selectedVariable))
          ?.items.find((item) => item.value === selectedVariable)?.label || selectedVariable;
      range.insertNode(span);
      range.setStartAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    onSelectVariable?.(selectedVariable);
    const plainText = transformContentToPlainText(editor.innerHTML);
    onChangeContent?.(plainText);
    setContentValue(plainText);
  };

  const handleFocus = () => {
    setIsFocused(true);
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setLastRange(selection.getRangeAt(0).cloneRange());
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDropdownTrigger = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setLastRange(selection.getRangeAt(0).cloneRange());
    }
  };

  const transformContentToPlainText = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const spans = tempDiv.querySelectorAll('span[data-variable]');
    spans.forEach((span) => {
      const variable = span.getAttribute('data-variable');
      span.replaceWith(`{{${variable}}}`);
    });

    // Preservar quebras de linha convertendo <br> e <div> para \n
    // Substitui <br> por \n
    tempDiv.innerHTML = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, '\n');

    // Substitui </div><div> por \n (quando há múltiplas linhas)
    tempDiv.innerHTML = tempDiv.innerHTML.replace(/<\/div>\s*<div[^>]*>/gi, '\n');

    // Remove tags div restantes no início e fim
    tempDiv.innerHTML = tempDiv.innerHTML.replace(/^<div[^>]*>|<\/div>$/gi, '');

    return tempDiv.textContent ?? '';
  };

  const transformVariablesToSpans = (content: string) => {
    const regex = /{{([^}]+)}}/g;
    const tempDiv = document.createElement('div');

    // Converter quebras de linha \n para <br> tags antes de processar
    const contentWithBreaks = content.replace(/\n/g, '<br>');
    tempDiv.innerHTML = contentWithBreaks;

    let match;
    while ((match = regex.exec(content)) !== null) {
      const variable = match[1];
      const option = options.find((opt) => opt.items.find((item) => item.value === variable));

      if (option) {
        const span = document.createElement('span');
        span.className =
          'inline-flex items-center bg-transparent text-[#52525B] rounded-md border border-[#D4D4D8] px-1 py-0 text-sm font-medium mx-0.5';
        span.contentEditable = 'false';
        span.dataset.variable = variable;
        span.textContent = option.items.find((item) => item.value === variable)?.label || variable;

        tempDiv.innerHTML = tempDiv.innerHTML.replace(match[0], span.outerHTML);
      }
    }

    return tempDiv.innerHTML;
  };

  React.useEffect(() => {
    const editor = editorRef.current;

    if (editor && initialContent) {
      const contentWithSpans = transformVariablesToSpans(initialContent);
      editor.innerHTML = contentWithSpans;
    }
  }, []);

  React.useEffect(() => {
    const editor = editorRef.current;

    if (editor) {
      if (!isFocused && !contentValue && placeholder) {
        editor.innerHTML = placeholderTag;
      } else if (isFocused && editor.innerHTML === placeholderTag) {
        editor.innerHTML = '';
      }
    }
  }, [isFocused, contentValue, placeholder]);

  React.useEffect(() => {
    if (!open) return;

    let observer: IntersectionObserver;
    setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onVariablesEndReached?.();
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
  }, [lastItemRef.current, options, open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-start gap-1">
        {label ? (
          <label className="text-xs font-semibold text-tertiary" htmlFor="counter-input">
            {label}
          </label>
        ) : null}

        <div className={cn('relative w-full flex items-start gap-3', direction === 'vertical' && 'flex-col')}>
          <div
            ref={editorRef}
            className={cn(
              'min-h-[40px] w-full overflow-auto border border-default rounded-2xl bg-surface py-2 px-3 text-sm break-normal outline-none text-tertiary disabled:cursor-not-allowed disabled:opacity-50 hover:border-hover focus:border-hover focus:shadow-input-focus-neutral transition-all duration-200 ease-in-out',
              className
            )}
            contentEditable
            onInput={handleInput}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          <div className={cn('flex items-center justify-between gap-3', direction === 'vertical' && 'w-full')}>
            <PopoverTrigger asChild onClick={handleDropdownTrigger}>
              <Button variant="outline" size={direction === 'vertical' ? 'sm' : 'lg'} rounded="xl" data-testid="variable-input-trigger">
                <VariableIcon color="#71717A" height={20} width={20} />
                {open ? <CaretUpIcon width={16} height={16} color="#71717A" /> : <CaretDownIcon width={16} height={16} color="#71717A" />}
              </Button>
            </PopoverTrigger>

            {previewButton}
          </div>
        </div>

        {helperText ? <span className="text-xs font-normal text-tertiary opacity-85">{helperText}</span> : null}
      </div>

      <PopoverContent
        side={side}
        align={align}
        className="w-full p-0 max-w-[236px]"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-testid="comboxbox-popover-content"
      >
        <Command shouldFilter={variablesShouldFilter} className={className}>
          <CommandInput
            placeholder={variablesSearchPlaceholder}
            defaultValue={variablesSearchValue}
            onInput={handleSearchInput}
            data-testid="variable-input-search-input"
          />

          <CommandEmpty>{variablesEmptySearchPlaceholder}</CommandEmpty>

          <CommandList>
            {options.map((option, index) => (
              <>
                <CommandGroup key={index} className="py-2" heading={option.heading}>
                  {option.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => {
                        handleVariableSelect(item.value);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center h-full w-full">
                        <span className="line-clamp-1">{item.label}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>

                {index < options.length - 1 && <div className="border-b border-default" />}
              </>
            ))}

            <div
              ref={lastItemRef}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 4, width: '100%' }}
            />
          </CommandList>

          {isLoadingVariables ? (
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
        </Command>
      </PopoverContent>
    </Popover>
  );
}
