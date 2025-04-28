import React, { useState, Children, useRef } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/light-icons/dist';
import { cn } from '@/lib/utils';

export default function Slider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  if (!children) return null;

  const totalItems = Children.count(children);

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
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (scrollLeft === 0) {
        setCurrentIndex(0);
      } else if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
        setCurrentIndex(totalItems - 1);
      }
    }
  };

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={handlePrev}
        className={`${
          currentIndex > 0 ? 'w-[40px]' : 'w-0'
        } overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full`}
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
        <div className="flex gap-6">{children}</div>
      </div>
      <button
        onClick={handleNext}
        className={`${
          currentIndex < totalItems - 1 ? 'w-[40px]' : 'w-0'
        } overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full`}
      >
        <ChevronRightIcon className="w-10 h-10 text-purple-500" />
      </button>
    </div>
  );
}
