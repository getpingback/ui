import React from 'react';
import { Typography } from '../typography';
import { cva } from 'class-variance-authority';

interface ProgressBarProps {
  percent: number;
  color?: 'green' | 'dark-green' | 'red' | 'yellow' | 'gray' | 'orange';
  showAnimation?: boolean;
}

const ProgressBarFilerVariantProps = cva('h-full rounded-md', {
  variants: {
    color: {
      green: 'bg-green-400',
      'dark-green': 'bg-green-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-200',
      gray: 'bg-gray-100',
      orange: 'bg-orange-400'
    }
  },
  defaultVariants: {
    color: 'green'
  }
});

export const ProgressLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <Typography size="xsmall" weight="bold" type="tertiary" className={className} data-testid="progress-bar-label">
      {children}
    </Typography>
  );
};

export const Progress = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`w-full flex items-center gap-3 ${className}`}>{children}</div>;
};

export const ProgressBar = ({ percent, color, showAnimation = false }: ProgressBarProps) => {
  const finalPercent = percent > 100 ? 100 : percent;
  const midPercent = percent > 100 ? 50 : percent / 2;

  const animationStyles = showAnimation
    ? ({
        '--progress-mid-width': `${midPercent}%`,
        '--progress-final-width': `${finalPercent}%`,
        width: `${finalPercent}%`
      } as React.CSSProperties)
    : { width: `${finalPercent}%` };

  const progressClasses = `${ProgressBarFilerVariantProps({ color })} ${showAnimation ? 'animate-progress-bar' : ''}`;

  return (
    <div className="w-full h-1 bg-[#D4D4D840] rounded-md">
      <div className={progressClasses} style={animationStyles} data-testid="progress-bar" />
    </div>
  );
};
