import * as React from "react";
import { Button } from "../button";
import { Dropdown, DropdownItem } from "../dropdown";
import { VariableIcon } from "@stash-ui/editor-icons";
import { CaretDownIcon } from "@stash-ui/light-icons";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChangeHtml?: (html: string) => void;
  onChangeContent?: ({ plainText, html }: { plainText: string; html: string }) => void;
  onSelect?: (selectedVariable: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}

export type VariableInputProps = Props & React.HTMLAttributes<HTMLDivElement>;

export function VariableInput({
  label,
  placeholder,
  helperText,
  value,
  onChangeText,
  onChangeHtml,
  onChangeContent,
  onSelect,
  options,
  className,
  ...props
}: VariableInputProps) {
  const [text, setText] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const editorRef = React.useRef<HTMLDivElement>(null);

  const placeholderTag = `<span data-pb-placeholder="" class="opacity-50">${placeholder || ""}</span>`;

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const plainText = target.textContent ?? "";
    const html = target.innerHTML || "";

    onChangeText?.(plainText);
    onChangeHtml?.(html);
    onChangeContent?.({ plainText, html });

    setText(plainText);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const closestSpan = range.startContainer.parentElement?.closest("span[data-variable]");
      if (closestSpan && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
      }
    }
  };

  const handleVariableSelect = (selectedVariable: string) => {
    const editor = editorRef.current;

    if (!isFocused) editor?.focus();

    if (editor) {
      if (editor.innerHTML === placeholderTag) editor.innerHTML = "";

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.className =
          "inline-flex items-center bg-transparent text-[#52525B] rounded-md border border-[#D4D4D8] px-1 py-0 text-sm font-medium mx-0.5";
        span.contentEditable = "false";
        span.dataset.variable = selectedVariable;
        span.textContent = options.find((option) => option.value === selectedVariable)?.label || selectedVariable;
        range.insertNode(span);
        range.setStartAfter(span);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      onSelect?.(selectedVariable);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  React.useEffect(() => {
    const editor = editorRef.current;

    if (editor) {
      if (!isFocused && !text && placeholder) {
        editor.innerHTML = placeholderTag;
      } else if (isFocused && editor.innerHTML === placeholderTag) {
        editor.innerHTML = "";
      }
    }
  }, [isFocused, text, placeholder]);

  return (
    <div className='flex flex-col items-start gap-1'>
      {label ? (
        <label className='text-xs font-semibold text-tertiary-foreground' htmlFor='counter-input'>
          {label}
        </label>
      ) : null}

      <div className='relative w-full flex items-start gap-3'>
        <div
          ref={editorRef}
          className={cn(
            "min-h-[40px] w-full border-divider border rounded-lg bg-transparent py-2 px-3 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out",
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

        <Dropdown
          trigger={
            <Button variant='outline' className='h-10 outline-none' data-testid='variable-input-trigger'>
              <VariableIcon color='#71717A' height={20} width={20} />
              <CaretDownIcon width={16} height={16} color='#71717A' />
            </Button>
          }
        >
          {options.map((option) => (
            <DropdownItem key={option.value} onClick={() => handleVariableSelect(option.value)}>
              {option.label}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>

      {helperText ? (
        <span className='text-xs font-normal text-tertiary-foreground opacity-65'>{helperText}</span>
      ) : null}
    </div>
  );
}
