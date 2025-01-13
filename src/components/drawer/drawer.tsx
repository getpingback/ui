import * as Dialog from '@radix-ui/react-dialog';
import { TimesIcon } from '@stash-ui/light-icons';
import * as React from 'react';

interface DrawerProps extends Dialog.DialogProps {
  title: string;
  description?: string;
  prefixIcon?: React.ReactNode;
  hasDivider?: boolean;
  footer?: React.ReactNode;
}

function Drawer({ children, title, description, prefixIcon, hasDivider, footer, ...props }: DrawerProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-50 fixed inset-0 bg-[#00000011] w-screen h-screen backdrop-blur-[1px] animate-fade-in" />
        <Dialog.Content className="max-w-[calc(100%-48px)] z-50 flex flex-col bg-[#FFFFFF] shadow-drawer rounded-xl md:max-w-full w-[400px] border border-border-card fixed right-6 top-6 h-[calc(100vh-48px)] data-[state=open]:animate-drawer-slide-in data-[state=closed]:animate-drawer-slide-out">
          <div className="flex justify-between gap-2 p-6 pb-4">
            <div className="flex gap-2">
              {prefixIcon && <div className="h-fit">{prefixIcon}</div>}
              <div className="flex flex-col gap-1">
                <Dialog.Title className="text-lg font-bold leading-6 text-primary-foreground">{title}</Dialog.Title>
                {description && (
                  <Dialog.Description className="text-xs font-normal text-primary-foreground opacity-65">{description}</Dialog.Description>
                )}
              </div>
            </div>
            <Dialog.Close className="h-fit">
              <TimesIcon />
            </Dialog.Close>
          </div>
          {hasDivider && <div className="h-px w-full bg-[#0000000A]" data-testid="divider" />}
          <div className="flex flex-col flex-1 overflow-y-auto p-6">{children}</div>
          {footer && <div className="p-6 border-t border-[#0000000A]">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { Drawer };
