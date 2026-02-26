"use client";

import * as React from "react";
import ButtonLink from "@/app/components/buttons/ButtonLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { SVGProps } from "react";
import Autoplay from "embla-carousel-autoplay";
// Quote icon
export function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M22.4543 16.5353C22.7345 16.3252 23.0533 16.1723 23.3925 16.0854C23.7317 15.9985 24.0848 15.9792 24.4314 16.0288C24.7781 16.0783 25.1116 16.1956 25.413 16.374C25.7143 16.5524 25.9775 16.7885 26.1877 17.0686C26.3978 17.3488 26.5506 17.6676 26.6376 18.0068C26.7245 18.346 26.7437 18.6991 26.6942 19.0457C26.6447 19.3924 26.5273 19.7259 26.3489 20.0273C26.1705 20.3286 25.9345 20.5918 25.6543 20.802C21.4837 23.93 19.0943 26.9726 17.7263 29.6286C19.6046 29.1451 21.5869 29.2588 23.3977 29.9538C25.2084 30.6489 26.7576 31.8908 27.83 33.5069C28.9024 35.1231 29.4446 37.0331 29.3814 38.9716C29.3181 40.9102 28.6525 42.7808 27.4771 44.3236C26.3017 45.8664 24.6748 47.0047 22.8226 47.5802C20.9704 48.1558 18.9849 48.14 17.1421 47.5351C15.2993 46.9302 13.6907 45.7662 12.5399 44.2049C11.3892 42.6436 10.7534 40.7626 10.721 38.8233C10.3831 35.5485 10.848 32.2407 12.0757 29.186C13.6677 25.17 16.7797 20.7913 22.4543 16.5353ZM46.4543 16.5353C46.7345 16.3252 47.0533 16.1723 47.3925 16.0854C47.7317 15.9985 48.0848 15.9792 48.4314 16.0288C48.7781 16.0783 49.1116 16.1956 49.413 16.374C49.7143 16.5524 49.9775 16.7885 50.1877 17.0686C50.3978 17.3488 50.5507 17.6676 50.6376 18.0068C50.7245 18.346 50.7437 18.6991 50.6942 19.0457C50.6447 19.3924 50.5273 19.7259 50.3489 20.0273C50.1705 20.3286 49.9345 20.5918 49.6543 20.802C45.4837 23.93 43.0943 26.9726 41.7263 29.6286C43.6046 29.1451 45.5869 29.2588 47.3977 29.9538C49.2084 30.6489 50.7576 31.8908 51.83 33.5069C52.9024 35.1231 53.4446 37.0331 53.3814 38.9716C53.3181 40.9102 52.6525 42.7808 51.4771 44.3236C50.3017 45.8664 48.6748 47.0047 46.8226 47.5802C44.9704 48.1558 42.9849 48.14 41.1421 47.5351C39.2993 46.9302 37.6907 45.7662 36.5399 44.2049C35.3892 42.6436 34.7534 40.7626 34.721 38.8233C34.3831 35.5485 34.848 32.2407 36.0757 29.186C37.6703 25.17 40.7797 20.7913 46.4543 16.5353Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface Testimonial {
  paragraph: string;
  author: string;
  role: string;
}

interface CarouselTestimonialsProps {
  testimonials: Testimonial[];
}

export default function CarouselTestimonials({
  testimonials,
}: CarouselTestimonialsProps) {
    const plugin = React.useRef(
      Autoplay({ delay: 8000, stopOnInteraction: false })
    );
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    setActiveIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    }
  }, [api]);

  return (
    <div className="relative w-full f-col gap-8 max-w-[1180px] py-[132px] mx-auto">
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true }}
        setApi={setApi}
      >
        <CarouselContent className="">
          {testimonials.map((t, i) => (
            <CarouselItem key={i} className="">
              <div className="f-col gap-12">
                <div className="f-col gap-3">
                  <QuoteIcon className="text-Neutral-Dark" />
                  <p className="text-Neutral-Dark Headings-H5 whitespace-pre-line">
                    {t.paragraph}
                  </p>
                </div>
                <div className="f-col gap-1">
                  <h6 className="text-Neutral-Dark Headings-H6">{t.author}</h6>
                  <span className="text-Neutral-Dark button2-s">{t.role}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* pagination and arrows */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`flex transition-all duration-300 ease-in-out ${
                i === activeIndex
                  ? "bg-Neutral-Dark h-1.5 w-8"
                  : "bg-Neutral-BG-3 h-1.5 w-1.5"
              } rounded-full`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink
            href="#"
            direction="left"
            color="black"
            iconClassName="w-6 h-6"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              api?.scrollPrev();
            }}
          />
          <ButtonLink
            href="#"
            color="black"
            iconClassName="w-6 h-6"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              api?.scrollNext();
            }}
          />
        </div>
      </div>
    </div>
  );
}
