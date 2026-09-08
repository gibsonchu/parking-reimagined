/*
 * Community Workshop Kit — configuration data.
 *
 * The printable board and Element cut-outs are generated from the SAME Elements
 * dataset (BANK) at the SAME scale, so a printed Café table and Bench keep their
 * real relative sizes on the printed board. Nothing here duplicates Element
 * facts; it only adds print-only options (paper sizes, quantities, blanks).
 */

export interface PaperSize {
  id: string;
  label: string;
  wIn: number; // landscape width, inches
  hIn: number; // landscape height, inches
}

/** Board prints landscape; the main workshop board favors 11 × 17. */
export const PAPER_SIZES: PaperSize[] = [
  { id: "tabloid", label: "Tabloid — 11 × 17 in", wIn: 17, hIn: 11 },
  { id: "letter", label: "Letter — 8.5 × 11 in", wIn: 11, hIn: 8.5 },
  { id: "poster", label: "Poster — 24 × 36 in", wIn: 36, hIn: 24 },
];

export const DEFAULT_PAPER_ID = "tabloid";

/** Reasonable starting quantities (by Element id) for the "Recommended Workshop Set". */
export const RECOMMENDED_QUANTITIES: Record<string, number> = {
  "cafe-table": 2,
  bench: 3,
  tree: 4,
  bikerack: 2,
  planter: 3,
  raingarden: 1,
  lawn: 1,
  busshelter: 1,
  daylight: 1,
  parcel: 1,
  trash: 2,
  art: 1,
};

/** Blank "Your Idea" cut-outs, sized in feet on the same grid as real Elements. */
export interface BlankPiece {
  id: string;
  label: string;
  wFt: number;
  lFt: number;
  count: number;
}
export const DEFAULT_BLANKS: BlankPiece[] = [
  { id: "blank-2", label: "2 × 2 ft", wFt: 2, lFt: 2, count: 2 },
  { id: "blank-4", label: "4 × 4 ft", wFt: 4, lFt: 4, count: 2 },
  { id: "blank-8", label: "4 × 8 ft", wFt: 4, lFt: 8, count: 1 },
];

export interface WorkshopIntroStep {
  n: number;
  title: string;
}
export const WORKSHOP_INTRO: WorkshopIntroStep[] = [
  { n: 1, title: "Print your space" },
  { n: 2, title: "Cut out the Elements" },
  { n: 3, title: "Build and discuss your design" },
];

export interface InstructionStep {
  n: number;
  verb: string;
  prompt: string;
}
export const INSTRUCTION_STEPS: InstructionStep[] = [
  { n: 1, verb: "LOOK", prompt: "What does this space need today?" },
  { n: 2, verb: "CHOOSE", prompt: "Pick Elements that respond to those needs." },
  { n: 3, verb: "DESIGN", prompt: "Place the Elements on the plan. Move them around and experiment." },
  { n: 4, verb: "DISCUSS", prompt: "Who benefits? What are the tradeoffs? What would you change?" },
];

export const FACILITATOR_PROMPTS: string[] = [
  "What works well about this space today?",
  "What is missing?",
  "Who uses this space?",
  "Who should we make sure is represented?",
  "What needs to remain?",
  "What could change?",
  "Who benefits from this design?",
  "Who could be negatively affected?",
  "Where will loading happen?",
  "Is accessibility accounted for?",
  "What would make this design easier to implement?",
  "What would you want to test first?",
];

export const OUTPUT_FIELDS: string[] = [
  "Project / location",
  "Our priorities",
  "What we changed",
  "What we kept",
  "Biggest tradeoff",
  "What should happen next",
];
