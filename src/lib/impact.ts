import { byId, type BankElement, type Category } from "../data/elements";
import { SPACE_SQFT } from "../data/scales";

export interface PlacedItem {
  uid: string;
  ref: string;
  x: number;
  y: number;
  rotation: number; // 0 | 90 | 180 | 270
}

export interface Stats {
  used: number;
  pct: number;
  carsRemoved: number;
  cLo: number;
  cHi: number;
  seats: number;
  bikes: number;
  units: number;
  cats: Partial<Record<Category, number>>;
}

/** Footprint of an element at a given rotation (90° swaps width/length). */
export function footprint(el: Pick<BankElement, "wFt" | "lFt">, rotation: number): { w: number; l: number } {
  const quarter = ((Math.round(rotation / 90) % 4) + 4) % 4;
  return quarter % 2 === 1 ? { w: el.lFt, l: el.wFt } : { w: el.wFt, l: el.lFt };
}

/** Clamp an item position so its footprint stays inside a plot of plotW × plotL feet, snapped to the 1-ft grid. */
export function clampToPlot(x: number, y: number, el: Pick<BankElement, "wFt" | "lFt">, rotation: number, plotW: number, plotL: number): { x: number; y: number } {
  const { w, l } = footprint(el, rotation);
  return {
    x: Math.round(Math.max(0, Math.min(plotW - w, x))),
    y: Math.round(Math.max(0, Math.min(plotL - l, y))),
  };
}

/** Axis-aligned overlap test between two placed items. */
export function itemsOverlap(a: PlacedItem, b: PlacedItem): boolean {
  const ea = byId(a.ref);
  const eb = byId(b.ref);
  if (!ea || !eb) return false;
  const fa = footprint(ea, a.rotation);
  const fb = footprint(eb, b.rotation);
  return a.x < b.x + fb.w && b.x < a.x + fa.w && a.y < b.y + fb.l && b.y < a.y + fa.l;
}

/** uids of every item that overlaps at least one other item. */
export function overlappingUids(items: PlacedItem[]): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (itemsOverlap(items[i], items[j])) {
        out.add(items[i].uid);
        out.add(items[j].uid);
      }
    }
  }
  return out;
}

/** Car spaces reclaimed by the whole plot (one space = 160 sq ft), rounded to 0.1. */
export function carsReclaimed(totalSqFt: number): number {
  return Math.round((totalSqFt / SPACE_SQFT) * 10) / 10;
}

/**
 * All town stats derive from real square footage (1 grid cell = 1 ft) so the
 * numbers stay defensible.
 */
export function computeStats(items: PlacedItem[], totalSqFt: number): Stats {
  let used = 0, cLo = 0, cHi = 0, seats = 0, bikes = 0, units = 0;
  const cats: Partial<Record<Category, number>> = {};
  for (const p of items) {
    const b = byId(p.ref);
    if (!b) continue;
    const area = b.wFt * b.lFt;
    used += area;
    cLo += b.cost[0];
    cHi += b.cost[1];
    seats += b.seats ?? 0;
    bikes += b.bikes ?? 0;
    units += b.units ?? 0;
    cats[b.cat] = (cats[b.cat] ?? 0) + area;
  }
  return {
    used,
    pct: totalSqFt ? Math.round((used / totalSqFt) * 100) : 0,
    carsRemoved: carsReclaimed(totalSqFt),
    cLo, cHi, seats, bikes, units, cats,
  };
}
