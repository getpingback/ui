import * as React from 'react';

import { ClockIcon } from '@stash-ui/light-icons';
import { TextField } from '@/components/text-field';

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
      <div className="relative w-full">
        <TextField
          id="time-picker"
          ref={inputRef}
          maxLength={5}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          value={time}
          onChange={handleChange}
          onBlur={() => setTime(value || '')}
          data-testid="time-picker"
        />

        <ClockIcon className="w-6 h-6 text-icon-tertiary absolute right-2 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
