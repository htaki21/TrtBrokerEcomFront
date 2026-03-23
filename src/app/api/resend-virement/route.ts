import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, reference, prenom, nom, productName, montant } =
      await request.json();

    if (!email || !reference) {
      return NextResponse.json(
        { error: "Email et référence requis" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
          ? (() => {
              const pass = process.env.SMTP_PASS;
              const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(pass);
              if (isBase64) {
                try {
                  return Buffer.from(pass, "base64").toString("utf-8");
                } catch {
                  return pass;
                }
              }
              return pass;
            })()
          : undefined,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const clientName = `${prenom || ""} ${nom || ""}`.trim() || "Client";

    await transporter.sendMail({
      from: `"TRT Broker" <${process.env.SMTP_USER || "leads@trtbroker.com"}>`,
      to: email,
      subject: `Coordonnées bancaires — Référence ${reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #4C5242;">
            <h1 style="color: #4C5242; margin: 0; font-size: 24px;">TRT BROKER</h1>
            <p style="color: #6B7260; margin: 5px 0 0;">Courtage en Assurance & Réassurance</p>
          </div>

          <div style="padding: 30px 0;">
            <p>Bonjour ${clientName},</p>
            <p>Voici les coordonnées bancaires pour effectuer votre virement${productName ? ` pour votre <strong>${productName}</strong>` : ""} :</p>

            <div style="background: #F5F5F0; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7260; width: 130px;">Banque</td>
                  <td style="padding: 8px 0; font-weight: 600;">Attijariwafa Bank</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7260;">Bénéficiaire</td>
                  <td style="padding: 8px 0; font-weight: 600;">TRT BROKER</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7260;">RIB</td>
                  <td style="padding: 8px 0; font-weight: 600; font-family: monospace;">007 780 0001265000004617 63</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7260;">SWIFT</td>
                  <td style="padding: 8px 0; font-weight: 600; font-family: monospace;">BCMAMAMC</td>
                </tr>
              </table>
            </div>

            <div style="background: #FFF8E1; border-radius: 12px; padding: 16px; margin: 20px 0; border-left: 4px solid #F59E0B;">
              <p style="margin: 0 0 8px; font-weight: 600;">⚠️ Important</p>
              <p style="margin: 0;">Indiquez obligatoirement la référence suivante dans le motif du virement :</p>
              <p style="margin: 10px 0 0; font-size: 22px; font-weight: 700; color: #4C5242;">${reference}</p>
            </div>

            ${montant ? `<p>Montant à virer : <strong>${montant} DH TTC</strong></p>` : ""}

            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
          </div>

          <div style="border-top: 1px solid #E5E5E5; padding: 20px 0; text-align: center; color: #6B7260; font-size: 12px;">
            <p style="margin: 0;">TRT BROKER — Courtage en Assurance & Réassurance</p>
            <p style="margin: 5px 0 0;">N°33 IMM SEMIRAMI, Casablanca 23000</p>
            <p style="margin: 5px 0 0;">Tél : 05 22 27 07 24 | Email : contact@trtbroker.com</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend virement email error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
