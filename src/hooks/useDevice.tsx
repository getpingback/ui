import { useEffect, useState } from 'react';

const BREAKPOINTS = [
  {
    name: 'sm',
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
      const device = breakpoints.find((b) => width >= b.width);
      setDevice(device?.name || 'lg');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return device;
};
