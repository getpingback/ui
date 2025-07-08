/// <reference types="@types/jest" />

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper, Step } from './stepper';
import { Button } from '../button';

describe('Step', () => {
  test('renders label, description, stepName, and children', () => {
    render(
      <Step label="Test Label" description="Test Description" stepName="Step 1" status="current">
        Child Content
      </Step>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('renders rightElement when provided', () => {
    render(
      <Step label="Test Label" description="Test Description" stepName="Step 1" status="current" rightElement={<Button>Click Me</Button>}>
        Child Content
      </Step>
    );
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  test('applies correct classes for the line when not isLast and status is completed', () => {
    render(
      <Step label="Test" description="Test" stepName="Step" status="completed" isLast={false}>
        Child
      </Step>
    );
    const line = screen.getByTestId('stepper-line');
    expect(line).toBeInTheDocument();
    expect(line).toHaveClass('bg-stepper-line');
  });

  test('does not render the line when isLast is true', () => {
    render(
      <Step label="Test" description="Test" stepName="Step" status="completed" isLast={true}>
        Child
      </Step>
    );
    expect(screen.queryByTestId('stepper-line')).not.toBeInTheDocument();
  });

  test('applies correct line class for non-completed status when not isLast', () => {
    render(
      <Step label="Test" description="Test" stepName="Step" status="current" isLast={false}>
        Child
      </Step>
    );
    const line = screen.getByTestId('stepper-line');
    expect(line).toBeInTheDocument();
    expect(line).toHaveClass('bg-line-default');
  });
});

describe('Stepper', () => {
  test('renders all Step children with status completed or current', () => {
    render(
      <Stepper>
        <Step label="Step 1" description="Desc 1" stepName="1" status="completed">
          Content 1
        </Step>
        <Step label="Step 2" description="Desc 2" stepName="2" status="current">
          Content 2
        </Step>
        <Step label="Step 3" description="Desc 3" stepName="3" status="pending">
          Content 3
        </Step>
      </Stepper>
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Step 3')).not.toBeInTheDocument();
  });

  test('Passes isFirst and isLast props correctly to Step children', () => {
    render(
      <Stepper>
        <Step label="First" description="Desc" stepName="1" status="completed">
          First Content
        </Step>
        <Step label="Middle" description="Desc" stepName="2" status="current">
          Middle Content
        </Step>
        <Step label="Last" description="Desc" stepName="3" status="completed">
          Last Content
        </Step>
      </Stepper>
    );

    const firstItemContainer = screen.getByText('First Content').closest('div.w-full.flex.items-start.relative');
    expect(firstItemContainer).toBeInTheDocument();
    expect(within(firstItemContainer as HTMLElement).getByTestId('stepper-line')).toBeInTheDocument();

    const middleItemContainer = screen.getByText('Middle Content').closest('div.w-full.flex.items-start.relative');
    expect(middleItemContainer).toBeInTheDocument();
    expect(within(middleItemContainer as HTMLElement).getByTestId('stepper-line')).toBeInTheDocument();

    const lastItemContainer = screen.getByText('Last Content').closest('div.w-full.flex.items-start.relative');
    expect(lastItemContainer).toBeInTheDocument();
    expect(within(lastItemContainer as HTMLElement).queryByTestId('stepper-line')).not.toBeInTheDocument();
  });

  test('renders only one item correctly with isFirst and isLast true', () => {
    render(
      <Stepper>
        <Step label="Only Step" description="Desc" stepName="1" status="current">
          Only Content
        </Step>
      </Stepper>
    );
    expect(screen.getByText('Only Step')).toBeInTheDocument();
    const itemContainer = screen.getByText('Only Step').closest('div.w-full.flex.items-start.relative');
    if (itemContainer) {
      expect(itemContainer.querySelector('div.pl-6')).toHaveClass('pt-[5px]');
    }
    expect(screen.queryByTestId('stepper-line')).not.toBeInTheDocument();
  });
});
