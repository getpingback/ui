import React from 'react';
import { cn } from '@/lib/utils';

interface NodeFlowProps {
  children: React.ReactNode;
  className?: string;
  status?: 'active' | 'default';
}

interface NodeLineProps {
  children: React.ReactNode;
  isLast?: boolean;
  conectionHeight?: number;
  className?: string;
  status?: 'active' | 'default';
}

export const NodeParent = ({ children }: { children: React.ReactNode }) => children;

export const NodeLine = ({ children, isLast, conectionHeight, status, className }: NodeLineProps) => {
  return (
    <div className={cn('relative py-2 pl-[7px] transition-all duration-300 ', className)} data-testid="node-line">
      <div
        className={cn(
          'absolute left-[20px] top-0 bottom-0 w-px',
          isLast && '!hidden',
          status !== 'active' ? 'bg-divider' : 'bg-divider-highlighted '
        )}
        data-testid="node-line-divider"
      />
      <div
        className={cn(
          'absolute left-[20px] top-0 w-[12px] border-b border-l border-divider-highlighted rounded-bl-[10px]',
          status !== 'active' ? 'border-divider' : 'border-divider-highlighted '
        )}
        style={{
          height: conectionHeight ? `${conectionHeight}px` : '50%'
        }}
        data-testid="node-line-corner"
      />
      <div className="relative flex flex-col overflow-hidden pl-[25px]">{children}</div>
    </div>
  );
};

export const NodeFlow = ({ children, className, status = 'active' }: NodeFlowProps) => {
  const isNodeLine = (node: React.ReactNode): boolean => {
    return React.isValidElement(node) && node.type === NodeLine;
  };

  const findLastNodeLineIndex = (children: React.ReactNode[]): number => {
    const nodeLines = children.map((child, index) => ({ child, index })).filter(({ child }) => isNodeLine(child));

    return nodeLines.length > 0 ? nodeLines[nodeLines.length - 1].index : -1;
  };

  const processNodeLine = (node: React.ReactElement, isLast: boolean): React.ReactElement => {
    return React.cloneElement(node as React.ReactElement<NodeLineProps>, {
      isLast,
      status,
      children: processNodeLevelsRecursively(node.props.children)
    });
  };

  const processNodeLevelsRecursively = (childNodes: React.ReactNode): React.ReactNode => {
    const children = React.Children.toArray(childNodes);
    const lastNodeLineIndex = findLastNodeLineIndex(children);

    return React.Children.map(children, (node, index) => {
      if (!React.isValidElement(node)) return node;

      if (isNodeLine(node)) {
        return processNodeLine(node, index === lastNodeLineIndex);
      }

      if (node.props.children) {
        return React.cloneElement(node, {
          ...node.props,
          children: processNodeLevelsRecursively(node.props.children)
        });
      }

      return node;
    });
  };

  const processedChildren = processNodeLevelsRecursively(children);

  return (
    <div className={cn('w-full flex flex-col', className)} data-testid="node-flow">
      {processedChildren}
    </div>
  );
};
