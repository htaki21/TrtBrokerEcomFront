import { z } from "zod";

export const formSchema = z.object({
  nomStructure: z.string().min(1, "Le nom de votre structure est requis"),
  ville: z.string().min(1, "La ville est requise"),
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
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "L'adresse email n'est pas valide",
    }),
});

export type FormData = z.infer<typeof formSchema>;
