import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';

import * as stories from './toast.stories';

const { ToastSuccess, ToastError } = composeStories(stories);

describe('Toast Component ', () => {
  test('renders success toast on button click', async () => {
    render(<ToastSuccess />);
    const user = userEvent.setup();
    const triggerButton = screen.getByRole('button', { name: /Show toast success/i });

    await user.click(triggerButton);
    expect(await screen.findByText('Copied successfully', {}, { timeout: 3000 })).toBeDefined();
  });

  test('renders error toast on button click', async () => {
    render(<ToastError />);
    const user = userEvent.setup();
    const triggerButton = screen.getByRole('button', { name: /Show toast error/i });

    await user.click(triggerButton);
    expect(await screen.findByText('Error to copy text', {}, { timeout: 3000 })).toBeDefined();
  });
});
