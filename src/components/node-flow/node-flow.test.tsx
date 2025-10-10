import React from 'react';
import { render, screen } from '@testing-library/react';
import { NodeFlow, NodeLine, NodeParent } from './node-flow';

describe('NodeFlow Component', () => {
  it('should render correctly with default props', () => {
    render(
      <NodeFlow>
        <NodeParent>
          <span>Parent Node</span>
        </NodeParent>
        <NodeLine>Child 1</NodeLine>
        <NodeLine>Child 2</NodeLine>
      </NodeFlow>
    );

    expect(screen.getByText('Parent Node')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should render children NodeLines correctly with status active and isLast props', async () => {
    render(
      <NodeFlow status="active">
        <NodeParent>
          <span>Parent Node</span>
        </NodeParent>
        <NodeLine>Child 1</NodeLine>
        <NodeLine>Child 2</NodeLine>
      </NodeFlow>
    );

    const childDivider = screen.getAllByTestId('node-line-divider');
    const childCorner = screen.getAllByTestId('node-line-corner');

    expect(childDivider[0]).toHaveClass('bg-border-filled');
    expect(childCorner[0]).toHaveClass('border-filled');

    expect(childDivider[1]).toHaveClass('bg-border-filled');
    expect(childCorner[1]).toHaveClass('border-filled');

    expect(childDivider[1]).toHaveClass('!hidden');
  });

  it('should render children NodeLines correctly with status default and isLast props', async () => {
    render(
      <NodeFlow status="default">
        <NodeParent>
          <span>Parent Node</span>
        </NodeParent>
        <NodeLine>Child 1</NodeLine>
        <NodeLine>Child 2</NodeLine>
      </NodeFlow>
    );

    const childDivider = screen.getAllByTestId('node-line-divider');
    const childCorner = screen.getAllByTestId('node-line-corner');

    expect(childDivider[0]).toHaveClass('bg-border-default');
    expect(childCorner[0]).toHaveClass('border-default');

    expect(childDivider[1]).toHaveClass('bg-border-default');
    expect(childCorner[1]).toHaveClass('border-default');

    expect(childDivider[1]).toHaveClass('!hidden');
  });

  it('should render the corret conection height', async () => {
    render(
      <NodeFlow status="active">
        <NodeParent>
          <span>Parent Node</span>
        </NodeParent>
        <NodeLine conectionHeight={20}>Child 1</NodeLine>
        <NodeLine conectionHeight={40}>Child 2</NodeLine>
      </NodeFlow>
    );
    const childCorner = screen.getAllByTestId('node-line-corner');

    expect(childCorner[0]).toHaveStyle('height: 20px');
    expect(childCorner[1]).toHaveStyle('height: 40px');
  });
});
