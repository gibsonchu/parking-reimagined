export interface Scale {
  id: string;
  name: string;
  wFt: number;
  lFt: number;
  tag: string; // descriptive suffix; the area prefix is formatted per unit
  adjustable?: boolean;
}

export const SCALES: Scale[] = [
  { id: "single", name: "One spot", wFt: 8, lFt: 20, tag: "one metered space" },
  { id: "double", name: "Two spots", wFt: 16, lFt: 20, tag: "two spaces side by side" },
  { id: "curb", name: "Curb stretch", wFt: 8, lFt: 80, tag: "4 spots" },
  { id: "lot", name: "Small lot", wFt: 50, lFt: 60, tag: "adjustable", adjustable: true },
];

export const scaleById = (id: string): Scale => SCALES.find((s) => s.id === id) ?? SCALES[1];

/** Standard car parking space used for "spaces reclaimed" math. */
export const SPACE_SQFT = 160; // 8 ft × 20 ft
export const SPACE_W_FT = 8;
export const SPACE_L_FT = 20;

/** Adjustable-lot bounds. */
export const LOT_MIN_FT = 10;
export const LOT_MAX_FT = 120;
