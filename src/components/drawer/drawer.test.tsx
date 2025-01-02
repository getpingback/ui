import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './drawer';
import * as React from 'react';

describe('Drawer', () => {
  const defaultProps = {
    title: 'Test Drawer',
    open: true
  };

  it('should render drawer with title', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
  });

  it('should render drawer with description', () => {
    render(
      <Drawer {...defaultProps} description="Test description">
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should render drawer with preffix icon', () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>;

    render(
      <Drawer {...defaultProps} preffixIcon={<TestIcon />}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render drawer with divider when hasDivider is true', () => {
    render(
      <Drawer {...defaultProps} hasDivider>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });

  it('should render drawer with footer content', () => {
    render(
      <Drawer {...defaultProps} footer={<div>Footer content</div>}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Test children content</div>
      </Drawer>
    );

    expect(screen.getByText('Test children content')).toBeInTheDocument();
  });

  it('should close drawer when clicking close button', () => {
    const onOpenChange = jest.fn();

    render(
      <Drawer {...defaultProps} onOpenChange={onOpenChange}>
        <div>Drawer content</div>
      </Drawer>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
