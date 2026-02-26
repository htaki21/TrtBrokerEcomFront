"use client";

import PopoverForm from "@/app/(with-header)/(Particuliers)/assurance-automobile/sections/form/form";
import { CloseIcon } from "@/app/(with-header)/(Particuliers)/assurance-automobile/sections/section3";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import ButtonLink, { ButtonLinkProps } from "../../buttons/ButtonLink";

interface ButtonDialogProps {
  buttonProps: ButtonLinkProps & { href?: string };
}

export function ButtonDialog({ buttonProps }: ButtonDialogProps) {
  const { href, ...rest } = buttonProps;

  if (href) {
    // If href is provided → just render a link button
    return <ButtonLink href={href} {...rest} />;
  }

  // Else → show dialog with trigger
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonLink {...rest} />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="f-col !max-w-[966px] w-full gap-5 p-8 rounded-3xl border-Neutral-BG-2"
      >
        {/* Accessibility labels */}
        <VisuallyHidden.Root>
          <DialogTitle>Form Title</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription>Form Description</DialogDescription>
        </VisuallyHidden.Root>

        <div className="flex items-start justify-between gap-7">
          <div className="f-col gap-2">
            <h3 className="text-Neutral-Dark Headings-H3">
              Obtenez votre carte verte sans sortir.
            </h3>
            <p className="text-Text-Body Text-M">
              Pour envoyer votre demande, veuillez renseigner le formulaire
              ci-dessous :
            </p>
          </div>

          {/* Custom close button */}
          <DialogClose asChild>
            <button
              type="button"
              className="flex p-3 rounded-full hover:bg-Neutral-BG-3 transition-colors cursor-pointer"
              aria-label="Fermer la boîte de dialogue"
            >
              <CloseIcon />
            </button>
          </DialogClose>
        </div>

        <PopoverForm formType="voyage" />
      </DialogContent>
    </Dialog>
  );
}
