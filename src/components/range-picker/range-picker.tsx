'use client';

import React, { useState, useEffect, useRef } from 'react';

import { format, subDays, startOfWeek, startOfMonth, isValid } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Button } from '@/components/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@stash-ui/regular-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import {
  DEFAULT_PERIODS,
  DATA_PERIODS,
  BUTTONS_ACTIONS_LABEL,
  RANGE_PICKER_STYLES,
  LOCALE,
} from './constants';

const DATE_NOW = new Date();

const menuVariants = cva(
  'h-[32px] inline-flex items-center text-xs font-regular cursor-pointer opacity-85 px-3 rounded-lg hover:bg-[#9061F914] hover:text-[#9061F9] transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-[#3F3F46]',
        selected: 'text-[#3F3F46] text-[#9061F9] bg-active-menu font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type PeriodKeys =
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'this-month'
  | 'this-year'
  | 'all-time'
  | 'custom';

interface DateRangeApplying {
  from: Date | undefined;
  to: Date | undefined;
  type?: PeriodKeys | null;
}

export interface RangerPickerProps {
  locale?: 'en' | 'pt-br' | 'es';
  className?: string;
  onApply: (data: DateRangeApplying | Date) => void;
  createdAt: string;
  type: 'range' | 'single';
  numberOfMonths?: number;
  trigger?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  initialSingleDate?: Date;
  hideInputs?: boolean;
  hideMenu?: boolean;
}

interface MenuProps {
  locale?: 'en' | 'pt-br' | 'es';
  onSelect?: (date?: Date) => void;
  onDateChange: (date: DateRange) => void;
  createdDate: string;
  onSelectType: (type: PeriodKeys) => void;
  rangeType?: string;
  isCustom?: boolean;
}

interface FooterProps {
  onDateChange: (date: DateRange) => void;
  selectedDate: DateRange;
  locale: 'en' | 'pt-br' | 'es';
  minDate: string;
  onApply: () => void;
  onCancel: () => void;
  hideInputs: boolean;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const RangePickerMenu = ({
  locale = 'en',
  onDateChange,
  onSelectType,
  createdDate,
  rangeType,
  isCustom,
}: MenuProps) => {
  const [periodSelected, setPeriodSelected] = useState(rangeType);

  useEffect(() => {
    if (isCustom) {
      setPeriodSelected('custom');
      onSelectType('custom');
    }
  }, [isCustom]);

  const handleDateChange = (values: Date[]) => {
    onDateChange({
      from: values[0],
      to: values[1],
    });

    if (values[1])
      onDateChange({
        from: values[0],
        to: values[1],
      });
  };

  const setRanges = (range: PeriodKeys) => {
    setPeriodSelected(range);
    onSelectType(range);

    switch (range) {
      case DEFAULT_PERIODS.TODAY:
        return handleDateChange([DATE_NOW, DATE_NOW]);
      case DEFAULT_PERIODS.YESTERDAY:
        return handleDateChange([subDays(DATE_NOW, 1), subDays(DATE_NOW, 1)]);
      case DEFAULT_PERIODS.THIS_WEEK:
        return handleDateChange([
          startOfWeek(DATE_NOW, { weekStartsOn: 0 }),
          DATE_NOW,
        ]);
      case DEFAULT_PERIODS.THIS_MONTH:
        return handleDateChange([startOfMonth(DATE_NOW), DATE_NOW]);
      case DEFAULT_PERIODS.THIS_YEAR:
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        return handleDateChange([startOfYear, DATE_NOW]);
      case DEFAULT_PERIODS.ALL_TIME:
        return handleDateChange([new Date(createdDate), DATE_NOW]);
      case DEFAULT_PERIODS.CUSTOM:
        return;

      default:
        return handleDateChange([DATE_NOW, DATE_NOW]);
    }
  };

  return (
    <ul className='flex flex-col gap-1 pt-[20px] px-3 border-x border-[#71717A14] font-primary'>
      {DATA_PERIODS?.map((period) => (
        <li
          key={period.id}
          data-testid={`range-${period.id}`}
          className={cn(
            menuVariants({
              variant: period.id === periodSelected ? 'selected' : 'default',
            })
          )}
          onClick={() => setRanges(period.id as PeriodKeys)}
        >
          {period[locale]}
        </li>
      ))}
    </ul>
  );
};

const CalendarFooter = ({
  onDateChange,
  selectedDate,
  locale,
  minDate,
  onCancel,
  onApply,
  hideInputs,
}: FooterProps) => {
  const [inputFocus, setInputFocus] = useState('');

  const initialInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        if (inputFocus === 'initial' && initialInputRef.current) {
          onDateChange({ from: undefined, to: selectedDate?.to });
          initialInputRef.current.value = '';
        } else if (inputFocus === 'end' && endInputRef.current) {
          onDateChange({ from: selectedDate.from, to: undefined });
          endInputRef.current.value = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputFocus]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const formattedDate = value ? new Date(value) : undefined;

    if (id === 'initial-date') {
      onDateChange({ from: formattedDate, to: selectedDate?.to });
    } else {
      onDateChange({ from: selectedDate?.from, to: formattedDate });
    }
  };

  const renderInputValue = (value: Date) => {
    if (isValid(value)) {
      const formattedValue = format(value, 'yyyy-MM-dd');
      if (value >= new Date(minDate)) {
        return formattedValue;
      } else return undefined;
    } else {
      return undefined;
    }
  };

  return (
    <div className='w-full flex justify-between border-t-[1px] border-[#71717A14]'>
      <div className='flex items-center py-4 px-6 gap-2'>
        {!hideInputs && (
          <>
            <input
              onFocus={() => setInputFocus('initial')}
              type='date'
              id='initial-date'
              data-testid='initial-date'
              ref={initialInputRef}
              value={selectedDate?.from && renderInputValue(selectedDate?.from)}
              onChange={handleDateChange}
              className='flex h-[32px] w-full max-w-[102px] border-divider border rounded-lg bg-transparent py-2 px-2 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out'
            />
            <ArrowRightIcon opacity={0.45} />
            <input
              onFocus={() => setInputFocus('end')}
              type='date'
              id='end-date'
              data-testid='end-date'
              ref={endInputRef}
              value={selectedDate?.to && renderInputValue(selectedDate?.to)}
              onChange={handleDateChange}
              className='flex h-[32px] w-full max-w-[102px] border-divider border rounded-lg bg-transparent py-2 px-2 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out'
            />
          </>
        )}
      </div>
      <div className='flex py-4 px-6'>
        <Button
          variant='clear'
          size='sm'
          onClick={onCancel}
          data-testid='ranger-cancel'
        >
          {BUTTONS_ACTIONS_LABEL.cancel[locale]}
        </Button>
        <Button
          variant='solid'
          size='sm'
          onClick={onApply}
          data-testid='ranger-apply'
        >
          {BUTTONS_ACTIONS_LABEL.apply[locale]}
        </Button>
      </div>
    </div>
  );
};

export function RangeCalendar({
  className,
  classNames,
  showOutsideDays = true,
  numberOfMonths,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn('p-3', className)}
      classNames={RANGE_PICKER_STYLES}
      showOutsideDays={showOutsideDays}
      numberOfMonths={numberOfMonths}
      components={{
        IconLeft: () => <ChevronLeftIcon className='h-6 w-6' />,
        IconRight: () => <ChevronRightIcon className='h-6 w-6' />,
      }}
      {...props}
    />
  );
}

