import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArrowLeftIcon, PeopleGroupIcon } from '@stash-ui/light-icons';

import { Breadcrumb, BreadCrumbItem, BreadCrumbSeparator } from './breadcrumb';
import { Button } from '../button';

describe('Breadcrumb Component', () => {
  const TestDefault = () => (
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

  describe('Default', () => {
    test('renders container with layout classes', () => {
      const { container } = render(<TestDefault />);
      const root = container.firstChild as HTMLElement | null;

      expect(root).not.toBeNull();
      expect(root?.className.includes('flex')).toBe(true);
      expect(root?.className.includes('items-center')).toBe(true);
      expect(root?.className.includes('gap-1')).toBe(true);
    });

    test('renders items: Back button, Audience link, Contacts text', () => {
      render(<TestDefault />);

      // Back button inside first crumb
      const backButton = screen.getByRole('button', { name: /Back/i });
      expect(backButton).toBeInTheDocument();

      // Audience link rendered via asChild slot
      const audienceLink = screen.getByRole('link', { name: /Audience/i });
      expect(audienceLink).toBeInTheDocument();
      expect(audienceLink).toHaveAttribute('href', '#');

      // Final plain text crumb
      expect(screen.getByText('Contacts')).toBeInTheDocument();
    });

    test('renders three breadcrumb items', () => {
      const { container } = render(<TestDefault />);
      const crumbItems = container.querySelectorAll('div.text-sm.font-semibold');
      expect(crumbItems.length).toBe(3);
    });
  });
});
