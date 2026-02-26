import ButtonLink from "../components/buttons/ButtonLink";
import { BurgerMenuIcon } from "../components/icons/Burger-Menu";
import { Logosvg } from "../components/logo/logo";
import MobileMenuCategoryList from "../components/mini-sections/MobileMenuCategoryList";

export interface CategoryItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: {
    title?: string;
    items: CategoryItem[];
  }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  categories = [],
}: MobileMenuProps) {
  return (
    <div
      className={`bg-Sage-Gray-Lowest fixed inset-0 z-[9999] transform transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      style={{ height: "100vh", minHeight: "100vh", width: "100vw" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2">
        <span>
          <Logosvg href="/" className="w-[129px] h-[56px]" variant="green" />
        </span>
        <span
          className="flex bg-Sage-Gray-Lower cursor-pointer rounded-full p-2"
          onClick={onClose}
        >
          <BurgerMenuIcon variant="close" />
        </span>
      </div>

      {/* Menu content */}
      <MobileMenuCategoryList categories={categories} onItemClick={onClose} />

      <div className="flex px-5 pb-8 bg-Sage-Gray-Lowest">
        <span className="w-full" onClick={onClose}>
          <ButtonLink
            href="/contact"
            label="Contactez-nous"
            size="large"
            className="font-medium w-full"
          />
        </span>
      </div>
    </div>
  );
}
