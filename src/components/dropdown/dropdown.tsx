import React, { useState, ReactElement, MouseEvent } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  ArrowLeftLargeIcon,
} from '@stash-ui/regular-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const itemVariants = cva(
  'h-[40px] flex items-center select-none outline-none focus:bg-list-hover flex-start w-full px-[16px] cursor-pointer text-sm font-normal text-list-label hover:text-primary-foreground hover:bg-list-hover transition duration-300 ease-in-out [&>svg>path]:opacity-[.45] [&>svg]:mr-2'
);

export interface DropdownDividerProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {}

function DropdownDivider(props: DropdownDividerProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className='w-full h-[1px] bg-list-hover my-[8px]'
      {...props}
    ></DropdownMenuPrimitive.Separator>
  );
}

export interface DropdownTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

function DropdownTitle(props: DropdownTitleProps) {
  return (
    <h1
      className='w-full text-[10px] font-bold text-gray-400 uppercase px-[16px] pb-[8px] '
      data-testid='dropdown-title'
      {...props}
    />
  );
}

export interface DropdownItemProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  icon?: JSX.Element;
}

function DropdownItem({ className, ...props }: DropdownItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(itemVariants(), className)}
      data-testid='dropdown-item'
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </DropdownMenuPrimitive.Item>
  );
}

export interface DropdownRadioProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  isChecked: boolean;
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: JSX.Element;
}

function DropdownRadioItem({
  className,
  isChecked,
  setIsChecked,
  ...props
}: DropdownRadioProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(itemVariants(), className, 'flex justify-between')}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      data-testid='dropdown-radio'
    >
      {props.icon && props.icon}
      {props.children}
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export interface DropdownProps
  extends React.Component<typeof DropdownMenuPrimitive.Root>,
    React.HTMLAttributes<HTMLDivElement> {
  trigger?: JSX.Element;
  side?: 'top' | 'bottom' | 'left' | 'right';
  subHeight?: number;
  align?: 'start' | 'end';
}

function Dropdown({
  className,
  trigger,
  side,
  subHeight,
  align,
  ...props
}: DropdownProps) {
  const [selectedSub, setSelectedSubItem] = useState<ReactElement[] | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const children = props.children as ReactElement;
  const childrenArray = Array.isArray(children) ? children : [children];

  const handleAction = (e: MouseEvent | KeyboardEvent) => {
    const targetId = (e.target as HTMLElement)?.id;
    const accessKey = (e.target as HTMLElement)?.accessKey;

    if (targetId === 'sub' && children && accessKey) {
      const filteredChildren = children.props
        ? children.props?.children.filter(
            (item: any) => item.props.value === accessKey
          )
        : childrenArray.filter((item: any) => item.props.value === accessKey);
      setSelectedSubItem(filteredChildren);
    }
  };

  const handleClose = () => {
    setSelectedSubItem(null);
    setIsOpen(false);
  };

  const renderSubItems = () => {
    return (
      <div
        style={{
          display: 'flex',
          width: 252,
          height: subHeight,
        }}
      >
        <div className='animate-slide-left w-full fixed transition-all duration-300 ease-out'>
          <button
            onClick={() => {
              setSelectedSubItem(null);
              setIsOpen(true);
            }}
            className='flex justify-between items-center px-[16px] pt-[12px] pb-[4px] text-tertiary-foreground font-semibold text-sm [&>svg]:mr-2 [&>svg>path]:fill-icons-foreground [&>svg>path]:opacity-[.45] hover:text-active'
          >
            <ArrowLeftLargeIcon />
            <div className='w-full flex [&>div]:flex items-center'>
              {selectedSub && selectedSub[0].props.label}
            </div>
          </button>
          <DropdownDivider />

          {selectedSub &&
            selectedSub[0].props.children.map((item: ReactElement) => item)}
        </div>
      </div>
    );
  };

  return (
    <DropdownMenuPrimitive.Root
      data-testid='dropdown'
      onOpenChange={(open) => !open && handleClose()}
    >
      <DropdownMenuPrimitive.Trigger>{trigger}</DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          onClick={(e) => handleAction(e)}
          side={side || 'top'}
          className={cn(
            ' w-[252px] py-[12px] flex flex-col z-50 min-w-fit overflow-hidden rounded-lg bg-background-accent shadow-modal',
            className
          )}
          sideOffset={4}
          align={align || 'center'}
          {...props}
        >
          {selectedSub ? (
            renderSubItems()
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: subHeight,
                width: 252,
              }}
              className={
                isOpen
                  ? 'animate-slide-right w-full transition-all duration-300 ease-out'
                  : ''
              }
            >
              {children}
            </div>
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export interface DropdownSubContentProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  icon: JSX.Element;
}
function DropdownSub({ className, ...props }: DropdownSubContentProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Item>
        <div
          className={cn(
            itemVariants(),
            className,
            (className =
              'w-full z-50 flex items-center justify-between select-none outline-none focus:bg-list-hover hover:text-primary-foreground transition duration-300 ease-in-out')
          )}
          {...props}
          data-testid='dropdown-sub'
          id='sub'
          accessKey={props.value}
        >
          <div className='w-full pointer-events-none flex items-center justify-between '>
            <span className='flex items-center [&>svg]:mr-2 [&>svg>path]:opacity-[.45]'>
              {props.icon} {props.label}
            </span>
            <ChevronRightIcon />
          </div>
        </div>
      </DropdownMenuPrimitive.Item>
    </DropdownMenuPrimitive.Root>
  );
}

export {
  Dropdown,
  DropdownItem,
  DropdownRadioItem,
  DropdownDivider,
  DropdownSub,
  DropdownTitle,
};
