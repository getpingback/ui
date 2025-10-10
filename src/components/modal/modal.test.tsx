import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Modal, ModalTitle } from './modal';

describe('Modal', () => {
  it('should render Modal component with children', () => {
    render(
      <Modal open>
        <ModalTitle>Conteúdo do Modal</ModalTitle>
      </Modal>
    );

    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument();
  });

  it('should apply custom classes', () => {
    const customClass = 'custom-class';
    render(
      <Modal open className={customClass}>
        <ModalTitle>Conteúdo do Modal</ModalTitle>
      </Modal>
    );

    const content = document.querySelector('.custom-class');
    expect(content).toBeInTheDocument();
  });

  it('should render modal overlay', () => {
    render(
      <Modal open>
        <ModalTitle>Conteúdo do Modal</ModalTitle>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toBeInTheDocument();
  });
});
