import * as React from 'react';

import { ClockIcon } from '@stash-ui/light-icons';

export interface TimePickerProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (time?: string) => void;
}

export function TimePicker({ label, placeholder, helperText, value, onChange, ...props }: TimePickerProps) {
  const [time, setTime] = React.useState<string>(value || '');

  React.useEffect(() => {
    setTime(value || '');
  }, [value]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    let cleanInput = inputValue.replace(/[^0-9:]/g, '');

    let parts = cleanInput.split(':');
    let hours = parts[0].slice(0, 2);
    let minutes = parts[1]?.slice(0, 2) || '';

    if (hours.length === 2 && parseInt(hours) > 23) {
      hours = '23';
    }

    if (hours.length === 2 && !inputValue.includes(':')) {
      hours += ':';
    }

    if (minutes.length === 2 && parseInt(minutes) > 59) {
      minutes = '59';
    }

    let formattedTime = hours;
    if (parts.length > 1 || inputValue.endsWith(':')) {
      formattedTime += ':' + minutes;
    }

    setTime(formattedTime);
    onChange?.(formattedTime);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      {label ? (
        <label className="text-xs font-semibold text-tertiary-foreground" htmlFor="time-picker">
          {label}
        </label>
      ) : null}

      <div className="relative w-full">
        <input
          id="time-picker"
          ref={inputRef}
          value={time}
          onChange={handleChange}
          onBlur={() => setTime(value || '')}
          placeholder={placeholder}
          maxLength={5}
          className="flex h-10 w-full border-divider border rounded-lg bg-transparent py-2 pr-10 pl-3 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out"
          data-testid="time-picker"
          {...props}
        />

        <ClockIcon className="h-5 w-5 absolute top-[10px] right-[12px]" color="#52525B" />
      </div>

      {helperText ? <span className="text-xs font-normal text-tertiary-foreground mt-1">{helperText}</span> : null}
    </div>
  );
}
