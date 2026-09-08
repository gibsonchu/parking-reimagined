export type Category = "dining" | "green" | "transit" | "housing" | "civic";

export interface BankElement {
  id: string;
  name: string;
  cat: Category;
  wFt: number;
  lFt: number; // footprint in feet
  icon: string; // sprite key
  cost: [number, number]; // low/high USD estimate
  seats?: number;
  bikes?: number;
  units?: number;
  impact: string; // short human-readable line
  source?: string; // citation for cost/impact
  /*
   * Methodology table fields. `wFt`/`lFt` are the dimensions the tool actually
   * draws and counts, reported as the object footprint. `planningArea`
   * describes the clearance-inclusive space in words, since clearance figures
   * are not yet sourced per element. `costBasis` states what the range covers.
   */
  planningArea: string;
  costBasis: string;
  /*
   * Optional long-form detail for the Elements catalog modal. Editorial content
   * (description, benefits, precedents, funding, citations) normally lives in
   * the sourced DETAILS map in src/data/elementDetails.ts; setting a field here
   * overrides it for a specific element.
   */
  shortDescription?: string;
  benefits?: string[];
  considerations?: string;
  maintenance?: string;
  precedents?: ElementPrecedent[];
  funding?: string[];
  citations?: ElementCitation[];
}

/** Attribution for an openly-licensed photo (e.g. from Wikimedia Commons). */
export interface PhotoCredit {
  author: string;
  license: string; // e.g. "CC BY-SA 4.0", "Public domain"
  href: string; // link to the source / file page carrying the full license
}

/** A real-world precedent shown in the Elements modal ("See it in the real world"). */
export interface ElementPrecedent {
  title: string;
  place: string;
  year: string;
  source: string;
  image?: string; // openly-licensed photo (in /public); a placeholder shows until set
  credit?: PhotoCredit; // required when `image` is a CC-licensed photo
}

/** A source citation shown in the Elements modal's "View sources" disclosure. */
export interface ElementCitation {
  text: string;
  href: string;
}

/*
 * DATA-SOURCING TODO — these cost/impact figures are placeholder
 * planning-level ranges, NOT sourced. Before real advocacy use, verify each
 * against a citable figure and update `source`:
 *  - [ ] Café/communal tables & benches: streetery furnishing costs (NYC DOT Open Restaurants / SF Shared Spaces guides)
 *  - [ ] Planters & trees: municipal street-tree + planter install costs (e.g. NYC Parks tree cost data)
 *  - [ ] Rain garden: EPA green-infrastructure cost benchmarks per sq ft
 *  - [ ] Bike rack / corral: PBOT & SFMTA bike-corral program costs
 *  - [ ] Bus shelter: transit-agency shelter procurement (e.g. King County Metro, LA Metro)
 *  - [ ] Studio home (ADU): regional ADU cost studies (e.g. UC Berkeley ToC ADU survey)
 *  - [ ] Containerized trash: NYC DSNY containerization pilot costs
 *  - [ ] Parcel locker: vendor list pricing (e.g. Luxer One, Parcel Pending)
 *  - [ ] Corner bumpout / daylighting: NACTO Urban Street Design Guide cost ranges
 */
const PLACEHOLDER = "Placeholder planning-level estimate — needs citation (see SOURCES.md)";

