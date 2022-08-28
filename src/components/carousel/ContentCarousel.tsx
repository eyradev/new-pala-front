/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useState } from 'react';
import { Carousel } from 'reactstrap';
import { MediaCarouselItem } from './carouse-iItem';

export interface ContentCarouselProps {
  items: {
    id: string;
    background: string;
    header: string;
    body?: string;
    redirectPath?: string;
  }[];
}

export default function ContentCarousel({ items }: ContentCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

  const handleExitStart = () => {
    setAnimating(true);
  };
  const handleExitEnd = () => {
    setAnimating(false);
  };
  const handleNext = () => {
    if (isAnimating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const handlePrevious = () => {
    if (isAnimating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  if (!items.length) return null;

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={handleNext}
        previous={handlePrevious}
      >
        {items.map((item) => (
          <MediaCarouselItem
            key={item.id}
            background={item.background}
            header={item.header}
            body={item.body}
            redirectPath={item.redirectPath}
            onExiting={handleExitStart}
            onExited={handleExitEnd}
          />
        ))}
        <a
          className="left carousel-control carousel-control-prev"
          role="button"
          data-slide="prev"
          onClick={handlePrevious}
        >
          <span className="now-ui-icons arrows-1_minimal-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control carousel-control-next"
          role="button"
          data-slide="next"
          onClick={handleNext}
        >
          <span className="now-ui-icons arrows-1_minimal-right" />
          <span className="sr-only">Next</span>
        </a>
      </Carousel>
    </>
  );
}
