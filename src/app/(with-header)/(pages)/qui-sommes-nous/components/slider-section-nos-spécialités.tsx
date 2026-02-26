"use client";

import ButtonLink from "@/app/components/buttons/ButtonLink";
import Tag from "@/app/components/text/Tag";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import * as React from "react";

interface Slider {
  bgImg: string;
  title: string;
  description: string;
  href?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
              <div
                className="f-col justify-between p-6 h-[390px] rounded-[20px] bg-Neutral-Dark bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url('${slider.bgImg}')` }}
              >
                <ButtonLink
                  href={slider.href}
                  color="white"
                  iconClassName="w-6 h-6"
                  className=" self-end"
                />
                <div className="f-col gap-5">
                  <span className="flex p-2 w-fit text-white rounded-[8px] bg-[#979797]">
                    {slider.Icon && <slider.Icon className="w-8 h-8" />}
                  </span>
                  <div className="f-col gap-1">
                    <h3 className="text-white text-lg/tight font-medium max-mobile:text-base">
                      {slider.title}
                    </h3>
                    <p className="text-white/70 Text-S">{slider.description}</p>
                  </div>
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
  buttonHref?: string;
  className?: string;
}

const SliderSectionNosspécialités: React.FC<SliderSectionProps> = ({
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

export default SliderSectionNosspécialités;
