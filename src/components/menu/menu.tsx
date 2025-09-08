import React, { useState, ReactElement } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronRightIcon, ArrowLeftLargeIcon } from '@stash-ui/regular-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const itemVariants = cva(
  'h-[40px] flex items-center no-underline select-none no-focus:bg-neutral-hover flex-start w-full px-[16px] cursor-pointer text-sm font-normal text-tertiary hover:text-primary hover:bg-neutral-hover transition duration-300 ease-in-out [&>svg>path]:opacity-[.45] [&>svg]:mr-2 [&>svg]:text-icon-primary'
);
export interface MenuDividerProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {}
function MenuDivider(props: MenuDividerProps) {
  return <span className="w-full h-[1px] bg-border-default my-2" {...props} data-testid="menu-divider"></span>;
}

export interface MenuTitleProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {}
function MenuTitle(props: MenuTitleProps) {
  return <h1 className="w-full text-[10px] font-bold text-gray-400 uppercase px-[16px] pb-[8px]" data-testid="menu-title" {...props}></h1>;
}

export interface MenuItemProps extends React.ComponentProps<typeof NavigationMenuPrimitive.Link> {
  icon?: JSX.Element;
}
function MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <NavigationMenuPrimitive.Root className={cn('w-full', className)}>
      <NavigationMenuPrimitive.Link
        className={cn(itemVariants(), className, 'justify-start hover:no-underline')}
        data-testid="menu-item"
        {...props}
      >
        {props.icon && props.icon}
        {props.children}
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Root>
  );
}

export interface MenuProps extends React.HtmlHTMLAttributes<HTMLElement> {
  subHeight: number;
}

function Menu({ className, subHeight, ...props }: MenuProps) {
  const [selectedSub, setSelectedSubItem] = useState<ReactElement[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const children = props.children as ReactElement;
  const childrenArray = Array.isArray(children) ? children : [children];

  const handleAction = (e: MouseEvent | KeyboardEvent) => {
    const targetId = (e.target as HTMLElement)?.id;
    const accessKey = (e.target as HTMLElement)?.accessKey;

    if (targetId === 'sub' && children && accessKey) {
      e.stopPropagation();
      const filteredChildren = children.props
        ? children.props?.children.filter((item: any) => item.props.value === accessKey)
        : childrenArray.filter((item: any) => item.props.value === accessKey);
      setSelectedSubItem(filteredChildren);
    }
  };

  const renderSubItems = () => {
    return (
      <div className="w-full flex" style={{ height: subHeight }}>
        <div className="animate-slide-left w-full fixed transition-all duration-300 ease-out">
          <button
            onClick={(e) => {
              setSelectedSubItem(null);
              setIsOpen(true);
              e.stopPropagation();
            }}
            className="w-full flex justify-between items-center pt-[12px] pb-[4px] pl-[15px] text-tertiary-foreground font-semibold text-sm [&>svg]:mr-2 [&>svg>path]:fill-icons-foreground [&>svg>path]:opacity-[.45] hover:text-active"
          >
            <ArrowLeftLargeIcon className="text-icon-primary" />
            <div className="w-full flex [&>div]:flex items-center text-secondary">{selectedSub && selectedSub[0]?.props.label}</div>
          </button>
          <div className="w-full h-[1px] bg-border-default my-[8px]"></div>

          {selectedSub && selectedSub[0].props.children.map((item: any) => item)}
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={(e) => handleAction(e as any)}
      className={cn(' w-full flex flex-col z-50 min-w-fit overflow-hidden', className)}
      data-testid="menu"
      {...props}
    >
      {selectedSub ? (
        renderSubItems()
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: subHeight
          }}
          className={isOpen ? 'animate-slide-right w-full transition-all duration-300 ease-out' : ''}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export interface MenuSubItemProps extends React.ComponentProps<typeof NavigationMenuPrimitive.Item> {
  icon?: JSX.Element;
  label?: string;
  value?: string;
}
function MenuSubItem({ className, ...props }: MenuSubItemProps) {
  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.Item className="list-none" {...props}>
        <div
          className={cn(
            itemVariants(),
            className,
            (className =
              'w-full z-50 flex items-center justify-between select-none focus:bg-neutral-hover hover:text-primary hover:bg-neutral-hover transition duration-300 ease-in-out')
          )}
          data-testid="menu-sub"
          id="sub"
          accessKey={props.value}
        >
          <div className="w-full pointer-events-none flex items-center justify-between ">
            <span className="flex items-center [&>svg]:mr-2 [&>svg>path]:opacity-[.45]">
              {props.icon} {props.label}
            </span>
            <ChevronRightIcon />
          </div>
        </div>
      </NavigationMenuPrimitive.Item>
    </NavigationMenuPrimitive.Root>
  );
}

export { MenuDivider, MenuTitle, MenuItem, MenuSubItem, Menu };
