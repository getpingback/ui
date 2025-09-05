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

const Breadcrumb = ({ children }: BreadcrumbProps) => <div className="flex items-center gap-1">{children}</div>;

const BreadCrumbItem = ({ asChild, children }: BreadcrumbItemProps) => (
  <div className="[&>button]:mr-2 [&>a]:font-normal [&>a>svg]:text-icon-secondary [&>a:hover]:underline flex items-center gap-1 text-secondary text-sm font-semibold">
    {asChild ? <Slot>{children}</Slot> : children}
  </div>
);

const BreadCrumbSeparator = () => <ChevronRightIcon className="text-icon-secondary" width={20} height={20} />;

export { Breadcrumb, BreadCrumbItem, BreadCrumbSeparator };
