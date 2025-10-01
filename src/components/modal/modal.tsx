import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { TimesIcon } from '@stash-ui/light-icons';

interface ModalProps extends Dialog.DialogProps {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const Modal = ({ children, className, ...props }: ModalProps) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay
        className="z-[45] fixed inset-0 bg-background-neutral w-screen h-screen backdrop-blur-sm animate-fade-in"
        data-testid="modal-overlay"
        onClick={(e) => e.stopPropagation()}
      />
      <Dialog.Content
        data-testid={props['data-testid']}
        className={cn(
          'z-50 fixed max-h-[80vh] overflow-y-auto lg:inset-0 lg:m-auto bottom-0 left-0 flex flex-col gap-6 bg-surface h-fit border border-default shadow-modal-5 rounded-t-3xl p-6 lg:rounded-[32px] w-full lg:w-fit lg:min-w-[504px] lg:max-w-xl lg:p-8 data-[state=open]:animate-modal-slide-up lg:data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-slide-down lg:data-[state=closed]:animate-modal-fade-out',
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const ModalTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Dialog.Title className={cn('text-lg font-semibold leading-none text-secondary', className)}>{children}</Dialog.Title>
);

const ModalClose = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <Dialog.Close className={cn('w-8 h-8 items-center justify-center absolute right-4 top-4 lg:flex hidden', className)} onClick={onClick}>
    <TimesIcon className="text-icon-tertiary w-8 h-8" />
  </Dialog.Close>
);

export { Modal, ModalTitle, ModalClose };
