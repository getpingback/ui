import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}
function Sidebar({ className, isOpen, onClose, ...props }: SidebarProps) {
  return (
    <div
      data-testid="sidebar"
      className={`h-screen px-[12px] py-[24px] bg-sidebar-background shadow-modal-2 fixed top-0 left-0 z-40 transition-all duration-200 ease-out ${
        isOpen ? 'w-[225px]' : 'w-[64px]'
      }`}
      {...props}
    />
  );
}

export interface SideBarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarHeader({ className, ...props }: SideBarHeaderProps) {
  return <div data-testid="sidebar-header" className={cn('w-full h-[40px] flex items-center py-8', className)} {...props} />;
}

export interface SideBarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarFooter({ className, ...props }: SideBarFooterProps) {
  return (
    <div
      data-testid="sidebar-footer"
      className={cn(
        'py-[12px] bg-sidebar-background absolute bottom-0 flex justify-center items-center border-t border-solid border-default',
        className
      )}
      {...props}
    />
  );
}

export interface SideBarContentProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideBarContent({ className, ...props }: SideBarContentProps) {
  return (
    <div
      data-testid="sidebar-content"
      className={cn('w-full h-[calc(100vh-180px)] py-[24px] flex flex-col items-center overflow-y-scroll no-scrollbar', className)}
      {...props}
    />
  );
}

export { Sidebar, SideBarHeader, SideBarFooter, SideBarContent };
