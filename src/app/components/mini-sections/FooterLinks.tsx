"use client";

import Link from "next/link";

interface FooterLinkSection {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterLinksProps {
  sections: FooterLinkSection[];
}

export default function FooterLinks({ sections }: FooterLinksProps) {
  return (
    <ul className="max-tablet:flex-wrap max-tablet:gap-y-10 flex justify-between">
      {sections.map((section, idx) => (
        <li
          key={idx}
          className="f-col max-mobile:basis-1/2 max-tablet:basis-1/3 max-tablet:flex-shrink-0 gap-5"
        >
          <h3 className="text-Sage-Gray-High button-s">{section.title}</h3>
          <div className="f-col text-Sage-Gray-Higher button2-s gap-3">
            {section.links.map((link, linkIdx) => (
              <Link
                key={linkIdx}
                href={link.href}
                prefetch={true} // Enable prefetching for better performance
                className="hover:text-BG-Dark underline-offset-3 transition hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
