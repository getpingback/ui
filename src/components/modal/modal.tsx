import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface ModalProps extends Dialog.DialogProps {
  children?: React.ReactNode;
  className?: string;
}

const Modal = ({ children, className, ...props }: ModalProps) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className="z-50 grid md:place-items-center place-items-end grid-cols-1 fixed inset-0 bg-[#FFFFFF]/70 w-screen h-screen backdrop-blur-[8px] animate-fade-in">
        <Dialog.Content
          className={cn(
            'flex flex-col bg-[#FFFFFF] h-fit shadow-modal-large md:rounded-xl rounded-t-xl w-full md:w-auto md:max-w-xl p-4 data-[state=open]:animate-modal-slide-up md:data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-slide-down md:data-[state=closed]:animate-modal-fade-out',
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
