import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { conditions } = await import(
  resolve(__dirname, "../lib/vaani-core/src/historical/deposit-questions.ts")
);

// ---- Palette ------------------------------------------------------------
const TEAL = "#2f7d6b";
const TEAL_DARK = "#14636b";
const INK = "#2b2b2b";
const MUTED = "#565f66";
const RULE = "#d9e2e0";

// ---- Derived metrics ----------------------------------------------------
let categoryCount = 0;
let questionCount = 0;
let subtypeCount = 0;
for (const c of conditions) {
  const buckets = [
    ...(c.categories ?? []),
    ...(c.subtypes ?? []).flatMap((s) => s.categories),
    ...(c.extraCategories ?? []).flatMap((e) => e.categories),
  ];
  for (const cat of buckets) {
    categoryCount += 1;
    questionCount += cat.questions.length;
  }
  subtypeCount += (c.subtypes ?? []).length;
}
const conditionCount = conditions.length;

const meta = [
  ["Author", "Shoba Rao"],
  ["Copyright Claimant", "Shoba Rao"],
  ["Year of Completion", "2026"],
  ["Published at", "https://doctor-visit-prep--deepti-medimate.replit.app  \u00b7  askvaani.org"],
  ["Total conditions", `${conditionCount} health conditions (+ ${subtypeCount} cancer subtypes)`],
  ["Question categories", `${categoryCount} curated question categories`],
  ["Total questions", `${questionCount} curated patient questions`],
  ["Languages", "7 (English, Spanish, Hindi, Kannada, Tamil, Vietnamese, Chinese)"],
  ["Taxonomy", "9 condition tracks \u00d7 first-visit / follow-up logic"],
];

// ---- Document setup -----------------------------------------------------
const outDir = resolve(__dirname, "../exports");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "Vaani-Copyright-Deposit-Copy.pdf");

const doc = new PDFDocument({
  size: "LETTER",
  bufferPages: true,
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  info: {
    Title: "Vaani \u2014 Copyright Deposit Copy (Identifying Material)",
    Author: "Shoba Rao",
    Subject: "U.S. Copyright Office Registration \u2014 Literary Work / Compilation",
  },
});
doc.pipe(createWriteStream(outPath));

const L = doc.page.margins.left;
const R = doc.page.width - doc.page.margins.right;
const W = R - L;
const CONTENT_BOTTOM = doc.page.height - doc.page.margins.bottom;

// ---- Title page ---------------------------------------------------------
doc.moveDown(2);
doc
  .font("Helvetica-Bold")
  .fontSize(34)
  .fillColor(TEAL)
  .text("Vaani", { align: "center" });
doc
  .font("Helvetica-Oblique")
  .fontSize(14)
  .fillColor(TEAL)
  .text("Find your voice at the doctor\u2019s office.", { align: "center" });

doc.moveDown(1.2);
const ruleY = doc.y;
doc
  .moveTo(L + W * 0.28, ruleY)
  .lineTo(R - W * 0.28, ruleY)
  .lineWidth(1.5)
  .strokeColor(TEAL)
  .stroke();

doc.moveDown(1.8);
doc
  .font("Helvetica")
  .fontSize(20)
  .fillColor(MUTED)
  .text("Deposit Copy \u2014 Identifying Material", { align: "center" });
doc.moveDown(0.6);
doc
  .font("Helvetica")
  .fontSize(12)
  .fillColor(INK)
  .text(
    "Submitted for U.S. Copyright Office Registration (Literary Work / Compilation)",
    { align: "center" },
  );

// ---- Metadata table -----------------------------------------------------
doc.moveDown(3);
const labelW = 190;
const rowPadY = 11;
let y = doc.y;

for (const [label, value] of meta) {
  const valueW = W - labelW - 10;
  const labelH = doc.font("Helvetica-Bold").fontSize(11.5).heightOfString(label, { width: labelW });
  const valueH = doc.font("Helvetica").fontSize(11.5).heightOfString(value, { width: valueW });
  const rowH = Math.max(labelH, valueH) + rowPadY * 2;

  doc
    .font("Helvetica-Bold")
    .fontSize(11.5)
    .fillColor(TEAL_DARK)
    .text(label, L, y + rowPadY, { width: labelW });
  doc
    .font("Helvetica")
    .fontSize(11.5)
    .fillColor(INK)
    .text(value, L + labelW + 10, y + rowPadY, { width: valueW });

  const lineY = y + rowH;
  doc.moveTo(L, lineY).lineTo(R, lineY).lineWidth(0.75).strokeColor(RULE).stroke();
  y = lineY;
}

