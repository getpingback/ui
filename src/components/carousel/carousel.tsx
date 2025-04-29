import React, { useState, Children, useRef, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/light-icons/dist';
import { cn } from '@/lib/utils';

interface SliderProps {
  children: React.ReactNode;
  className?: string;
  settings?: {
    itemWidth?: number;
    spaceBetween?: number;
    hideNavigationButtons?: boolean;
  };
}

const DEFAULT_SETTINGS = {
  itemWidth: 224,
  spaceBetween: 24,
  hideNavigationButtons: false
};

const BUTTON__CONTROLL_SIZE = 40;

export default function Slider({ children, settings = DEFAULT_SETTINGS, className }: SliderProps) {
  const initialSettings = { ...DEFAULT_SETTINGS, ...settings };
  const { hideNavigationButtons, itemWidth, spaceBetween } = initialSettings;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalItems = Children.count(children);
  const itemsPerPage = Math.max(1, Math.floor((pageWidth || 0) / (itemWidth + spaceBetween)));

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  console.log('currentPage', currentPage, totalItems, itemsPerPage, totalPages, pageWidth);

  useEffect(() => {
    if (sliderRef.current) {
      const currentWidth = sliderRef.current.clientWidth;
      setPageWidth(currentWidth);
    }
  }, [sliderRef.current]);

  if (!children) return null;

  const handleNext = () => {
    if (sliderRef.current) {
      setCurrentPage(currentPage + 1);
      const widthToScroll = isFirstPage || isLastPage ? pageWidth - BUTTON__CONTROLL_SIZE : pageWidth;
      sliderRef.current.scrollTo({
        left: widthToScroll * currentPage,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      setCurrentPage(currentPage - 1);
      const widthToScroll = isFirstPage || isLastPage ? pageWidth - BUTTON__CONTROLL_SIZE : pageWidth;
      sliderRef.current.scrollTo({
        left: widthToScroll * (currentPage - 2),
        behavior: 'smooth'
      });
    }
  };

  const handleMove = (x: number) => {
    if (!isDragging) return;
  };

  const handleMouseUp = () => {};

  const handleTouchStart = (e: React.TouchEvent) => {};

  const handleMouseDown = (e: React.MouseEvent) => {};

  const handleMouseMove = (e: React.MouseEvent) => {};

  const handleTouchMove = (e: React.TouchEvent) => {};

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <button
        onClick={handlePrev}
        className={cn(
          'overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full',
          (isFirstPage || hideNavigationButtons) && !isDragging ? 'w-0' : 'w-10 min-w-10'
        )}
      >
        <ChevronLeftIcon className="w-10 h-10 text-purple-500" />
      </button>
      <div
        className="w-full overflow-hidden cursor-grab"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="flex" style={{ gap: spaceBetween }}>
          {Children.toArray(children).map((child, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: itemWidth }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className={cn(
          'overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full',
          (isLastPage || hideNavigationButtons) && !isDragging ? 'w-0' : 'w-10 min-w-10'
        )}
      >
        <ChevronRightIcon className="w-10 h-10 text-purple-500" />
      </button>
    </div>
  );
}
