"use client";

import ButtonLink from "@/app/components/buttons/ButtonLink";
import { InfoCard } from "@/app/components/mini-sections/particuliers-info-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export default function Section1() {
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      className="f-col max-mobile:px-2 px-4 max-tablet:pt-3 max-mobile:pb-9
     max-tablet:bg-[linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]
      h-full w-full items-center justify-start
       bg-[url('/overlay.png'),linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]
        bg-[length:cover,cover] bg-[position:bottom,center] bg-no-repeat pt-[24px] pb-[132px]"
    >
      <Carousel
        // plugins={[plugin.current]}
        // opts={{
        //   align: "start",
        //   loop: true,
        // }}
        // setApi={setApi}
        className="max-tablet:h-[637px] relative h-[805px] w-full max-w-[1276px]"
      >
        <CarouselContent className="h-full">
          <CarouselItem>
            <div
              className="f-col  max-tablet:rounded-2xl max-tablet:justify-start max-tablet:bg-Neutral-Dark 
            max-mobile:bg-[url('/particuleirs-hero-bg-mobile.webp')] max-tablet:px-4 max-tablet:py-10 h-full w-full
             justify-center rounded-3xl bg-[url('/particuleirs-hero-bg.webp')] bg-cover bg-center bg-no-repeat px-12"
            >
              <InfoCard
                className="max-mobile:hidden max-tablet:[mask-image:linear-gradient(90deg,white,rgba(0,0,0,0.3))]"
                position="absolute right-[200px] top-[100px] max-tablet:right-[-25px] max-tablet:top-auto max-tablet:bottom-[60px]"
                text="Assistance 24h/24 incluse"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                  >
                    <path
                      d="M89.5376 34.3828C85.6811 14.8564 68.1184 0 48 0C27.8816 0 10.3189 14.8564 6.46237 34.3828C2.76412 35.2776 0 38.5929 0 42.5625V65.0625C0 69.7151 3.78488 73.5 8.4375 73.5H14.0625C15.6171 73.5 16.875 72.2421 16.875 70.6875V36.9375C16.875 35.3829 15.6171 34.125 14.0625 34.125H12.3878C16.2581 17.9119 31.0427 5.625 48 5.625C64.9573 5.625 79.7419 17.9119 83.6123 34.125H81.9375C80.3829 34.125 79.125 35.3829 79.125 36.9375V70.6875C79.125 72.2421 80.3829 73.4812 81.9375 73.4812H84.4654C83.1587 79.8921 77.478 84.75 70.6875 84.75H55.9194C54.7545 81.4834 51.6619 79.125 48 79.125C43.3474 79.125 39.5625 82.9099 39.5625 87.5625C39.5625 92.2151 43.3474 96 48 96C51.6619 96 54.7545 93.6416 55.9194 90.375H70.6875C80.7308 90.375 88.9489 82.7848 90.1354 73.0564C93.525 71.9608 96 68.8123 96 65.0625V42.5625C96 38.5929 93.2359 35.2776 89.5376 34.3828Z"
                      fill="white"
                    />
                    <path
                      d="M48 22.875C34.0419 22.875 22.5 34.2294 22.5 48.1875C22.5 52.4666 23.6179 56.691 25.7464 60.4868L22.6455 69.7976C22.3078 70.8084 22.5714 71.9235 23.3241 72.6759C24.0819 73.4338 25.2049 73.6931 26.2026 73.3543L35.5134 70.2534C39.309 72.3821 43.7209 73.5 48 73.5C61.9581 73.5 73.5 62.1456 73.5 48.1875C73.5 34.2294 61.9581 22.875 48 22.875ZM50.8125 59.4375C50.8125 60.9921 49.5546 62.25 48 62.25C46.4454 62.25 45.1875 60.9921 45.1875 59.4375V48.1875C45.1875 46.6329 46.4454 45.375 48 45.375C49.5546 45.375 50.8125 46.6329 50.8125 48.1875V59.4375ZM48 39.75C46.4468 39.75 45.1875 38.4907 45.1875 36.9375C45.1875 35.3839 46.4468 34.125 48 34.125C49.5532 34.125 50.8125 35.3839 50.8125 36.9375C50.8125 38.4907 49.5532 39.75 48 39.75Z"
                      fill="white"
                    />
                  </svg>
                }
              />
              <InfoCard
                className="max-mobile:hidden"
                position="right-[100px] top-[400px] max-tablet:right-[130px] max-tablet:top-auto max-tablet:bottom-[0px]"
                text="Souscription 100% en ligne"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="96"
                    height="92"
                    viewBox="0 0 96 92"
                    fill="none"
                  >
                    <path
                      d="M67.7966 89.8058C67.742 90.6564 66.998 91.3 66.1456 91.3H29.8544C29.002 91.3 28.258 90.6564 28.2034 89.8058C28.1436 88.8738 28.881 88.1 29.8 88.1H37.466L39.2758 78.212C39.4148 77.452 40.0772 76.9 40.8496 76.9H55.1502C55.9228 76.9 56.585 77.452 56.724 78.212L58.5338 88.1H66.2C67.119 88.1 67.8564 88.8738 67.7966 89.8058ZM96 8.83335V7.09995C96 3.56535 93.1346 0.699951 89.6 0.699951H6.4C2.8654 0.699951 0 3.56535 0 7.09995V8.83335C0 9.71695 0.7164 10.4334 1.6 10.4334H94.4C95.2836 10.4334 96 9.71695 96 8.83335ZM27.5 41.9C25.7356 41.9 24.3 43.3356 24.3 45.1C24.3 46.8644 25.7356 48.3 27.5 48.3C29.2644 48.3 30.7 46.8644 30.7 45.1C30.7 43.3356 29.2644 41.9 27.5 41.9ZM94.4 13.6334H1.6C0.7164 13.6334 0 14.3498 0 15.2334V67.3C0 70.8346 2.8654 73.7 6.4 73.7H89.6C93.1346 73.7 96 70.8346 96 67.3V15.2334C96 14.3496 95.2836 13.6334 94.4 13.6334ZM42.3 23.1H72.1C72.9836 23.1 73.7 23.8164 73.7 24.7C73.7 25.5836 72.9836 26.3 72.1 26.3H42.3C41.4164 26.3 40.7 25.5836 40.7 24.7C40.7 23.8164 41.4164 23.1 42.3 23.1ZM42.3 31.1H52.1C52.9836 31.1 53.7 31.8164 53.7 32.7C53.7 33.5836 52.9836 34.3 52.1 34.3H42.3C41.4164 34.3 40.7 33.5836 40.7 32.7C40.7 31.8164 41.4164 31.1 42.3 31.1ZM42.3 43.1H72.1C72.9836 43.1 73.7 43.8164 73.7 44.7C73.7 45.5836 72.9836 46.3 72.1 46.3H42.3C41.4164 46.3 40.7 45.5836 40.7 44.7C40.7 43.8164 41.4164 43.1 42.3 43.1ZM32.3 65.1H22.7C21.8164 65.1 21.1 64.3836 21.1 63.5C21.1 59.971 23.971 57.1 27.5 57.1C31.029 57.1 33.9 59.971 33.9 63.5C33.9 64.3836 33.1836 65.1 32.3 65.1ZM27.5 51.5C23.971 51.5 21.1 48.629 21.1 45.1C21.1 41.571 23.971 38.7 27.5 38.7C31.029 38.7 33.9 41.571 33.9 45.1C33.9 48.629 31.029 51.5 27.5 51.5ZM34.2838 22.1764L27.3552 29.7978C26.7586 30.4542 25.7424 30.4988 25.09 29.901L22.3186 27.3604C21.6672 26.7632 21.6232 25.751 22.2204 25.0996C22.8174 24.4482 23.8296 24.4044 24.481 25.0014L26.068 26.4564L31.9158 20.0236C32.5104 19.3696 33.5222 19.3216 34.176 19.916C34.83 20.5106 34.8784 21.5224 34.2838 22.1764ZM42.3 51.1H52.1C52.9836 51.1 53.7 51.8164 53.7 52.7C53.7 53.5836 52.9836 54.3 52.1 54.3H42.3C41.4164 54.3 40.7 53.5836 40.7 52.7C40.7 51.8164 41.4164 51.1 42.3 51.1ZM72.2 65.1H42.4C41.5164 65.1 40.8 64.3836 40.8 63.5C40.8 62.6164 41.5164 61.9 42.4 61.9H72.2C73.0836 61.9 73.8 62.6164 73.8 63.5C73.8 64.3836 73.0836 65.1 72.2 65.1Z"
                      fill="white"
                    />
                  </svg>
                }
              />
              <InfoCard
                className="max-mobile:hidden max-tablet:[mask-image:linear-gradient(90deg,rgba(0,0,0,0.3),white)]"
                position="right-[550px] top-[450px] max-tablet:left-[-10px] max-tablet:right-auto max-tablet:top-auto max-tablet:bottom-[130px]"
                text="Vol & incendie couverts"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                  >
                    <path
                      d="M76.398 10.6071C68.7979 3.76706 58.7126 0 48 0C37.2874 0 27.2021 3.76706 19.602 10.6071C11.9188 17.5221 7.6875 26.7398 7.6875 36.5625V36.5629C7.6875 39.1251 10.8339 40.3526 12.5691 38.4675L12.5693 38.4673C15.3694 35.4253 19.0738 33.75 23.0001 33.75C26.9263 33.75 30.6306 35.4253 33.4307 38.4671C34.5446 39.6774 36.4551 39.6774 37.5692 38.4671C40.3693 35.4253 44.0737 33.75 48 33.75C51.9263 33.75 55.6307 35.4253 58.4308 38.4673C59.5449 39.6776 61.4552 39.6776 62.5693 38.4673C65.3694 35.4253 69.0737 33.75 72.9999 33.75C76.9262 33.75 80.6306 35.4253 83.4307 38.4673L83.4309 38.4675C85.1661 40.3524 88.3125 39.1249 88.3125 36.5629V36.5625C88.3125 26.7398 84.0812 17.5221 76.398 10.6071Z"
                      fill="white"
                    />
                    <path
                      d="M64.8756 56.6254H63C58.2857 56.6254 53.8303 54.5391 50.8125 50.9571V39.8917C49.9112 39.5535 48.9645 39.375 48 39.375C47.0353 39.375 46.0888 39.5535 45.1875 39.8917V50.9571C42.1697 54.5391 37.7143 56.6254 33 56.6254H31.1244C29.5716 56.6254 28.3125 57.8842 28.3125 59.4373V67.221C28.3125 79.5493 35.5918 90.7506 46.8577 95.7576C47.5849 96.0808 48.4149 96.0808 49.1423 95.7576C60.4082 90.7506 67.6875 79.5493 67.6875 67.221V59.4373C67.6875 57.8842 66.4286 56.6254 64.8756 56.6254ZM55.6138 70.8011L48.1138 78.3011C47.0154 79.3995 45.2347 79.3995 44.1364 78.3011L40.3864 74.5511C39.288 73.4527 39.288 71.6721 40.3864 70.5737C41.4847 69.4753 43.2654 69.4753 44.3638 70.5737L46.1252 72.3351L51.6366 66.8237C52.7349 65.7253 54.5156 65.7253 55.614 66.8237C56.7124 67.9221 56.712 69.7029 55.6138 70.8011Z"
                      fill="white"
                    />
                  </svg>
                }
              />

              <div className="f-col max-tablet:w-full w-fit gap-8">
                <div className="f-col gap-5">
                  <div className="flex w-fit items-center gap-1 rounded-full bg-black/25 px-3 py-2 backdrop-blur-[35px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                    >
                      <circle cx="8" cy="6" r="2" fill="white" />
                      <circle
                        cx="8"
                        cy="6"
                        r="4"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="4"
                      />
                    </svg>
                    <span className="button-s text-white">
                      Jusqu&apos; au 31 décembre
                    </span>
                  </div>
                  <div className="f-col Headings-H1 w-fit gap-0 text-white">
                    <h2 className="max-tablet:py-1.5 max-tablet:px-2 rounded-2xl bg-[#739A38] px-3 py-2">
                      <span className="max-tablet:inline hidden">
                        Économisez 15%
                      </span>
                      <span className="max-tablet:hidden inline">
                        Économisez jusqu&apos;à 15%
                      </span>
                    </h2>

                    <h2>Sur votre Assurance</h2>
                    <h2>Habitation</h2>
                  </div>
                </div>
                <div className="f-col gap-1">
                  <ButtonLink
                    href="/assurance-habitation"
                    label="J'en profite !"
                    className="max-tablet:w-full"
                    iconClassName="w-6 h-6"
                    size="ultraLarge"
                    color="white"
                  />
                  <span className="Text-S max-tablet:text-center text-white">
                    *Offre soumise à conditions
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <div className="absolute bottom-0 flex w-full items-center gap-2 px-6 py-5">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/50"
            >
              <span
                className={`absolute inset-0 rounded-full bg-white ${i === current ? "animate-[fillBar_8s_linear_forwards]" : "w-0"}`}
              />
            </span>
          ))}
        </div>
      </Carousel>
    </section>
  );
}
