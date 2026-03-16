import jsPDF from "jspdf";

type RecapPdfData = {
  reference: string;
  productName: string;
  prenom: string;
  nom: string;
  phone?: string;
  email?: string;
  modePaiement?: string;
  // Individuelle Accidents specific
  formuleAccidents?: string;
  prixFormule?: number;
  dateReceptionSouhaitee?: string;
  creneauHoraire?: string;
};

const FORMULE_PRICES: Record<string, number> = {
  "Formule Basique": 312.5,
  "Formule Confort": 427.5,
  "Formule Premium": 738.0,
};

// ── Brand palette (same as Voyage PDF) ──
const C = {
  brand:      [115, 154, 56]  as const,
  brandLight: [218, 235, 196] as const,
  brandBg:    [245, 249, 240] as const,
  dark:       [26, 28, 25]    as const,
  heading:    [42, 45, 40]    as const,
  body:       [75, 85, 68]    as const,
  muted:      [130, 140, 122] as const,
  divider:    [225, 230, 220] as const,
  bgCard:     [250, 251, 249] as const,
  white:      [255, 255, 255] as const,
  accent:     [220, 160, 40]  as const,
};

type RGB = readonly [number, number, number];

function fill(doc: jsPDF, c: RGB) { doc.setFillColor(c[0], c[1], c[2]); }
function stroke(doc: jsPDF, c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }
function color(doc: jsPDF, c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }
function rRect(doc: jsPDF, x: number, y: number, w: number, h: number, r: number, s: "F" | "S" | "FD" = "F") {
  doc.roundedRect(x, y, w, h, r, r, s);
}
function drawLine(doc: jsPDF, x1: number, y1: number, x2: number, y2: number, c: RGB, width = 0.3) {
  stroke(doc, c);
  doc.setLineWidth(width);
  doc.line(x1, y1, x2, y2);
}

