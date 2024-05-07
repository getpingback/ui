import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";

export interface TimePickerProps {
  label?: string;
  helpText?: string;
  placeholder?: string;
  onChange?: (time?: string) => void;
}

export function TimePicker({ label, placeholder, helpText, onChange, ...props }: TimePickerProps) {
  const [time, setTime] = React.useState<string>();

  const handleSelect = (time?: string) => {
    onChange?.(time);
    setTime(time);
  };

  return (
    <Popover>
      <div className='flex flex-col items-start gap-1'>
        {label ? (
          <label className='text-xs font-semibold text-tertiary-foreground' htmlFor='time-picker'>
            {label}
          </label>
        ) : null}

        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-[280px] justify-between text-left font-normal",
              !time && "text-muted-foreground"
            )}
            data-testid='time-picker-button-popover-trigger'
          >
            {time ? time : <span className='text-muted-foreground'>{placeholder || "Select a time"}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent>oi</PopoverContent>
      </div>
    </Popover>
  );
}