export const BANK: BankElement[] = [
  { id: "cafe-table", name: "Café table", cat: "dining", wFt: 4, lFt: 4, icon: "table2", cost: [150, 300], seats: 2, impact: "Seats 2 diners", source: PLACEHOLDER, planningArea: "Includes seating clearance", costBasis: "Equipment only" },
  { id: "comm-table", name: "Big table", cat: "dining", wFt: 3, lFt: 8, icon: "table6", cost: [1500, 3000], seats: 6, impact: "Seats ~6", source: PLACEHOLDER, planningArea: "Includes seating clearance", costBasis: "Equipment only" },
  { id: "bench", name: "Bench", cat: "dining", wFt: 4, lFt: 2, icon: "bench", cost: [500, 1700], seats: 3, impact: "Rest / gather for 3", source: PLACEHOLDER, planningArea: "Includes seated clearance", costBasis: "Equipment only" },
  { id: "counter", name: "Bar counter", cat: "dining", wFt: 2, lFt: 8, icon: "counter", cost: [4000, 10000], seats: 4, impact: "Perch seating for 4", source: PLACEHOLDER, planningArea: "Includes standing clearance", costBasis: "Equipment only" },
  { id: "planter", name: "Planter", cat: "green", wFt: 2, lFt: 4, icon: "planter", cost: [500, 1300], impact: "Greenery + stormwater", source: PLACEHOLDER, planningArea: "As drawn", costBasis: "Planter and soil" },
  { id: "tree", name: "Tree", cat: "green", wFt: 6, lFt: 6, icon: "tree", cost: [3000, 4000], impact: "Shade + canopy", source: PLACEHOLDER, planningArea: "Includes canopy spread", costBasis: "Tree and planting" },
  { id: "raingarden", name: "Rain garden", cat: "green", wFt: 20, lFt: 5, icon: "rain", cost: [1500, 6000], impact: "Absorbs runoff", source: PLACEHOLDER, planningArea: "Site-specific", costBasis: "Constructed project" },
  { id: "lawn", name: "Turf patch", cat: "green", wFt: 6, lFt: 8, icon: "lawn", cost: [60, 200], impact: "Soft play / sit", source: PLACEHOLDER, planningArea: "As drawn", costBasis: "Materials and installation" },
  { id: "bikerack", name: "Bike rack", cat: "transit", wFt: 2, lFt: 6, icon: "bike", cost: [300, 1200], bikes: 2, impact: "Parks 2 bikes", source: PLACEHOLDER, planningArea: "Includes bike clearance", costBasis: "Rack only" },
  { id: "bikecorral", name: "Bike corral", cat: "transit", wFt: 20, lFt: 8, icon: "bike", cost: [1500, 4000], bikes: 10, impact: "Parks ~10 bikes", source: PLACEHOLDER, planningArea: "Includes bike clearance", costBasis: "Racks and protection" },
  { id: "busshelter", name: "Bus shelter", cat: "transit", wFt: 5, lFt: 10, icon: "shelter", cost: [15000, 200000], impact: "Sheltered transit stop", source: PLACEHOLDER, planningArea: "Includes boarding area", costBasis: "Shelter and installation" },
  { id: "scooter", name: "Scooter dock", cat: "transit", wFt: 2, lFt: 4, icon: "scooter", cost: [700, 2500], impact: "Micromobility hub", source: PLACEHOLDER, planningArea: "Includes docking clearance", costBasis: "Dock hardware" },
  { id: "adu", name: "Studio ADU", cat: "housing", wFt: 20, lFt: 20, icon: "adu", cost: [180000, 350000], units: 1, impact: "1 home, ~400 sf", source: PLACEHOLDER, planningArea: "Excludes required setbacks", costBasis: "Constructed project" },
  { id: "kiosk", name: "Vendor kiosk", cat: "civic", wFt: 6, lFt: 3, icon: "kiosk", cost: [4000, 8000], impact: "Small business space", source: PLACEHOLDER, planningArea: "Includes service frontage", costBasis: "Structure only" },
  { id: "trash", name: "Trash bins", cat: "civic", wFt: 2, lFt: 2, icon: "trash", cost: [200, 800], impact: "Rat-proof waste, off sidewalk", source: PLACEHOLDER, planningArea: "Includes collection access", costBasis: "Containers only" },
  { id: "library", name: "Little library", cat: "civic", wFt: 1.5, lFt: 1.5, icon: "book", cost: [250, 400], impact: "Book share", source: PLACEHOLDER, planningArea: "Includes browsing clearance", costBasis: "Kit only" },
  { id: "parcel", name: "Parcel locker", cat: "civic", wFt: 3, lFt: 5, icon: "locker", cost: [2000, 5000], impact: "Package pickup", source: PLACEHOLDER, planningArea: "Includes pickup clearance", costBasis: "Locker hardware" },
  { id: "art", name: "Public art", cat: "civic", wFt: 3, lFt: 3, icon: "art", cost: [500, 15000], impact: "Placemaking", source: PLACEHOLDER, planningArea: "Site-specific", costBasis: "Artwork only" },
  { id: "daylight", name: "Corner bumpout", cat: "civic", wFt: 6, lFt: 6, icon: "daylight", cost: [100, 10000], impact: "Safer sightlines", source: PLACEHOLDER, planningArea: "Site-specific", costBasis: "Quick-build treatment" },
];

export const byId = (id: string): BankElement | undefined => BANK.find((b) => b.id === id);
