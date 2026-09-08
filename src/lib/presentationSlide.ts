import { byId } from "../data/elements";
import { computeStats } from "./impact";
import { plotDims, type Project } from "../state/useProject";
import { CAT, money } from "../theme/palette";
import { areaUnit, areaValue, type Units } from "./units";

/*
 * A finished design → a polished 16:9 presentation slide, built as an SVG
 * string. The SAME markup drives the preview, PNG export, PDF export, and the
 * full-screen present view (see PresentationDesignView / exportPresentation),
 * so the output is always identical. The design render is embedded as a data
 * URL so rasterizing the SVG never taints the canvas.
 */

export const SLIDE_W = 1280;
export const SLIDE_H = 720;

const INK = "#1f2328";
const SOFT = "#6b7280";
const LEAF = "#2e9e4f";
const RULE = "#d8d4c9";
const FRAME = "#2a2d31";
const SKY = "#eef1f4";
const FONT = "Inter, system-ui, -apple-system, 'Segoe UI', Arial, sans-serif";

export interface SlideMeta {
  title: string;
  location?: string;
  description?: string;
}

export interface SlideAggElement {
  ref: string;
  name: string;
  count: number;
  unitSqFt: number;
  color: string;
}

export interface SlideInput {
  projectName: string;
  meta: SlideMeta;
  planImage: string | null;
  units: Units;
  totalSqFt: number;
  usedSqFt: number;
  pct: number;
  carsRemoved: number;
  costLo: number;
  costHi: number;
  elements: SlideAggElement[];
}

