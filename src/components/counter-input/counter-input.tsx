import * as React from 'react';
import { Button } from '../button';
import { MinusIcon, PlusIcon } from '@stash-ui/regular-icons';
import { TextField } from '../text-field';

interface Props {
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: number;
  onChange?: (value?: number) => void;
}

export type CounterInputProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export function CounterInput({ label, placeholder, helperText, value, onChange, ...props }: CounterInputProps) {
  const [number, setNumber] = React.useState<number | undefined>(value || undefined);

  const maxValue = typeof props.max === 'number' ? props.max : Infinity;
  const minValue = typeof props.min === 'number' ? props.min : -Infinity;

  React.useEffect(() => {
    setNumber(value || undefined);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    let cleanInput = inputValue.replace(/[^0-9]/g, '');

    let newValue = parseInt(cleanInput);

    if (newValue > maxValue) newValue = maxValue;
    if (newValue < minValue) newValue = minValue;

    setNumber(newValue);
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    let newValue = number ? number + 1 : 1;
    if (newValue > maxValue) newValue = maxValue;

    setNumber(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    let newValue = number ? number - 1 : -1;
    if (newValue < minValue) newValue = minValue;

    setNumber(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      {label ? (
        <label className="text-xs font-semibold text-tertiary" htmlFor="counter-input">
          {label}
        </label>
      ) : null}

      <div className="w-full max-w-[405px] flex gap-2">
        <TextField
          type="number"
          id="counter-input"
          value={number}
          onChange={handleChange}
          placeholder={placeholder}
          data-testid="counter-input"
          className="w-full"
          helperText={helperText}
          {...props}
        />

        <div className="flex gap-2">
          <Button onClick={handleDecrement} variant="ghost" size="lg" data-testid="counter-input-decrement-button">
            <MinusIcon className="text-icon-tertiary w-5 h-5" />
          </Button>

          <Button onClick={handleIncrement} variant="ghost" size="lg" data-testid="counter-input-increment-button">
            <PlusIcon className="text-icon-tertiary w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
