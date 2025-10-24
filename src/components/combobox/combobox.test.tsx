import React from 'react';
import { fireEvent, screen, render, act, within } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './combobox.stories';

const { Default, Detailed, IconCompact, ImageDetailed, EmptyContentRender, ScrollToEnd, ShouldFilterFalse, Multiple, ErrorMessage } =
  composeStories(stories);

describe('Combobox Component', () => {
  describe('Default Variant', () => {
    it('should render correctly with default props', () => {
      render(<Default />);
      const comboboxButton = screen.getByRole('combobox');
      expect(comboboxButton).toBeInTheDocument();
      expect(comboboxButton).toHaveTextContent('Selecione o link');
    });

    it('should open dropdown when clicked', async () => {
      render(<Default />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      expect(screen.getByTestId('comboxbox-popover-content')).toBeVisible();
    });

    it('should display correct items and handle selection', async () => {
      const onSelectMock = jest.fn();
      render(<Default onSelect={onSelectMock} />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      const item = screen.getByText('https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/');

      await act(async () => {
        fireEvent.click(item);
      });

      expect(onSelectMock).toHaveBeenCalledWith({
        label: 'https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/',
        value: 'https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/'
      });
      expect(comboboxButton).toHaveTextContent('https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/');
    });
  });

  describe('Detailed Variant', () => {
    it('should render correctly with detailed items', async () => {
      render(<Detailed />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      expect(screen.getByText('Comunidades inativas')).toBeInTheDocument();
      expect(screen.getByText('117 membros')).toBeInTheDocument();
    });

    it('should handle selection and display detailed item correctly in the button', async () => {
      const onSelectMock = jest.fn();
      render(<Detailed onSelect={onSelectMock} />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      const item = screen.getByText('Comunidades inativas');

      await act(async () => {
        fireEvent.click(item);
      });

      expect(onSelectMock).toHaveBeenCalledWith({
        description: '117 membros',
        label: 'Comunidades inativas',
        value: 'comunidades inativas'
      });
      expect(comboboxButton).toHaveTextContent('Comunidades inativas');
    });
  });

  describe('IconCompact Variant', () => {
    it('should open dropdown and display icon items correctly', async () => {
      render(<IconCompact />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      expect(screen.getByText('Enviar a newsletter...')).toBeVisible();
      const icon = screen.getByText('Enviar a newsletter...')?.parentNode?.querySelector('svg');
      expect(icon).toBeVisible();
    });

    it('should handle selection and show selected icon item in the button', async () => {
      const onSelectMock = jest.fn();
      render(<IconCompact onSelect={onSelectMock} />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      const item = screen.getByText('Enviar a newsletter...');

      await act(async () => {
        fireEvent.click(item);
      });

      expect(comboboxButton).toHaveTextContent('Enviar a newsletter...');
      const iconInButton = comboboxButton.querySelector('svg');
      expect(iconInButton).toBeInTheDocument();
    });
  });

  describe('ImageDetailed Variant', () => {
    it('should render correctly with image and text details', async () => {
      render(<ImageDetailed />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      expect(screen.getByText('8 métricas essenciais para acompanhar no seu blog post')).toBeInTheDocument();
      const image = screen.getByAltText('8 métricas essenciais para acompanhar no seu blog post');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', expect.stringContaining('https://picsum.photos/200/30'));
    });

    it('should open dropdown and display image items correctly', async () => {
      render(<ImageDetailed />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      expect(screen.getByText('8 métricas essenciais para acompanhar no seu blog post')).toBeVisible();
      const image = screen.getByAltText('8 métricas essenciais para acompanhar no seu blog post');
      expect(image).toBeVisible();
    });

    it('should handle selection and show selected image item in the button', async () => {
      const onSelectMock = jest.fn();
      render(<ImageDetailed onSelect={onSelectMock} />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      const item = screen.getByText('8 métricas essenciais para acompanhar no seu blog post');

      await act(async () => {
        fireEvent.click(item);
      });

      expect(onSelectMock).toHaveBeenCalledWith({
        imageUrl: 'https://picsum.photos/200/300',
        label: '8 métricas essenciais para acompanhar no seu blog post',
        value: '8 métricas essenciais para acompanhar no seu blog post'
      });
      expect(comboboxButton).toHaveTextContent('8 métricas essenciais para acompanhar no seu blog post');
      const imageInButton = screen.getByAltText('8 métricas essenciais para acompanhar no seu blog post');
      expect(imageInButton).toBeInTheDocument();
    });
  });

  describe('shouldFilter false property', () => {
    it('should render all items regardless of search input', async () => {
      render(<ShouldFilterFalse />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      const searchInput = screen.getByPlaceholderText('Pesquise pelo link...');

      await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      });

      expect(screen.getByText('https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/')).toBeVisible();
      expect(screen.getByText('https://pingback.com/juliano-fabbro')).toBeVisible();
      expect(screen.getByText('https://pingback.com/juliano-fabbro/pods-construcao-civil')).toBeVisible();
      expect(screen.getByText('https://blog.pipelovers.net/')).toBeVisible();
    });

    it('should allow selection from unfiltered results', async () => {
      const onSelectMock = jest.fn();
      render(<ShouldFilterFalse onSelect={onSelectMock} />);
      const comboboxButton = screen.getByRole('combobox');

      await act(async () => {
        fireEvent.click(comboboxButton);
      });

      const item = screen.getByText('https://pingback.com/juliano-fabbro');

      await act(async () => {
        fireEvent.click(item);
      });

      expect(onSelectMock).toHaveBeenCalledWith({
        label: 'https://pingback.com/juliano-fabbro',
        value: 'https://pingback.com/juliano-fabbro'
      });
      expect(comboboxButton).toHaveTextContent('https://pingback.com/juliano-fabbro');
    });
  });

  describe('EmptyContentRender', () => {
    it('should render custom empty content when no items are found', async () => {
      render(<EmptyContentRender />);
      const comboboxButton = screen.getByRole('combobox');

      fireEvent.click(comboboxButton);

      expect(screen.getByText('not found')).toBeInTheDocument();
    });
  });

  describe('Scroll to end', () => {
    it('should loading when scroll to end', async () => {
      const onEndReachedMock = jest.fn();
      render(<ScrollToEnd onEndReached={onEndReachedMock} />);
      const comboboxButton = screen.getByRole('combobox');

      fireEvent.click(comboboxButton);

      expect(onEndReachedMock).not.toHaveBeenCalled();
      expect(screen.queryByTestId('combobox-loading')).toBeNull();
    });
  });

  describe('Multiple Variant', () => {
    it('should render correctly with multiple items', async () => {
      render(<Multiple />);
      const comboboxButton = screen.getByRole('combobox');

      fireEvent.click(comboboxButton);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
      expect(screen.getByText('Item 5')).toBeInTheDocument();
    });

    it('should handle selection and show selected multiple items in the button', async () => {
      render(<Multiple />);
      const comboboxButton = screen.getByRole('combobox');

      fireEvent.click(comboboxButton);

      const item1 = screen.getByText('Item 1');

      fireEvent.click(item1);

      expect(comboboxButton).toHaveTextContent('Item 1');

      fireEvent.click(comboboxButton);

      const item2 = screen.getByText('Item 2');

      fireEvent.click(item2);

      expect(comboboxButton).toHaveTextContent('Item 1Item 2');
      expect(screen.getAllByTestId('combobox-item')).toHaveLength(2);

      fireEvent.click(comboboxButton);

      fireEvent.click(screen.getAllByRole('option')[0]);

      expect(comboboxButton).not.toHaveTextContent('Item 1');
      expect(screen.getAllByTestId('combobox-item')).toHaveLength(1);
    });

    it('should handle remove item', async () => {
      const onRemoveItemMock = jest.fn();
      render(<Multiple onRemoveItem={onRemoveItemMock} />);
      const comboboxButton = screen.getByRole('combobox');

      fireEvent.click(comboboxButton);

      const item1 = screen.getByText('Item 1');

      fireEvent.click(item1);

      expect(comboboxButton).toHaveTextContent('Item 1');

      fireEvent.click(comboboxButton);

      const item2 = screen.getByText('Item 2');

      fireEvent.click(item2);

      expect(comboboxButton).toHaveTextContent('Item 1Item 2');
      expect(screen.getAllByTestId('combobox-item')).toHaveLength(2);

      const removeButtons = screen.getAllByTestId('combobox-item').map((item) => within(item).getByRole('button'));
      expect(removeButtons).toHaveLength(2);

      fireEvent.click(removeButtons[0]);
      expect(onRemoveItemMock).toHaveBeenCalledWith({
        label: 'Item 1',
        value: 'item-1'
      });
    });
  });

  describe('Error state', () => {
    it('should render error message and apply invalid styles', () => {
      render(<ErrorMessage />);
      const comboboxButton = screen.getByRole('combobox');
      expect(comboboxButton).toBeInTheDocument();
      expect(comboboxButton).toHaveClass('border-invalid');

      expect(screen.getByText('Erro ao carregar as listas')).toBeInTheDocument();
      expect(screen.getByText('Erro ao carregar as listas')).toHaveClass('text-error');
    });

    it('should still open dropdown when clicked', () => {
      render(<ErrorMessage />);
      const comboboxButton = screen.getByRole('combobox');
      fireEvent.click(comboboxButton);
      expect(screen.getByTestId('comboxbox-popover-content')).toBeVisible();
    });
  });
});
