import React from 'react';
import { Breadcrumb, BreadCrumbItem, BreadCrumbSeparator } from './breadcrumb';
import { Button } from '../button';
import { ArrowLeftIcon, PeopleGroupIcon } from '@stash-ui/light-icons';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs']
};

export const Default = () => (
  <Breadcrumb>
    <BreadCrumbItem>
      <Button variant="outline" prefix={<ArrowLeftIcon />}>
        Back
      </Button>
    </BreadCrumbItem>
    <BreadCrumbItem asChild>
      <a href="#" className="flex gap-1 items-center">
        <PeopleGroupIcon width={20} height={20} />
        <span>Audience</span>
      </a>
    </BreadCrumbItem>
    <BreadCrumbSeparator />
    <BreadCrumbItem>Contacts</BreadCrumbItem>
  </Breadcrumb>
);
