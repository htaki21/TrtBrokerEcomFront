import { z } from "zod";

export const ConnexionSchema = z.object({
  email: z.string().min(1, "Email requis").email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export type ConnexionData = z.infer<typeof ConnexionSchema>;
