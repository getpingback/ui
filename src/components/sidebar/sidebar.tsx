import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}
function Sidebar({ className, isOpen, onClose, ...props }: SidebarProps) {
  const keyPress = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [onClose, isOpen]
  );

  React.useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <div
      data-testid='sidebar'
      className={`h-screen bg-background-accent shadow-bottom_sheet-2 fixed top-0 left-0 z-40 transition-all duration-300 ease-out ${
        isOpen ? 'w-[250px]' : 'w-[114px]'
      }`}
      {...props}
    />
  );
}

export interface SideBarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarHeader({ className, ...props }: SideBarHeaderProps) {
  return (
    <div
      data-testid='sidebar-header'
      className={cn(
        'w-full h-[40px] flex justify-center items-center p-8',
        className
      )}
      {...props}
    />
  );
}

export interface SideBarFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarFooter({ className, ...props }: SideBarFooterProps) {
  return (
    <div
      data-testid='sidebar-footer'
      className={cn(
        'w-full h-[68px] bg-background-accent absolute bottom-0 flex justify-center items-center px-8 border-t border-solid border-border-accent',
        className
      )}
      {...props}
    />
  );
}

export interface SideBarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarContent({ className, ...props }: SideBarContentProps) {
  return (
    <div
      data-testid='sidebar-content'
      className={cn(
        'w-full h-[calc(100vh-68px)] flex flex-col items-center overflow-y-scroll no-scrollbar ',
        className
      )}
      {...props}
    />
  );
}

export { Sidebar, SideBarHeader, SideBarFooter, SideBarContent };
