import Link from "next/link";
import { type CategoryItem } from "../../main-sections/MobileMenu";

interface MobileMenuCategoryListProps {
  categories: {
    title?: string;
    items: CategoryItem[];
  }[];
  onItemClick?: () => void;
}

export default function MobileMenuCategoryList({
  categories,
  onItemClick,
}: MobileMenuCategoryListProps) {
  return (
    <div className="flex flex-col gap-4 px-3 py-5 bg-Sage-Gray-Lowest">
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="flex flex-col gap-2">
          {category.title && (
            <h3 className="text-Sage-Gray-High Button2-M px-2">
              {category.title}
            </h3>
          )}
          {category.items.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              onClick={onItemClick}
              className="hover:bg-Sage-Gray-Low flex items-center gap-2 rounded-2xl p-2 transition"
              aria-label={`Aller à ${item.label}`}
            >
              <span className="bg-Sage-Gray-Lower flex rounded-[8px] p-2">
                {item.icon}
              </span>
              <h4 className="text-Neutral-Dark Headings-H6">{item.label}</h4>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