async function loadLogoAsBase64(): Promise<string | null> {
  try {
    const res = await fetch("/logo-trt-broker.png");
    const blob = await res.blob();
    return new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export async function generateRecapPdf(data: RecapPdfData): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const W = 210;
  const H = 297;
  const M = 22;
  const CW = W - M * 2;
  const colL = M;
  const colR = M + CW / 2;
  const halfW = CW / 2 - 3;

  const dateStr = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Resolve price from formula name
  const price = data.prixFormule || (data.formuleAccidents ? FORMULE_PRICES[data.formuleAccidents] : undefined);

  let y = 0;

  // ══════════════════════════════════════════════
  // HEADER
  // ══════════════════════════════════════════════
  fill(doc, C.brand);
  doc.rect(0, 0, W, 3.5, "F");

  y = 12;
  const logoBase64 = await loadLogoAsBase64();
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, "PNG", M, y, 48, 17);
    } catch {
      color(doc, C.brand);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("TRT BROKER", M, y + 12);
    }
  } else {
    color(doc, C.brand);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("TRT BROKER", M, y + 12);
  }

  // Reference chip
  const refChipW = 56;
  const refChipH = 17;
  const refChipX = W - M - refChipW;
  fill(doc, C.brandBg);
  stroke(doc, C.brandLight);
  doc.setLineWidth(0.4);
  rRect(doc, refChipX, y, refChipW, refChipH, 3, "FD");
  color(doc, C.muted);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("N° DE RÉFÉRENCE", refChipX + 5, y + 6);
  color(doc, C.brand);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(data.reference, refChipX + 5, y + 13);

  y = 36;
  drawLine(doc, M, y, W - M, y, C.divider, 0.5);
  y += 4;

  // ══════════════════════════════════════════════
  // TITLE AREA
  // ══════════════════════════════════════════════
  color(doc, C.heading);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Récapitulatif de demande", M, y + 7);

  color(doc, C.muted);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Émis le ${dateStr}`, M, y + 14);

  // Product badge
  fill(doc, C.brand);
  const badgePad = 5;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const badgeTextW = doc.getTextWidth(data.productName);
  const actualBadgeW = badgeTextW + badgePad * 2;
  rRect(doc, W - M - actualBadgeW, y + 1, actualBadgeW, 8, 2, "F");
  color(doc, C.white);
  doc.text(data.productName, W - M - actualBadgeW + badgePad, y + 6.5);

  y += 22;

  // ══════════════════════════════════════════════
  // STATUS BAR
  // ══════════════════════════════════════════════
  fill(doc, C.brandBg);
  stroke(doc, C.brandLight);
  doc.setLineWidth(0.3);
  rRect(doc, M, y, CW, 11, 2.5, "FD");

  fill(doc, C.brand);
  doc.circle(M + 6, y + 5.5, 2, "F");

  color(doc, C.heading);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Statut : En attente de traitement", M + 11, y + 7);

  if (price) {
    color(doc, C.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const statusRight = `Montant : ${price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} DH TTC`;
    const srW = doc.getTextWidth(statusRight);
    doc.text(statusRight, W - M - 5 - srW, y + 7);
  }

  y += 18;

  // ══════════════════════════════════════════════
  // TWO-COLUMN: Client Info + Request Details
  // ══════════════════════════════════════════════
  const cardStartY = y;

  // ── LEFT CARD: Client Info ──
  const clientRows: [string, string][] = [
    ["Prénom", data.prenom],
    ["Nom", data.nom],
  ];
  if (data.phone) clientRows.push(["Téléphone", data.phone]);
  if (data.email) clientRows.push(["Email", data.email]);

  // ── RIGHT CARD: Request Details ──
  const detailRows: [string, string][] = [
    ["Produit", data.productName],
  ];
  if (data.formuleAccidents) detailRows.push(["Formule", data.formuleAccidents]);
  if (data.dateReceptionSouhaitee) detailRows.push(["Date souhaitée", formatDate(data.dateReceptionSouhaitee)]);
  if (data.creneauHoraire) detailRows.push(["Créneau horaire", data.creneauHoraire]);
  detailRows.push(["Mode de paiement", data.modePaiement || "Paiement en agence"]);

  // Compute card height to fit both columns
  const rowH = 11;
  const cardPadTop = 16;
  const cardPadBot = 6;
  const maxRows = Math.max(clientRows.length, detailRows.length);
  const cardH = cardPadTop + maxRows * rowH + cardPadBot;

  // Draw left card
  fill(doc, C.bgCard);
  stroke(doc, C.divider);
  doc.setLineWidth(0.3);
  rRect(doc, colL, y, halfW, cardH, 3, "FD");
  fill(doc, C.brand);
  doc.rect(colL, y, halfW, 0.8, "F");

  color(doc, C.heading);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Informations client", colL + 6, y + 9);

  let cy = y + cardPadTop;
  for (const [label, value] of clientRows) {
    color(doc, C.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(label, colL + 6, cy);

    color(doc, C.dark);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    const maxValW = halfW - 12;
    const displayVal = doc.getTextWidth(value) > maxValW ? value.substring(0, 30) + "..." : value;
    doc.text(displayVal, colL + 6, cy + 5);
    cy += rowH;
  }

  // Draw right card
  fill(doc, C.bgCard);
  stroke(doc, C.divider);
  doc.setLineWidth(0.3);
  rRect(doc, colR + 3, cardStartY, halfW, cardH, 3, "FD");
  fill(doc, C.brand);
  doc.rect(colR + 3, cardStartY, halfW, 0.8, "F");

  color(doc, C.heading);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Détails de la demande", colR + 9, cardStartY + 9);

  let dy = cardStartY + cardPadTop;
  for (const [label, value] of detailRows) {
    color(doc, C.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(label, colR + 9, dy);

    color(doc, C.dark);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    const maxW = halfW - 12;
    const dv = doc.getTextWidth(value) > maxW ? value.substring(0, 28) + "..." : value;
    doc.text(dv, colR + 9, dy + 5);
    dy += rowH;
  }

  y = cardStartY + cardH + 8;

  // ══════════════════════════════════════════════
  // AMOUNT CARD (only if price available)
  // ══════════════════════════════════════════════
  if (price) {
    const amtH = 30;
    fill(doc, C.brandBg);
    stroke(doc, C.brand);
    doc.setLineWidth(0.6);
    rRect(doc, M, y, CW, amtH, 4, "FD");

    color(doc, C.body);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Montant total de la prime", M + 8, y + 12);

    color(doc, C.muted);
    doc.setFontSize(7.5);
    doc.text("Toutes taxes comprises", M + 8, y + 18);

    const priceStr = `${price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} DH`;
    color(doc, C.brand);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    const priceW = doc.getTextWidth(priceStr);
    doc.text(priceStr, W - M - 8 - priceW, y + 19);

    color(doc, C.muted);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("TTC", W - M - 8 - priceW - 1 - doc.getTextWidth("TTC"), y + 19);

    y += amtH + 8;
  }

  // ══════════════════════════════════════════════
  // NEXT STEPS
  // ══════════════════════════════════════════════
  color(doc, C.heading);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Prochaines étapes", M, y + 5);

  fill(doc, C.brand);
  doc.rect(M, y + 7.5, 25, 1, "F");
  y += 14;

  const isVirement = data.modePaiement === "Virement bancaire";
  const steps = isVirement
    ? [
        { num: "01", title: "Effectuez le virement", desc: "Les coordonnées bancaires vous ont été envoyées par email. Indiquez la référence ci-dessus dans le motif du virement." },
        { num: "02", title: "Vérifiez vos emails", desc: "Consultez votre boîte de réception ainsi que les spams pour retrouver les informations de paiement." },
        { num: "03", title: "Activation du contrat", desc: "Une fois le virement reçu et vérifié, votre contrat sera activé sous 24 heures ouvrées." },
      ]
    : [
        { num: "01", title: "Rendez-vous en agence", desc: `Présentez-vous dans l'une de nos agences TRT Broker avec votre référence : ${data.reference}` },
        { num: "02", title: "Finalisation du contrat", desc: "Un conseiller expert vous accompagnera pour finaliser votre contrat sur place." },
        { num: "03", title: "Couverture immédiate", desc: "Votre couverture prend effet dès la signature du contrat." },
      ];

  for (const step of steps) {
    fill(doc, C.brand);
    doc.circle(M + 5, y + 4.5, 4.5, "F");
    color(doc, C.white);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    const numW = doc.getTextWidth(step.num);
    doc.text(step.num, M + 5 - numW / 2, y + 5.8);

    color(doc, C.heading);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(step.title, M + 14, y + 4);

    color(doc, C.body);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(step.desc, CW - 16);
    doc.text(descLines, M + 14, y + 9);

    if (step !== steps[steps.length - 1]) {
      const lineEndY = y + 9 + descLines.length * 4 + 2;
      stroke(doc, C.brandLight);
      doc.setLineWidth(0.5);
      doc.line(M + 5, y + 9, M + 5, lineEndY);
    }

    y += 9 + descLines.length * 4 + 6;
  }

  y += 4;

  // ══════════════════════════════════════════════
  // IMPORTANT NOTICE
  // ══════════════════════════════════════════════
  fill(doc, [255, 251, 235] as unknown as RGB);
  stroke(doc, C.accent);
  doc.setLineWidth(0.4);
  rRect(doc, M, y, CW, 16, 2.5, "FD");
  fill(doc, C.accent);
  doc.rect(M, y, 1.2, 16, "F");
  color(doc, [146, 115, 30] as unknown as RGB);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Important", M + 6, y + 6);
  color(doc, [120, 100, 40] as unknown as RGB);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text("Ce document est un récapitulatif de votre demande. Il ne constitue pas un contrat d'assurance.", M + 6, y + 12);

  y += 22;

  // ══════════════════════════════════════════════
  // CONTACT BAR
  // ══════════════════════════════════════════════
  fill(doc, C.bgCard);
  stroke(doc, C.divider);
  doc.setLineWidth(0.3);
  rRect(doc, M, y, CW, 18, 2.5, "FD");
  color(doc, C.heading);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Besoin d'assistance ?", M + 6, y + 7);
  color(doc, C.body);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("05 22 00 00 00   |   contact@trtbroker.com   |   www.trtbroker.com", M + 6, y + 13);

  // ══════════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════════
  const fY = H - 14;
  fill(doc, C.brand);
  doc.rect(0, fY, W, 0.5, "F");
  fill(doc, C.bgCard);
  doc.rect(0, fY + 0.5, W, 14, "F");
  fill(doc, C.brand);
  doc.rect(0, H - 2, W, 2, "F");
  color(doc, C.muted);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.text("TRT Broker – Courtage en Assurance & Réassurance", M, fY + 5.5);
  doc.text("Société de courtage agréée – RC Casablanca", M, fY + 9);
  color(doc, C.brand);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  const refTxtW = doc.getTextWidth(data.reference);
  doc.text(data.reference, W - M - refTxtW, fY + 5.5);
  color(doc, C.muted);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  const pageW = doc.getTextWidth("Page 1/1");
  doc.text("Page 1/1", W - M - pageW, fY + 9);

  doc.save(`TRT-Broker_${data.reference}.pdf`);
}
