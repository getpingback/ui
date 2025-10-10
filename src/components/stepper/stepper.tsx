import React from 'react';
import { Typography } from '../typography';
import { CheckCircleIcon } from '@stash-ui/solid-icons';
import { CircleDotIcon } from '@stash-ui/regular-icons';
import { CircleIcon } from '@stash-ui/light-icons';
import { cn } from '@/lib/utils';

interface StepProps {
  status: 'completed' | 'current' | 'pending';
  description: string;
  label: string;
  stepName: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
  isLast?: boolean;
  onlyOne?: boolean;
}

export const Step = ({ label, description, stepName, children, rightElement, status, isLast, onlyOne }: StepProps) => {
  const stepIcons = {
    completed: <CheckCircleIcon className="text-icon-success" />,
    current: <CircleDotIcon className="text-icon-tertiary" />,
    pending: <CircleIcon className="text-icon-tertiary" />
  };

  return (
    <div className="w-full flex items-start relative">
      <span
        data-testid="stepper-line"
        className={cn(
          'absolute top-[21px] left-[11.5px] w-[1px] h-[calc(100%+6px)] bg-border-default z-1',
          isLast && !onlyOne && 'bg-transparent',
          onlyOne && 'bg-gradient-to-b from-border-default to-background-default'
        )}
      />

      <span className="flex items-center justify-center z-2">{stepIcons[status]}</span>
      <div className={cn('w-full flex flex-col gap-3 pl-6 pt-[5px]')}>
        <div className="flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-col gap-1">
            <Typography size="xsmall" type="tertiary">
              {stepName}
            </Typography>
            <Typography size="small" weight="bold" type="secondary">
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
          return React.cloneElement(child as React.ReactElement<StepProps>, {
            isLast: index === lastIndex,
            onlyOne: childrenArray.length === 1
          });
        }
        return child;
      })}
    </div>
  );
};
