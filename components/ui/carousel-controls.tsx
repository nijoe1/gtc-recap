'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  className?: string;
}

export function CarouselControls({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onDotClick,
  className = '',
}: CarouselControlsProps) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="rounded-full hover:bg-background/80"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1} />
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-primary w-4"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="rounded-full hover:bg-background/80"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1} />
      </Button>
    </div>
  );
}