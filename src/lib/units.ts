/*
 * Unit display. All geometry is stored in feet (1 grid cell = 1 ft); these
 * helpers only format values for display, converting to metric on request.
 */

export type Units = "imperial" | "metric";

const M_PER_FT = 0.3048;
const M2_PER_FT2 = M_PER_FT * M_PER_FT; // 0.09290304

/** Trim to at most one decimal, dropping a trailing ".0". */
const trim = (n: number): string => {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};

export const lenUnit = (units: Units): string => (units === "metric" ? "m" : "ft");
export const areaUnit = (units: Units): string => (units === "metric" ? "m²" : "sq ft");
export const areaUnitShort = (units: Units): string => (units === "metric" ? "m²" : "sf");

/** A single length value formatted with its unit, e.g. "8 ft" or "2.4 m". */
export const fmtLen = (feet: number, units: Units): string =>
  `${units === "metric" ? trim(feet * M_PER_FT) : trim(feet)} ${lenUnit(units)}`;

/** Just the length number, no unit. */
export const lenValue = (feet: number, units: Units): string =>
  units === "metric" ? trim(feet * M_PER_FT) : trim(feet);

/** A width × length footprint, e.g. "4 × 4 ft" or "1.2 × 1.2 m". */
export const fmtDims = (wFt: number, lFt: number, units: Units): string =>
  `${lenValue(wFt, units)} × ${lenValue(lFt, units)} ${lenUnit(units)}`;

/** Just the area number, no unit (integers for large values). */
export const areaValue = (sqft: number, units: Units): string => {
  if (units === "metric") {
    const m2 = sqft * M2_PER_FT2;
    return m2 >= 10 ? Math.round(m2).toLocaleString() : trim(m2);
  }
  return Math.round(sqft).toLocaleString();
};

/** An area with its full unit, e.g. "160 sq ft" or "14.9 m²". */
export const fmtArea = (sqft: number, units: Units): string => `${areaValue(sqft, units)} ${areaUnit(units)}`;

/** An area with the compact unit, e.g. "160 sf" or "14.9 m²". */
export const fmtAreaShort = (sqft: number, units: Units): string => `${areaValue(sqft, units)} ${areaUnitShort(units)}`;
