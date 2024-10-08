import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@stash-ui/regular-icons';
import { usePagination, DOTS } from '@/hooks/usePagination';

const buttonVariants = cva(
  'h-[32px] min-w-[32px] px-3 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default:
          'bg-transparent px-0 opacity-85 text-button-page-color-clear hover:bg-button-page-ghost hover:opacity-1',
        solid: 'bg-button-page-solid text-button-page-color-solid px-3 ',
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default',
    },
  }
);

export interface PaginationItemProps extends React.ComponentProps<'button'> {
  isActive?: boolean;
  isRounded?: boolean;
  disabled?: boolean;
}

function PaginationItem({
  children,
  isActive,
  isRounded,
  className,
  disabled,
  ...props
}: PaginationItemProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant: isActive ? 'solid' : 'default',
          rounded: isRounded ? 'full' : 'default',
        }),
        disabled ? 'cursor-not-allowed  opacity-45' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface ControllersProps extends React.ComponentProps<'button'> {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function Controller({
  children,
  onClick,
  disabled,
  ...props
}: ControllersProps) {
  return (
    <PaginationItem onClick={onClick} disabled={disabled} {...props}>
      {children}
    </PaginationItem>
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

const Pagination = ({
  totalPages,
  onPageChange,
  page,
  siblingCount = 1,
  round = false,
  className,
  ...props
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page);

  const paginationRange = usePagination(currentPage, totalPages, siblingCount);

  const handleSetActivePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <nav
      role='navigation'
      aria-label='pagination'
      className={cn('mx-auto flex w-full justify-center')}
      data-testid='pagination'
      {...props}
    >
      <Controller
        onClick={() => handleSetActivePage(1)}
        disabled={currentPage === 1}
        data-testid='pagination-first'
      >
        <ChevronDoubleLeftIcon />
      </Controller>
      <Controller
        onClick={() => handleSetActivePage(currentPage - 1)}
        className='mr-2'
        disabled={currentPage === 1}
        data-testid='pagination-previous'
      >
        <ChevronLeftIcon />
      </Controller>
      <span className='flex gap-1'>
        {paginationRange?.map((page, index) => {
          const formattedPage = page as number;
          if (page === DOTS) {
            return (
              <PaginationItem
                key={index}
                disabled
                data-testid='pagination-dots'
              >
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
      </span>
      <Controller
        onClick={() => handleSetActivePage(currentPage + 1)}
        className='ml-2'
        disabled={currentPage === totalPages}
        data-testid='pagination-next'
      >
        <ChevronRightIcon />
      </Controller>
      <Controller
        onClick={() => handleSetActivePage(totalPages)}
        disabled={currentPage === totalPages}
        data-testid='pagination-last'
      >
        <ChevronDoubleRightIcon />
      </Controller>
    </nav>
  );
};

export { Pagination };
