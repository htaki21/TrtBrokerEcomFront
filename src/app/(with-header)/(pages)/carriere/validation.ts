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

  niveauEtudes: z
    .string()
    .optional() // allow undefined initially
    .refine(
      (val) =>
        val !== undefined &&
        ["primaire", "college", "lycee", "universite", "autre"].includes(val),
      { message: "Le niveau d'études est requis" }
    ),
  anneesExperience: z
    .string()
    .optional()
    .refine(
      (val) =>
        val !== undefined &&
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].includes(val),
      { message: " L’année d’expérience est requise" }
    ),
  fonctionProfil: z
    .string()
    .optional()
    .refine(
      (val) =>
        val !== undefined &&
        ["developer", "designer", "product-manager", "other"].includes(val),
      { message: "La fonction / le profil recherché est requis" }
    ),
  insuranceExperience: z.string(),
  acceptTerms: z.enum(["yes", "no"]).refine((val) => val === "yes", {
    message: "Vous devez accepter les conditions générales d’utilisation.",
  }),
  file: z.unknown().refine((file) => {
    // Skip File validation during server-side rendering
    if (typeof window === "undefined") return true;
    // Only validate File type in browser environment
    return (
      file &&
      typeof file === "object" &&
      "name" in file &&
      "size" in file &&
      "type" in file
    );
  }, "Vous devez déposer un fichier"),
});

export type FormData = z.infer<typeof formSchema>;
