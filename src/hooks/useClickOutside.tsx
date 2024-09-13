import { useEffect, RefObject } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent | KeyboardEvent) => void
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, handler]);
};

export default useClickOutside;
