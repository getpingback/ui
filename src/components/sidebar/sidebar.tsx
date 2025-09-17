import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { BurgerArrowLeftIcon, BurgerArrowRightIcon } from '@stash-ui/light-icons';
import { useDevice } from '@/hooks/useDevice';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
function Sidebar({ className, isOpen, onOpenChange, ...props }: SidebarProps) {
  const device = useDevice();
  const isMobile = device === 'md';
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event?.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, onOpenChange]);

  return (
    <div
      ref={sidebarRef}
      data-testid="sidebar"
      className={cn(
        'flex flex-col h-screen bg-sidebar-background shadow-modal-2 pt-6 fixed top-0 left-0 z-50 lg:z-40 lg:relative lg:h-full transition-all duration-300 ease-in-out',
        isOpen && 'translate-x-0 w-[225px]',
        !isOpen && '-translate-x-[calc(100%+32px)] w-[225px] lg:translate-x-0 lg:w-16',
        className
      )}
      {...props}
    />
  );
}

export interface SideBarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onOpenChange: () => void;
  isOpen: boolean;
}
function SideBarHeader({ className, children, isOpen, onOpenChange, ...props }: SideBarHeaderProps) {
  return (
    <div data-testid="sidebar-header" className={cn('w-full relative px-3', className)} {...props}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 -right-px w-px h-8 bg-sidebar-background z-10" />
      <button
        className="absolute top-0 -right-[29px] w-7 h-8 pr-2 pl-1 flex items-center bg-surface rounded-r-full text-icon-tertiary shadow-modal-5 z-0"
        onClick={() => onOpenChange()}
      >
        {isOpen ? <BurgerArrowLeftIcon width={16} height={16} /> : <BurgerArrowRightIcon width={16} height={16} />}
      </button>
    </div>
  );
}

export interface SideBarContentProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarContent({ className, ...props }: SideBarContentProps) {
  return (
    <div
      data-testid="sidebar-content"
      className={cn('w-full h-full flex-1 flex flex-col gap-1 p-3 overflow-y-scroll no-scrollbar', className)}
      {...props}
    />
  );
}

export interface SideBarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarFooter({ className, ...props }: SideBarFooterProps) {
  return <div data-testid="sidebar-footer" className={cn('border-t border-default p-3', className)} {...props} />;
}

export { Sidebar, SideBarHeader, SideBarFooter, SideBarContent };
