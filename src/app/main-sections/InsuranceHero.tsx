import ButtonLink from "@/app/components/buttons/ButtonLink";
import { CheckcircleIcon } from "@/app/components/icons/Check-circle";
import React from "react";

interface InsuranceHeroProps {
  bgOverlayUrl: string;
  bgDesktopUrl: string;
  bgMobileUrl: string;
  tag: string;
  title: React.ReactNode;
  mobileTitle?: React.ReactNode;
  description: string;
  features: string[];
  price: string;
  priceUnit: string;
  ctaLabel: string;
  ctaLink: string;
  tagIcon?: React.ReactNode;
  titleMaxWidth?: string;
}

const DefaultTagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
  >
    <circle cx="4" cy="4" r="4" fill="white" />
  </svg>
);

export default function InsuranceHero({
  bgOverlayUrl,
  bgDesktopUrl,
  bgMobileUrl,
  tag,
  title,
  mobileTitle,
  description,
  features,
  price,
  priceUnit,
  ctaLabel,
  ctaLink,
  tagIcon = <DefaultTagIcon />,
  titleMaxWidth = "max-w-[460px]",
}: InsuranceHeroProps) {
  return (
    <section
      className="f-col max-mobile:px-2 max-mobile:pt-3 max-mobile:pb-6
              h-full w-full items-center justify-start
               bg-[length:contain,cover] bg-[position:bottom-left,center] bg-no-repeat px-4
                 pt-[24px] pb-[132px]"
      style={{
        backgroundImage: `url('${bgOverlayUrl}'), linear-gradient(180deg, var(--color-Sage-Gray-Lowest) 0%, var(--color-Sage-Gray-Lower) 100%)`,
      }}
    >
      <div
        className="max-mobile:h-[637px] relative h-[805px] w-full max-w-[1276px] max-mobile:max-w-[400px] f-col max-mobile:rounded-2xl
                  max-mobile:bg-Neutral-Dark max-mobile:bg-[image:var(--bg-mobile)]
                    max-mobile:px-4 max-mobile:py-10 justify-center max-mobile:justify-between items-end rounded-3xl bg-[image:var(--bg-desktop)] gap-10 bg-cover bg-center bg-no-repeat px-12"
        style={
          {
            "--bg-desktop": `url('${bgDesktopUrl}')`,
            "--bg-mobile": `url('${bgMobileUrl}')`,
          } as React.CSSProperties
        }
      >
        <div className="f-col w-full gap-4">
          <div className="flex w-fit items-center gap-2 rounded-full bg-[rgba(93,93,93,0.25)] px-4 py-2 backdrop-blur-[35px]">
            {tagIcon}
            <h6 className="button-s text-white">{tag}</h6>
          </div>
          <h2
            className={`Headings-H1 text-white ${titleMaxWidth} w-full max-mobile:Headings-H2`}
          >
            <span className="max-mobile:hidden">{title}</span>
            <span className="hidden max-mobile:block">
              {mobileTitle || title}
            </span>
          </h2>
          <p className="text-white Text-S max-w-[392px] w-full">
            {description}
          </p>
          <ButtonLink
            href={ctaLink}
            label={ctaLabel}
            className="hidden mt-4 max-mobile:flex max-mobile:font-medium"
            iconClassName="w-6 h-6"
            size="large"
            color="white"
          />
        </div>

        <div className="f-col w-fit gap-2 p-2 max-w-[611px] rounded-3xl max-mobile:w-full bg-[rgba(93,93,93,0.25)] backdrop-blur-[34.4px]">
          <div className="x-fade-out overflow-hidden">
            <ul className="flex p-3 max-mobile:p-2 gap-4  animate-scroller w-fit">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-1 items-center text-white ">
                  <CheckcircleIcon />
                  <span className=" text-sm/normal font-normal text-nowrap">
                    {feature}
                  </span>
                </li>
              ))}
              {features.map((feature, index) => (
                <li key={index} className="flex gap-1 items-center text-white">
                  <CheckcircleIcon />
                  <span className=" text-sm/normal font-normal text-nowrap">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-end p-9 max-mobile:py-5 max-mobile:px-6 rounded-2xl bg-white">
            <div className="f-col gap-1">
              <span className="text-Text-Body Text-S">À partir de</span>
              <div className="flex items-baseline gap-2">
                <span className="text-Primary-800 Headings-H1">{price}</span>
                <span className="text-Text-Body Text-S ">{priceUnit}</span>
              </div>
            </div>
            <ButtonLink
              href={ctaLink}
              label={ctaLabel}
              className="max-mobile:hidden"
              iconClassName="w-6 h-6"
              size="large"
              color="brand"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
