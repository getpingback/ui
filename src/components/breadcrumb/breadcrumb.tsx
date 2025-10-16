import { Slot } from '@radix-ui/react-slot';
import { ChevronRightIcon } from '@stash-ui/light-icons';
import * as React from 'react';

export interface BreadcrumbProps {
  children: React.ReactNode;
}

export interface BreadcrumbItemProps {
  asChild?: boolean;
  children: React.ReactNode;
}

const Breadcrumb = ({ children }: BreadcrumbProps) => <div className="flex items-center gap-1 min-w-0">{children}</div>;

const BreadCrumbItem = ({ asChild, children }: BreadcrumbItemProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp className="[&>button]:mr-2 [&:is(button)]:mr-2 flex items-center gap-1 text-secondary text-sm font-semibold truncate">
      {children}
    </Comp>
  );
};

const BreadCrumbLink = ({ asChild, children }: BreadcrumbItemProps) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp className="[&>button]:mr-2 font-normal [&>svg]:text-icon-secondary [&:is(a):hover]:text-primary flex items-center gap-1 text-secondary text-sm cursor-pointer transition-colors duration-200 ease-in-out truncate">
      {children}
    </Comp>
  );
};

const BreadCrumbSeparator = () => <ChevronRightIcon className="text-icon-secondary" width={20} height={20} />;

export { Breadcrumb, BreadCrumbItem, BreadCrumbSeparator, BreadCrumbLink };
