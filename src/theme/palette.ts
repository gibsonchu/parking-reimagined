import type { Category } from "../data/elements";

/*
 * Site-plan / real-estate floor-plan palette: paper whites, thin dark
 * linework, pastel zone washes, and the dimension-arrow green.
 * (Key names kept from the original cozy palette so component styles map 1:1.)
 */
export const C = {
  ink: "#1f2328", // primary text + linework
  inkSoft: "#6b7280", // secondary text
  grass: "#fbf9f2", // plot paper fill
  grassDark: "#e7e4d9", // plot grid line
  grassTile: "#f3f0e6", // thumbnail grid alt
  soil: "#e6e1d3",
  wood: "#d8d4c9", // light rule / card border
  woodDark: "#2a2d31", // strong drawing border
  sky: "#eef1f4",
  cream: "#ffffff", // page background
  creamPanel: "#ffffff",
  sun: "#1f2328", // primary button fill
  sunDeep: "#000000",
  leaf: "#2e9e4f", // dimension-arrow green accent
  white: "#ffffff",
} as const;

export interface CatTheme {
  label: string;
  color: string; // accent (chips, land-use bars)
  soft: string; // zone wash
  deep: string; // outline / label text
}

export const CAT: Record<Category, CatTheme> = {
  dining: { label: "Seating", color: "#c9557e", soft: "#f9e3ec", deep: "#8f3d5c" },
  green: { label: "Nature", color: "#3f9d63", soft: "#d9efdf", deep: "#2f6b45" },
  transit: { label: "Mobility", color: "#4a80c4", soft: "#dde8f6", deep: "#33608f" },
  housing: { label: "Home", color: "#7f74c9", soft: "#e2dff4", deep: "#544a91" },
  civic: { label: "Service", color: "#c08c3f", soft: "#f3e7cd", deep: "#7d5a22" },
};

export const FONT = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

export const money = (n: number) => "$" + Math.round(n).toLocaleString();
