import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { type ButtonLinkProps } from "../buttons/ButtonLink";
import { ButtonDialog } from "../dialog/form/dialog-from";
import Wrapper1180 from "../wrapper/wrapper-1180";

interface ImageTextSectionProps {
  className?: string;
  h2className?: string;
  pclassName?: string;
  buttonColor?: ButtonLinkProps["color"];
  gradientEndColor?: string;
  imageSrc: string;
  imageAlt: string;
  h2: string | React.ReactNode;
  p: string;
  buttonLabel: string;
  buttonHref?: string;
}

export default function ImageTextSection({
  h2className,
  pclassName,
  buttonColor,
  gradientEndColor = "var(--color-Secondary-Blue-Lowest)",
  imageSrc,
  imageAlt,
  h2,
  p,
  buttonLabel,
  buttonHref,
}: ImageTextSectionProps) {
  return (
    <section
      style={
        { "--gradient-end-color": gradientEndColor } as React.CSSProperties
      }
      className={`w-full px-4 bg-[url('/blue-overlay.png'),linear-gradient(180deg,#FFF_0%,var(--gradient-end-color)_100%)] 
        max-mobile:bg-[linear-gradient(180deg,#FFF_0%,var(--gradient-end-color)_100%)] bg-[length:contain,cover] bg-[position:bottom,center] bg-no-repeat`}
    >
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-16 max-tablet:justify-center items-center flex-row py-[132px]">
        <div className="flex gap-4 max-tablet:max-w-[460px] max-tablet:flex-col-reverse">
          <div className="f-col w-1/2 max-tablet:w-full justify-between py-11 px-10 max-mobile:p-6 bg-white rounded-[20px] max-tablet:h-[400px]">
            <h2 className={twMerge("Headings-H2 text-balance", h2className)}>
              {h2}
            </h2>
            <div className="f-col gap-[22px] w-full">
              <p className={twMerge("Text-M", pclassName)}>{p}</p>
              <ButtonDialog
                buttonProps={{
                  href: buttonHref,
                  label: buttonLabel,
                  color: buttonColor,
                  iconClassName: "w-6 h-6",
                  className: "max-tablet:w-full max-tablet:py-3",
                }}
              />
            </div>
          </div>
          <div className="w-1/2 max-tablet:w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={580}
              height={545}
              className="rounded-[20px] max-tablet:h-[400px] max-mobile:max-w-[460px] max-mobile:w-full  max-mobile:object-cover"
            />
          </div>
        </div>
      </Wrapper1180>
    </section>
  );
}
