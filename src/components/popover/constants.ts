export type PopoverPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'right-start'
  | 'right-center'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'left-start'
  | 'left-center'
  | 'left-end';

export const POPOVER_POSITIONS: Record<string, PopoverPosition> = {
  TOP_START: 'top-start',
  TOP_CENTER: 'top-center',
  TOP_END: 'top-end',
  RIGHT_START: 'right-start',
  RIGHT_CENTER: 'right-center',
  RIGHT_END: 'right-end',
  BOTTOM_START: 'bottom-start',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_END: 'bottom-end',
  LEFT_START: 'left-start',
  LEFT_CENTER: 'left-center',
  LEFT_END: 'left-end'
};
