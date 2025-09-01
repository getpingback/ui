import React from 'react';
import { toast, Toaster as PrimitiveToaster, ToastBar } from 'react-hot-toast';
import { CheckIcon } from '@stash-ui/solid-icons';
import { TimesCircleIcon, TimesIcon } from '@stash-ui/regular-icons';
import { Button } from '../button';
import { Typography } from '../typography';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type ToasterProps = React.ComponentProps<typeof PrimitiveToaster>;

const messageVariants = cva('text-sm font-medium', {
  variants: {
    type: {
      success: 'text-success',
      error: 'text-error'
    }
  }
});

const BackgroundIcon = ({ icon, bgColor }: { icon: React.ReactNode; bgColor: string }) => {
  return (
    <div className={`min-w-8 h-8 flex items-center justify-center rounded-full`} style={{ backgroundColor: bgColor }}>
      {icon}
    </div>
  );
};

const Toaster = ({ position = 'top-right', ...props }: ToasterProps) => {
  const mapIcons = {
    success: <BackgroundIcon icon={<CheckIcon className="text-icon-success" />} bgColor="#31C48D29" />,
    error: <BackgroundIcon icon={<TimesCircleIcon className="text-icon-error" />} bgColor="#F052521F" />
  };

  return (
    <PrimitiveToaster
      {...props}
      position={position}
      toastOptions={{
        className: '!border !border-default !bg-surface !p-4 !opacity-85 !rounded-xl !shadow-modal-2 !w-full !min-w-max !max-w-[352px]',
        duration: 5000
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message }) => (
            <div className="flex items-center justify-between gap-8 w-full">
              <div className="flex items-center gap-4">
                {mapIcons[t.type as keyof typeof mapIcons]}
                <div className="flex flex-col gap-1">
                  <Typography className={cn('[&>div]:m-0 [&>div]:font-semibold', messageVariants({ type: t.type as 'success' | 'error' }))}>
                    {message}
                  </Typography>
                </div>
              </div>
              {!t.dismissed && (
                <Button variant="clear" className="p-0 text-tertiary" rounded="full" onClick={() => toast.dismiss(t.id)}>
                  <TimesIcon />
                </Button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </PrimitiveToaster>
  );
};

export { Toaster, toast };
