import React from 'react';
import { Typography } from '../typography';
import { CheckCircleIcon } from '@stash-ui/solid-icons';
import { CircleDotIcon } from '@stash-ui/regular-icons';
import { CircleIcon } from '@stash-ui/light-icons';
import { cn } from '@/lib/utils';

interface StepProps {
  status: 'completed' | 'current' | 'default';
  description: string;
  label: string;
  stepName: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
}

export const Step = ({ label, description, stepName, children, rightElement, status, isLast, isFirst }: StepperItemProps) => {
  const stepIcons = {
    completed: <CheckCircleIcon color="#31C48D" />,
    current: <CircleDotIcon color="#71717A" />,
    default: <CircleIcon color="#71717A" />
  };

  return (
    <div className="w-full flex items-start relative">
      {!isLast && (
        <span
          data-testid="stepper-line"
          className={cn(
            'absolute top-[21px] left-[11.5px] w-[1px] h-[calc(100%+6px)] z-1',
            status !== 'completed' && 'bg-line-default',
            status === 'completed' && 'bg-stepper-line'
          )}
        />
      )}
      <span className="flex items-center justify-center z-2">{stepIcons[status]}</span>
      <div className={cn('w-full flex flex-col gap-3 pl-6 pt-2', isFirst && 'pt-1')}>
        <div className="flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-col gap-1">
            <Typography size="xsmall" type="tertiary" className="opacity-65">
              {stepName}
            </Typography>
            <Typography size="small" weight="bold" type="tertiary">
              {label}
            </Typography>
            <Typography size="xsmall" type="tertiary">
              {description}
            </Typography>
          </div>
          {rightElement}
        </div>

        <div className="flex flex-col pt-6">{children}</div>
      </div>
    </div>
  );
};

export const Stepper = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = React.Children.toArray(children);
  const lastIndex = childrenArray.length - 1;

  return (
    <div className=" w-full flex flex-col gap-6">
      {React.Children.map(childrenArray, (child, index) => {
        if (React.isValidElement(child) && child.type === Step) {
          const childProps = child.props as StepProps;
          if (childProps.status === 'completed' || childProps.status === 'current') {
            return React.cloneElement(child as React.ReactElement<StepProps>, { isLast: index === lastIndex, isFirst: index === 0 });
          }
          return null;
        }
        return child;
      })}
    </div>
  );
};
