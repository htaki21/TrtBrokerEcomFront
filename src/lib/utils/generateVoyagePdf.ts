import jsPDF from "jspdf";

type VoyagePdfData = {
  reference: string;
  assistanceVoyage: string;
  primedelassistance: number;
  dureedelacouverture: string;
  transport: string;
  situationfamiliale: string;
  modePaiement: string;
  prenom: string;
  nom: string;
  phone: string;
  email: string;
  dureeVisa: string;
};

// ── Brand palette ──
const C = {
  brand:      [115, 154, 56]  as const, // #739A38
  brandDark:  [80, 110, 35]   as const, // darker green
  brandLight: [218, 235, 196] as const, // very light green
  brandBg:    [245, 249, 240] as const, // green tinted bg
  dark:       [26, 28, 25]    as const, // near black
  heading:    [42, 45, 40]    as const, // dark heading
  body:       [75, 85, 68]    as const, // body text
  muted:      [130, 140, 122] as const, // muted
  light:      [180, 188, 174] as const, // light borders
  divider:    [225, 230, 220] as const, // subtle line
  bgCard:     [250, 251, 249] as const, // card bg
  white:      [255, 255, 255] as const,
  accent:     [220, 160, 40]  as const, // gold accent for premium feel
};

type RGB = readonly [number, number, number];

function getAssistanceLabel(type: string): string {
  const map: Record<string, string> = {
    Schengen:  "Assistance Voyage Schengen",
    Monde:     "Assistance Voyage Monde",
    "Étudiant":  "Assistance Voyage Étudiant",
    "Expatrié":  "Assistance Voyage Expatrié",
  };
  return map[type] || "Assistance Voyage";
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

// ── Drawing helpers ──
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

// Sanitize text to prevent jsPDF Arabic parser crash
function safe(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).replace(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g, "");
}

