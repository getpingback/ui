import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/button';
import { ptBR, enUS, es } from 'date-fns/locale';

export const LOCALE = {
  es: es,
  en: enUS,
  'pt-br': ptBR
};

export const LOCALE_DATE_FORMAT = {
  en: 'yyyy/MM/dd',
  'pt-br': 'dd/MM/yyyy',
  es: 'dd/MM/yyyy'
};

export const DEFAULT_PERIODS = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this-week',
  THIS_MONTH: 'this-month',
  THIS_YEAR: 'this-year',
  ALL_TIME: 'all-time',
  CUSTOM: 'custom'
};

export const DATA_PERIODS = [
  {
    id: DEFAULT_PERIODS.TODAY,
    es: 'Hoy',
    en: 'Today',
    'pt-br': 'Hoje'
  },
  {
    id: DEFAULT_PERIODS.YESTERDAY,
    es: 'Ayer',
    en: 'Yesterday',
    'pt-br': 'Ontem'
  },
  {
    id: DEFAULT_PERIODS.THIS_WEEK,
    es: 'Esta semana',
    en: 'This week',
    'pt-br': 'Esta semana'
  },

  {
    id: DEFAULT_PERIODS.THIS_MONTH,
    es: 'Este mes',
    en: 'This month',
    'pt-br': 'Este mês'
  },
  {
    id: DEFAULT_PERIODS.THIS_YEAR,
    es: 'Este año',
    en: 'This year',
    'pt-br': 'Este ano'
  },
  {
    id: DEFAULT_PERIODS.CUSTOM,
    es: 'Personalizado',
    en: 'Custom',
    'pt-br': 'Personalizado'
  }
];

export const DATA_PERIODS_LABEL = {
  today: {
    es: 'Hoy',
    en: 'Today',
    'pt-br': 'Hoje'
  },
  yesterday: {
    es: 'Ayer',
    en: 'Yesterday',
    'pt-br': 'Ontem'
  },
  'this-week': {
    es: 'Esta semana',
    en: 'This week',
    'pt-br': 'Esta semana'
  },
  'this-month': {
    es: 'Este mes',
    en: 'This month',
    'pt-br': 'Este mês'
  },
  'this-year': {
    es: 'Este año',
    en: 'This year',
    'pt-br': 'Este ano'
  },
  'all-time': {
    es: 'Todo periodo',
    en: 'All time',
    'pt-br': 'Todo o período'
  },
  custom: {
    es: 'Personalizado',
    en: 'Custom',
    'pt-br': 'Personalizado'
  },
  'select-date': {
    es: 'Seleccionar fecha',
    en: 'Select date',
    'pt-br': 'Selecionar data'
  }
};

export const BUTTONS_ACTIONS_LABEL = {
  apply: {
    es: 'Aplicar filtros',
    en: 'Apply filters',
    'pt-br': 'Aplicar filtros'
  },
  cancel: {
    es: 'Cancelar',
    en: 'Cancel',
    'pt-br': 'Cancelar'
  }
};

export const RANGE_PICKER_STYLES = {
  months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
  month: 'space-y-4 text-primary',
  multiple_months: '[&>div>div:last-child]:border-l-[1px] [&>div>div:last-child]:border-default',
  caption: 'flex justify-center gap-2 pt-4 pb-3 relative items-center text-tertiary opacity-85 capitalize ',
  caption_end: 'pr-3 pb-3 pl-3  ',
  caption_start: 'pl-3 pb-3 [&:first-child>div]:flex-row-reverse',
  caption_label: 'text-sm font-semibold',
  nav: ' flex items-center',
  nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
  nav_button_previous: 'border-none',
  nav_button_next: 'border-none',
  table: 'w-full border-collapse space-y-1',
  head_row: 'flex',
  head_cell: 'text-button-ghost-foreground rounded-md w-9  text-[12px] opacity-65 font-semibold capitalize ',
  row: 'flex w-full mt-0',
  cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md  first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
  day: cn(buttonVariants({ variant: 'clear' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 opacity-85'),
  day_range_end: '!bg-button-solid !border-none aria-selected:!rounded-s-sm',
  day_range_start: '!bg-button-solid !border-none aria-selected:!rounded-e-sm ',
  day_range: '!text-red-500',
  day_selected:
    '!text-button-solid-label !border-none rounded-lg hover:bg-button-solid hover:text-button-ghost-foreground focus:bg-button-solid focus:text-button-solid-foreground !font-medium',
  day_outside:
    'day-outside text-button-ghost-foreground opacity-50 aria-selected:bg-button-solid aria-selected:text-button-ghost-foreground',
  day_disabled: 'text-button-ghost-foreground opacity-50',
  day_range_middle: 'aria-selected:!bg-button-ghost !border-none aria-selected:!rounded-none aria-selected:!text-button-outlined-label ',
  day_hidden: 'invisible'
};
