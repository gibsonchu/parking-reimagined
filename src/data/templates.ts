export interface TemplateItem {
  ref: string;
  x: number;
  y: number;
  rotation?: number; // 90 turns a wide element to run lengthwise in a narrow plot
}

export interface Template {
  id: string;
  name: string;
  scale: string;
  emoji: string;
  blurb: string;
  items: TemplateItem[];
  /** Overrides the scale's dimensions for a curated, larger scenario. */
  customDims?: { wFt: number; lFt: number };
  /** An optional design-exercise prompt shown in the editor when loaded. */
  prompt?: string;
  /** An optional reference link shown with the prompt (e.g. a research resource). */
  reference?: { label: string; href: string };
}

export const TEMPLATES: Template[] = [
  {
    id: "ltn", name: "Low-Traffic Neighborhood", scale: "lot", emoji: "🚸",
    customDims: { wFt: 30, lFt: 48 },
    blurb: "A residential block reclaimed from cut-through traffic — filter planters, a pocket park & room to gather.",
    prompt: "How would you use this curb space in a Low Traffic Neighborhood?",
    reference: {
      label: "Find a candidate neighborhood with Open Plans' Neighborhood Assessments",
      href: "https://neighborhoods.openplans.org/",
    },
    items: [
      // ── Modal filter (near gateway): planters flanked by trees close the block to through-traffic ──
      { ref: "tree", x: 0, y: 0 },
      { ref: "planter", x: 8, y: 1 }, { ref: "planter", x: 13, y: 1 }, { ref: "planter", x: 18, y: 1 },
      { ref: "tree", x: 24, y: 0 },
      // ── Commons: left (stormwater + shade) ──
      { ref: "raingarden", x: 0, y: 9, rotation: 90 },
      { ref: "tree", x: 0, y: 31 },
      { ref: "bench", x: 1, y: 40 },
      // ── Commons: center (play + gathering) ──
      { ref: "lawn", x: 7, y: 9 },
      { ref: "cafe-table", x: 8, y: 19 },
      { ref: "comm-table", x: 8, y: 25 },
      { ref: "library", x: 8, y: 35 },
      { ref: "art", x: 11, y: 36 },
      // ── Commons: right (bike parking + seating) ──
      { ref: "bikecorral", x: 16, y: 9, rotation: 90 },
      { ref: "tree", x: 24, y: 9 },
      { ref: "bench", x: 25, y: 17 },
      { ref: "cafe-table", x: 25, y: 21 },
      { ref: "tree", x: 24, y: 31 },
      { ref: "bench", x: 25, y: 40 },
      // ── Modal filter (far gateway): planters + a daylighted crossing ──
      { ref: "tree", x: 0, y: 42 },
      { ref: "planter", x: 8, y: 43 }, { ref: "planter", x: 13, y: 43 }, { ref: "planter", x: 18, y: 43 },
      { ref: "daylight", x: 24, y: 42 },
    ],
  },
  {
    id: "dining", name: "Outdoor dining", scale: "single", emoji: "🍽️",
    blurb: "The classic one-spot café parklet — tables & planters.",
    items: [
      { ref: "tree", x: 1, y: 1 },
      { ref: "cafe-table", x: 2, y: 8 }, { ref: "planter", x: 6, y: 8 },
      { ref: "cafe-table", x: 2, y: 13 }, { ref: "planter", x: 6, y: 13 },
      { ref: "bench", x: 2, y: 18 },
    ],
  },
  {
    id: "transit", name: "Transit stop", scale: "double", emoji: "🚌",
    blurb: "Bus shelter, bikes & a safer corner — two spaces.",
    items: [
      { ref: "busshelter", x: 0, y: 0 },
      { ref: "bikecorral", x: 8, y: 0, rotation: 90 },
      { ref: "daylight", x: 0, y: 11 }, { ref: "planter", x: 6, y: 11 },
      { ref: "bench", x: 1, y: 18 },
    ],
  },
  {
    id: "housing", name: "Studio ADU", scale: "lot", emoji: "🏠",
    blurb: "A 400 sq ft studio ADU with a green yard on a small lot.",
    items: [
      { ref: "adu", x: 4, y: 4 },
      { ref: "tree", x: 28, y: 4 }, { ref: "tree", x: 36, y: 4 },
      { ref: "lawn", x: 28, y: 12 }, { ref: "planter", x: 36, y: 12 }, { ref: "bench", x: 36, y: 18 },
      { ref: "lawn", x: 4, y: 28 }, { ref: "tree", x: 14, y: 28 },
      { ref: "kiosk", x: 28, y: 28 }, { ref: "bikerack", x: 36, y: 26 }, { ref: "parcel", x: 42, y: 26 },
      { ref: "planter", x: 4, y: 40 }, { ref: "bench", x: 10, y: 40 }, { ref: "art", x: 28, y: 36 },
    ],
  },
  {
    id: "green", name: "Pocket park", scale: "double", emoji: "🌳",
    blurb: "A pocket park with a rain garden, tree & turf — two spaces.",
    items: [
      { ref: "raingarden", x: 0, y: 0, rotation: 90 },
      { ref: "tree", x: 6, y: 1 },
      { ref: "lawn", x: 6, y: 8 },
      { ref: "bench", x: 6, y: 17 },
      { ref: "library", x: 13, y: 2 }, { ref: "planter", x: 13, y: 8 },
    ],
  },
  {
    id: "civic", name: "Service curb", scale: "curb", emoji: "📦",
    blurb: "Trash, lockers & bike parking, off the sidewalk.",
    items: [
      { ref: "trash", x: 3, y: 3 }, { ref: "trash", x: 3, y: 7 },
      { ref: "parcel", x: 2, y: 12 }, { ref: "bikerack", x: 3, y: 21 },
      { ref: "planter", x: 3, y: 31 }, { ref: "art", x: 2, y: 40 },
      { ref: "library", x: 3, y: 48 }, { ref: "bench", x: 2, y: 55 },
      { ref: "kiosk", x: 1, y: 63 }, { ref: "planter", x: 3, y: 71 },
    ],
  },
];