// ── Main ──
export async function generateVoyagePdf(data: VoyagePdfData): Promise<void> {
  // Sanitize all string fields to prevent Arabic parser crash
  const d = {
    reference: safe(data.reference),
    assistanceVoyage: safe(data.assistanceVoyage),
    primedelassistance: data.primedelassistance || 350,
    dureedelacouverture: safe(data.dureedelacouverture),
    transport: safe(data.transport),
    situationfamiliale: safe(data.situationfamiliale),
    modePaiement: safe(data.modePaiement),
    prenom: safe(data.prenom),
    nom: safe(data.nom),
    phone: safe(data.phone),
    email: safe(data.email),
    dureeVisa: safe(data.dureeVisa),
  };
  const doc = new jsPDF("p", "mm", "a4");
  const W = 210;
  const H = 297;
  const M = 22;                // main margin
  const CW = W - M * 2;       // content width
  const colL = M;              // left col start
  const colR = M + CW / 2;    // right col start (for 2-col layout)
  const halfW = CW / 2 - 3;   // half width with gap

  const dateStr = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let y = 0;

  // ══════════════════════════════════════════════
  // HEADER - Clean white header with brand accent
  // ══════════════════════════════════════════════

  // Top accent line
  fill(doc, C.brand);
  doc.rect(0, 0, W, 3.5, "F");

  // Logo area
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

  // Right side: Reference chip
  const refChipW = 56;
  const refChipH = 17;
  const refChipX = W - M - refChipW;
  const refChipY = y;

  fill(doc, C.brandBg);
  stroke(doc, C.brandLight);
  doc.setLineWidth(0.4);
  rRect(doc, refChipX, refChipY, refChipW, refChipH, 3, "FD");

  color(doc, C.muted);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("N° DE RÉFÉRENCE", refChipX + 5, refChipY + 6);

  color(doc, C.brand);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(d.reference, refChipX + 5, refChipY + 13);

  y = 36;

  // Divider
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
  const productLabel = getAssistanceLabel(d.assistanceVoyage);
  fill(doc, C.brand);
  const badgeW = doc.getTextWidth(productLabel) * 0.352778 * 9 + 12; // approximate width
  const badgeTextW = doc.getTextWidth(productLabel);
  const badgePad = 5;
  const actualBadgeW = badgeTextW + badgePad * 2;
  rRect(doc, W - M - actualBadgeW, y + 1, actualBadgeW, 8, 2, "F");
  color(doc, C.white);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(productLabel, W - M - actualBadgeW + badgePad, y + 6.5);

  y += 22;

  // ══════════════════════════════════════════════
  // STATUS BAR
  // ══════════════════════════════════════════════

  fill(doc, C.brandBg);
  stroke(doc, C.brandLight);
  doc.setLineWidth(0.3);
  rRect(doc, M, y, CW, 11, 2.5, "FD");

  // Green dot
  fill(doc, C.brand);
  doc.circle(M + 6, y + 5.5, 2, "F");

  color(doc, C.heading);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Statut : En attente de traitement", M + 11, y + 7);

  color(doc, C.muted);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const statusRight = `Montant : ${d.primedelassistance} DH TTC`;
  const srW = doc.getTextWidth(statusRight);
  doc.text(statusRight, W - M - 5 - srW, y + 7);

  y += 18;

  // ══════════════════════════════════════════════
  // TWO-COLUMN: Client Info + Request Details
  // ══════════════════════════════════════════════

  const cardStartY = y;

  // ── LEFT CARD: Client ──
  const cardH = 62;
  fill(doc, C.bgCard);
  stroke(doc, C.divider);
  doc.setLineWidth(0.3);
  rRect(doc, colL, y, halfW, cardH, 3, "FD");

  // Card header line
  fill(doc, C.brand);
  doc.rect(colL, y, halfW, 0.8, "F");

  // Card title
  color(doc, C.heading);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Informations client", colL + 6, y + 9);

  // Client rows
  const clientRows: [string, string][] = [
    ["Prénom", d.prenom],
    ["Nom", d.nom],
    ["Téléphone", d.phone],
  ];
  if (d.email) clientRows.push(["Email", d.email]);

  let cy = y + 16;
  for (const [label, value] of clientRows) {
    color(doc, C.muted);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(label, colL + 6, cy);

    color(doc, C.dark);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    // Truncate long emails
    const maxValW = halfW - 12;
    const displayVal = doc.getTextWidth(value) > maxValW
      ? value.substring(0, 30) + "..."
      : value;
    doc.text(displayVal, colL + 6, cy + 5);

    cy += 13;
  }

  // ── RIGHT CARD: Request Details ──
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

  const detailRows: [string, string][] = [
    ["Produit", getAssistanceLabel(d.assistanceVoyage)],
  ];
  if (d.dureeVisa) detailRows.push(["Durée du visa", d.dureeVisa]);
  if (d.dureedelacouverture) detailRows.push(["Durée de couverture", d.dureedelacouverture]);
  if (d.transport) detailRows.push(["Véhicule personnel", d.transport]);
  if (d.situationfamiliale) detailRows.push(["Situation familiale", d.situationfamiliale]);
  detailRows.push(["Mode de paiement", d.modePaiement || "Paiement en agence"]);

  let dy = cardStartY + 16;
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

    dy += 11;
  }

  y = cardStartY + cardH + 8;

  // ══════════════════════════════════════════════
  // AMOUNT CARD - Hero section
  // ══════════════════════════════════════════════

  const amtH = 30;
  fill(doc, C.brandBg);
  stroke(doc, C.brand);
  doc.setLineWidth(0.6);
  rRect(doc, M, y, CW, amtH, 4, "FD");

  // Left: label
  color(doc, C.body);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Montant total de la prime", M + 8, y + 12);

  // Subtext
  color(doc, C.muted);
  doc.setFontSize(7.5);
  doc.text("Toutes taxes comprises", M + 8, y + 18);

  // Right: price
  const priceStr = `${d.primedelassistance.toLocaleString("fr-FR")} DH`;
  color(doc, C.brand);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  const priceW = doc.getTextWidth(priceStr);
  doc.text(priceStr, W - M - 8 - priceW, y + 19);

  // TTC badge
  color(doc, C.muted);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("TTC", W - M - 8 - priceW - 1 - doc.getTextWidth("TTC"), y + 19);

  y += amtH + 8;

  // ══════════════════════════════════════════════
  // NEXT STEPS
  // ══════════════════════════════════════════════

  // Section title
  color(doc, C.heading);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Prochaines étapes", M, y + 5);

  // Decorative accent under title
  fill(doc, C.brand);
  doc.rect(M, y + 7.5, 25, 1, "F");

  y += 14;

  const isVirement = d.modePaiement === "Virement bancaire";

  type StepInfo = { num: string; title: string; desc: string };
  const steps: StepInfo[] = isVirement
    ? [
        { num: "01", title: "Effectuez le virement", desc: "Les coordonnées bancaires vous ont été envoyées par email. Indiquez la référence ci-dessus dans le motif du virement." },
        { num: "02", title: "Vérifiez vos emails", desc: "Consultez votre boîte de réception ainsi que les spams pour retrouver les informations de paiement." },
        { num: "03", title: "Activation du contrat", desc: "Une fois le virement reçu et vérifié, votre contrat d'assistance sera activé sous 24 heures ouvrées." },
      ]
    : [
        { num: "01", title: "Rendez-vous en agence", desc: `Présentez-vous dans l'une de nos agences TRT Broker avec votre référence : ${d.reference}` },
        { num: "02", title: "Finalisation du contrat", desc: "Un conseiller expert vous accompagnera pour finaliser votre contrat d'assistance voyage sur place." },
        { num: "03", title: "Couverture immédiate", desc: "Votre couverture prend effet dès la signature du contrat. Voyagez l'esprit tranquille." },
      ];

  for (const step of steps) {
    // Number circle
    fill(doc, C.brand);
    doc.circle(M + 5, y + 4.5, 4.5, "F");
    color(doc, C.white);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    const numW = doc.getTextWidth(step.num);
    doc.text(step.num, M + 5 - numW / 2, y + 5.8);

    // Step title
    color(doc, C.heading);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(step.title, M + 14, y + 4);

    // Step description
    color(doc, C.body);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(step.desc, CW - 16);
    doc.text(descLines, M + 14, y + 9);

    // Connector line (except last)
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

  fill(doc, [255, 251, 235] as unknown as RGB); // warm yellow bg
  stroke(doc, C.accent);
  doc.setLineWidth(0.4);
  rRect(doc, M, y, CW, 16, 2.5, "FD");

  // Left accent bar
  fill(doc, C.accent);
  doc.rect(M, y, 1.2, 16, "F");

  color(doc, [146, 115, 30] as unknown as RGB); // dark gold
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Important", M + 6, y + 6);

  color(doc, [120, 100, 40] as unknown as RGB);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Ce document est un récapitulatif de votre demande. Il ne constitue pas un contrat d'assurance.",
    M + 6, y + 12,
  );

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

  // Footer line
  fill(doc, C.brand);
  doc.rect(0, fY, W, 0.5, "F");

  // Footer bg
  fill(doc, C.bgCard);
  doc.rect(0, fY + 0.5, W, 14, "F");

  // Bottom accent line
  fill(doc, C.brand);
  doc.rect(0, H - 2, W, 2, "F");

  // Footer left
  color(doc, C.muted);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.text("TRT Broker – Courtage en Assurance & Réassurance", M, fY + 5.5);
  doc.text("Société de courtage agréée – RC Casablanca", M, fY + 9);

  // Footer right
  color(doc, C.brand);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  const refTxt = d.reference;
  const refTxtW = doc.getTextWidth(refTxt);
  doc.text(refTxt, W - M - refTxtW, fY + 5.5);

  color(doc, C.muted);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  const pageText = "Page 1/1";
  const pageW = doc.getTextWidth(pageText);
  doc.text(pageText, W - M - pageW, fY + 9);

  // ── Save ──
  doc.save(`TRT-Broker_${d.reference}.pdf`);
}
