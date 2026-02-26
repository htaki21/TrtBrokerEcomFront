
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import Image from "next/image";
import type { SVGProps } from "react";

// Reusable Check Icon
function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 21"
      width={20}
      height={21}
      fill="none"
    >
      <path
        d="M10 0.832031C15.523 0.832031 20 5.30903 20 10.832C20 16.355 15.523 20.832 10 20.832C4.477 20.832 0 16.355 0 10.832C0 5.30903 4.477 0.832031 10 0.832031ZM13.535 7.21303L8.585 12.163L6.465 10.042C6.37215 9.94912 6.26192 9.87541 6.14059 9.8251C6.01925 9.77479 5.8892 9.74887 5.75785 9.74883C5.49258 9.74873 5.23814 9.85402 5.0505 10.0415C4.86286 10.229 4.75739 10.4834 4.7573 10.7487C4.7572 11.0139 4.86249 11.2684 5.05 11.456L7.808 14.214C7.91015 14.3162 8.03144 14.3973 8.16493 14.4526C8.29842 14.5079 8.4415 14.5364 8.586 14.5364C8.7305 14.5364 8.87358 14.5079 9.00707 14.4526C9.14056 14.3973 9.26185 14.3162 9.364 14.214L14.95 8.62803C15.1376 8.44039 15.2431 8.18589 15.2431 7.92053C15.2431 7.65517 15.1376 7.40067 14.95 7.21303C14.7624 7.02539 14.5079 6.91997 14.2425 6.91997C13.9771 6.91997 13.7226 7.02539 13.535 7.21303Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Checklist item component
function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex gap-2">
      <CheckIcon className="text-Secondary-Violet-Medium flex-none" />
      <span className="text-Secondary-Violet-High Button-M">{text}</span>
    </li>
  );
}

export default function Section3() {
  return (
    <section
      className="w-full px-4 bg-[url('/blue-overlay.png'),linear-gradient(180deg,#FFF_0%,var(--color-Secondary-Violet-Lowest)_100%)]
        max-mobile:bg-[linear-gradient(180deg,#FFF_0%,var(--color-Secondary-Violet-Lowest)_100%)] 
        bg-[length:contain,cover] bg-[position:bottom,center] bg-no-repeat"
    >
      <Wrapper1180 className="items-center gap-20 py-[132px] max-mobile:gap-12 max-tablet:max-w-[460px] max-mobile:px-4 max-mobile:py-16">
        <SectionHeader
          badgeText="Nos engagements"
          heading="Notre engagement envers vous"
          description="Chez TRT Broker, nous croyons en un courtage humain, transparent et réactif."
          descriptionClassName="w-full max-w-[354px]"
        />

        <div className="flex w-full gap-5 max-mobile:max-w-[400px] max-tablet:max-w-[580px] max-tablet:flex-col">
          {/* Card */}
          <div className="f-col flex-1 justify-between rounded-[20px] bg-white px-8 max-mobile:px-6 max-mobile:py-7 py-9 max-tablet:gap-12">
            <h4 className="Headings-H3 text-Secondary-Violet-High text-balance">
              Notre mission est simple :
            </h4>
            <ul className="f-col gap-5">
              <ChecklistItem text="Vous conseiller objectivement" />
              <ChecklistItem text="Vous accompagnez à chaque étape : souscription, gestion, sinistre" />
              <ChecklistItem text="Vous faire gagner du temps et de l’argent en comparant pour vous les meilleures garanties du marché" />
            </ul>
          </div>

          {/* Image */}
          <Image
            src="/Nos-engagement-section-image.jpg"
            alt="Collaborative team working together in a modern office"
            width={580}
            height={545}
            className="rounded-[20px] max-mobile:h-[302px] max-mobile:w-full max-mobile:max-w-[400px] max-mobile:object-cover"
          />
        </div>
      </Wrapper1180>
    </section>
  );
}
