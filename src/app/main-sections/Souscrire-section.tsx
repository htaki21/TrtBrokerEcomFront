"use client";

import ButtonLink from "../components/buttons/ButtonLink";
import Wrapper1180 from "../components/wrapper/wrapper-1180";
import EmblaCarousel from "../components/mini-sections/EmblaCarousel";
import SectionHeader from "../components/mini-sections/sec-header";



interface SouscrireSectionProps {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    slides: Array<{
        id: number;
        step: string;
        text: string;
        Icon: React.ReactNode;
    }>;
    options?: object;
}

export default function SouscrireSection({
    heading,
    description,
    buttonLabel,
    buttonHref,
    slides,
    options,
}: SouscrireSectionProps) {
    return (
        <Wrapper1180 className="max-mobile:py-16 max-mobile:px-4 max-mobile:gap-12 items-center py-[132px]">
            <div className="f-col items-center gap-6">
                <SectionHeader
                    heading={heading}
                    description={description}
                    headingClassName="max-w-[500px] w-full text-balance"
                />
                <ButtonLink
                    href={buttonHref}
                    label={buttonLabel}
                    color="black"
                    iconClassName="w-6 h-6"
                    className="max-mobile:py-3 max-mobile:px-6"
                />
            </div>
            <EmblaCarousel slides={slides} options={options} />
        </Wrapper1180>
    );
}
