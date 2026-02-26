import { CheckcircleIcon } from "@/app/components/icons/Check-circle";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

interface Benefit {
    title: string;
    description?: string;
}

interface BenefitsSectionProps {
    badgeText: string;
    heading: string;
    benefits: Benefit[];
    headingMaxWidth?: string;
}

export default function BenefitsSection({ badgeText, heading, benefits, headingMaxWidth = "max-w-[686px]" }: BenefitsSectionProps) {
    return (
      <section className="px-4">
        <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 max-tablet:max-w-[460px] items-center py-[132px]">
          <SectionHeader
            badgeText={badgeText}
            heading={heading}
            headingClassName={`${headingMaxWidth} w-full`}
          />
          <ul className="flex w-full gap-5 max-tablet:gap-4 max-tablet:flex-col">
            {benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="f-col h-[217px] flex-1 justify-between rounded-[20px] bg-Sage-Gray-Lowest p-6
                        max-tablet:p-5 max-tablet:h-auto max-tablet:gap-7"
              >
                <CheckcircleIcon className="h-[52px] w-[52px] max-tablet:w-12 max-tablet:h-12 text-Primary-500" />
                <div className="f-col gap-2">
                  <h3 className="Headings-H7 text-Neutral-Dark">
                    {benefit.title}
                  </h3>
                  {benefit.description && (
                    <p className="Text-S text-Sage-Gray-High">
                      {benefit.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Wrapper1180>
      </section>
    );
}