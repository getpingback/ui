import React from 'react';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './dropzone.stories';

const { Default, ImageUploaded, Loading } = composeStories(stories);

describe('Dropzone Component', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'http://localhost/mock-url');
  });
  test('renders correctly dropzone with no image', async () => {
    const { getByTestId } = render(<Default />);
    const dropzone = getByTestId('dropzone');
    const dropArea = getByTestId('drop-area');
    expect(dropzone).toBeInTheDocument();
    expect(dropzone).toContainElement(dropArea);
  });
  test('renders correctly imagePreview when contains image uploaded', async () => {
    const { getByTestId } = render(<ImageUploaded />);
    const dropzone = getByTestId('dropzone');
    const imagePreview = getByTestId('image-preview');
    expect(dropzone).toBeInTheDocument();
    expect(dropzone).toContainElement(imagePreview);

    const image = getByTestId('image');
    expect(image).toHaveStyle(`background-image: url(https://picsum.photos/200)`);
    expect(image).toHaveClass('w-32', 'h-32', 'rounded-2xl');
  });
  test('When the image is removed it should return to the dropImage state', async () => {
    const { getByTestId } = render(<ImageUploaded />);
    const removeButton = getByTestId('remove-btn');

    fireEvent.click(removeButton);
    expect(getByTestId('drop-area')).toBeInTheDocument();
  });
  test('Should be possible to upload a new image droping ', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const dataTransfer = { files: [file] };
    const { getByTestId } = render(<Default />);
    const dropArea = getByTestId('drop-area');

    await act(async () => {
      fireEvent.dragOver(dropArea);
      fireEvent.drop(dropArea, { dataTransfer });
    });

    expect(getByTestId('image-preview')).toBeInTheDocument();
  });
  test('renders spinner when loading', async () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
