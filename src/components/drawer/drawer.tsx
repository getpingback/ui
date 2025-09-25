import * as React from 'react';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { TimesIcon } from '@stash-ui/light-icons';

interface DrawerRootProps extends Dialog.DialogProps {
  children: React.ReactNode;
  className?: string;
}

interface DrawerHeaderProps {
  title: string;
  description?: string;
  prefixIcon?: React.ReactNode;
  className?: string;
}

interface DrawerBodyProps {
  children: React.ReactNode;
  hasDivider?: boolean;
  className?: string;
}

interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DrawerRoot = ({ children, className, ...props }: DrawerRootProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-[45] fixed inset-0 bg-background-neutral w-screen h-screen backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className={cn(
            'z-50 flex flex-col bg-surface shadow-modal-3 rounded-2xl max-w-[calc(100%-48px)] w-[400px] border border-default fixed right-6 top-6 h-[calc(100vh-48px)] data-[state=open]:animate-drawer-slide-in data-[state=closed]:animate-drawer-slide-out',
            className
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const DrawerHeader = ({ title, description, prefixIcon, className }: DrawerHeaderProps) => {
  return (
    <div className={cn('flex justify-between gap-2 p-6 pb-4', className)}>
      <div className="flex gap-2">
        {prefixIcon && <div className="h-fit">{prefixIcon}</div>}
        <div className="flex flex-col gap-1">
          <Dialog.Title className="text-lg font-bold leading-6 text-primary">{title}</Dialog.Title>
          {description && <Dialog.Description className="text-xs font-normal text-tertiary">{description}</Dialog.Description>}
        </div>
      </div>
      <Dialog.Close className="h-fit">
        <TimesIcon />
      </Dialog.Close>
    </div>
  );
};

const DrawerBody = ({ children, hasDivider, className }: DrawerBodyProps) => {
  return (
    <>
      {hasDivider && <div className="h-px w-full bg-border-default" data-testid="divider" />}
      <div className={cn('flex flex-col flex-1 overflow-y-auto p-6', className)}>{children}</div>
    </>
  );
};

const DrawerFooter = ({ children, className }: DrawerFooterProps) => {
  return <div className={cn('p-6 border-t border-border-default', className)}>{children}</div>;
};

export { DrawerRoot, DrawerHeader, DrawerBody, DrawerFooter };
