import React, { useState, Children, useRef } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/light-icons/dist';
import { cn } from '@/lib/utils';

export default function Slider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalItems = Children.count(children);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
      const nextScrollLeft = scrollLeft + clientWidth;

      sliderRef.current.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth'
      });

      console.log('next out', nextScrollLeft, clientWidth);

      if (Math.ceil(nextScrollLeft + clientWidth) >= scrollWidth) {
        setCurrentIndex(totalItems - 1);
      } else {
        setCurrentIndex(Math.floor(nextScrollLeft / clientWidth));
      }
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const prevScrollLeft = scrollLeft - clientWidth;

      sliderRef.current.scrollTo({
        left: prevScrollLeft,
        behavior: 'smooth'
      });

      const currentScrollIndex = Math.round(scrollLeft / clientWidth);
      if (currentScrollIndex > 0) {
        setCurrentIndex(currentScrollIndex - 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  if (!children) return null;

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
          currentIndex > 0 ? 'w-10 min-w-10' : 'w-0'
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
          currentIndex < totalItems - 1 ? 'w-10 min-w-10' : 'w-0'
        } overflow-hidden transition-all duration-300 hover:bg-purple-500/5 rounded-full`}
      >
        <ChevronRightIcon className="w-10 h-10 text-purple-500" />
      </button>
    </div>
  );
}
