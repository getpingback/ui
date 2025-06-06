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
      <Dialog.Overlay className="z-50 fixed inset-0 bg-[#FFFFFF]/70 w-screen h-screen backdrop-blur-[8px] animate-fade-in" />
      <div className="z-50 fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Content
            className={cn(
              'z-50 flex flex-col bg-[#FFFFFF] h-fit shadow-modal-large md:rounded-xl rounded-t-xl w-full md:w-auto md:max-w-xl p-4 relative data-[state=open]:animate-modal-slide-up md:data-[state=open]:animate-modal-fade-in data-[state=closed]:animate-modal-slide-down md:data-[state=closed]:animate-modal-fade-out',
              className
            )}
          >
            {children}
          </Dialog.Content>
        </div>
      </div>
    </Dialog.Portal>
  </Dialog.Root>
);

export { Modal };
