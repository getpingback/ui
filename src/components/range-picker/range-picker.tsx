'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  format,
  subDays,
  startOfWeek,
  startOfMonth,
  isValid,
  parse,
} from 'date-fns';

import { DayPicker, DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Button } from '@/components/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/regular-icons';
import { ArrowRightIcon, CalendarIcon } from '@stash-ui/solid-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import {
  DEFAULT_PERIODS,
  DATA_PERIODS,
  BUTTONS_ACTIONS_LABEL,
  RANGE_PICKER_STYLES,
  LOCALE,
  LOCALE_DATE_FORMAT,
  DATA_PERIODS_LABEL,
} from './constants';
import useClickOutside from '@/hooks/useClickOutside';

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
  onApply: (data: DateRangeApplying | Date) => void;
  createdAt: string;
  type: 'range' | 'single';
  numberOfMonths?: number;
  trigger?: React.ReactNode;
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

interface TriggerProps {
  rangeDate?: DateRangeApplying;
  locale: 'en' | 'pt-br' | 'es';
}

export function TriggerRangeDate({ rangeDate, locale = 'en' }: TriggerProps) {
  const renderDate = (date: Date) => {
    const todayDate = format(new Date(), "dd 'de' MMM, yyyy", {
      locale: LOCALE[locale],
    });
    const formattedDate = format(date, "dd 'de' MMM, yyyy", {
      locale: LOCALE[locale],
    });

    if (todayDate === formattedDate) return DATA_PERIODS_LABEL.today[locale];
    return formattedDate;
  };

  const renderLabel = (rangeDate: DateRangeApplying) => {
    const fromDate =
      rangeDate?.from &&
      format(rangeDate?.from, "dd 'de' MMM, yyyy", {
        locale: LOCALE[locale],
      });
    const toDate =
      rangeDate?.to &&
      format(rangeDate?.to, "dd 'de' MMM, yyyy", {
        locale: LOCALE[locale],
      });
    return rangeDate && rangeDate.from ? (
      <>
        {rangeDate.type ? (
          <span className='text-[#71717A] opacity-85 mr-1'>
            {DATA_PERIODS_LABEL[rangeDate.type][locale]}:
          </span>
        ) : null}

        <span className='flex items-center text-[#52525B] opacity-85 mr-1'>
          {fromDate}
          {rangeDate.to && fromDate !== toDate ? (
            <>
              <ArrowRightIcon className='w-4 h-4 mx-1' />
              {renderDate(rangeDate.to)}
            </>
          ) : null}
        </span>
      </>
    ) : (
      'Select date'
    );
  };

  return (
    <div
      id='date'
      className='min-w-[200px] border border-solid border-[#D4D4D8] py-2 px-3  rounded-lg w-fit flex items-center justify-start text-left text-sm font-semibold'
    >
      <CalendarIcon className='w-4 h-4 mr-1 opacity-85' color='#71717A' />
      {rangeDate && renderLabel(rangeDate)}
    </div>
  );
}

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
  onCancel,
  onApply,
  hideInputs,
}: FooterProps) => {
  const [startInputValue, setStartInputValue] = useState('');
  const [endInputValue, setEndInputValue] = useState('');

  const initialInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedDate?.from) {
      setStartInputValue(
        format(selectedDate.from, LOCALE_DATE_FORMAT[locale], {
          locale: LOCALE[locale],
        })
      );
    }
    if (selectedDate?.to) {
      setEndInputValue(
        format(selectedDate.to, LOCALE_DATE_FORMAT[locale], {
          locale: LOCALE[locale],
        })
      );
    }
  }, [selectedDate, locale]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'initial-date') {
      setStartInputValue(value);
    } else {
      setEndInputValue(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const dateFormat = LOCALE_DATE_FORMAT[locale];
    const parsedDate = parse(value, dateFormat, new Date(), {
      locale: LOCALE[locale],
    });

    if (isValid(parsedDate)) {
      if (id === 'initial-date') {
        onDateChange({ from: parsedDate, to: selectedDate?.to });
        setStartInputValue(
          format(parsedDate, dateFormat, { locale: LOCALE[locale] })
        );
      } else {
        onDateChange({ from: selectedDate?.from, to: parsedDate });
        setEndInputValue(
          format(parsedDate, dateFormat, { locale: LOCALE[locale] })
        );
      }
    } else {
      if (id === 'initial-date') {
        setStartInputValue('');
      } else {
        setEndInputValue('');
      }
    }
  };

  return (
    <div className='w-full flex justify-between border-t-[1px] border-[#71717A14]'>
      <div className='flex items-center py-4 px-6 gap-2'>
        {!hideInputs && (
          <>
            <input
              type='text'
              id='initial-date'
              data-testid='initial-date'
              ref={initialInputRef}
              placeholder={LOCALE_DATE_FORMAT[locale]}
              value={startInputValue}
              onChange={handleDateChange}
              onBlur={handleBlur}
              className='flex h-[32px] w-full max-w-[102px] border-divider border rounded-lg bg-transparent py-2 px-2 text-sm outline-none text-tertiary-foreground placeholder:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#A1A1AA] focus:border-[#9061F9] focus:[box-shadow:0px_0px_0px_3px_rgba(144,_97,_249,_0.12)] transition-all duration-200 ease-in-out'
            />
            <ArrowRightIcon opacity={0.45} />
            <input
              type='text'
              id='end-date'
              data-testid='end-date'
              onBlur={handleBlur}
              ref={endInputRef}
              value={endInputValue}
              placeholder={LOCALE_DATE_FORMAT[locale]}
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

export function RangePicker({
  locale = 'en',
  createdAt,
  onApply,
  type = 'range',
  numberOfMonths = 2,
  trigger,
  initialSingleDate,
  hideInputs = false,
  hideMenu = false,
}: RangerPickerProps) {
  const commonProps = {
    className: 'p-3',
    classNames: RANGE_PICKER_STYLES,
    showOutsideDays: true,
    numberOfMonths,
    components: {
      IconLeft: () => <ChevronLeftIcon className='h-6 w-6' />,
      IconRight: () => <ChevronRightIcon className='h-6 w-6' />,
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [rangeType, setRangeType] = useState<PeriodKeys>('today');
  const [isCustom, setIsCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const [dateApplied, setDateApplied] = useState<DateRangeApplying>({
    from: selectedDate.from,
    to: selectedDate.to,
    type: 'today',
  });

  const [singleDate, setSingleDate] = useState<Date>(
    initialSingleDate || new Date()
  );

  const rangeRef = useRef<HTMLDivElement>(null);

  useClickOutside(rangeRef, () => {
    setIsOpen(false);
  });

  const handleRangeChange = (date: DateRange | undefined) => {
    setIsCustom(true);
    date && setSelectedDate(date);
  };

  const handleSingleChange = (date: Date | undefined) => {
    if (date) {
      onApply(date);
      setSingleDate(date);
    }
  };

  const handleAppy = () => {
    const { from, to } = selectedDate;
    onApply({ from, to, type: !hideMenu ? rangeType : null });
    setDateApplied({ from, to, type: !hideMenu ? rangeType : null });
    setIsOpen(false);
  };

  return (
    <div className={cn('grid gap-2 ')} data-testid='ranger'>
      <Popover open={isOpen}>
        <PopoverTrigger
          data-testid='ranger-trigger'
          onClick={() => setIsOpen(!isOpen)}
          type='submit'
        >
          {trigger ? (
            trigger
          ) : (
            <TriggerRangeDate locale={locale} rangeDate={dateApplied} />
          )}
        </PopoverTrigger>
        <PopoverContent
          ref={rangeRef}
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
              {type === 'range' ? (
                <DayPicker
                  {...commonProps}
                  mode='range'
                  selected={selectedDate}
                  onSelect={handleRangeChange}
                />
              ) : (
                <DayPicker
                  {...commonProps}
                  mode='single'
                  selected={singleDate}
                  onSelect={(date) => handleSingleChange(date)}
                />
              )}
            </div>

            {type === 'range' && (
              <CalendarFooter
                onDateChange={(date) => handleRangeChange(date)}
                locale={locale}
                selectedDate={selectedDate}
                minDate={createdAt}
                onApply={() => handleAppy()}
                onCancel={() => setIsOpen(false)}
                hideInputs={hideInputs}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
