// NavigationItem.tsx
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { UnionIcon } from "../icons/union";

interface NavigationItemProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export function NavigationItem({
  href,
  title,
  description,
  icon,
  isActive = false,
}: NavigationItemProps) {
  return (
    <div>
      <NavigationMenuLink
        className={`hover:[&_h3,&_p]:text-Neutral-Dark hover:[&_svg]:opacity-100 transition-all duration-200 ${
          isActive ? "bg-Sage-Gray-Lower rounded-lg p-2" : ""
        }`}
        asChild
      >
        <Link href={href} prefetch={true}>
          {" "}
          {/* Enable prefetching for better performance */}
          <div className="flex gap-4">
            <span
              className={`flex h-fit rounded-lg p-2 transition-colors duration-200 ${
                isActive ? "bg-Brand-500" : "bg-Sage-Gray-Lower"
              }`}
            >
              {icon}
            </span>
            <div className="f-col flex-1 gap-1">
              <div className="group flex items-center gap-2">
                <h3
                  className={`Button-M transition-colors duration-300 ease-in-out ${
                    isActive ? "text-Neutral-Dark" : "text-BG-BG-5"
                  }`}
                >
                  {title}
                </h3>
                <UnionIcon
                  className={`transition-opacity duration-300 ease-in-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <p
                className={`Text-S line-clamp-2 transition-colors duration-300 ease-in-out ${
                  isActive ? "text-Neutral-Dark" : "text-Text-Body"
                }`}
              >
                {description}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </div>
  );
}
