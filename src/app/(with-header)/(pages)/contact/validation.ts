import { z } from "zod";

export const formSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  telephone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir 10 chiffres")
    .max(10, "Le numéro de téléphone doit contenir 10 chiffres")
    .regex(
      /^\d{10}$/,
      "Le numéro de téléphone doit contenir uniquement des chiffres"
    ),
  email: z
    .email("L'adresse email n'est pas valide")
    .min(1, "L'adresse email est requise"),
  marketingConsent: z.boolean().optional(),
  acceptTerms: z.enum(["yes", "no"]).refine((val) => val === "yes", {
    message: "Vous devez accepter les conditions générales",
  }),
});

export type FormData = z.infer<typeof formSchema>;
