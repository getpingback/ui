import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface ModalProps extends Dialog.DialogProps {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const Modal = ({ children, className, ...props }: ModalProps) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className="z-50 grid lg:place-items-center place-items-end grid-cols-1 fixed inset-0 bg-background-neutral w-screen h-screen backdrop-blur-[8px] animate-fade-in">
        <Dialog.Content
          data-testid={props['data-testid']}
          className={cn(
            'flex flex-col bg-surface h-fit border border-default shadow-modal-5 rounded-t-3xl p-6 lg:rounded-[32px] w-full lg:w-fit lg:min-w-80 lg:max-w-xl lg:p-8 data-[state=open]:animate-modal-slide-up lg:data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-slide-down lg:data-[state=closed]:animate-modal-fade-out',
            className
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export { Modal };