export function RangePicker({
  locale = 'en',
  createdAt,
  onApply,
  type = 'range',
  numberOfMonths = 2,
  trigger,
  isOpen,
  onClose,
  initialSingleDate,
  hideInputs = false,
  hideMenu = false,
  ...props
}: RangerPickerProps) {
  const [rangeType, setRangeType] = useState<PeriodKeys>('today');
  const [isCustom, setIsCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [singleDate, setSingleDate] = useState<Date>(
    initialSingleDate || new Date()
  );

  const handleRangeChange = (date: DateRange | undefined) => {
    setIsCustom(true);
    date && setSelectedDate(date);
  };

  const handleSingleChange = (date: Date) => {
    date && onApply(date);
    setSingleDate(date);
    onClose();
  };

  const handleAppy = () => {
    const { from, to } = selectedDate;
    onApply({ from, to, type: !hideMenu ? rangeType : null });
    onClose();
  };

  return (
    <div className={cn('grid gap-2 ')} data-testid='ranger'>
      <Popover open={isOpen}>
        <PopoverTrigger data-testid='ranger-trigger'>{trigger}</PopoverTrigger>
        <PopoverContent
          className='w-auto p-0 flex bg-[#FFFFFF]'
          align='start'
          data-testid='ranger-content'
        >
          {type === 'range' && !hideMenu && (
            <RangePickerMenu
              locale={locale}
              onDateChange={(date) => handleRangeChange(date)}
              onSelectType={(type) => setRangeType(type)}
              rangeType={rangeType}
              createdDate={createdAt}
              isCustom={isCustom}
            />
          )}

          <div className='flex flex-col'>
            <div className='flex'>
              <RangeCalendar
                initialFocus
                mode={type}
                selected={type === 'range' ? selectedDate : singleDate}
                onSelect={
                  type === 'range' ? handleRangeChange : handleSingleChange
                }
                locale={LOCALE[locale]}
                numberOfMonths={numberOfMonths}
                {...props}
              />
            </div>

            {type === 'range' && (
              <CalendarFooter
                onDateChange={(date) => handleRangeChange(date)}
                locale={locale}
                selectedDate={selectedDate}
                minDate={createdAt}
                onApply={() => handleAppy()}
                onCancel={onClose}
                hideInputs={hideInputs}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
