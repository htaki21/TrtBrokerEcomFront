import ButtonLink from "@/app/components/buttons/ButtonLink";

export default function SuccessPage() {
  return (
    <section className="py-[200px] max-tablet:py-[100px] px-4 w-full flex-center flex-col gap-6 ">
      <div
        className="absolute inset-0 w-full h-[508px] bg-green-100 -z-[1]
        bg-[url('/success-overlay.png'),linear-gradient(180deg,var(--color-Primary-300)_0%,var(--color-white)_100%)] 
        bg-top bg-no-repeat max-tablet:bg-cover"
      ></div>
      <div className="flex p-10 rounded-full bg-Primary-300">
        <div className="flex p-6 rounded-full bg-Primary-500/50">
          <div className="flex p-5 rounded-full bg-Primary-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M53.8631 12.7774C54.5661 13.4807 54.9611 14.4343 54.9611 15.4287C54.9611 16.423 54.5661 17.3767 53.8631 18.0799L25.7556 46.1874C25.3842 46.559 24.9432 46.8537 24.4578 47.0547C23.9724 47.2558 23.4522 47.3593 22.9269 47.3593C22.4015 47.3593 21.8813 47.2558 21.3959 47.0547C20.9106 46.8537 20.4696 46.559 20.0981 46.1874L6.13311 32.2249C5.77495 31.879 5.48927 31.4652 5.29273 31.0077C5.0962 30.5502 4.99275 30.0581 4.98842 29.5602C4.9841 29.0623 5.07898 28.5685 5.26753 28.1076C5.45608 27.6467 5.73453 27.228 6.08663 26.8759C6.43873 26.5238 6.85742 26.2454 7.31828 26.0568C7.77915 25.8683 8.27294 25.7734 8.77087 25.7777C9.26879 25.7821 9.76086 25.8855 10.2184 26.082C10.6759 26.2786 11.0897 26.5643 11.4356 26.9224L22.9256 38.4124L48.5581 12.7774C48.9064 12.4289 49.3199 12.1525 49.775 11.9639C50.2301 11.7753 50.718 11.6782 51.2106 11.6782C51.7033 11.6782 52.1911 11.7753 52.6462 11.9639C53.1014 12.1525 53.5149 12.4289 53.8631 12.7774Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="f-col gap-6 items-center">
        <div className="text-center items-center f-col gap-2">
          <h3 className="text-Neutral-Dark Headings-H3">
            Merci, votre demande est bien envoyée
          </h3>
          <p className="text-Text-Body Text-M max-w-[450px]">
            Nous avons bien reçu vos informations. Un conseiller vous contactera
            sous 24h pour finaliser votre devis.
          </p>
        </div>
        <div className="flex max-mobile:flex-col gap-3">
          <ButtonLink
            href="/"
            label="Retour à l’accueil"
            size="large"
            iconClassName="w-7 h-7"
            color="white"
            ghost
            reverse
            direction="left"
          />
          <ButtonLink
            href="/contact"
            label="Contactez-nous"
            size="large"
            iconClassName="w-7 h-7"
            color="brand"
          />
        </div>
      </div>
    </section>
  );
}
