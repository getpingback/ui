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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@stash-ui/regular-icons';
import { CalendarIcon } from '@stash-ui/solid-icons';
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
  'h-[32px] inline-flex items-center text-xs font-primary cursor-pointer opacity-85 px-3 rounded-lg hover:bg-[#9061F914] hover:text-[#9061F9] transition-all duration-200 ease-in-out',
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
  onChange: (data: DateRangeApplying | Date) => void;
  type: 'range' | 'single';
  numberOfMonths?: number;
  trigger?: React.ReactNode;
  initialSingleDate?: Date;
  initialRangeDate?: DateRange;
  initialType?: PeriodKeys;
  hideInputs?: boolean;
  hideMenu?: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
}

interface MenuProps {
  locale?: 'en' | 'pt-br' | 'es';
  onSelect?: (date?: Date) => void;
  onDateChange: (date: DateRange) => void;
  onSelectType: (type: PeriodKeys) => void;
  rangeType?: string;
  isCustom?: boolean;
}

interface FooterProps {
  onDateChange: (date: DateRange) => void;
  selectedDate: DateRange;
  locale: 'en' | 'pt-br' | 'es';
  onApply: () => void;
  onCancel: () => void;
  hideInputs: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
}

interface TriggerProps {
  rangeDate?: DateRangeApplying | Date;
  locale: 'en' | 'pt-br' | 'es';
  hideMenu: boolean;
  type: 'range' | 'single';
}

export function TriggerRangeDate({
  rangeDate,
  type,
  locale = 'en',
  hideMenu,
}: TriggerProps) {
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

  const renderLabel = (rangeDate: DateRangeApplying | Date) => {
    if (type === 'range' && 'from' in rangeDate && 'to' in rangeDate) {
      const fromDate = rangeDate?.from
        ? format(rangeDate.from, "dd 'de' MMM, yyyy", {
            locale: LOCALE[locale],
          })
        : null;
      const toDate = rangeDate?.to
        ? format(rangeDate.to, "dd 'de' MMM, yyyy", {
            locale: LOCALE[locale],
          })
        : null;

      return (
        <>
          {rangeDate.type && !hideMenu ? (
            <span className='text-[#71717A] opacity-85 mr-1 text-nowrap'>
              {DATA_PERIODS_LABEL[rangeDate.type][locale]}:
            </span>
          ) : null}
          <span className='flex items-center text-[#52525B] opacity-85 mr-1 '>
            <span className='w-full text-nowrap'>{fromDate}</span>
            {rangeDate.to && fromDate !== toDate ? (
              <>
                <ArrowRightIcon className='w-4 h-4 mx-1 min-w-4' />
                <span className='w-full text-nowrap'>
                  {renderDate(rangeDate.to)}
                </span>
              </>
            ) : null}
          </span>
        </>
      );
    } else if (rangeDate instanceof Date) {
      return (
        <span className='flex items-center text-[#52525B] opacity-85 mr-1'>
          {format(rangeDate, "dd 'de' MMM, yyyy", {
            locale: LOCALE[locale],
          })}
        </span>
      );
    }

    return DATA_PERIODS_LABEL['select-date'][locale];
  };

  return (
    <div
      id='date'
      className='w-full border border-solid border-[#D4D4D8] py-2 px-3  rounded-lg flex items-center justify-start text-left text-sm font-semibold '
    >
      <CalendarIcon
        className='w-4 h-4 mr-1 min-w-4 opacity-85'
        color='#71717A'
      />
      {rangeDate && renderLabel(rangeDate)}
    </div>
  );
}

