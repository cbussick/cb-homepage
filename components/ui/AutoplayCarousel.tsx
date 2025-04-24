"use client";

import Autoplay from "embla-carousel-autoplay";
import { JSX, useRef } from "react";
import { Carousel } from "./carousel";

function AutoplayCarousel({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const autoplayRef = useRef(Autoplay({ delay: 2000 }));

  const onScroll = () => {
    autoplayRef.current?.stop();
  };

  return (
    <Carousel
      plugins={[autoplayRef.current]}
      opts={{
        loop: true,
      }}
      onScroll={onScroll}
    >
      {children}
    </Carousel>
  );
}

export { AutoplayCarousel };
