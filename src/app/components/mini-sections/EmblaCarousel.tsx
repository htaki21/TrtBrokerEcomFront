"use client";
import { EmblaOptionsType } from "embla-carousel";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

export type SlideType = {
  id: number;
  step: string;
  text: string;
  Icon: React.ReactNode;
};

type PropType = {
  slides: SlideType[];
  options?: EmblaOptionsType;
};

// Hook for prev/next buttons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevNextButtons(emblaApi: any) {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onPrevButtonClick = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const onNextButtonClick = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-0">
          {slides.map((slide) => (
            <div
              className="embla__slide f-col justify-between rounded-3xl cursor-grab"
              key={slide.id}
            >
              <span className="flex w-fit p-4 rounded-2xl bg-white">
                {React.isValidElement(slide.Icon)
                  ? React.cloneElement(slide.Icon, {
                      className: "w-9 h-9",
                    } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
                  : slide.Icon}
              </span>
              <div className="f-col p-2 gap-3 ">
                <h3 className="Headings-H2">{slide.step}</h3>
                <p className="Button-M">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-center w-full gap-2 mt-4">
        <button
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className={`flex items-center justify-center w-fit rounded-full transition-colors py-2 px-4 text-base/[24px] gap-2 ${
            prevBtnDisabled
              ? "cursor-not-allowed opacity-50 bg-Neutral-BG-2 text-Neutral-Dark"
              : "cursor-pointer bg-Neutral-BG-2 text-Neutral-Dark hover:bg-Neutral-BG-3"
          }`}
          aria-label="Élément précédent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 28"
            fill="none"
            className="w-7 h-7 rotate-180"
          >
            <path
              d="M17.6457 7.8124C17.9874 7.47069 18.5424 7.47069 18.8841 7.8124L24.452 13.3814C24.7937 13.7231 24.7937 14.277 24.452 14.6187L18.8841 20.1877C18.5424 20.5294 17.9874 20.5294 17.6457 20.1877C17.304 19.846 17.304 19.291 17.6457 18.9493L21.721 14.8751H5.16666C4.68343 14.8751 4.29169 14.4833 4.29166 14.0001C4.29166 13.5168 4.68341 13.1251 5.16666 13.1251H21.721L17.6457 9.05085C17.304 8.70915 17.304 8.15412 17.6457 7.8124Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className={`flex items-center justify-center w-fit rounded-full transition-colors py-2 px-4 text-base/[24px] gap-2 ${
            nextBtnDisabled
              ? "cursor-not-allowed opacity-50 bg-Neutral-BG-2 text-Neutral-Dark"
              : "cursor-pointer bg-Neutral-BG-2 text-Neutral-Dark hover:bg-Neutral-BG-3"
          }`}
          aria-label="Élément suivant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 28"
            fill="none"
            className="w-7 h-7"
          >
            <path
              d="M17.6457 7.8124C17.9874 7.47069 18.5424 7.47069 18.8841 7.8124L24.452 13.3814C24.7937 13.7231 24.7937 14.277 24.452 14.6187L18.8841 20.1877C18.5424 20.5294 17.9874 20.5294 17.6457 20.1877C17.304 19.846 17.304 19.291 17.6457 18.9493L21.721 14.8751H5.16666C4.68343 14.8751 4.29169 14.4833 4.29166 14.0001C4.29166 13.5168 4.68341 13.1251 5.16666 13.1251H21.721L17.6457 9.05085C17.304 8.70915 17.304 8.15412 17.6457 7.8124Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
