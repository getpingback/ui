import React, { useState, Children, useRef } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/light-icons/dist';
import { cn } from '@/lib/utils';

interface SliderProps {
  children: React.ReactNode;
  settings?: {
    itemWidth: number;
    spaceBetween: number;
  };
}

const DEFAULT_SETTINGS = {
  itemWidth: 224,
  spaceBetween: 24
};

export default function Slider({ children, settings = DEFAULT_SETTINGS }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  console.log(currentPage);

  if (!children) return null;

  const totalItems = Children.count(children);
  const itemsPerPage = Math.floor((sliderRef.current?.clientWidth || 0) / (settings.itemWidth + settings.spaceBetween));
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (sliderRef.current && currentPage < totalPages - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      sliderRef.current.scrollTo({
        left: nextPage * sliderRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current && currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      sliderRef.current.scrollTo({
        left: prevPage * sliderRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const newPage = Math.round((sliderRef.current.scrollLeft / maxScroll) * (totalPages - 1));
      setCurrentPage(Math.max(0, Math.min(newPage, totalPages - 1)));
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sliderRef.current) {
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const newPage = Math.round((sliderRef.current.scrollLeft / maxScroll) * (totalPages - 1));
      setCurrentPage(Math.max(0, Math.min(newPage, totalPages - 1)));
    }
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={handlePrev}
        className={cn(
          'overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full',
          isFirstPage ? 'w-0' : 'w-10 min-w-10'
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
      >
        <div className="flex" style={{ gap: settings.spaceBetween }}>
          {Children.toArray(children).map((child, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: settings.itemWidth }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className={cn(
          'overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full',
          isLastPage ? 'w-0' : 'w-10 min-w-10'
        )}
      >
        <ChevronRightIcon className="w-10 h-10 text-purple-500" />
      </button>
    </div>
  );
}
