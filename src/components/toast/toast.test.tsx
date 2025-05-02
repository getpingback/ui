import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';

import * as stories from './toast.stories';

const { ToastSuccess, ToastError, ToastWarning } = composeStories(stories);

const assertToastContent = async (title: string | RegExp, description: string | RegExp, expectedType?: 'success' | 'error' | 'warning') => {
  const descriptionElement = await screen.findByText(description, {}, { timeout: 3000 });
  expect(descriptionElement).toBeInTheDocument();

  const toastElement = descriptionElement.closest('li');
  expect(toastElement).toBeInTheDocument();

  expect(within(toastElement!).getByText(title)).toBeInTheDocument();

  if (expectedType) {
    expect(toastElement).toHaveAttribute('data-type', expectedType);
  }
};

describe('Toast Component ', () => {
  test('renders success toast on button click', async () => {
    render(<ToastSuccess />);
    const user = userEvent.setup();
    const triggerButton = screen.getByRole('button', { name: /Show toast success/i });

    await user.click(triggerButton);

    await assertToastContent('Copied successfully', 'Text copied to clipboard', 'success');
  });

  test('renders error toast on button click', async () => {
    render(<ToastError />);
    const user = userEvent.setup();
    const triggerButton = screen.getByRole('button', { name: /Show toast error/i });

    await user.click(triggerButton);

    await assertToastContent('Error to copy text', 'Please try again', 'error');
  });

  test('renders warning toast on button click', async () => {
    render(<ToastWarning />);
    const user = userEvent.setup();
    const triggerButton = screen.getByRole('button', { name: /Show toast warning/i });

    await user.click(triggerButton);

    await assertToastContent('Warning', 'Please try again', 'warning');
  });
});
