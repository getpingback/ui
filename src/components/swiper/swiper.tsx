import React, { useState, Children, useRef, useEffect, createContext, useContext, useCallback, useMemo } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@stash-ui/regular-icons/dist';
import { cn } from '@/lib/utils';
import { useDevice } from '@/hooks/useDevice';

interface SwiperContextType {
  configSettings?:
    | {
        itemWidth?: number | number[];
        spaceBetween?: number | number[];
        hideNavigationButtons?: boolean;
      }
    | undefined;
}

interface SwiperProviderProps {
  children: React.ReactNode;
  settings?: SwiperContextType['configSettings'];
}

const SwiperContext = createContext<SwiperContextType>({
  configSettings: undefined
});

export const useSwiperContext = () => {
  const context = useContext(SwiperContext);
  if (!context) {
    throw new Error('useSwiperContext must be used within a SwiperProvider');
  }
  return context;
};

interface SwiperProps {
  children: React.ReactNode;
  className?: string;
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
  return itemWidth[device === 'md' ? 0 : 1];
};

const getCurrentSpaceBetween = (spaceBetween: number | number[], device: string) => {
  if (typeof spaceBetween === 'number') return spaceBetween;
  return spaceBetween[device === 'md' ? 0 : 1];
};

const SwiperContent = ({ children, className }: SwiperProps) => {
  const { configSettings } = useSwiperContext();
  const { itemWidth, spaceBetween } = configSettings;

  const device = useDevice();
  const { sliderRef, setCurrentPosition, setIsDragging, isDragging } = useSwiperContext();

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(0);

  const wasDraggingRef = useRef(false);

  const currentItemWidth = getCurrentItemWidth(itemWidth, device);
  const currentSpaceBetween = getCurrentSpaceBetween(spaceBetween, device);

  const totalItems = Children.count(children);
  const itemsPerPage = Math.max(1, Math.floor((pageWidth || 0) / (currentItemWidth + currentSpaceBetween)));

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    if (sliderRef.current) {
      const currentWidth = sliderRef.current.clientWidth;
      setPageWidth(currentWidth);
    }
  }, []);

  if (!children) return null;

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
    <div className={cn('flex items-center', className)} data-testid="swiper-content">
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
    </div>
  );
};

const SwiperProvider = ({ children, settings }: SwiperProviderProps) => {
  const configSettings = { ...DEFAULT_SETTINGS, ...settings };
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const itemScrollWidth = configSettings?.itemWidth + configSettings?.spaceBetween;

  useEffect(() => {
    if (sliderRef?.current) {
      const totalItems = sliderRef?.current.children[0].children.length;
      const pageWidth = sliderRef?.current?.clientWidth;
      setTotalItems(totalItems);
      setPageWidth(pageWidth);
    }
  }, [sliderRef]);

  const maxScrollPosition = totalItems * itemScrollWidth - pageWidth;

  const isAtStart = currentPosition <= 0;
  const isAtEnd = currentPosition >= maxScrollPosition;

  const shouldHideNextNavButton = isAtEnd && !isDragging;
  const shouldHidePrevNavButton = isAtStart && !isDragging;

  const shouldHideControls = totalItems * itemScrollWidth <= pageWidth || configSettings?.hideNavigationButtons;

  const onNext = useCallback(() => {
    if (sliderRef.current) {
      const newPosition = currentPosition + itemScrollWidth;

      const maxPosition = Math.max(0, totalItems * itemScrollWidth - pageWidth);
      const finalPosition = Math.min(newPosition, maxPosition);

      setCurrentPosition(finalPosition);
      sliderRef?.current?.scrollTo({
        left: finalPosition,
        behavior: 'smooth'
      });
    }
  }, [configSettings?.itemWidth, configSettings?.spaceBetween, currentPosition, totalItems, pageWidth]);

  const onPrev = useCallback(() => {
    if (sliderRef.current) {
      const newPosition = currentPosition - itemScrollWidth;

      const finalPosition = Math.max(0, newPosition);

      setCurrentPosition(finalPosition);
      sliderRef.current.scrollTo({
        left: finalPosition,
        behavior: 'smooth'
      });
    }
  }, [configSettings?.itemWidth, configSettings?.spaceBetween, currentPosition]);

  const contextValue: SwiperContextType = useMemo(
    () => ({
      configSettings,
      sliderRef,
      onNext,
      onPrev,
      setCurrentPosition,
      currentPosition,
      isDragging,
      setIsDragging,
      shouldHideControls,
      shouldHideNextNavButton,
      shouldHidePrevNavButton
    }),
    [
      configSettings,
      sliderRef,
      onNext,
      onPrev,
      setCurrentPosition,
      currentPosition,
      isDragging,
      setIsDragging,
      shouldHideNextNavButton,
      shouldHidePrevNavButton,
      shouldHideControls
    ]
  );

  return (
    <SwiperContext.Provider value={contextValue}>
      <div className="flex flex-col gap-4">{children}</div>
    </SwiperContext.Provider>
  );
};

const SwiperControl = () => {
  const { onNext, onPrev, shouldHideNextNavButton, shouldHidePrevNavButton, shouldHideControls } = useSwiperContext();

  return (
    <div data-testid="swiper-control" className={cn('w-fit flex items-center gap-1', { hidden: shouldHideControls })}>
      <button
        data-testid="prev-control"
        onClick={onPrev || undefined}
        disabled={shouldHidePrevNavButton}
        className={cn('w-6 h-6 overflow-hidden transition-all duration-300 hover:bg-neutral-hover rounded-full', {
          'opacity-50 cursor-not-allowed': shouldHidePrevNavButton
        })}
      >
        <ChevronLeftIcon className="text-icon-tertiary group-hover:text-icon-primary" />
      </button>
      <button
        data-testid="next-control"
        onClick={onNext || undefined}
        disabled={shouldHideNextNavButton}
        className={cn('group w-6 h-6 overflow-hidden transition-all duration-300 hover:bg-neutral-hover rounded-full', {
          'opacity-50 cursor-not-allowed': shouldHideNextNavButton
        })}
      >
        <ChevronRightIcon className=" text-icon-tertiary group-hover:text-icon-primary" />
      </button>
    </div>
  );
};

export { SwiperProvider, SwiperContent, SwiperControl };