/** Build all slide inputs (stats + aggregated Elements) from a project. */
export function buildSlideInput(project: Project, meta: SlideMeta, planImage: string | null, units: Units): SlideInput {
  const { wFt, lFt } = plotDims(project);
  const totalSqFt = wFt * lFt;
  const stats = computeStats(project.items, totalSqFt);

  const counts = new Map<string, number>();
  for (const it of project.items) counts.set(it.ref, (counts.get(it.ref) ?? 0) + 1);
  const elements: SlideAggElement[] = [...counts.entries()]
    .map(([ref, count]) => {
      const b = byId(ref);
      return b ? { ref, name: b.name, count, unitSqFt: b.wFt * b.lFt, color: CAT[b.cat].color } : null;
    })
    .filter((e): e is SlideAggElement => !!e)
    .sort((a, b) => b.count * b.unitSqFt - a.count * a.unitSqFt);

  return {
    projectName: project.name,
    meta,
    planImage,
    units,
    totalSqFt,
    usedSqFt: stats.used,
    pct: stats.pct,
    carsRemoved: stats.carsRemoved,
    costLo: stats.cLo,
    costHi: stats.cHi,
    elements,
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Wrap text into <tspan> lines that fit maxW at the given font size. */
function wrapTspans(text: string, x: number, fontSize: number, maxW: number, lineH: number, maxLines = 3): string {
  const words = text.split(/\s+/);
  const perChar = fontSize * 0.53;
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (test.length * perChar > maxW && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length === maxLines - 1) break;
    } else {
      cur = test;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineH}">${esc(l)}</tspan>`).join("");
}

const brandMark = (x: number, y: number) =>
  `<g transform="translate(${x},${y})"><rect x="0" y="0" width="26" height="26" rx="2" fill="#fbf9f2" stroke="${FRAME}" stroke-width="2.4"/><line x1="13" y1="0" x2="13" y2="26" stroke="${FRAME}" stroke-width="1.8"/></g>`;

/** The main presentation slide (design-dominant). */
export function buildPresentationSVG(d: SlideInput): string {
  const M = 56;
  const title = d.meta.title.trim() || "Untitled design";
  const planX = 664;
  const planY = 150;
  const planW = SLIDE_W - planX - M; // to right margin
  const planH = SLIDE_H - planY - 96;

  const metrics: [string, string][] = [
    [`${areaValue(d.usedSqFt, d.units)}`, `${areaUnit(d.units)} reimagined (${d.pct}%)`],
    [`${d.carsRemoved}`, "spaces reclaimed"],
    [`${money(d.costLo)}`, "est. cost from"],
  ];

  const elementNames = d.elements.map((e) => (e.count > 1 ? `${e.name} ×${e.count}` : e.name)).join("  ·  ");

  // left column blocks
  let titleY = 150;
  const titleLines = wrapTspans(title, M, 46, planX - M - 40, 52, 2);
  const titleLineCount = (titleLines.match(/<tspan/g) || []).length || 1;
  const afterTitle = titleY + (titleLineCount - 1) * 52 + 34;

  let locBlock = "";
  let cursor = afterTitle;
  if (d.meta.location?.trim()) {
    locBlock = `<text x="${M}" y="${cursor}" font-family="${FONT}" font-size="20" font-weight="600" fill="${SOFT}">${esc(d.meta.location)}</text>`;
    cursor += 30;
  }
  if (d.meta.description?.trim()) {
    locBlock += `<text x="${M}" y="${cursor + 6}" font-family="${FONT}" font-size="16" fill="${SOFT}">${wrapTspans(d.meta.description, M, 16, planX - M - 40, 22, 3)}</text>`;
    cursor += 40;
  }

  const metricsY = Math.max(cursor + 34, 440);
  const metricsSvg = metrics
    .map(([big, lab], i) => {
      const x = M + i * 200;
      return `<text x="${x}" y="${metricsY}" font-family="${FONT}" font-size="40" font-weight="800" fill="${LEAF}">${esc(big)}</text><text x="${x}" y="${metricsY + 22}" font-family="${FONT}" font-size="13" font-weight="600" fill="${SOFT}">${esc(lab.toUpperCase())}</text>`;
    })
    .join("");

  const elementsY = metricsY + 74;
  const elementsSvg =
    `<text x="${M}" y="${elementsY}" font-family="${FONT}" font-size="12" font-weight="700" letter-spacing="1.2" fill="${SOFT}">ELEMENTS USED</text>` +
    `<text x="${M}" y="${elementsY + 24}" font-family="${FONT}" font-size="16" font-weight="600" fill="${INK}">${wrapTspans(elementNames || "None yet", M, 16, planX - M - 20, 24, 3)}</text>`;

  const planImg = d.planImage
    ? `<image href="${d.planImage}" x="${planX}" y="${planY}" width="${planW}" height="${planH}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${planX + planW / 2}" y="${planY + planH / 2}" text-anchor="middle" font-family="${FONT}" font-size="16" fill="${SOFT}">No design yet</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SLIDE_W} ${SLIDE_H}" width="${SLIDE_W}" height="${SLIDE_H}">
    <rect width="${SLIDE_W}" height="${SLIDE_H}" fill="#ffffff"/>
    ${brandMark(M, 52)}
    <text x="${M + 36}" y="${71}" font-family="${FONT}" font-size="17" font-weight="800" letter-spacing="0.3" fill="${INK}">Parking, Reimagined</text>
    <text x="${M}" y="${titleY}" font-family="${FONT}" font-size="46" font-weight="800" fill="${INK}">${titleLines}</text>
    ${locBlock}
    ${metricsSvg}
    ${elementsSvg}
    <rect x="${planX - 6}" y="${planY - 6}" width="${planW + 12}" height="${planH + 12}" rx="6" fill="${SKY}" stroke="${RULE}" stroke-width="1"/>
    ${planImg}
    <line x1="${M}" y1="${SLIDE_H - 44}" x2="${SLIDE_W - M}" y2="${SLIDE_H - 44}" stroke="${RULE}" stroke-width="1"/>
    <text x="${M}" y="${SLIDE_H - 24}" font-family="${FONT}" font-size="12" fill="${SOFT}">parking-reimagined.com</text>
    <text x="${SLIDE_W - M}" y="${SLIDE_H - 24}" text-anchor="end" font-family="${FONT}" font-size="11" fill="${SOFT}">Planning-level estimate · not a construction, engineering, or permit document</text>
  </svg>`;
}

/** Optional second "Design details" slide. */
export function buildDetailsSVG(d: SlideInput): string {
  const M = 64;
  const rows = d.elements
    .map((e, i) => {
      const y = 210 + i * 34;
      const area = e.count * e.unitSqFt;
      return `<rect x="${M}" y="${y - 14}" width="12" height="12" rx="2" fill="${e.color}"/>
        <text x="${M + 22}" y="${y - 3}" font-family="${FONT}" font-size="16" font-weight="700" fill="${INK}">${esc(e.name)} ×${e.count}</text>
        <text x="${SLIDE_W - M}" y="${y - 3}" text-anchor="end" font-family="${FONT}" font-size="15" fill="${SOFT}">${areaValue(area, d.units)} ${areaUnit(d.units)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SLIDE_W} ${SLIDE_H}" width="${SLIDE_W}" height="${SLIDE_H}">
    <rect width="${SLIDE_W}" height="${SLIDE_H}" fill="#ffffff"/>
    ${brandMark(M, 52)}
    <text x="${M + 36}" y="${71}" font-family="${FONT}" font-size="17" font-weight="800" fill="${INK}">Parking, Reimagined</text>
    <text x="${M}" y="${150}" font-family="${FONT}" font-size="40" font-weight="800" fill="${INK}">Design details</text>
    <text x="${M}" y="${185}" font-family="${FONT}" font-size="16" font-weight="600" fill="${SOFT}">${esc(d.meta.title.trim() || "Untitled design")}</text>
    ${rows || `<text x="${M}" y="220" font-family="${FONT}" font-size="16" fill="${SOFT}">No Elements placed yet.</text>`}
    <line x1="${M}" y1="${SLIDE_H - 150}" x2="${SLIDE_W - M}" y2="${SLIDE_H - 150}" stroke="${RULE}" stroke-width="1"/>
    <text x="${M}" y="${SLIDE_H - 116}" font-family="${FONT}" font-size="15" font-weight="700" fill="${SOFT}">TOTAL AREA</text>
    <text x="${M}" y="${SLIDE_H - 88}" font-family="${FONT}" font-size="30" font-weight="800" fill="${LEAF}">${areaValue(d.usedSqFt, d.units)} ${areaUnit(d.units)}</text>
    <text x="${SLIDE_W / 2}" y="${SLIDE_H - 116}" font-family="${FONT}" font-size="15" font-weight="700" fill="${SOFT}">TOTAL ESTIMATED COST</text>
    <text x="${SLIDE_W / 2}" y="${SLIDE_H - 88}" font-family="${FONT}" font-size="30" font-weight="800" fill="${LEAF}">${money(d.costLo)}–${money(d.costHi)}</text>
    <text x="${M}" y="${SLIDE_H - 32}" font-family="${FONT}" font-size="11" fill="${SOFT}">Planning-level estimate · not a construction, engineering, or permit document</text>
  </svg>`;
}
