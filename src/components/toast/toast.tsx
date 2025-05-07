import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';
import { CheckIcon } from '@stash-ui/solid-icons';
import { TimesCircleIcon, ExclamationCircleIcon } from '@stash-ui/regular-icons';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const BackgroundIcon = ({ icon, bgColor }: { icon: React.ReactNode; bgColor: string }) => {
  return (
    <div className={`w-8 h-8  flex items-center justify-center rounded-full`} style={{ backgroundColor: bgColor }}>
      {icon}
    </div>
  );
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      theme="light"
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group !gap-6 group-[.toaster]:opacity-85 !rounded-xl toast group-[.toaster]:!bg-background-accent group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:!shadow-modal-large group-[.toaster]:!border-none',

          success: 'group-[.toaster]:text-success-foreground  ',

          error: 'group-[.toaster]:text-error-foreground ',

          warning: 'group-[.toaster]:text-caution-foreground ',

          loading: 'group-[.toaster]:text-gray-900',

          title: 'group-[.toast]:!text-sm group-[.toast]:font-semibold',
          description: 'group-[.toast]:!text-tertiary-foreground group-[.toast]:!text-xs',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton: 'group-[.toast]:!border-divider '
        }
      }}
      icons={{
        success: <BackgroundIcon icon={<CheckIcon color="#0E9F6E" />} bgColor="#31C48D29" />,
        error: <BackgroundIcon icon={<TimesCircleIcon color="#F05252" />} bgColor="#F052521F" />,
        warning: <BackgroundIcon icon={<ExclamationCircleIcon color="#C27803" />} bgColor="#FACA1529" />
      }}
      closeButton={true}
      {...props}
    />
  );
};

export { Toaster, toast };
