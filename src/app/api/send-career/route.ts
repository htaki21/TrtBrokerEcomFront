import {
  logSecurityEvent,
  sanitizeInput,
  validateFileUpload,
} from "@/lib/security";
import { withSecurity } from "@/middleware/security";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

// Email configuration will be created inside the function

async function handleCareerSubmission(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prenom,
      nom,
      telephone,
      email,
      niveauEtudes,
      anneesExperience,
      fonctionProfil,
      insuranceExperience,
      file,
      acceptTerms,
    } = body;

    // Validate required fields
    if (
      !prenom ||
      !nom ||
      !telephone ||
      !email ||
      !niveauEtudes ||
      !anneesExperience ||
      !fonctionProfil ||
      !insuranceExperience ||
      !file ||
      acceptTerms !== "yes"
    ) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Validate phone format (10 digits as per form validation)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(telephone)) {
      return NextResponse.json(
        { error: "Le numéro de téléphone doit contenir 10 chiffres" },
        { status: 400 }
      );
    }

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
      tls: {
        rejectUnauthorized: false, // sometimes required with Exim
      },
      // Rate limiting
      pool: true,
      maxConnections: 3,
      maxMessages: 50,
      rateLimit: 10, // 10 emails per second
    });

    // Read the logo file for CID embedding
    let logoAttachment = null;
    try {
      const logoPath = path.join(
        process.cwd(),
        "public",
        "logo-trt-broker.png"
      );
      const logoBuffer = fs.readFileSync(logoPath);
      logoAttachment = {
        filename: "logo-trt-broker.png",
        content: logoBuffer,
        cid: "logo",
        contentType: "image/png",
      };
    } catch {
      // Logo file not found, using CSS fallback
    }

    // Process file attachment if provided
    let fileAttachment = null;
    if (file) {
      try {
        let fileBuffer: Buffer;
        let fileName: string;
        let contentType: string;

        // Handle different file formats
        if (file.base64 && file.name) {
          // File sent as base64 (from form conversion)
          fileBuffer = Buffer.from(file.base64, "base64");
          fileName = sanitizeInput(file.name);
          contentType = file.type || "application/octet-stream";

          // Additional file validation
          const fileValidation = validateFileUpload({
            name: fileName,
            size: fileBuffer.length,
            type: contentType,
          });

          if (!fileValidation.isValid) {
            logSecurityEvent(
              "INVALID_FILE_UPLOAD",
              {
                filename: fileName,
                size: fileBuffer.length,
                type: contentType,
                error: fileValidation.error,
              },
              request
            );

            return NextResponse.json(
              { error: fileValidation.error || "Fichier invalide" },
              { status: 400 }
            );
          }
        } else if (file.name && file.size && file.type) {
          // File object - need to convert to base64 first
          // This shouldn't happen in our current setup, but handle it gracefully
          return NextResponse.json(
            { error: "Format de fichier non supporté. Veuillez réessayer." },
            { status: 400 }
          );
        } else {
          logSecurityEvent(
            "MALFORMED_FILE_UPLOAD",
            {
              fileData: file,
            },
            request
          );

          return NextResponse.json(
            { error: "Format de fichier invalide. Veuillez réessayer." },
            { status: 400 }
          );
        }

        fileAttachment = {
          filename: fileName,
          content: fileBuffer,
          contentType: contentType,
        };
      } catch (error) {
        logSecurityEvent(
          "FILE_PROCESSING_ERROR",
          {
            error: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined,
          },
          request
        );

        return NextResponse.json(
          {
            error: "Erreur lors du traitement du fichier. Veuillez réessayer.",
          },
          { status: 400 }
        );
      }
    }

    // Create enterprise-level email content
    const emailContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle Candidature - TRT Broker</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
      </head>
      <body style="margin: 0; padding: 0; background-color: #f7f9f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        
        <!-- Email Wrapper -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f9f6;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              
              <!-- Main Container -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                
                <!-- Header Section -->
                <tr>
                  <td style="background: linear-gradient(90deg, #739a38 0%, #5a7a2c 100%); padding: 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 32px 40px; text-align: left;">
                          <!-- Logo and Title Row -->
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="100" valign="middle">
                                <img src="cid:logo" alt="TRT Broker" width="80" height="48" style="display: block; border: 0; outline: none; border-radius: 10px; background: white; padding: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);" />
                              </td>
                              <td valign="middle" style="padding-left: 16px;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                                  TRT Broker
                                </h1>
                                <p style="margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.85); font-weight: 400;">
                                  Nouvelle candidature reçue
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Priority Badge -->
                <tr>
                  <td style="padding: 24px 40px 0 40px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color: #dbeafe; border-radius: 6px; border-left: 4px solid #3b82f6;">
                      <tr>
                        <td style="padding: 12px 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td valign="middle" style="font-size: 14px; color: #1e40af; font-weight: 600;">
                                🎯 Nouvelle candidature à examiner
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Candidate Information Section -->
                <tr>
                  <td style="padding: 32px 40px;">
                    
                    <!-- Section Title -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td style="border-bottom: 2px solid #739a38; padding-bottom: 8px;">
                          <h2 style="margin: 0; font-size: 16px; font-weight: 600; color: #739a38; text-transform: uppercase; letter-spacing: 0.5px;">
                            Informations du Candidat
                          </h2>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Candidate Details Grid -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafbf9; border-radius: 6px; border: 1px solid #e8ebe4;">
                      
                      <!-- Name -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e8ebe4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Nom Complet
                              </td>
                              <td style="font-size: 15px; color: #1a1a1a; font-weight: 600;">
                                ${prenom} ${nom}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Email -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e8ebe4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Adresse Email
                              </td>
                              <td style="font-size: 15px; color: #1a1a1a; font-weight: 500;">
                                <a href="mailto:${email}" style="color: #739a38; text-decoration: none; font-weight: 600;">
                                  ${email}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Phone -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e8ebe4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Téléphone
                              </td>
                              <td style="font-size: 15px; color: #1a1a1a; font-weight: 600;">
                                <a href="tel:${telephone}" style="color: #739a38; text-decoration: none; font-weight: 600;">
                                  ${telephone}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Education Level -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e8ebe4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Niveau d'études
                              </td>
                              <td style="font-size: 15px; color: #1a1a1a; font-weight: 600;">
                                ${
                                  niveauEtudes === "primaire"
                                    ? "Primaire"
                                    : niveauEtudes === "college"
                                      ? "Collège"
                                      : niveauEtudes === "lycee"
                                        ? "Lycée"
                                        : niveauEtudes === "universite"
                                          ? "Université"
                                          : niveauEtudes === "autre"
                                            ? "Autre"
                                            : niveauEtudes
                                }
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Experience Years -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e8ebe4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Années d'expérience
                              </td>
                              <td style="font-size: 15px; color: #1a1a1a; font-weight: 600;">
                                ${anneesExperience} ${anneesExperience === "1" ? "année" : "années"}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Function/Profile -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e8ebe4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Fonction recherchée
                              </td>
                              <td style="font-size: 15px; color: #1a1a1a; font-weight: 600;">
                                ${
                                  fonctionProfil === "developer"
                                    ? "Développeur"
                                    : fonctionProfil === "designer"
                                      ? "Designer"
                                      : fonctionProfil === "product-manager"
                                        ? "Chef de projet"
                                        : fonctionProfil === "other"
                                          ? "Autre"
                                          : fonctionProfil
                                }
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Insurance Experience -->
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Expérience assurance
                              </td>
                              <td>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="background-color: ${insuranceExperience === "yes" ? "#dcfce7" : "#fef3c7"}; border: 1px solid ${insuranceExperience === "yes" ? "#bbf7d0" : "#fed7aa"}; border-radius: 4px; padding: 6px 12px;">
                                      <span style="font-size: 13px; color: ${insuranceExperience === "yes" ? "#15803d" : "#d97706"}; font-weight: 600;">
                                        ${insuranceExperience === "yes" ? "✓ Expérience en assurance" : "⚠ Pas d'expérience en assurance"}
                                      </span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Action Buttons -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 32px;">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <!-- Primary CTA -->
                              <td style="padding-right: 12px;">
                                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(90deg, #739a38 0%, #5a7a2c 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(115, 154, 56, 0.2);">
                                  Répondre au candidat
                                </a>
                              </td>
                              <!-- Secondary CTA -->
                              <td>
                                <a href="tel:${telephone}" style="display: inline-block; background: #ffffff; color: #739a38; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; border: 2px solid #739a38;">
                                  Appeler le candidat
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
                
                <!-- Metadata Section -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                            <strong>Source:</strong> Formulaire de candidature - Site Web TRT Broker
                          </p>
                          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                            <strong>Date de réception:</strong> ${new Date().toLocaleString(
                              "fr-FR",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          ${fileAttachment ? `<p style="margin: 0; font-size: 12px; color: #6b7280;"><strong>CV joint:</strong> ${fileAttachment.filename}</p>` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #9ca3af;">
                      © ${new Date().getFullYear()} TRT Broker. Tous droits réservés.
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                      Cet email contient des informations confidentielles destinées uniquement au personnel autorisé.
                    </p>
                  </td>
                </tr>
                
              </table>
              <!-- End Main Container -->
              
            </td>
          </tr>
        </table>
        <!-- End Email Wrapper -->
        
      </body>
      </html>
    `;

    // Email options - Send to main contact and supervisors
    const mailOptions = {
      from: `"TRT Broker Candidature" <${process.env.SMTP_USER}>`,
      to: "contact@trtbroker.com",
      subject: `[NOUVELLE CANDIDATURE] ${prenom} ${nom} - TRT Broker`,
      html: emailContent,
      attachments: [
        ...(logoAttachment ? [logoAttachment] : []),
        ...(fileAttachment ? [fileAttachment] : []),
      ],
    };

    // Send email to main contact
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      logSecurityEvent(
        "EMAIL_SEND_FAILED",
        {
          error:
            emailError instanceof Error ? emailError.message : "Unknown error",
          recipient: "contact@trtbroker.com",
        },
        request
      );

      return NextResponse.json(
        {
          error:
            "Une erreur est survenue lors de l'envoi de la candidature. Veuillez réessayer.",
        },
        { status: 500 }
      );
    }

    // Send email to first supervisor (houcine.taki21@gmail.com)
    try {
      const supervisorMailOptions = {
        ...mailOptions,
        to: "houcine.taki21@gmail.com",
        subject: `${mailOptions.subject}`,
      };

      await transporter.sendMail(supervisorMailOptions);
    } catch (supervisorError) {
      // Don't throw error for supervisor email failure, just log it
    }

    // Send email to second supervisor (ghazzalipro@gmail.com)
    try {
      const secondSupervisorMailOptions = {
        ...mailOptions,
        to: "ghazzalipro@gmail.com",
        subject: `${mailOptions.subject}`,
      };

      await transporter.sendMail(secondSupervisorMailOptions);
    } catch (secondSupervisorError) {
      // Don't throw error for supervisor email failure, just log it
    }

    // Send email to third supervisor (moncef.benabdallah@deadline.ma) - COMMENTED OUT
    // try {
    //   const thirdSupervisorMailOptions = {
    //     ...mailOptions,
    //     to: "moncef.benabdallah@deadline.ma",
    //     subject: `${mailOptions.subject}`,
    //   };

    //   await transporter.sendMail(thirdSupervisorMailOptions);
    //   console.log("Career email sent to supervisor 3 successfully");
    // } catch (thirdSupervisorError) {
    //   console.error(
    //     "Failed to send career email to supervisor 3:",
    //     thirdSupervisorError
    //   );
    //   // Don't throw error for supervisor email failure, just log it
    // }

    return NextResponse.json(
      {
        success: true,
        message: "Candidature envoyée avec succès",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log security event for failed submission
    logSecurityEvent(
      "CAREER_SUBMISSION_FAILED",
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      request
    );

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi de la candidature. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}

// Export the security-wrapped handler
export const POST = withSecurity(handleCareerSubmission, "/api/send-career");
