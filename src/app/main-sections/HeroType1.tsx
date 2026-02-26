import ButtonLink from "@/app/components/buttons/ButtonLink";
import { twMerge } from "tailwind-merge";

interface Section1Props {
    badgeText?: string;
    title?: React.ReactNode;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
    className1?: string; 
    className2?: string; 
    descriptionClassName?: string; 
    titleClassName?: string; 
}

export default function HeroType1({
    badgeText = "Assurance Auto",
    title = "Assurez votre voiture en ligne, en toute confiance.",
    description = "Souscrivez en ligne en 3 minutes. Gestion 100 % digitale, assistance 24/7, et aucun papier à remplir.",
    buttonLabel = "Obtenir mon devis",
    buttonHref = "#",
    className1,
    className2,
    descriptionClassName,
    titleClassName,
}: Section1Props) {
    return (
        <section
            className={twMerge(
                `f-col px-4 max-mobile:px-2 max-mobile:pt-3 max-mobile:pb-9
        max-mobile:bg-[linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]
        h-full w-full items-center justify-start
        bg-[url('/overlay.png'),linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]
        bg-[length:cover,cover] bg-[position:bottom,center] bg-no-repeat pt-[24px] pb-[132px]`,
                className1
            )}
        >
            <div className="max-mobile:h-[637px] relative h-[805px] w-full max-w-[1276px]">
                <div className={twMerge(
                    `f-col max-mobile:rounded-2xl max-mobile:justify-start max-mobile:bg-Neutral-Dark
                max-mobile:bg-[url('/Assurance-Auto-bg-mobile.webp')] max-mobile:px-4 max-mobile:py-10 h-full w-full justify-center rounded-3xl
                bg-[url('/Assurance-auto-bg.webp')] bg-cover bg-center bg-no-repeat px-12`,
                    className2
                )}
                >
                    <div className="f-col max-mobile:w-full w-fit gap-8">
                        <div className="f-col gap-4">
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
                                <h6 className="button-s text-white">{badgeText}</h6>
                            </div>
                            <h2
                                className={twMerge(
                                    "Headings-H1 text-balance max-w-[488px] w-full text-white",
                                    titleClassName
                                )}
                            >
                                {title}
                            </h2>
                            {description && (
                                <p className={twMerge(
                                    "text-white Text-S max-w-[392px] w-full",
                                   descriptionClassName
                                )}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                        <ButtonLink
                            href={buttonHref}
                            label={buttonLabel}
                            iconClassName="w-6 h-6"
                            size="ultraLarge"
                            color="white"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
