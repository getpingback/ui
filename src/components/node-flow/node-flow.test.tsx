import React from 'react';
import { render, screen } from '@testing-library/react';
import { NodeFlow, NodeLine } from './node-flow';

describe('NodeFlow Component', () => {
  it('should render correctly with default props', () => {
    render(
      <NodeFlow parent={<span>Parent Node</span>}>
        <NodeLine>Child 1</NodeLine>
        <NodeLine>Child 2</NodeLine>
      </NodeFlow>
    );

    expect(screen.getByText('Parent Node')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should open and close the accordion', async () => {
    render(
      <NodeFlow parent={<span>Parent Node</span>}>
        <NodeLine>Child Content 1</NodeLine>
        <NodeLine>Child Content 2</NodeLine>
      </NodeFlow>
    );

    const triggerButton = screen.getByText('Parent Node').closest('button');
    expect(triggerButton).toBeInTheDocument();

    expect(await screen.findByText('Child Content 1')).toBeVisible();
    expect(screen.getByText('Child Content 2')).toBeVisible();
  });

  it('should render children NodeLines correctly with status active and isLast props', async () => {
    render(
      <NodeFlow parent={<span>Parent Node</span>} status="active">
        <NodeLine>Child 1</NodeLine>
        <NodeLine>Child 2</NodeLine>
      </NodeFlow>
    );

    const childDivider = screen.getAllByTestId('node-line-divider');
    const childCorner = screen.getAllByTestId('node-line-corner');

    expect(childDivider[0]).toHaveClass('bg-divider-highlighted');
    expect(childCorner[0]).toHaveClass('border-divider-highlighted');

    expect(childDivider[1]).toHaveClass('bg-divider-highlighted');
    expect(childCorner[1]).toHaveClass('border-divider-highlighted');

    expect(childDivider[1]).toHaveClass('!hidden');
  });

  it('should render children NodeLines correctly with status default and isLast props', async () => {
    render(
      <NodeFlow parent={<span>Parent Node</span>} status="default">
        <NodeLine>Child 1</NodeLine>
        <NodeLine>Child 2</NodeLine>
      </NodeFlow>
    );

    const childDivider = screen.getAllByTestId('node-line-divider');
    const childCorner = screen.getAllByTestId('node-line-corner');

    expect(childDivider[0]).toHaveClass('bg-divider');
    expect(childCorner[0]).toHaveClass('border-divider');

    expect(childDivider[1]).toHaveClass('bg-divider');
    expect(childCorner[1]).toHaveClass('border-divider');

    expect(childDivider[1]).toHaveClass('!hidden');
  });

  it('should render suffix when provided', () => {
    render(
      <NodeFlow parent={<span>Parent Node</span>} suffix={<span>Suffix Content</span>}>
        <NodeLine>Child 1</NodeLine>
      </NodeFlow>
    );
    expect(screen.getByText('Suffix Content')).toBeInTheDocument();
  });

  it('should render the corret conection height', async () => {
    render(
      <NodeFlow parent={<span>Parent Node</span>} status="active">
        <NodeLine conectionHeight={20}>Child 1</NodeLine>
        <NodeLine conectionHeight={40}>Child 2</NodeLine>
      </NodeFlow>
    );
    const childCorner = screen.getAllByTestId('node-line-corner');

    expect(childCorner[0]).toHaveStyle('height: 20px');
    expect(childCorner[1]).toHaveStyle('height: 40px');
  });
});
