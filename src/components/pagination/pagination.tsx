import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@stash-ui/regular-icons';
import { getPaginationRange, DOTS } from '@/lib/utils';
import { Button } from '../button';

const buttonVariants = cva(
  'h-[32px] min-w-[32px] px-3 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-transparent px-0 opacity-85 text-button-page-color-clear hover:bg-button-page-ghost hover:opacity-1',
        solid: 'bg-button-page-solid text-button-page-color-solid px-3 '
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default'
    }
  }
);

export interface PaginationItemProps extends React.ComponentProps<'button'> {
  isActive?: boolean;
  isRounded?: boolean;
  disabled?: boolean;
}

function PaginationItem({ children, isActive, isRounded, disabled, ...props }: PaginationItemProps) {
  return (
    <Button
      {...props}
      variant={isActive ? 'solid' : 'outline'}
      rounded={isRounded ? 'full' : 'lg'}
      disabled={disabled}
      className="h-8 w-8 p-0"
    >
      <span className="w-full flex items-center justify-center font-semibold">{children}</span>
    </Button>
  );
}

export interface PaginationProps extends React.ComponentProps<'nav'> {
  totalPages: number;
  onPageChange: (page: number) => void;
  page: number;
  siblingCount?: number;
  round?: boolean;
  className?: string;
}

const Pagination = ({ totalPages, onPageChange, page, siblingCount = 1, round = false, className, ...props }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const paginationRange = getPaginationRange(currentPage, totalPages, siblingCount);

  const handleSetActivePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center gap-2', className)}
      data-testid="pagination"
      {...props}
    >
      <PaginationItem onClick={() => handleSetActivePage(1)} disabled={currentPage === 1} data-testid="pagination-first" isRounded={round}>
        <ChevronDoubleLeftIcon color="#71717A" width={16} height={16} />
      </PaginationItem>
      <PaginationItem
        onClick={() => handleSetActivePage(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="pagination-previous"
        isRounded={round}
      >
        <ChevronLeftIcon color="#71717A" width={16} height={16} />
      </PaginationItem>

      {paginationRange?.map((page, index) => {
        const formattedPage = page as number;
        if (page === DOTS) {
          return (
            <PaginationItem key={index} disabled data-testid="pagination-dots" isRounded={round}>
              &hellip;
            </PaginationItem>
          );
        }
        return (
          <PaginationItem
            key={index}
            isActive={formattedPage === currentPage}
            isRounded={round}
            onClick={() => handleSetActivePage(formattedPage)}
          >
            {page}
          </PaginationItem>
        );
      })}

      <PaginationItem
        onClick={() => handleSetActivePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="pagination-next"
        isRounded={round}
      >
        <ChevronRightIcon color="#71717A" width={16} height={16} />
      </PaginationItem>
      <PaginationItem
        onClick={() => handleSetActivePage(totalPages)}
        disabled={currentPage === totalPages}
        data-testid="pagination-last"
        isRounded={round}
      >
        <ChevronDoubleRightIcon color="#71717A" width={16} height={16} />
      </PaginationItem>
    </nav>
  );
};

export { Pagination };
