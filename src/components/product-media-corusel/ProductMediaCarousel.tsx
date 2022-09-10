/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { VideoPopup } from 'components/video-popup';
import { Product } from 'generated/graphql';
import { useState } from 'react';
import { Button, Carousel, CarouselIndicators, CarouselItem } from 'reactstrap';
import styles from './ProductMediaCarousel.module.css';

interface Props {
  content: Product['photo'];
  productVideo?: string | null;
}

export default function ProductMediaCarousel({
  content,
  productVideo
}: Props): JSX.Element {
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
    const nextIndex = activeIndex === content.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const handlePrevious = () => {
    if (isAnimating) return;
    const nextIndex = activeIndex === 0 ? content.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const handleStepClick = (newIndex: number) => {
    if (isAnimating) return;
    setActiveIndex(newIndex);
  };

  return (
    <div style={{ position: 'relative' }}>
      {productVideo && (
        <div
          style={{
            zIndex: 1001,
            position: 'absolute',
            height: '40px',
            width: '40px',
            right: 10,
            bottom: 10,
            textAlign: 'center'
          }}
        >
          <VideoPopup
            id="carouselVideo"
            videoURL={productVideo}
            tooltipText="ver presentación del producto"
          >
            <div
              className={styles.playIcon}
              style={{
                backgroundColor: 'var(--info)',
                padding: '10px',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <i className="now-ui-icons media-1_button-play" />
            </div>
          </VideoPopup>
        </div>
      )}
      <Carousel
        activeIndex={activeIndex}
        next={handleNext}
        previous={handlePrevious}
      >
        {content?.length > 1 && (
          <CarouselIndicators
            items={content}
            activeIndex={activeIndex}
            onClickHandler={handleStepClick}
          />
        )}
        {content.map((con) => (
          <CarouselItem
            onExiting={handleExitStart}
            onExited={handleExitEnd}
            key={con?.image?.publicUrlTransformed}
          >
            <div
              className="d-block img-raised"
              style={{
                backgroundImage: `url(${con?.image?.publicUrlTransformed})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundClip: 'border-box',
                backgroundPosition: 'center',
                width: '100%',
                height: '0',
                paddingBottom: '100%'
              }}
            />
          </CarouselItem>
        ))}
        {content.length > 1 && (
          <>
            <a
              className="carousel-control-prev"
              data-slide="prev"
              onClick={handlePrevious}
              role="button"
            >
              <Button
                className="btn-icon btn-round"
                color="info"
                name="button"
                size="sm"
                type="button"
              >
                <i className="now-ui-icons arrows-1_minimal-left" />
              </Button>
            </a>
            <a
              className="carousel-control-next"
              data-slide="next"
              onClick={handleNext}
              role="button"
            >
              <Button
                className="btn-icon btn-round"
                color="info"
                name="button"
                size="sm"
                type="button"
              >
                <i className="now-ui-icons arrows-1_minimal-right" />
              </Button>
            </a>
          </>
        )}
      </Carousel>
    </div>
  );
}
