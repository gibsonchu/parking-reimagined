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
}

export const TEMPLATES: Template[] = [
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
