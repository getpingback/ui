import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@stash-ui/regular-icons';
import { getPaginationRange, DOTS } from '@/lib/utils';
import { Button } from '../button';

export interface PaginationItemProps extends React.ComponentProps<'button'> {
  isActive?: boolean;
  isRounded?: boolean;
  disabled?: boolean;
}

function PaginationItem({ children, isActive, isRounded, disabled, className, ...props }: PaginationItemProps) {
  return (
    <Button
      {...props}
      variant={isActive ? 'solid' : 'outline'}
      rounded={isRounded ? 'full' : 'lg'}
      disabled={disabled}
      className={cn('h-8 w-8 p-0', className)}
    >
      <span className="w-full flex items-center justify-center font-semibold">{children}</span>
    </Button>
  );
}

export interface PaginationProps extends React.ComponentProps<'nav'> {
  totalPages: number;
  onPageChange: (page: number) => void;
  page: number;
  round?: boolean;
  className?: string;
}

const Pagination = ({ totalPages, onPageChange, page, round = false, className, ...props }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const paginationRange = getPaginationRange(currentPage, totalPages);

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
      <PaginationItem
        onClick={() => handleSetActivePage(1)}
        disabled={currentPage === 1}
        data-testid="pagination-first"
        isRounded={round}
        className="hidden xl:block"
      >
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
        className="hidden xl:block"
      >
        <ChevronDoubleRightIcon color="#71717A" width={16} height={16} />
      </PaginationItem>
    </nav>
  );
};

export { Pagination };