const RangePickerMenu = ({
  locale = 'en',
  onDateChange,
  onSelectType,
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
      case DEFAULT_PERIODS.CUSTOM:
        return;

      default:
        return handleDateChange([DATE_NOW, DATE_NOW]);
    }
  };

  return (
    <ul className='w-[130px] flex flex-col gap-1 pt-[20px] px-3 border-r border-[#71717A14] font-primary'>
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
  maxDate,
  minDate,
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
      let adjustedDate = parsedDate;
      if (maxDate && parsedDate > maxDate) {
        adjustedDate = maxDate;
      }
      if (minDate && parsedDate < minDate) {
        adjustedDate = minDate;
      }

      if (id === 'initial-date') {
        onDateChange({ from: adjustedDate, to: selectedDate?.to });
        setStartInputValue(
          format(adjustedDate, dateFormat, { locale: LOCALE[locale] })
        );
      } else {
        onDateChange({ from: selectedDate?.from, to: adjustedDate });
        setEndInputValue(
          format(adjustedDate, dateFormat, { locale: LOCALE[locale] })
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
            <ArrowRightIcon opacity={0.45} color='#52525B' />
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
  onChange,
  type = 'range',
  trigger,
  initialSingleDate,
  numberOfMonths = 2,
  hideInputs = false,
  hideMenu = false,
  initialRangeDate,
  initialType = 'this-month',
  maxDate,
  minDate,
}: RangerPickerProps) {
  const commonProps = {
    classNames: RANGE_PICKER_STYLES,
    showOutsideDays: true,
    locale: LOCALE[locale],
    numberOfMonths: type === 'range' ? 2 : 1,
    components: {
      IconLeft: () => <ChevronLeftIcon className='h-6 w-6' />,
      IconRight: () => <ChevronRightIcon className='h-6 w-6' />,
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [rangeType, setRangeType] = useState<PeriodKeys>('today');
  const [isCustom, setIsCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: initialRangeDate?.from || new Date(),
    to: initialRangeDate?.to || new Date(),
  });

  const [dateApplied, setDateApplied] = useState<DateRangeApplying>({
    from: selectedDate.from,
    to: selectedDate.to,
    type: initialType,
  });

  const [singleDate, setSingleDate] = useState<Date>(
    initialSingleDate || new Date()
  );

  const rangeRef = useRef<HTMLDivElement>(null);

  useClickOutside(rangeRef, () => {
    setIsOpen(false);
    setIsCustom(false);
  });

  const handleRangeChange = (
    date: DateRange | undefined,
    isFromMenu = false
  ) => {
    if (!isFromMenu) {
      setIsCustom(true);
    }

    if (date?.from === undefined) {
      setSelectedDate({ from: date?.to, to: date?.to });
    } else if (date?.to === undefined) {
      setSelectedDate({ from: date?.from, to: date?.from });
    } else {
      setSelectedDate(date);
    }
  };

  const handleSingleChange = (date: Date | undefined) => {
    if (date) {
      onChange(date);
      setSingleDate(date);
    }
  };

  const handleAppy = () => {
    const { from, to } = selectedDate;
    onChange({ from, to, type: !hideMenu ? rangeType : null });
    setDateApplied({ from, to, type: !hideMenu ? rangeType : null });
    setIsOpen(false);
    setIsCustom(false);
  };

  return (
    <div className={cn('w-fit grid gap-2 ')} data-testid='ranger'>
      <Popover open={isOpen}>
        <PopoverTrigger
          data-testid='ranger-trigger'
          className='w-full max-w-full cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
          type='submit'
        >
          {trigger ? (
            trigger
          ) : (
            <TriggerRangeDate
              locale={locale}
              rangeDate={type === 'range' ? dateApplied : singleDate}
              type={type}
              hideMenu={hideMenu}
            />
          )}
        </PopoverTrigger>
        <PopoverContent
          ref={rangeRef}
          className=' p-0 flex bg-[#FFFFFF] !w-fit !shadow-dropdown border-none'
          align={type === 'range' && numberOfMonths > 2 ? 'end' : 'center'}
          data-testid='ranger-content'
        >
          {type === 'range' && !hideMenu && (
            <RangePickerMenu
              locale={locale}
              onDateChange={(date) => handleRangeChange(date, true)}
              onSelectType={(type) => setRangeType(type)}
              rangeType={dateApplied.type}
              isCustom={isCustom}
            />
          )}

          <div className='flex flex-col'>
            <div className='flex'>
              {type === 'range' ? (
                <DayPicker
                  {...commonProps}
                  numberOfMonths={numberOfMonths}
                  mode='range'
                  selected={selectedDate}
                  onSelect={(date) => handleRangeChange(date, false)}
                  showOutsideDays={false}
                  toDate={maxDate || undefined}
                  fromDate={minDate || undefined}
                />
              ) : (
                <DayPicker
                  {...commonProps}
                  numberOfMonths={1}
                  mode='single'
                  selected={singleDate}
                  onSelect={(date) => handleSingleChange(date)}
                />
              )}
            </div>

            {type === 'range' && (
              <CalendarFooter
                onDateChange={(date) => handleRangeChange(date, false)}
                locale={locale}
                selectedDate={selectedDate}
                onApply={() => handleAppy()}
                onCancel={() => setIsOpen(false)}
                hideInputs={hideInputs}
                maxDate={maxDate}
                minDate={minDate}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
