import * as React from 'react';
import { Button } from '../button';
import { MinusIcon, PlusIcon } from '@stash-ui/regular-icons';

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
        <label className="text-xs font-semibold text-tertiary-foreground" htmlFor="counter-input">
          {label}
        </label>
      ) : null}

      <div className="relative w-full max-w-[280px] flex items-center gap-3">
        <input
          type="number"
          id="counter-input"
          value={number}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex h-10 w-full max-w-[280px] border-divider border rounded-lg bg-[#FFFFFF] py-2 px-3 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out"
          data-testid="counter-input"
          {...props}
        />

        <div className="flex items-center gap-2">
          <Button
            onClick={handleDecrement}
            className="h-10 rounded-lg bg-[#52525B14] hover:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] focus:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] active:bg-[#52525B1F]"
            data-testid="counter-input-decrement-button"
          >
            <MinusIcon color="#71717A" />
          </Button>

          <Button
            onClick={handleIncrement}
            className="h-10 rounded-lg bg-[#52525B14] hover:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] focus:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] active:bg-[#52525B1F]"
            data-testid="counter-input-increment-button"
          >
            <PlusIcon color="#71717A" />
          </Button>
        </div>
      </div>

      {helperText ? <span className="text-xs font-normal text-tertiary-foreground mt-1">{helperText}</span> : null}
    </div>
  );
}
