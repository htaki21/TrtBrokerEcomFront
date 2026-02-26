"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AccidentIcon } from "../icons/accident";
import { CarIcon } from "../icons/car";
import { JetskiIcon } from "../icons/jet-ski";
import { MotocycleIcon } from "../icons/motocycle";
import { SanteIcon } from "../icons/sante";
import { VoyageIcon } from "../icons/voyage";
import { NavigationItem } from "./NavigationItem";

export function NavigationMenuDemo() {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className="max-laptop:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`transition-colors duration-200 ${
              pathname === "/assurance-automobile" ||
              pathname === "/assurance-moto" ||
              pathname === "/assurance-plaisance-jet-ski"
                ? "bg-Sage-Gray-Lower"
                : ""
            }`}
          >
            Auto & Moto
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-6 p-6">
              <NavigationItem
                href="/assurance-automobile"
                title="Assurance Auto"
                description="Protégez votre véhicule avec notre assurance auto complète. Bénéficiez d'une couverture sur mesure et d'un service client réactif. Demandez un devis gratuit aujourd'hui!"
                icon={<CarIcon />}
                isActive={false}
              />
              <NavigationItem
                href="/assurance-moto"
                title="Assurance Moto"
                description="Protégez votre passion pour la moto avec une assurance adaptée. Une couverture complète vous offre sérénité sur la route."
                icon={<MotocycleIcon />}
                isActive={false}
              />
              <NavigationItem
                href="/assurance-plaisance-jet-ski"
                title="Plaisance / Jet-ski"
                description="Une couverture complète pour votre bateau ou jet-ski, que vous soyez à quai ou en mer."
                icon={<JetskiIcon />}
                isActive={false}
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/assurance-habitation"
            className={`inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-normal transition-colors duration-200 hover:bg-Sage-Gray-Lower hover:text-Neutral-Dark ${
              pathname === "/assurance-habitation" ? "bg-Sage-Gray-Lower" : ""
            }`}
          >
            Habitation
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`transition-colors duration-200 ${
              pathname === "/assurance-sante" ||
              pathname === "/assurance-individuelle-accidents" ||
              pathname === "/assurance-maladie-complementaire"
                ? "bg-Sage-Gray-Lower"
                : ""
            }`}
          >
            Santé
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-6 p-6">
              <NavigationItem
                href="/assurance-sante"
                title="Santé"
                description="Des remboursements rapides et une couverture adaptée à vos besoins médicaux."
                icon={<SanteIcon />}
                isActive={false}
              />
              <NavigationItem
                href="/assurance-individuelle-accidents"
                title="Individuelle Accidents"
                description="Indemnisation rapide en cas d'accident, à la maison ou en déplacement."
                icon={<AccidentIcon />}
                isActive={false}
              />
              <NavigationItem
                href="/assurance-maladie-complementaire"
                title="Assurance maladie complémentaire"
                description="Complète les remboursements de l’assurance de base et réduit vos frais médicaux restants."
                icon={<SanteIcon />}
                isActive={false}
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`transition-colors duration-200 ${
              pathname === "/assurance-voyage" ? "bg-Sage-Gray-Lower" : ""
            }`}
          >
            Voyage
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-6 p-6">
              <NavigationItem
                href="/assurance-voyage"
                title="Assistance Voyage"
                description="Assistance médicale, rapatriement, bagages perdus : on s'occupe de tout."
                icon={<VoyageIcon />}
                isActive={false}
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
