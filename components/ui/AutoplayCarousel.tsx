"use client";

import Autoplay from "embla-carousel-autoplay";
import { JSX } from "react";
import { Carousel } from "./carousel";

function AutoplayCarousel({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      {children}
    </Carousel>
  );
}

export { AutoplayCarousel };
