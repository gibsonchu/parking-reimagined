import { jsPDF } from "jspdf";
import { byId } from "../data/elements";
import { computeStats } from "./impact";
import { plotDims, useProject, type Project } from "../state/useProject";
import { C, CAT, money } from "../theme/palette";
import { areaUnit, areaValue, fmtArea, fmtLen } from "./units";
import { framedPlotPng, slug } from "./exportPng";

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const SITE_URL = "https://parking-reimagined.com/";

/**
 * One-page PDF proposal for community meetings: headline stats (including
 * capacity), the proposed site plan, an itemized element list, and the
 * area-by-use breakdown. Layout is condensed to keep it to a single page.
 */
export async function exportProposal(project: Project) {
  const { wFt, lFt, scale } = plotDims(project);
  const totalSqFt = wFt * lFt;
  const stats = computeStats(project.items, totalSqFt);
  const png = await framedPlotPng(1.5);
  const name = project.name.trim() || "Untitled design";
  const units = useProject.getState().units;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 16;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ink = hexToRgb(C.ink);
  const soft = hexToRgb(C.inkSoft);
  const leaf = hexToRgb(C.leaf);
  const rule = hexToRgb(C.wood);

  const ensure = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Title + description ────────────────────────────────
  doc.setFont("helvetica", "bold").setFontSize(21).setTextColor(...ink);
  doc.text(name, margin, y + 4);
  y += 13; // breathing room between the head and the description
  doc.setFont("helvetica", "normal").setFontSize(8.5).setTextColor(...soft);
  doc.text(`A parking-space reimagined proposal · ${scale.name} · ${fmtArea(totalSqFt, units)} · 1 grid cell = ${fmtLen(1, units)}`, margin, y);
  y += 7;

  // ── Headline stats (capacity lives here now) ───────────
  const statCols: [string, string][] = [
    [areaValue(stats.used, units), `${areaUnit(units)} reimagined (${stats.pct}%)`],
    [`${stats.carsRemoved}`, "car spaces reclaimed"],
    [money(stats.cLo), "est. cost from"],
  ];
  if (stats.seats) statCols.push([`~${stats.seats}`, "seats"]);
  if (stats.bikes) statCols.push([`~${stats.bikes}`, "bike parking"]);
  if (stats.units) statCols.push([`${stats.units}`, stats.units > 1 ? "homes" : "home"]);

  const n = statCols.length;
  const colW = contentW / n;
  const bigFont = n <= 3 ? 19 : n === 4 ? 16 : 14;
  const cardH = 18;
  doc.setDrawColor(...ink).setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, cardH, 1.5, 1.5, "S");
  statCols.forEach(([big, lab], i) => {
    const x = margin + i * colW + 4.5;
    doc.setFont("helvetica", "bold").setFontSize(bigFont).setTextColor(...leaf);
    doc.text(big, x, y + 9);
    doc.setFont("helvetica", "normal").setFontSize(6.5).setTextColor(...soft);
    doc.text(doc.splitTextToSize(lab.toUpperCase(), colW - 5), x, y + 13);
  });
  y += cardH + 6;

  // ── Proposed site plan ─────────────────────────────────
  if (png) {
    const props = doc.getImageProperties(png);
    const ratio = Math.min(contentW / props.width, 74 / props.height);
    const w = props.width * ratio;
    const h = props.height * ratio;
    doc.setFont("helvetica", "bold").setFontSize(7.5).setTextColor(...soft);
    doc.text("PROPOSED SITE PLAN", margin, y);
    y += 2.5;
    doc.addImage(png, "PNG", margin + (contentW - w) / 2, y, w, h);
    y += h + 6;
  }

  const heading = (label: string) => {
    doc.setFont("helvetica", "bold").setFontSize(7.5).setTextColor(...soft);
    doc.text(label.toUpperCase(), margin, y);
    y += 1.8;
    doc.setDrawColor(...rule).setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 4;
  };

  // draws "Name — impact (cost)" on one line, truncating the tail to fit maxW
  const drawItem = (x: number, yy: number, ref: string, maxW: number) => {
    const b = byId(ref);
    if (!b) return;
    doc.setFont("helvetica", "bold").setFontSize(8).setTextColor(...ink);
    doc.text(b.name, x, yy);
    const nameW = doc.getTextWidth(b.name + " ");
    doc.setFont("helvetica", "normal").setTextColor(...soft);
    let tail = `— ${b.impact} (${money(b.cost[0])}–${money(b.cost[1])})`;
    const avail = maxW - nameW;
    if (doc.getTextWidth(tail) > avail) {
      while (tail.length > 1 && doc.getTextWidth(tail + "…") > avail) tail = tail.slice(0, -1);
      tail = tail.trimEnd() + "…";
    }
    doc.text(tail, x + nameW, yy);
  };

  // ── Elements (two columns when the list is long) ───────
  heading("Elements");
  if (project.items.length === 0) {
    doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...soft).text("(nothing placed yet)", margin, y);
    y += 5;
  } else {
    const cols = project.items.length > 7 ? 2 : 1;
    const gutter = 8;
    const cw = (contentW - (cols - 1) * gutter) / cols;
    const rows = Math.ceil(project.items.length / cols);
    const lineH = 4.6;
    project.items.forEach((p, idx) => {
      const col = Math.floor(idx / rows);
      const row = idx % rows;
      drawItem(margin + col * (cw + gutter), y + row * lineH, p.ref, cw);
    });
    y += rows * lineH + 3;
  }

  // ── Area by use ────────────────────────────────────────
  heading("Area by use");
  const catEntries = (Object.entries(stats.cats) as [keyof typeof CAT, number][]).sort((a, b) => b[1] - a[1]);
  doc.setFontSize(8);
  if (catEntries.length === 0) {
    doc.setTextColor(...soft).text("—", margin, y);
    y += 5;
  } else {
    for (const [k, v] of catEntries) {
      doc.setFillColor(...hexToRgb(CAT[k].color));
      doc.rect(margin, y - 2.4, 2.6, 2.6, "F");
      doc.setFont("helvetica", "normal").setTextColor(...ink);
      doc.text(CAT[k].label, margin + 4.5, y);
      doc.setTextColor(...soft);
      doc.text(fmtArea(v, units), pageW - margin, y, { align: "right" });
      y += 4.6;
    }
  }

  // ── Footer ─────────────────────────────────────────────
  const disclaimer =
    "For visual and planning purposes only — not a construction, engineering, or permit document. Areas are computed from element footprints on a 1-ft grid. Cost figures are early planning ranges based on U.S. averages, not quotes.";
  doc.setFont("helvetica", "normal").setFontSize(7);
  const footLines = doc.splitTextToSize(disclaimer, contentW);
  const footH = footLines.length * 3.2 + 11;

  ensure(footH + 4);
  y = Math.min(Math.max(y + 5, pageH - margin - footH), pageH - margin - footH);
  doc.setDrawColor(...rule).setLineWidth(0.2);
  doc.line(margin, y, pageW - margin, y);
  y += 4.5;

  doc.setTextColor(...soft).text(footLines, margin, y);
  y += footLines.length * 3.2 + 2.5;

  // call to action — only the name is linked, no visible URL
  doc.setFont("helvetica", "normal").setFontSize(7).setTextColor(...ink);
  const lead = "Create your own version at ";
  doc.text(lead, margin, y);
  const leadW = doc.getTextWidth(lead);
  doc.setTextColor(...leaf).textWithLink("Parking, Reimagined", margin + leadW, y, { url: SITE_URL });
  const linkW = doc.getTextWidth("Parking, Reimagined");
  doc.setTextColor(...ink).text(".", margin + leadW + linkW, y);
  y += 4;

  doc.setTextColor(...soft).text("© 2026 Parking, Reimagined", margin, y);

  doc.save(slug(project.name) + "-proposal.pdf");
}
