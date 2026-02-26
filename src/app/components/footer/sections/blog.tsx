"use client";

import { usePathname } from "next/navigation";
import CarouselPosts from "../../../main-sections/blog-carousel";
import ButtonLink from "../../buttons/ButtonLink";
import Tag from "../../text/Tag";
import Wrapper1180 from "../../wrapper/wrapper-1180";

export default function BlogSection() {
  const pathname = usePathname();

  // Hide entire blog section on actualites page
  const isActualitesPage = pathname?.includes("/actualites-conseils");

  // Don't render anything on actualites page
  if (isActualitesPage) {
    return null;
  }

  return (
    <section className="f-col max-mobile:py-16 px-4 items-center py-[132px]">
      <Wrapper1180>
        <div className="max-mobile:gap-5 max-mobile:flex-col flex justify-between gap-14">
          <div className="f-col max-mobile:gap-3.5 gap-6">
            <Tag label="Blog" />
            <div className="f-col gap-2">
              <h2 className="text-BG-Dark Headings-H2">
                Nos conseils et actualités
              </h2>
              <p className="text-Text-Body Text-M">
                Restez informé, comparez, et assurez plus intelligemment.
              </p>
            </div>
          </div>
          <div className="flex items-end">
            <ButtonLink
              href="/actualites-conseils"
              color="black"
              label="Voir tous les articles"
              iconClassName="w-6 h-6"
              className="max-mobile:py-3 max-mobile:px-6"
            />
          </div>
        </div>
        <CarouselPosts />
      </Wrapper1180>
    </section>
  );
}
