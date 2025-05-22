import React, { useState, Children, useRef, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/light-icons/dist';
import { cn } from '@/lib/utils';
import { useDevice } from '@/hooks/useDevice';
interface SwiperProps {
  children: React.ReactNode;
  className?: string;
  settings?: {
    itemWidth?: number | number[];
    spaceBetween?: number | number[];
    hideNavigationButtons?: boolean;
  };
}

const DEFAULT_SETTINGS = {
  itemWidth: 224,
  spaceBetween: 24,
  hideNavigationButtons: false
};

const BUTTON__CONTROLL_SIZE = 40;
const DRAG_THRESHOLD = 5;

const getCurrentItemWidth = (itemWidth: number | number[], device: string) => {
  if (typeof itemWidth === 'number') return itemWidth;
  return itemWidth[device === 'sm' ? 0 : 1];
};

const getCurrentSpaceBetween = (spaceBetween: number | number[], device: string) => {
  if (typeof spaceBetween === 'number') return spaceBetween;
  return spaceBetween[device === 'sm' ? 0 : 1];
};

const Swiper = ({ children, settings = DEFAULT_SETTINGS, className }: SwiperProps) => {
  const initialSettings = { ...DEFAULT_SETTINGS, ...settings };
  const { hideNavigationButtons, itemWidth, spaceBetween } = initialSettings;

  const device = useDevice();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const wasDraggingRef = useRef(false);

  const currentItemWidth = getCurrentItemWidth(itemWidth, device);
  const currentSpaceBetween = getCurrentSpaceBetween(spaceBetween, device);

  const totalItems = Children.count(children);
  const itemsPerPage = Math.max(1, Math.floor((pageWidth || 0) / (currentItemWidth + currentSpaceBetween)));

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const maxScrollPosition = totalItems * (currentItemWidth + currentSpaceBetween) - pageWidth;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const isAtStart = currentPosition <= 0;
  const isAtEnd = currentPosition >= maxScrollPosition;

  const shouldHideNextNavButton = (isAtEnd && !isDragging) || hideNavigationButtons;
  const shouldHidePrevNavButton = (isAtStart && !isDragging) || hideNavigationButtons;

  useEffect(() => {
    if (sliderRef.current) {
      const currentWidth = sliderRef.current.clientWidth;
      setPageWidth(currentWidth);
    }
  }, [sliderRef.current]);

  if (!children) return null;

  const handleNext = () => {
    if (sliderRef.current) {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);

      const widthToScroll = isFirstPage || isLastPage ? pageWidth - BUTTON__CONTROLL_SIZE : pageWidth;
      setCurrentPosition(widthToScroll * currentPage);
      sliderRef.current.scrollTo({
        left: widthToScroll * currentPage,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);

      const widthToScroll = isFirstPage || isLastPage ? pageWidth - BUTTON__CONTROLL_SIZE : pageWidth;
      setCurrentPosition(widthToScroll * (currentPage - 2));
      sliderRef.current.scrollTo({
        left: widthToScroll * (currentPage - 2),
        behavior: 'smooth'
      });
    }
  };

  const handleMove = (x: number) => {
    if (!isDragging || !sliderRef.current) return;

    const diff = x - startX;
    if (Math.abs(diff) > DRAG_THRESHOLD) wasDraggingRef.current = true;

    const newScrollLeft = scrollLeft - diff;
    sliderRef.current.scrollLeft = newScrollLeft;
    setCurrentPosition(newScrollLeft);

    const widthToScroll = isFirstPage || isLastPage ? pageWidth - BUTTON__CONTROLL_SIZE : pageWidth;
    if (widthToScroll > 0) {
      const newPage = Math.round(newScrollLeft / widthToScroll) + 1;

      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    wasDraggingRef.current = false;
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    wasDraggingRef.current = false;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].pageX);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (wasDraggingRef.current) {
      e.stopPropagation();
      e.preventDefault();
      wasDraggingRef.current = false;
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      <button
        onClick={handlePrev}
        className={cn(
          'overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full',
          shouldHidePrevNavButton ? 'w-0' : 'w-10 min-w-10 mr-6'
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
        onClickCapture={handleClickCapture}
      >
        <div className="flex items-center gap-6" style={{ gap: currentSpaceBetween }}>
          {Children.toArray(children).map((child, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: currentItemWidth }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className={cn(
          'overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full',
          shouldHideNextNavButton ? 'w-0' : 'w-10 min-w-10 ml-6'
        )}
      >
        <ChevronRightIcon className="w-10 h-10 text-purple-500" />
      </button>
    </div>
  );
};

export { Swiper };
