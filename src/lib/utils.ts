import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';

export const DOTS = '...';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const pageRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
) => {
  const paginationRange = useMemo(() => {
    if (siblingCount * 5 >= totalPages || siblingCount === 0)
      return pageRange(1, totalPages);

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 5 * siblingCount;
      const leftRange = pageRange(1, leftItemCount);

      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 5 * siblingCount;
      const rightRange = pageRange(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = pageRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    } else {
      return pageRange(1, totalPages);
    }
  }, [currentPage, totalPages, siblingCount]);

  return paginationRange;
};
