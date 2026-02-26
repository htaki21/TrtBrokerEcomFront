import { logSecurityEvent } from "@/lib/security";
import { withSecurity } from "@/middleware/security";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

// Helper function to map moto type from form to API format
function mapMotoType(
  formType: string,
):
  | "moins_49cc_60kmh"
  | "moins_49cc_plus_60kmh"
  | "entre_50cc_et_125cc"
  | "plus_125cc" {
  switch (formType) {
    case "Moins de 49cc - 60km/h":
      return "moins_49cc_60kmh";
    case "Moins de 49cc - > 60km/h":
      return "moins_49cc_plus_60kmh";
    case "Entre 50cc et 125cc":
      return "entre_50cc_et_125cc";
    case "125cc ou plus":
      return "plus_125cc";
    default:
      return "entre_50cc_et_125cc";
  }
}

async function handleDevisSubmission(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, formData, submitToStrapi, email, firstName, lastName } =
      body;

    // Extract email from the correct location based on form structure
    const clientEmail = email || (formData && formData.email) || "";
    const clientFirstName = firstName || (formData && formData.prenom) || "";
    const clientLastName = lastName || (formData && formData.nom) || "";

    // Check if email is provided and valid (optional now)
    const hasValidEmail = clientEmail && clientEmail.includes("@");

    // Log successful API request
    logSecurityEvent("API_REQUEST_SUCCESS", {
      endpoint: "/api/send-devis",
      formType,
      duration: Date.now(),
      status: 200,
    });

    // Create transporter with Heberjahiz-specific config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
          ? (() => {
              const pass = process.env.SMTP_PASS;
              // Check if it looks like Base64 (only alphanumeric + / + = characters)
              const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(pass);
              if (isBase64) {
                try {
                  // Decode Base64 (for production with special chars)
                  return Buffer.from(pass, "base64").toString("utf-8");
                } catch {
                  // If decoding fails, use as-is
                  return pass;
                }
              }
              // Use password as-is (for local dev with plain password)
              return pass;
            })()
          : undefined,
      },
      // Basic anti-spam configuration
      tls: {
        rejectUnauthorized: false,
      },
      // Rate limiting
      pool: true,
      maxConnections: 3,
      maxMessages: 50,
      rateLimit: 10, // 10 emails per second
    });

    // Load logo attachment
    let logoAttachment = null;
    try {
      const logoPath = path.join(
        process.cwd(),
        "public",
        "logo-trt-broker.png",
      );
      if (fs.existsSync(logoPath)) {
        logoAttachment = {
          filename: "trt-broker-logo.png",
          path: logoPath,
          cid: "trt-broker-logo",
        };
      }
    } catch (logoError) {
      // Logo not found, using text logo
    }

    // Professional email with basic anti-spam headers
    const mailOptions = {
      from: {
        name: process.env.COMPANY_NAME || "Votre Entreprise",
        address: process.env.SMTP_USER || "",
      },
      to: clientEmail,
      subject: `Demande de devis Assurance ${
        formType === "moto"
          ? "Moto"
          : formType === "habitation"
            ? "Habitation"
            : formType === "sante"
              ? "Santé"
              : formType === "assistance-voyage"
                ? "Assistance Voyage"
                : formType === "plaisance-jetski"
                  ? "Plaisance/Jet-ski"
                  : formType === "assurance-professionnelle"
                    ? "Professionnelle"
                    : formType === "assurance-entreprise"
                      ? "Entreprise"
                      : formType === "carte-verte"
                        ? "Carte Verte"
                        : formType === "carte-verte-voyage"
                          ? "Carte Verte Voyage"
                          : formType === "individuelle-accidents"
                            ? "Individuelle Accidents"
                            : "Auto"
      } - Confirmation`,
      priority: "high" as const,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Mailer": "VotreEntreprise-DevisSystem",
        Precedence: "bulk",
        "X-Auto-Response-Suppress": "OOF, AutoReply",
      },
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Devis Assurance Auto</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
          <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #739a38;">
              <div style="margin-bottom: 20px;">
                ${
                  logoAttachment
                    ? `<img src="cid:trt-broker-logo" alt="TRT Broker" style="max-width: 200px; height: auto; margin: 0 auto; display: block;" />`
                    : `<div style="background: linear-gradient(135deg, #739a38 0%, #5a7a2a 100%); color: white; padding: 25px 40px; border-radius: 12px; display: inline-block; text-align: center; box-shadow: 0 4px 8px rgba(115, 154, 56, 0.3); border: 2px solid #5a7a2a;">
                      <div style="font-size: 28px; font-weight: bold; letter-spacing: 3px; margin-bottom: 5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">TRT</div>
                      <div style="font-size: 18px; font-weight: 600; letter-spacing: 2px; opacity: 0.95;">BROKER</div>
                    </div>`
                }
              </div>
              <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 15px;">Devis Assurance ${
                formType === "moto"
                  ? "Moto"
                  : formType === "habitation"
                    ? "Habitation"
                    : formType === "sante"
                      ? "Santé"
                      : formType === "assistance-voyage"
                        ? "Assistance Voyage"
                        : formType === "plaisance-jetski"
                          ? "Plaisance/Jet-ski"
                          : formType === "assurance-professionnelle"
                            ? "Professionnelle"
                            : formType === "assurance-entreprise"
                              ? "Entreprise"
                              : formType === "carte-verte"
                                ? "Carte Verte Auto"
                                : formType === "carte-verte-voyage"
                                  ? "Carte Verte Voyage"
                                  : formType === "individuelle-accidents"
                                    ? "Individuelle Accidents"
                                    : "Auto"
              }</h2>
            </div>

            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #739a38; font-size: 20px; margin-bottom: 15px;">Bonjour ${clientFirstName} ${clientLastName},</h3>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Nous avons bien reçu votre demande de devis pour votre assurance ${
                  formType === "moto"
                    ? "moto"
                    : formType === "habitation"
                      ? "habitation"
                      : formType === "sante"
                        ? "santé"
                        : formType === "assistance-voyage"
                          ? "assistance voyage"
                          : formType === "plaisance-jetski"
                            ? "plaisance/jet-ski"
                            : formType === "assurance-professionnelle"
                              ? "professionnelle"
                              : formType === "assurance-entreprise"
                                ? "entreprise"
                                : formType === "carte-verte"
                                  ? "carte verte auto"
                                  : formType === "carte-verte-voyage"
                                    ? "carte verte voyage"
                                    : formType === "individuelle-accidents"
                                      ? "individuelle accidents"
                                      : "auto"
                } et nous vous remercions de votre confiance.
              </p>
            </div>

            <!-- Summary -->
            <div style="background-color: #f3f4f6; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
              <h4 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">📋 Récapitulatif de votre demande :</h4>
              <ul style="color: #374151; font-size: 16px; line-height: 1.8; padding-left: 20px;">
                ${
                  formType === "moto"
                    ? `
                  <li><strong>Type d'achat :</strong> ${
                    formData.typeAchat || "Non spécifié"
                  }</li>
                  <li><strong>Type de moto :</strong> ${
                    formData.typeMoto || "Non spécifié"
                  }</li>
                  ${
                    formData.typeAchat === "occasion"
                      ? `<li><strong>Âge de la moto :</strong> ${
                          formData.ageMoto || "Non spécifié"
                        }</li>`
                      : ""
                  }
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                    : formType === "habitation"
                      ? `
                  <li><strong>Type de logement :</strong> ${
                    formData.typeLogement || "Non spécifié"
                  }</li>
                  <li><strong>Valeur de l'habitation :</strong> ${
                    formData.valeurHabitation
                      ? formData.valeurHabitation.toLocaleString() + " MAD"
                      : "Non spécifié"
                  }</li>
                  <li><strong>Valeur des biens :</strong> ${
                    formData.valeurBiens
                      ? formData.valeurBiens.toLocaleString() + " MAD"
                      : "Non spécifié"
                  }</li>
                  ${
                    formData.valeurObjets
                      ? `<li><strong>Valeur des objets :</strong> ${formData.valeurObjets.toLocaleString()} MAD</li>`
                      : ""
                  }
                  ${
                    formData.garantiesSupplementaires &&
                    formData.garantiesSupplementaires.length > 0
                      ? `<li><strong>Garanties supplémentaires :</strong> ${formData.garantiesSupplementaires.join(
                          ", ",
                        )}</li>`
                      : ""
                  }
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                      : formType === "sante"
                        ? `
                  <li><strong>Type d'assurance :</strong> ${
                    formData.typeAssurance || "Non spécifié"
                  }</li>
                  <li><strong>Couverture :</strong> ${
                    formData.typeCouverture?.join(", ") || "Non spécifié"
                  }</li>
                  ${
                    formData.dateNaissance
                      ? `<li><strong>Date de naissance :</strong> ${new Date(
                          formData.dateNaissance,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.dateNaissanceConjoint
                      ? `<li><strong>Date de naissance conjoint :</strong> ${new Date(
                          formData.dateNaissanceConjoint,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.dateNaissanceEnfant1
                      ? `<li><strong>Date de naissance enfant 1 :</strong> ${new Date(
                          formData.dateNaissanceEnfant1,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.dateNaissanceEnfant2
                      ? `<li><strong>Date de naissance enfant 2 :</strong> ${new Date(
                          formData.dateNaissanceEnfant2,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.dateNaissanceEnfant3
                      ? `<li><strong>Date de naissance enfant 3 :</strong> ${new Date(
                          formData.dateNaissanceEnfant3,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                        : formType === "assistance-voyage"
                          ? `
                  <li><strong>Type d'assistance :</strong> ${
                    formData.typeAssistance || "Non spécifié"
                  }</li>
                  ${
                    formData.dureeVisa
                      ? `<li><strong>Durée du visa :</strong> ${formData.dureeVisa}</li>`
                      : ""
                  }
                  ${
                    formData.dureeSchengen
                      ? `<li><strong>Durée Schengen :</strong> ${formData.dureeSchengen}</li>`
                      : ""
                  }
                  ${
                    formData.dureeMonde
                      ? `<li><strong>Durée Monde :</strong> ${formData.dureeMonde}</li>`
                      : ""
                  }
                  ${
                    formData.typeCouverture
                      ? `<li><strong>Type de couverture :</strong> ${formData.typeCouverture}</li>`
                      : ""
                  }
                  ${
                    formData.vehiculePersonnel !== undefined
                      ? `<li><strong>Véhicule personnel :</strong> ${
                          formData.vehiculePersonnel ? "Oui" : "Non"
                        }</li>`
                      : ""
                  }
                  <li><strong>Prime :</strong> ${
                    formData.primeAssistance || 350
                  } DH</li>
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                          : formType === "plaisance-jetski"
                            ? `
                  <li><strong>Type de bateau :</strong> ${
                    formData.typeBateau || "Non spécifié"
                  }</li>
                  <li><strong>Garanties de base :</strong> ${
                    formData.garantiesDeBase || "Non spécifiées"
                  }</li>
                  ${
                    formData.garantiesOptionnelles
                      ? `<li><strong>Garanties optionnelles :</strong> ${formData.garantiesOptionnelles}</li>`
                      : ""
                  }
                  ${
                    formData.ficheTechnique
                      ? `<li><strong>Fiche technique :</strong> Fournie</li>`
                      : ""
                  }
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                            : formType === "assurance-professionnelle"
                              ? `
                  <li><strong>Nature d'activité :</strong> ${
                    formData.natureActivite || "Non spécifiée"
                  }</li>
                  <li><strong>Catégories d'assurance :</strong> ${
                    formData.categoriesAssurance?.join(", ") || "Non spécifiées"
                  }</li>
                  <li><strong>Nom de la structure :</strong> ${
                    formData.nomStructure || "Non spécifié"
                  }</li>
                  <li><strong>Ville :</strong> ${
                    formData.ville || "Non spécifiée"
                  }</li>
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                              : formType === "assurance-entreprise"
                                ? `
                  <li><strong>Secteur d'activité :</strong> ${
                    formData.secteurActivite || "Non spécifié"
                  }</li>
                  <li><strong>Catégories d'assurance :</strong> ${
                    formData.categoriesAssurance?.join(", ") || "Non spécifiées"
                  }</li>
                  <li><strong>Nom de la structure :</strong> ${
                    formData.nomStructure || "Non spécifié"
                  }</li>
                  <li><strong>Ville :</strong> ${
                    formData.ville || "Non spécifiée"
                  }</li>
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                                : formType === "carte-verte"
                                  ? `
                  <li><strong>Immatriculation :</strong> ${
                    formData.immatriculationNum1 || ""
                  } ${formData.immatriculationLettre || ""} ${
                    formData.immatriculationNum2 || ""
                  }</li>
                  <li><strong>Date de réception souhaitée :</strong> ${
                    formData.dateReceptionSouhaitee
                      ? new Date(
                          formData.dateReceptionSouhaitee,
                        ).toLocaleDateString("fr-FR")
                      : "Non spécifiée"
                  }</li>
                `
                                  : formType === "carte-verte-voyage"
                                    ? `
                  <li><strong>Immatriculation :</strong> ${
                    formData.immatriculationNum1 || ""
                  } ${formData.immatriculationLettre || ""} ${
                    formData.immatriculationNum2 || ""
                  }</li>
                  <li><strong>Date de réception souhaitée :</strong> ${
                    formData.dateReceptionSouhaitee
                      ? new Date(
                          formData.dateReceptionSouhaitee,
                        ).toLocaleDateString("fr-FR")
                      : "Non spécifiée"
                  }</li>
                `
                                    : formType === "individuelle-accidents"
                                      ? `
                  <li><strong>Formule d'assurance :</strong> ${
                    formData.formuleAssurance || "Non spécifiée"
                  }</li>
                  ${
                    formData.datePreference
                      ? `<li><strong>Date de préférence :</strong> ${new Date(
                          formData.datePreference,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.creneauHoraire
                      ? `<li><strong>Créneau horaire :</strong> ${formData.creneauHoraire}</li>`
                      : ""
                  }
                `
                                      : `
                  <li><strong>Type de voiture :</strong> ${
                    formData.typeDeVoiture || "Non spécifié"
                  }</li>
                  <li><strong>Carburant :</strong> ${
                    formData.carburant || "Non spécifié"
                  }</li>
                  <li><strong>Puissance :</strong> ${
                    formData.chevaux || "Non spécifié"
                  } CV</li>
                  <li><strong>Valeur estimée :</strong> ${
                    formData.valeurEstimee
                      ? formData.valeurEstimee.toLocaleString() + " MAD"
                      : "Non spécifié"
                  }</li>
                  ${
                    formData.typeDeVoiture === "Occasion" &&
                    formData.ageDeVoiture
                      ? `<li><strong>Âge de la voiture :</strong> ${formData.ageDeVoiture}</li>`
                      : ""
                  }
                  ${
                    formData.selectedDate
                      ? `<li><strong>Date sélectionnée :</strong> ${new Date(
                          formData.selectedDate,
                        ).toLocaleDateString("fr-FR")}</li>`
                      : ""
                  }
                  ${
                    formData.selectedTime
                      ? `<li><strong>Heure sélectionnée :</strong> ${formData.selectedTime}</li>`
                      : ""
                  }
                `
                }
              </ul>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #739a38; margin-bottom: 30px;">
              <h4 style="color: #1f2937; font-size: 16px; margin-bottom: 10px;">🚀 Prochaines étapes :</h4>
              <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">
                Notre équipe d'experts va analyser votre demande et vous contacter dans les <strong>24 heures</strong> pour vous proposer les meilleures solutions adaptées à vos besoins et votre budget.
              </p>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
                Une question ? Contactez-nous :
              </p>
              <p style="color: #374151; font-size: 14px; margin: 5px 0;">
                📧 <a href="mailto:contact@trtbroker.com" style="color: #739a38; text-decoration: none;">contact@trtbroker.com</a>
              </p>
              <p style="color: #374151; font-size: 14px; margin: 5px 0;">
                📞 05222-70343
              </p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                TRT Broker - Votre partenaire assurance de confiance
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: logoAttachment ? [logoAttachment] : [],
    };

    // Send email to client only if email is provided
    let info;
    let clientEmailSuccess = false;
    if (hasValidEmail) {
      try {
        info = await transporter.sendMail(mailOptions);
        clientEmailSuccess = true;
      } catch (clientEmailError) {
        console.error("Failed to send client email:", clientEmailError);
        // Don't throw error for client email failure, just log it
        // Create a mock info object for the response
        info = { messageId: `mock-${Date.now()}` };
      }
    } else {
      // No email provided, create mock info object
      info = { messageId: `no-email-${Date.now()}` };
      console.log("No email provided, skipping client email notification");
    }

    // Send copy to all supervisors (without CC to client to prevent duplicates)
    const supervisorEmails = [
      "contact@trtbroker.com",
      "houcine.taki21@gmail.com",
      "ghazzalipro@gmail.com",
      // "moncef.benabdallah@deadline.ma", // Commented out as requested
    ];

    // Add per-form recipients while preserving existing ones
    const perFormRecipients: string[] = [];
    switch (formType) {
      case "auto":
      case "moto":
        perFormRecipients.push("m.anbari@trtbroker.com");
        break;
      case "habitation":
        perFormRecipients.push(
          "i.takouaha@trtbroker.com",
          "d.mounasser@trtbroker.com",
        );
        break;
      case "sante":
      case "individuelle-accidents":
        perFormRecipients.push("k.hanzaz@trtbroker.com");
        break;
      case "assistance-voyage":
        perFormRecipients.push(
          "A.akherraz@trtbroker.com",
          "k.hanzaz@trtbroker.com",
        );
        break;
      case "assurance-entreprise": {
        // Same category-based routing as assurance-professionnelle
        const fd = (formData ?? {}) as Record<string, unknown>;
        const rawCategoriesUnknown = fd["categoriesAssurance"];
        const categories: string[] = Array.isArray(rawCategoriesUnknown)
          ? (rawCategoriesUnknown as unknown[]).filter(
              (v): v is string => typeof v === "string",
            )
          : typeof rawCategoriesUnknown === "string"
            ? rawCategoriesUnknown
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            : [];

        const catTo = new Set<string>();

        // Normalize and match by synonyms (supports labels and slugs)
        const categoriesNormalized = categories.map((c) => c.toLowerCase());
        const hasAny = (synonyms: string[]) =>
          categoriesNormalized.some((c) =>
            synonyms.some((s) => c === s.toLowerCase()),
          );

        // Maladie de Base, Assistance Médicale, Retraite Complémentaire → k.hanzaz
        if (
          hasAny([
            "maladie de base",
            "maladie_base",
            "maladie-base",
            "maladie base",
          ]) ||
          hasAny([
            "assistance médicale",
            "assistance_medicale",
            "assistance-medicale",
            "assistance medicale",
          ]) ||
          hasAny([
            "retraite complémentaire",
            "retraite_complementaire",
            "retraite-complementaire",
            "retraite complementaire",
          ])
        ) {
          catTo.add("k.hanzaz@trtbroker.com");
        }

        // Accident de travail → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "accident de travail",
            "accident_de_travail",
            "accident-de-travail",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // Flotte automobile → m.saoudi + copy d.mounasser
        if (
          hasAny([
            "flotte automobile",
            "flotte_automobile",
            "flotte-automobile",
          ])
        ) {
          catTo.add("m.saoudi@trtbroker.com");
          catTo.add("d.mounasser@trtbroker.com");
        }

        // Multirisques Locaux → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "multirisques locaux",
            "multirisques_locaux",
            "multirisques-locaux",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // RC Dirigeants/Mandataires → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "rc dirigeants/mandataires",
            "rc dirigeants",
            "rc_dirigeants_mandataires",
            "rc-dirigeants-mandataires",
            "rc_dirigeants",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // Transport Marchandises → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "transport marchandises",
            "transport_marchandises",
            "transport-marchandises",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // RC Exploitation → d.mounasser + copy i.takouaha
        if (hasAny(["rc exploitation", "rc_exploitation", "rc-exploitation"])) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // Diagnostic log for mapping
        console.warn("🧭 assurance-entreprise category mapping:", {
          categories,
          categoriesNormalized,
          derivedRecipients: Array.from(catTo),
        });

        perFormRecipients.push(...Array.from(catTo));
        break;
      }
      case "assurance-professionnelle": {
        // Map selected categories to recipients
        const fd = (formData ?? {}) as Record<string, unknown>;
        const rawCategoriesUnknown = fd["categoriesAssurance"];
        const categories: string[] = Array.isArray(rawCategoriesUnknown)
          ? (rawCategoriesUnknown as unknown[]).filter(
              (v): v is string => typeof v === "string",
            )
          : typeof rawCategoriesUnknown === "string"
            ? rawCategoriesUnknown
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            : [];

        const catTo = new Set<string>();

        // Normalize and match by synonyms (supports labels and slugs)
        const categoriesNormalized = categories.map((c) => c.toLowerCase());
        const hasAny = (synonyms: string[]) =>
          categoriesNormalized.some((c) =>
            synonyms.some((s) => c === s.toLowerCase()),
          );

        // Maladie de Base, Assistance Médicale, Retraite Complémentaire → k.hanzaz
        if (
          hasAny([
            "maladie de base",
            "maladie_base",
            "maladie-base",
            "maladie base",
          ]) ||
          hasAny([
            "assistance médicale",
            "assistance_medicale",
            "assistance-medicale",
            "assistance medicale",
          ]) ||
          hasAny([
            "retraite complémentaire",
            "retraite_complementaire",
            "retraite-complementaire",
            "retraite complementaire",
          ])
        ) {
          catTo.add("k.hanzaz@trtbroker.com");
        }

        // Accident de travail → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "accident de travail",
            "accident_de_travail",
            "accident-de-travail",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // Flotte automobile → m.saoudi + copy d.mounasser
        if (
          hasAny([
            "flotte automobile",
            "flotte_automobile",
            "flotte-automobile",
          ])
        ) {
          catTo.add("m.saoudi@trtbroker.com");
          catTo.add("d.mounasser@trtbroker.com");
        }

        // Multirisques Locaux → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "multirisques locaux",
            "multirisques_locaux",
            "multirisques-locaux",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // RC Dirigeants/Mandataires → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "rc dirigeants/mandataires",
            "rc dirigeants",
            "rc_dirigeants_mandataires",
            "rc-dirigeants-mandataires",
            "rc_dirigeants",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // Transport Marchandises → d.mounasser + copy i.takouaha
        if (
          hasAny([
            "transport marchandises",
            "transport_marchandises",
            "transport-marchandises",
          ])
        ) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // RC Exploitation → d.mounasser + copy i.takouaha
        if (hasAny(["rc exploitation", "rc_exploitation", "rc-exploitation"])) {
          catTo.add("d.mounasser@trtbroker.com");
          catTo.add("i.takouaha@trtbroker.com");
        }

        // Diagnostic log for mapping
        console.warn("🧭 assurance-professionnelle category mapping:", {
          categories,
          categoriesNormalized,
          derivedRecipients: Array.from(catTo),
        });

        perFormRecipients.push(...Array.from(catTo));
        break;
      }
      case "plaisance-jetski":
        perFormRecipients.push("m.saoudi@trtbroker.com");
        break;
      default:
        break;
    }

    // Merge and de-duplicate recipients
    const recipients = Array.from(
      new Set([...supervisorEmails, ...perFormRecipients]),
    );

    // Server logs (Node terminal) for auditability
    console.warn("📧 send-devis recipients summary:", {
      formType,
      categoriesSelected:
        formType === "assurance-professionnelle" ||
        formType === "assurance-entreprise"
          ? (() => {
              const fd = (formData ?? {}) as Record<string, unknown>;
              const raw = fd["categoriesAssurance"];
              if (Array.isArray(raw)) return raw;
              if (typeof raw === "string")
                return raw.split(",").map((c) => c.trim());
              return [];
            })()
          : undefined,
      perFormRecipients,
      baseSupervisors: supervisorEmails,
      finalRecipients: recipients,
    });

    // Helper function to generate detailed supervisor/department email HTML
    const generateSupervisorEmailHTML = (
      formType: string,
      formData: Record<string, unknown>,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
    ): string => {
      const formatValue = (val: unknown, fieldKey?: string): string => {
        if (val === null || val === undefined) return "Non spécifié";

        // Handle file/attachment fields (like ficheTechnique)
        if (fieldKey && /fiche|technique|file|attachment/i.test(fieldKey)) {
          if (val === null || val === undefined || val === "") {
            return "Non fournie";
          }
          // If it's a number (file ID) or numeric string (file ID), file was provided
          if (
            typeof val === "number" ||
            (typeof val === "string" && /^\d+$/.test(val))
          ) {
            return "Fournie";
          }
          // If it's a truthy value (like an object), file was provided
          return "Fournie";
        }

        if (typeof val === "boolean") return val ? "Oui" : "Non";
        if (typeof val === "number") {
          // Check if it might be a date (8 digits like 05112025)
          if (
            fieldKey &&
            /date|circulation|naissance|preference|reception/i.test(fieldKey)
          ) {
            const dateStr = String(val);
            if (dateStr.length === 8 && /^\d+$/.test(dateStr)) {
              // Format DDMMYYYY to DD/MM/YYYY
              return `${dateStr.substring(0, 2)}/${dateStr.substring(2, 4)}/${dateStr.substring(4, 8)}`;
            }
          }
          return val.toLocaleString();
        }
        if (Array.isArray(val)) return val.join(", ");
        if (typeof val === "object") return JSON.stringify(val);

        // Check if string looks like a date
        const strVal = String(val);
        if (
          fieldKey &&
          /date|circulation|naissance|preference|reception/i.test(fieldKey)
        ) {
          // Try to parse and format date strings
          // Handle format like "05112025" (DDMMYYYY)
          if (/^\d{8}$/.test(strVal)) {
            return `${strVal.substring(0, 2)}/${strVal.substring(2, 4)}/${strVal.substring(4, 8)}`;
          }
          // Handle format like "0511-2025" or "0511/2025"
          if (/^\d{4}[-/]\d{4}$/.test(strVal)) {
            const parts = strVal.split(/[-/]/);
            return `${parts[0].substring(0, 2)}/${parts[0].substring(2, 4)}/${parts[1]}`;
          }
          // Try parsing ISO date or other formats
          try {
            const date = new Date(strVal);
            if (!isNaN(date.getTime())) {
              return date.toLocaleDateString("fr-FR");
            }
          } catch {
            // If parsing fails, continue with original string
          }
        }

        return strVal;
      };

      const renderFormFields = (): string => {
        // Mapping of English/duplicate fields to French equivalents (prioritize French)
        const fieldPriority: Record<string, string> = {
          // Contact info - prioritize French
          prenom: "Prénom",
          nom: "Nom",
          telephone: "Téléphone",
          email: "Email",
          // Auto/Moto fields - prioritize French
          typeAchat: "Type d'achat",
          typeDeVoiture: "Type de voiture",
          typeMoto: "Type de moto",
          carburant: "Carburant",
          typeCarburant: "Carburant",
          chevaux: "Puissance (CV)",
          puissanceFiscale: "Puissance fiscale (CV)",
          valeurEstimee: "Valeur estimée (MAD)",
          valeurVehicule: "Valeur estimée (MAD)",
          ageDeVoiture: "Âge de la voiture",
          ageVoiture: "Âge de la voiture",
          ageMoto: "Âge de la moto",
          dateMiseEnCirculation: "Date de mise en circulation",
          dateMiseCirculation: "Date de mise en circulation",
          selectedDate: "Date de préférence",
          datePreference: "Date de préférence",
          selectedTime: "Créneau horaire",
          creneauHoraire: "Créneau horaire",
          // Habitation
          typeLogement: "Type de logement",
          valeurHabitation: "Valeur de l'habitation (MAD)",
          valeurBiens: "Valeur des biens (MAD)",
          valeurObjets: "Valeur des objets (MAD)",
          garantiesSupplementaires: "Garanties supplémentaires",
          // Santé
          typeAssurance: "Type d'assurance",
          typeCouverture: "Couverture",
          dateNaissance: "Date de naissance",
          dateNaissanceConjoint: "Date de naissance conjoint",
          dateNaissanceEnfant1: "Date de naissance enfant 1",
          dateNaissanceEnfant2: "Date de naissance enfant 2",
          dateNaissanceEnfant3: "Date de naissance enfant 3",
          // Assistance Voyage
          typeAssistance: "Type d'assistance",
          dureeVisa: "Durée du visa",
          dureeSchengen: "Durée Schengen",
          dureeMonde: "Durée Monde",
          vehiculePersonnel: "Véhicule personnel",
          primeAssistance: "Prime (DH)",
          // Plaisance
          typeBateau: "Type de bateau",
          garantiesDeBase: "Garanties de base",
          garantiesOptionnelles: "Garanties optionnelles",
          ficheTechnique: "Fiche technique",
          // Professionnelle/Entreprise
          natureActivite: "Nature d'activité",
          secteurActivite: "Secteur d'activité",
          categoriesAssurance: "Catégories d'assurance",
          nomStructure: "Nom de la structure",
          ville: "Ville",
          // Carte Verte
          immatriculationNum1: "Immatriculation (n°1)",
          immatriculationLettre: "Immatriculation (lettre)",
          immatriculationNum2: "Immatriculation (n°2)",
          dateReceptionSouhaitee: "Date de réception souhaitée",
          // Individuelle Accidents
          formuleAssurance: "Formule d'assurance",
          // Common fields
          conditionsAcceptees: "Conditions acceptées",
          termsAccepted: "Conditions acceptées",
          optinMarketing: "Consentement marketing",
          marketingConsent: "Consentement marketing",
          notes: "Notes",
          source: "Source",
        };

        // Fields to exclude (English duplicates that have French equivalents)
        const excludeFields = [
          "firstName",
          "firstname",
          "lastName",
          "lastname",
          "phone",
          "Phone",
        ];

        // Mapping of English field names to French equivalents for deduplication
        const englishToFrench: Record<string, string> = {
          firstName: "prenom",
          firstname: "prenom",
          lastName: "nom",
          lastname: "nom",
          phone: "telephone",
          Phone: "telephone",
          typeDeVoiture: "typeAchat", // Prioritize typeAchat if both exist
          chevaux: "puissanceFiscale", // Prioritize puissanceFiscale
          valeurEstimee: "valeurVehicule", // Prioritize valeurVehicule
          ageDeVoiture: "ageVoiture",
          dateMiseEnCirculation: "dateMiseCirculation",
          selectedDate: "datePreference",
          selectedTime: "creneauHoraire",
          termsAccepted: "conditionsAcceptees",
          marketingConsent: "optinMarketing",
          typeCarburant: "carburant", // Prioritize carburant if both exist
        };

        // Process and deduplicate fields
        const processedFields = new Map<
          string,
          { label: string; value: unknown; originalKey: string }
        >();

        for (const [key, value] of Object.entries(formData)) {
          // Skip excluded fields and empty values
          if (
            excludeFields.includes(key) ||
            value === null ||
            value === undefined ||
            value === ""
          ) {
            continue;
          }

          const lowerKey = key.toLowerCase();

          // Check if this is an English field that should be replaced by French
          const frenchEquivalent =
            englishToFrench[key] || englishToFrench[lowerKey];
          if (frenchEquivalent && formData[frenchEquivalent]) {
            continue; // Skip English version if French exists
          }

          // Check if this French field already has an English duplicate that we should skip
          const isEnglishDuplicate = Object.entries(englishToFrench).some(
            ([eng, fr]) => fr === lowerKey && formData[eng],
          );
          if (isEnglishDuplicate) {
            // This is the French version, keep it
          }

          // Get French label
          const frenchLabel =
            fieldPriority[lowerKey] ||
            fieldPriority[key] ||
            key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
              .trim();

          // Use a normalized key for deduplication (handle variations)
          let normalizedKey = lowerKey;

          // Handle known duplicates
          if (frenchEquivalent) {
            normalizedKey = frenchEquivalent.toLowerCase();
          } else {
            // Check reverse mapping
            const foundMapping = Object.entries(englishToFrench).find(
              ([, fr]) => fr.toLowerCase() === lowerKey,
            );
            if (foundMapping) {
              normalizedKey = lowerKey;
            }
          }

          // Only add if not already processed, or if this is the French version
          if (!processedFields.has(normalizedKey)) {
            processedFields.set(normalizedKey, {
              label: frenchLabel,
              value,
              originalKey: key,
            });
          }
        }

        let fieldsHTML = "";
        for (const { label, value, originalKey } of processedFields.values()) {
          fieldsHTML += `<tr><td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 200px;">${label}</td><td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${formatValue(value, originalKey)}</td></tr>`;
        }

        return (
          fieldsHTML ||
          "<tr><td colspan='2' style='padding: 12px; color: #6b7280;'>Aucune donnée supplémentaire</td></tr>"
        );
      };

      return `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle Demande Devis - TRT Broker</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8f9fa;">
          <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #739a38;">
              <div style="margin-bottom: 20px;">
                ${
                  logoAttachment
                    ? `<img src="cid:trt-broker-logo" alt="TRT Broker" style="max-width: 200px; height: auto; margin: 0 auto; display: block;" />`
                    : `<div style="background: linear-gradient(135deg, #739a38 0%, #5a7a2a 100%); color: white; padding: 25px 40px; border-radius: 12px; display: inline-block; text-align: center; box-shadow: 0 4px 8px rgba(115, 154, 56, 0.3); border: 2px solid #5a7a2a;">
                      <div style="font-size: 28px; font-weight: bold; letter-spacing: 3px; margin-bottom: 5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">TRT</div>
                      <div style="font-size: 18px; font-weight: 600; letter-spacing: 2px; opacity: 0.95;">BROKER</div>
                    </div>`
                }
              </div>
              <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 10px;">Nouvelle Demande de Devis</h2>
              <p style="color: #739a38; font-size: 16px; font-weight: 600; margin: 0;">
                ${
                  formType === "moto"
                    ? "Assurance Moto"
                    : formType === "habitation"
                      ? "Assurance Habitation"
                      : formType === "sante"
                        ? "Assurance Santé"
                        : formType === "assistance-voyage"
                          ? "Assistance Voyage"
                          : formType === "plaisance-jetski"
                            ? "Plaisance/Jet-ski"
                            : formType === "assurance-professionnelle"
                              ? "Assurance Professionnelle"
                              : formType === "assurance-entreprise"
                                ? "Assurance Entreprise"
                                : formType === "carte-verte"
                                  ? "Carte Verte Auto"
                                  : formType === "carte-verte-voyage"
                                    ? "Carte Verte Voyage"
                                    : formType === "individuelle-accidents"
                                      ? "Individuelle Accidents"
                                      : "Assurance Auto"
                }
              </p>
            </div>

            <!-- Client Information -->
            <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #739a38; margin-bottom: 30px;">
              <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 20px; margin-top: 0;">👤 Informations du Client</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Nom complet :</td>
                  <td style="padding: 8px 0; color: #1f2937;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email :</td>
                  <td style="padding: 8px 0; color: #1f2937;">${email || "Non fourni"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #374151;">Téléphone :</td>
                  <td style="padding: 8px 0; color: #1f2937;">${phone || "Non fourni"}</td>
                </tr>
              </table>
            </div>

            ${
              !email || !email.includes("@")
                ? `<!-- Email Warning -->
            <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444; margin-bottom: 30px;">
              <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6;">
                <strong>⚠️ Important :</strong> Ce client <strong>n'a pas fourni d'adresse email</strong>. Veuillez le contacter uniquement par téléphone au numéro indiqué ci-dessus.
              </p>
            </div>`
                : ""
            }

            <!-- Form Data -->
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 30px; overflow: hidden;">
              <div style="background-color: #739a38; padding: 16px; color: white;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 600;">📋 Détails de la Demande</h3>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                ${renderFormFields()}
              </table>
            </div>

            <!-- Action Required -->
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 30px;">
              <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                <strong>⚡ Action requise :</strong> Ce client nécessite un suivi dans les <strong>24 heures</strong>. Veuillez le contacter au plus vite.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                TRT Broker - Système de gestion des devis
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    };

    // Extract phone from formData
    const clientPhone =
      (formData && (formData as Record<string, unknown>).telephone) ||
      (formData && (formData as Record<string, unknown>).phone) ||
      "Non fourni";

    for (const supervisorEmail of recipients) {
      try {
        const supervisorMailOptions = {
          from: {
            name: process.env.COMPANY_NAME || "TRT Broker",
            address: process.env.SMTP_USER || "",
          },
          to: supervisorEmail,
          subject: `Demande de devis Assurance ${
            formType === "moto"
              ? "Moto"
              : formType === "habitation"
                ? "Habitation"
                : formType === "sante"
                  ? "Santé"
                  : formType === "assistance-voyage"
                    ? "Assistance Voyage"
                    : formType === "plaisance-jetski"
                      ? "Plaisance/Jet-ski"
                      : formType === "assurance-professionnelle"
                        ? "Professionnelle"
                        : formType === "assurance-entreprise"
                          ? "Entreprise"
                          : formType === "carte-verte"
                            ? "Carte Verte"
                            : formType === "carte-verte-voyage"
                              ? "Carte Verte Voyage"
                              : formType === "individuelle-accidents"
                                ? "Individuelle Accidents"
                                : "Auto"
          } - Confirmation${hasValidEmail ? "" : " (Pas d'email client)"}`,
          priority: "high" as const,
          headers: {
            "X-Priority": "1",
            "X-MSMail-Priority": "High",
            Importance: "high",
          },
          html: generateSupervisorEmailHTML(
            formType,
            formData || {},
            clientFirstName,
            clientLastName,
            clientEmail,
            String(clientPhone),
          ),
          attachments: logoAttachment ? [logoAttachment] : [],
        };

        const sendInfo = await transporter.sendMail(supervisorMailOptions);
        console.warn(
          `✅ Email sent to ${supervisorEmail} | accepted: ${JSON.stringify(
            sendInfo.accepted,
          )} | rejected: ${JSON.stringify(sendInfo.rejected)} | response: ${
            sendInfo.response
          }`,
        );
      } catch (supervisorError) {
        console.error(
          `Failed to send email to supervisor ${supervisorEmail}:`,
          supervisorError,
        );
        // Don't throw error for supervisor email failure, just log it
      }
    }

    // Submit to Strapi if requested
    let strapiResult = { success: false, message: "Not submitted to Strapi" };
    if (submitToStrapi) {
      try {
        // Use the correct endpoint based on form type
        let endpoint = "";
        if (formType === "moto") {
          endpoint = "assurance-moto-leads/submit"; // Use submit endpoint for moto
        } else if (formType === "habitation") {
          endpoint = "assurance-habitation-leads"; // Use original habitation endpoint
        } else if (formType === "sante") {
          endpoint = "assurance-sante-leads/submit"; // Use submit endpoint for sante
        } else if (formType === "assistance-voyage") {
          endpoint = "assistance-voyage-leads/submit"; // Use submit endpoint for assistance-voyage
        } else if (formType === "plaisance-jetski") {
          endpoint = "plaisance-jetski-leads/submit"; // Use submit endpoint for plaisance-jetski
        } else if (formType === "assurance-professionnelle") {
          endpoint = "assurance-professionnelle-leads"; // Try submit endpoint as per API docs
        } else if (formType === "assurance-entreprise") {
          endpoint = "assurance-entreprise-leads"; // Use standard endpoint for assurance-entreprise
        } else if (formType === "carte-verte") {
          endpoint = "carte-verte-auto-leads"; // Use standard endpoint for carte-verte
        } else if (formType === "carte-verte-voyage") {
          endpoint = "carte-verte-voyage-leads"; // Use standard endpoint for carte-verte-voyage
        } else if (formType === "individuelle-accidents") {
          endpoint = "assurance-individuelle-accidents-leads/submit"; // Use submit endpoint for individuelle-accidents
        } else {
          endpoint = "assurance-auto-leads";
        }

        const strapiBaseUrl =
          process.env.STRAPI_INTERNAL_URL ||
          process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const strapiUrl = `${strapiBaseUrl}/api/${endpoint}`;

        // Transform form data to match Strapi API structure - ORIGINAL WORKING VERSIONS
        let strapiPayload;

        if (formType === "habitation") {
          // Use habitation endpoint structure
          strapiPayload = {
            data: {
              prenom: formData.prenom || formData.firstName,
              nom: formData.nom || formData.lastName,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              telephone: formData.telephone || formData.phone,
              typeLogement: formData.typeLogement,
              valeurHabitation: formData.valeurHabitation,
              valeurBiens: formData.valeurBiens || 0,
              valeurObjets: formData.valeurObjets || 0,
              garantiesSupplementaires: Array.isArray(
                formData.garantiesSupplementaires,
              )
                ? formData.garantiesSupplementaires
                : [],
              notes: formData.notes || "",
              conditionsAcceptees:
                formData.conditionsAcceptees || formData.termsAccepted,
              optinMarketing:
                formData.optinMarketing || formData.marketingConsent,
              source: formData.source || "website",
            },
          };
        } else if (formType === "sante") {
          // Use sante endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              prenom: formData.prenom || formData.firstName,
              nom: formData.nom || formData.lastName,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              telephone: formData.telephone || formData.phone,
              typeAssurance: formData.typeAssurance,
              typeCouverture: formData.typeCouverture || [],
              dateNaissance: formData.dateNaissance
                ? new Date(formData.dateNaissance).toISOString().split("T")[0]
                : undefined,
              dateNaissanceConjoint: formData.dateNaissanceConjoint
                ? new Date(formData.dateNaissanceConjoint)
                    .toISOString()
                    .split("T")[0]
                : undefined,
              dateNaissanceEnfant1: formData.dateNaissanceEnfant1
                ? new Date(formData.dateNaissanceEnfant1)
                    .toISOString()
                    .split("T")[0]
                : undefined,
              dateNaissanceEnfant2: formData.dateNaissanceEnfant2
                ? new Date(formData.dateNaissanceEnfant2)
                    .toISOString()
                    .split("T")[0]
                : undefined,
              dateNaissanceEnfant3: formData.dateNaissanceEnfant3
                ? new Date(formData.dateNaissanceEnfant3)
                    .toISOString()
                    .split("T")[0]
                : undefined,
              notes: formData.notes || undefined,
              conditionsAcceptees:
                formData.conditionsAcceptees || formData.termsAccepted,
              optinMarketing:
                formData.optinMarketing || formData.marketingConsent || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "assistance-voyage") {
          // Use assistance-voyage endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              prenom: formData.prenom || formData.firstName,
              nom: formData.nom || formData.lastName,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              telephone: formData.telephone || formData.phone,
              typeAssistance: formData.typeAssistance,
              dureeVisa: formData.dureeVisa || undefined,
              dureeSchengen: formData.dureeSchengen || undefined,
              dureeMonde: formData.dureeMonde || undefined,
              typeCouverture: formData.typeCouverture || undefined,
              vehiculePersonnel: formData.vehiculePersonnel || undefined,
              primeAssistance: formData.primeAssistance || 350,
              notes: formData.notes || undefined,
              conditionsAcceptees:
                formData.conditionsAcceptees || formData.termsAccepted,
              optinMarketing:
                formData.optinMarketing || formData.marketingConsent || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "plaisance-jetski") {
          // Use plaisance-jetski endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              prenom: formData.prenom || formData.firstName,
              nom: formData.nom || formData.lastName,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              telephone: formData.telephone || formData.phone,
              typeBateau: formData.typeBateau,
              garantiesDeBase: formData.garantiesDeBase,
              garantiesOptionnelles: formData.garantiesOptionnelles,
              ...(formData.ficheTechnique && {
                ficheTechnique: formData.ficheTechnique,
              }),
              notes: formData.notes || undefined,
              conditionsAcceptees:
                formData.conditionsAcceptees || formData.termsAccepted,
              optinMarketing:
                formData.optinMarketing || formData.marketingConsent || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "assurance-professionnelle") {
          // Use assurance-professionnelle endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              natureActivite: formData.natureActivite || "artisan",
              categoriesAssurance: (
                formData.categoriesAssurance || ["multirisques_locaux"]
              ).join(", "),
              nomStructure: formData.nomStructure || "Non spécifié",
              ville: formData.ville || "Non spécifiée",
              nom: formData.nom || formData.lastName || "Non spécifié",
              prenom: formData.prenom || formData.firstName || "Non spécifié",
              telephone: formData.telephone || formData.phone || "0000000000",
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              conditions: true,
              optMarketing:
                formData.optinMarketing || formData.marketingConsent || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "assurance-entreprise") {
          // Use assurance-entreprise endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              secteurActivite: formData.secteurActivite || "btp",
              categoriesAssurance: (
                formData.categoriesAssurance || ["multirisques_locaux"]
              ).join(", "),
              nomStructure: formData.nomStructure || "Non spécifié",
              ville: formData.ville || "Non spécifiée",
              nom: formData.nom || formData.lastName || "Non spécifié",
              prenom: formData.prenom || formData.firstName || "Non spécifié",
              telephone: formData.telephone || formData.phone || "0000000000",
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              conditions: true,
              optMarketing:
                formData.optinMarketing || formData.marketingConsent || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "carte-verte") {
          // Use carte-verte endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              immatriculationNum1: formData.immatriculationNum1,
              immatriculationLettre: formData.immatriculationLettre,
              immatriculationNum2: formData.immatriculationNum2,
              dateReceptionSouhaitee: formData.dateReceptionSouhaitee,
              nom: formData.nom,
              prenom: formData.prenom,
              telephone: formData.telephone,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              optinMarketing: formData.optinMarketing || false,
              conditionsAcceptees: formData.conditionsAcceptees || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "carte-verte-voyage") {
          // Use carte-verte-voyage endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              immatriculationNum1: formData.immatriculationNum1,
              immatriculationLettre: formData.immatriculationLettre,
              immatriculationNum2: formData.immatriculationNum2,
              dateReceptionSouhaitee: formData.dateReceptionSouhaitee,
              nom: formData.nom,
              prenom: formData.prenom,
              telephone: formData.telephone,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              optinMarketing: formData.optinMarketing || false,
              conditionsAcceptees: formData.conditionsAcceptees || false,
              source: formData.source || "website",
            },
          };
        } else if (formType === "individuelle-accidents") {
          // Use individuelle-accidents endpoint structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              formuleAssurance: formData.formuleAssurance,
              prenom: formData.prenom,
              nom: formData.nom,
              telephone: formData.telephone,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              optinMarketing: formData.optinMarketing || false,
              conditionsAcceptees: formData.conditionsAcceptees || false,
              ipAddress: formData.ipAddress || "127.0.0.1",
              userAgent: formData.userAgent || "Unknown",
              source: formData.source || "website",
              notes: formData.notes || "",
              ...(formData.datePreference && {
                datePreference: formData.datePreference,
              }),
              ...(formData.creneauHoraire && {
                creneauHoraire: formData.creneauHoraire,
              }),
              ...(formData.dateReception && {
                dateReception: formData.dateReception,
              }),
            },
          };
        } else {
          // Auto/Moto payload structure - ORIGINAL WORKING VERSION
          strapiPayload = {
            data: {
              prenom: formData.prenom || formData.firstName,
              nom: formData.nom || formData.lastName,
              ...(formData.email && formData.email.trim()
                ? { email: formData.email }
                : {}),
              telephone: formData.telephone || formData.phone,
              ...(formType === "moto"
                ? {
                    typeAchat: formData.typeAchat,
                    typeMoto: formData.typeMoto,
                    ageMoto: formData.ageMoto,
                    datePreference: formData.datePreference,
                    creneauHoraire: formData.creneauHoraire,
                  }
                : {
                    // Auto form fields matching Strapi schema exactly
                    typeAchat:
                      formData.typeAchat ||
                      (formData.typeDeVoiture === "Nouvel Achat"
                        ? "nouvel_achat"
                        : "occasion"),
                    typeCarburant:
                      formData.typeCarburant ||
                      (formData.carburant?.toLowerCase() === "électrique"
                        ? "electrique"
                        : formData.carburant?.toLowerCase()) ||
                      "essence",
                    puissanceFiscale: Math.max(
                      4,
                      Math.min(
                        formData.puissanceFiscale || formData.chevaux || 4,
                        30,
                      ),
                    ), // Ensure between 4-30
                    // Convert date to DD/MM/YYYY format (exactly 10 characters with slashes)
                    dateMiseCirculation: (() => {
                      const dateStr =
                        formData.dateMiseCirculation ||
                        formData.dateMiseEnCirculation;

                      if (!dateStr) {
                        return new Date().toLocaleDateString("fr-FR");
                      }

                      // If already in DD/MM/YYYY format, return as is
                      if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                        return dateStr;
                      }

                      // If in YYYY-MM-DD format, convert to DD/MM/YYYY
                      if (dateStr.includes("-")) {
                        const [year, month, day] = dateStr.split("-");
                        return `${day}/${month}/${year}`;
                      }

                      // Default fallback
                      return new Date().toLocaleDateString("fr-FR");
                    })(),
                    valeurVehicule: (() => {
                      const value =
                        formData.valeurVehicule ||
                        formData.valeurEstimee ||
                        "0";
                      // Remove any non-numeric characters except decimal point
                      const cleanValue = String(value).replace(/[^\d.]/g, "");
                      return parseFloat(cleanValue) || 0;
                    })(),
                    // Only include ageVoiture for "Occasion" type
                    ...(formData.typeDeVoiture === "Occasion" && {
                      ageVoiture:
                        formData.ageVoiture ||
                        (formData.ageDeVoiture === "Moins de 5 ans"
                          ? "moins_5_ans"
                          : "plus_5_ans"),
                    }),
                    // Convert selectedDate to datePreference (ISO date format)
                    ...(formData.selectedDate && {
                      datePreference: formData.selectedDate,
                    }),
                    ...(formData.selectedTime && {
                      creneauHoraire: formData.selectedTime,
                    }),
                    // Add required fields
                    status: "soumis",
                    submittedAt: new Date().toISOString(),
                    // Add security fields
                    ipAddress: "127.0.0.1", // Default for now
                    userAgent: "Website Form",
                  }),
              conditionsAcceptees:
                formData.conditionsAcceptees || formData.termsAccepted || false,
              optinMarketing:
                formData.optinMarketing || formData.marketingConsent || false,
              source: formData.source || "website",
            },
          };
        }

        // Making Strapi request
        console.log("🔗 Submitting to Strapi:", {
          url: strapiUrl,
          formType,
          payload: JSON.stringify(strapiPayload, null, 2),
        });

        const strapiResponse = await fetch(strapiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify(strapiPayload),
        });

        console.log("📊 Strapi Response Status:", strapiResponse.status);

        if (strapiResponse.ok) {
          const strapiData = await strapiResponse.json();
          strapiResult = { success: true, message: "Data saved to Strapi" };
        } else {
          const errorData = await strapiResponse.json();

          logSecurityEvent(
            "STRAPI_SUBMISSION_FAILED",
            {
              status: strapiResponse.status,
              error: errorData,
              formType,
            },
            request,
          );

          strapiResult = {
            success: false,
            message: `Strapi error: ${strapiResponse.status} - ${JSON.stringify(
              errorData,
            )}`,
          };
        }
      } catch (strapiError) {
        strapiResult = {
          success: false,
          message: `Strapi submission failed: ${
            strapiError instanceof Error ? strapiError.message : "Unknown error"
          }`,
        };
      }
    }

    return NextResponse.json(
      {
        success: true,
        messageId: info.messageId,
        strapiResult,
        clientEmailSuccess,
        devisNumber: `DEV-${Date.now()}`,
        message: hasValidEmail
          ? clientEmailSuccess
            ? "Votre demande a été transmise avec succès. Notre équipe vous contactera dans les plus brefs délais."
            : "Votre demande a été enregistrée mais l'email de confirmation n'a pas pu être envoyé. Notre équipe vous contactera directement dans les plus brefs délais."
          : "Votre demande a été enregistrée avec succès. Notre équipe vous contactera par téléphone dans les plus brefs délais.",
      },
      { status: 200 },
    );
  } catch (error) {
    logSecurityEvent("API_REQUEST_ERROR", {
      endpoint: "/api/send-devis",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });

    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de l'email" },
      { status: 500 },
    );
  }
}

// Export the security-wrapped handler
export const POST = withSecurity(handleDevisSubmission, "/api/send-devis");