// Footer note on title page
doc
  .font("Helvetica-Oblique")
  .fontSize(9)
  .fillColor(MUTED)
  .text(
    "This deposit copy contains identifying material for the compilation of original patient-question content that constitutes the Vaani work. The complete, ordered contents follow.",
    L,
    CONTENT_BOTTOM - 40,
    { width: W, align: "center" },
  );

// ---- Identifying material (compilation contents) ------------------------
doc.addPage();

function sectionHeader(title) {
  if (doc.y + 40 > CONTENT_BOTTOM) doc.addPage();
  doc.moveDown(0.4);
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor(TEAL)
    .text(title, L, doc.y, { width: W });
  const uy = doc.y + 2;
  doc.moveTo(L, uy).lineTo(R, uy).lineWidth(1).strokeColor(TEAL).stroke();
  doc.moveDown(0.6);
}

function categoryHeader(title) {
  if (doc.y + 30 > CONTENT_BOTTOM) doc.addPage();
  doc.moveDown(0.3);
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(TEAL_DARK)
    .text(title, L, doc.y, { width: W });
  doc.moveDown(0.15);
}

function questionItem(text) {
  const indent = L + 16;
  const width = W - 16;
  const h = doc.font("Helvetica").fontSize(10.5).heightOfString(text, { width });
  if (doc.y + h > CONTENT_BOTTOM) doc.addPage();
  const yy = doc.y;
  doc.font("Helvetica-Bold").fillColor(TEAL).text("\u2022", L + 4, yy, { width: 10 });
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(text, indent, yy, { width });
  doc.moveDown(0.25);
}

doc
  .font("Helvetica-Bold")
  .fontSize(20)
  .fillColor(TEAL)
  .text("Identifying Material \u2014 Compilation Contents", { align: "center" });
doc.moveDown(0.3);
doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor(MUTED)
  .text(
    "The following is the ordered arrangement of original questions organized by health condition and category. This selection, arrangement, and wording constitute the copyrightable compilation.",
    { align: "center", width: W },
  );
doc.moveDown(0.8);

function renderCategories(cats) {
  for (const cat of cats) {
    categoryHeader(cat.title);
    for (const q of cat.questions) questionItem(q);
  }
}

for (const c of conditions) {
  sectionHeader(c.label);
  if (c.safetyNotice?.message) {
    const h = doc.font("Helvetica-Oblique").fontSize(9.5).heightOfString(c.safetyNotice.message, { width: W - 12 });
    if (doc.y + h + 10 > CONTENT_BOTTOM) doc.addPage();
    doc
      .font("Helvetica-Oblique")
      .fontSize(9.5)
      .fillColor(MUTED)
      .text(`Safety notice: ${c.safetyNotice.message}`, L + 6, doc.y, { width: W - 12 });
    doc.moveDown(0.5);
  }
  renderCategories(c.categories ?? []);
  for (const st of c.subtypes ?? []) {
    categoryHeader(`Subtype \u2014 ${st.label}`);
    renderCategories(st.categories);
  }
  for (const ex of c.extraCategories ?? []) {
    categoryHeader(`Optional track \u2014 ${ex.triggerLabel}`);
    renderCategories(ex.categories);
  }
  doc.moveDown(0.6);
}

// ---- Page numbers -------------------------------------------------------
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(MUTED)
    .text(
      `Vaani \u2014 Copyright Deposit Copy   \u00b7   Claimant: Shoba Rao   \u00b7   Page ${i + 1} of ${range.count}`,
      L,
      doc.page.height - 46,
      { width: W, align: "center" },
    );
}

doc.flushPages();
doc.end();

console.log(`Wrote ${outPath}`);
console.log(`conditions=${conditionCount} categories=${categoryCount} questions=${questionCount} subtypes=${subtypeCount}`);
