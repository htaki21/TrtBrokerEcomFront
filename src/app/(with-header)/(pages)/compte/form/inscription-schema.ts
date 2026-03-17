import { z } from "zod";

export const InscriptionSchema = z.object({
  nom: z.string().min(2, "Nom requis"),

  email: z.string().min(1, "Email requis").email("Email invalide"),

  telephone: z
    .string()
    .min(10, "Le numéro doit contenir 10 chiffres")
    .max(10, "Le numéro doit contenir 10 chiffres")
    .regex(/^\d+$/, "Chiffres uniquement")
    .optional()
    .or(z.literal("")),

  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),

  newsletter: z.boolean().default(false).optional(),

  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions",
  }),
});

export type InscriptionData = z.infer<typeof InscriptionSchema>;
