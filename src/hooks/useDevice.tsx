import { useEffect, useState } from 'react';

const BREAKPOINTS = [
  {
    name: 'md',
    width: 768
  },
  {
    name: 'lg',
    width: 1024
  }
];

export const useDevice = (breakpoints = BREAKPOINTS) => {
  const [device, setDevice] = useState<string>('lg');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const sortedBreakpoints = [...breakpoints].sort((a, b) => b.width - a.width);
      const device = sortedBreakpoints.find((b) => width >= b.width);
      setDevice(device?.name || 'md');
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return device;
};
