import React from 'react';
import { Breadcrumb, BreadCrumbItem, BreadCrumbSeparator, BreadCrumbLink } from './breadcrumb';
import { Button } from '../button';
import { ArrowLeftIcon, PeopleGroupIcon } from '@stash-ui/light-icons';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs']
};

export const Default = () => (
  <Breadcrumb>
    <BreadCrumbItem asChild>
      <Button variant="outline" prefix={<ArrowLeftIcon />}>
        Back
      </Button>
    </BreadCrumbItem>
    <BreadCrumbLink>
      <PeopleGroupIcon width={20} height={20} />
      <span>Audience</span>
    </BreadCrumbLink>
    <BreadCrumbSeparator />
    <BreadCrumbItem>Contacts</BreadCrumbItem>
  </Breadcrumb>
);
