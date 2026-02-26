"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import ButtonLink from "../components/buttons/ButtonLink";
import Tag from "../components/text/Tag";
import Wrapper1180 from "../components/wrapper/wrapper-1180";

interface Slider {
  bgImg: string;
  title: string;
  description: string;
}

interface CarouselSlidersProps {
  sliders: Slider[];
}

const CarouselSliders: React.FC<CarouselSlidersProps> = ({ sliders }) => {
  const [api, setApi] = React.useState<CarouselApi>();

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("select", updateButtons);
    updateButtons(); // initialize



    return () => {
      api.off("select", updateButtons);
    };
  }, [api]);

  return (
    <div className="relative w-full max-w-[1180px]">
      <Carousel opts={{ align: "start" }} setApi={setApi}>
        <CarouselContent className="-ml-4" overflowVisible>
          {sliders.map((slider, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 max-tablet:basis-1/2 max-mobile:basis-1/1 max-w-[400px] max-mobile:max-w-[300px] select-none  pl-4"
            >
              <div className="relative group overflow-hidden flex items-end h-[390px] rounded-[20px] bg-Neutral-Dark">
                <div
                  className="bg-cover bg-center absolute inset-0 transition-transform ease-out duration-2000 group-hover:scale-120"
                  style={{ backgroundImage: `url('${slider.bgImg}')` }}
                />
                <div className="f-col z-[1] gap-2 p-6">
                  <h3 className="text-white text-lg font-medium max-mobile:text-base">
                    {slider.title}
                  </h3>
                  <p className="text-white Text-S">{slider.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination / Arrows */}
      <div className="mt-8 max-mobile:mt-4 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <ButtonLink
            direction="left"
            color="gray"
            iconClassName="w-7 h-7"
            disabled={!canScrollPrev}
            onClick={(e) => {
              e.preventDefault();
              api?.scrollPrev();
            }}
          />
          <ButtonLink
            color="gray"
            iconClassName="w-7 h-7"
            disabled={!canScrollNext}
            onClick={(e) => {
              e.preventDefault();
              api?.scrollNext();
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface SliderSectionProps {
  sliders: Slider[];
  tagLabel: string;
  title: string;
  buttonLabel: string;
  buttonHref: string;
  className?: string;
}

const SliderSection: React.FC<SliderSectionProps> = ({
  sliders,
  tagLabel,
  title,
  buttonLabel,
  buttonHref,
  className,
}) => {
  return (
    <section
      className={`f-col max-mobile:py-16 max-mobile:px-4 items-center px-6 py-[132px] ${className ?? ""}`}
    >
      <Wrapper1180>
        <div className="max-mobile:gap-6 max-mobile:flex-col flex justify-between">
          <div className="f-col max-mobile:gap-4 gap-6">
            <Tag label={tagLabel} />
            <h2 className="text-shadow-Neutral-Dark Headings-H2 max-w-[600px] w-full text-balance">
              {title}
            </h2>
          </div>
          <div className="flex items-end">
            <ButtonLink
              href={buttonHref}
              label={buttonLabel}
              color="black"
              iconClassName="w-6 h-6"
              className="max-mobile:py-3 max-mobile:px-6"
            />
          </div>
        </div>

        <CarouselSliders sliders={sliders} />
      </Wrapper1180>
    </section>
  );
};

export default SliderSection;
