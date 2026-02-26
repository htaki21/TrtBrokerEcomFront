import { logSecurityEvent } from "@/lib/security";
import { withSecurity } from "@/middleware/security";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration will be created inside the function

async function handleContactSubmission(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      prenom,
      nom,
      telephone,
      email,
      marketingConsent: rawMarketingConsent,
    } = body;

    // Ensure marketingConsent is a boolean (handle string "true"/"false" or undefined)
    const marketingConsent =
      rawMarketingConsent === true || rawMarketingConsent === "true";

    // Validate required fields
    if (!prenom || !nom || !telephone || !email) {
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

    // Validate phone format (10 digits)
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

    // Create enterprise-level email content
    const emailContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle Demande Client - TRT Broker</title>
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
                                  Nouvelle demande de contact
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
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
                      <tr>
                        <td style="padding: 12px 16px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td valign="middle" style="font-size: 14px; color: #92400e; font-weight: 600;">
                                ⚡ Action requise - Nouveau prospect à contacter
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Client Information Section -->
                <tr>
                  <td style="padding: 32px 40px;">
                    
                    <!-- Section Title -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td style="border-bottom: 2px solid #739a38; padding-bottom: 8px;">
                          <h2 style="margin: 0; font-size: 16px; font-weight: 600; color: #739a38; text-transform: uppercase; letter-spacing: 0.5px;">
                            Informations du Contact
                          </h2>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Contact Details Grid -->
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
                                ${telephone}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Marketing Consent -->
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="140" style="font-size: 13px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                                Consentement
                              </td>
                              <td>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="background-color: ${marketingConsent === true ? "#dcfce7" : "#f3f4f6"}; border: 1px solid ${marketingConsent === true ? "#bbf7d0" : "#e5e7eb"}; border-radius: 4px; padding: 6px 12px;">
                                      <span style="font-size: 13px; color: ${marketingConsent === true ? "#15803d" : "#6b7280"}; font-weight: 600;">
                                        ${marketingConsent === true ? "✓ Communications marketing acceptées" : "✗ Communications marketing refusées"}
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
                                  Répondre par Email
                                </a>
                              </td>
                              <!-- Secondary CTA -->
                              <td>
                                <a href="tel:${telephone}" style="display: inline-block; background: #ffffff; color: #739a38; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; border: 2px solid #739a38;">
                                  Appeler le Client
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
                            <strong>Source:</strong> Formulaire de contact - Site Web TRT Broker
                          </p>
                          <p style="margin: 0; font-size: 12px; color: #6b7280;">
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

    // Email options for supervisors
    const mailOptions = {
      from: `"TRT Broker" <${process.env.SMTP_USER}>`,
      subject: `[NOUVEAU CONTACT] ${prenom} ${nom} - TRT Broker`,
      html: emailContent,
      attachments: [
        {
          filename: "logo-trt-broker.png",
          path: "./public/logo-trt-broker.png",
          cid: "logo",
        },
      ],
    };

    // TEMPORARY: Send only to houcine for testing marketing consent
    try {
      const testMailOptions = {
        ...mailOptions,
        to: "houcine.taki21@gmail.com",
        // TODO: Add back other supervisors after fixing marketing consent:
        // to: [
        //   "houcine.taki21@gmail.com",
        //   "contact@trtbroker.com",
        //   "ghazzalipro@gmail.com",
        //   "moncef.benabdallah@deadline.ma",
        // ].join(", "),
        subject: `${mailOptions.subject}`,
      };

      const result = await transporter.sendMail(testMailOptions);
    } catch (emailError) {
      logSecurityEvent(
        "CONTACT_EMAIL_FAILED",
        {
          error:
            emailError instanceof Error ? emailError.message : "Unknown error",
        },
        request
      );
      // Still return success to user even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log security event for failed submission
    logSecurityEvent(
      "CONTACT_SUBMISSION_FAILED",
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      request
    );

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}

// Export the security-wrapped handler
export const POST = withSecurity(handleContactSubmission, "/api/send-contact");
