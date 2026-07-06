import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: ReactNode[];
}

export function Carousel({ children }: CarouselProps) {
  const [plugins] = useState(() => [Autoplay({ delay: 6000 })]);
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);

  const scrollPrev = useCallback(() => {
    plugins[0].stop();
    emblaApi?.scrollPrev();
  }, [emblaApi, plugins]);

  const scrollNext = useCallback(() => {
    plugins[0].stop();
    emblaApi?.scrollNext();
  }, [emblaApi, plugins]);

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.container} data-testid="carousel-track">
          {children.map((child, index) => (
            <div className={styles.slide} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={styles.prevButton}
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ArrowLeft />
      </button>
      <button
        type="button"
        className={styles.nextButton}
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
