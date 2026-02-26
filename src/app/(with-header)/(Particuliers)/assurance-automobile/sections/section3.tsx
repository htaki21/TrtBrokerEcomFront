import ButtonLink from "@/app/components/buttons/ButtonLink";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { VisuallyHidden } from "radix-ui";
import type { SVGProps } from "react";
import PopoverForm from "./form/form";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.4188 6.5196C16.7117 6.2267 17.1875 6.2267 17.4804 6.5196C17.773 6.81234 17.7728 7.28724 17.4804 7.58014L13.0604 12.0001L17.4804 16.419C17.7732 16.7119 17.7732 17.1876 17.4804 17.4805C17.1875 17.7734 16.7117 17.7734 16.4188 17.4805L11.9999 13.0606L7.57998 17.4805L7.52334 17.5323C7.22879 17.7722 6.79389 17.7549 6.51943 17.4805C6.24498 17.2061 6.22778 16.7712 6.46767 16.4766L6.51943 16.419L10.9394 12.0001L6.51943 7.58014C6.22692 7.28722 6.22666 6.81236 6.51943 6.5196C6.8122 6.22684 7.28706 6.22709 7.57998 6.5196L11.9999 10.9395L16.4188 6.5196Z"
        fill="#0F110C"
      />
    </svg>
  );
}

export default function Section3() {
  return (
    <div
      className="w-full px-4 bg-[url('/red-overlay.png'),linear-gradient(180deg,#FFF_0%,var(--Secondary-Red-Lowest,_#F5EFEE)_100%)] bg-[length:contain,cover]
     bg-[position:bottom,center] bg-no-repeat"
    >
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-16 max-tablet:flex-col items-center flex-row py-[132px] gap-5">
        <div className="f-col gap-8 flex-1 max-tablet:max-w-[460px] w-full">
          <div className="f-col gap-4 text-balance max-w-[400px] max-tablet:max-w-full w-full">
            <h2 className="text-Neutral-Dark Headings-H2 ">
              Recevez votre carte verte rapidement, où que vous soyez.
            </h2>
            <p className="text-Text-Body Text-M">
              La carte verte est le document officiel qui prouve que votre
              véhicule est bien assuré. Elle est indispensable pour circuler
              légalement, en France et à l&apos;étranger.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <ButtonLink
                label="Demander ma carte verte"
                color="black"
                iconClassName="w-6 h-6"
                className="max-tablet:w-full max-tablet:py-3"
              />
            </DialogTrigger>

            <DialogContent
              showCloseButton={false}
              className="f-col !max-w-[966px] max-tablet:w-[70%] max-mobile:w-[98%] w-full gap-5 p-8 max-tablet:p-5 rounded-3xl border-Neutral-BG-2"
            >
              {/* Hidden accessibility labels */}
              <VisuallyHidden.Root>
                <DialogTitle>Form Title</DialogTitle>
              </VisuallyHidden.Root>
              <VisuallyHidden.Root>
                <DialogDescription>Form Description</DialogDescription>
              </VisuallyHidden.Root>

              <div className="flex items-start justify-between gap-7">
                <div className="f-col gap-2">
                  <h3
                    className="text-Neutral-Dark text-[32px]/[40px] -tracking-[1px] 
                  max-tablet:text-[24px]/[32px] max-mobile:text-[20px]/[24px] font-medium"
                  >
                    Obtenez votre carte verte sans sortir.
                  </h3>
                  <p className="text-Text-Body text-[16px]/[24px] max-tablet:text-[14px]/[20px]">
                    Pour envoyer votre demande, veuillez renseigner le
                    formulaire ci-dessous :
                  </p>
                </div>

                {/* Custom close button */}
                <DialogClose asChild>
                  <button
                    type="button"
                    className="flex p-3 max-tablet:p-1.5 rounded-full hover:bg-Neutral-BG-3 transition-colors cursor-pointer"
                    aria-label="Fermer la boîte de dialogue"
                  >
                    <CloseIcon className="max-tablet:w-5 max-tablet:h-5" />
                  </button>
                </DialogClose>
              </div>

              <PopoverForm />
            </DialogContent>
          </Dialog>
        </div>
        <Image
          src="/Carte-verte-rapide.png"
          alt="Recevez votre carte verte rapidement, où que vous soyez."
          width={580}
          height={545}
          className="rounded-[20px] max-tablet:w-[460px] max-mobile:h-[302px] max-mobile:object-cover"
        />
      </Wrapper1180>
    </div>
  );
}
