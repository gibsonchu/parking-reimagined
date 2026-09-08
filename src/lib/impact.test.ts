import { describe, expect, it } from "vitest";
import { carsReclaimed, clampToPlot, computeStats, footprint, itemsOverlap, overlappingUids, type PlacedItem } from "./impact";

const item = (ref: string, x = 0, y = 0, rotation = 0, uid = Math.random().toString(36).slice(2)): PlacedItem => ({ uid, ref, x, y, rotation });

describe("footprint", () => {
  it("keeps dimensions at 0° and 180°", () => {
    expect(footprint({ wFt: 3, lFt: 8 }, 0)).toEqual({ w: 3, l: 8 });
    expect(footprint({ wFt: 3, lFt: 8 }, 180)).toEqual({ w: 3, l: 8 });
  });
  it("swaps dimensions at 90° and 270°", () => {
    expect(footprint({ wFt: 3, lFt: 8 }, 90)).toEqual({ w: 8, l: 3 });
    expect(footprint({ wFt: 3, lFt: 8 }, 270)).toEqual({ w: 8, l: 3 });
  });
  it("normalizes negative rotations", () => {
    expect(footprint({ wFt: 3, lFt: 8 }, -90)).toEqual({ w: 8, l: 3 });
  });
});

describe("clampToPlot", () => {
  it("snaps to the 1-ft grid", () => {
    expect(clampToPlot(2.4, 3.6, { wFt: 2, lFt: 2 }, 0, 20, 26)).toEqual({ x: 2, y: 4 });
  });
  it("keeps items inside the plot", () => {
    expect(clampToPlot(-5, 100, { wFt: 4, lFt: 4 }, 0, 20, 26)).toEqual({ x: 0, y: 22 });
  });
  it("respects rotated footprints at the boundary", () => {
    // 3×8 rotated 90° is 8 wide, so max x on a 20-ft plot is 12
    expect(clampToPlot(19, 0, { wFt: 3, lFt: 8 }, 90, 20, 26)).toEqual({ x: 12, y: 0 });
  });
});

describe("computeStats", () => {
  it("returns zeros for an empty plot", () => {
    const s = computeStats([], 520);
    expect(s.used).toBe(0);
    expect(s.pct).toBe(0);
    expect(s.cLo).toBe(0);
    expect(s.seats).toBe(0);
    expect(s.cats).toEqual({});
  });

  it("sums area, cost, seats and category breakdown from real square footage", () => {
    // cafe-table: 4×4=16sf, $150–300, 2 seats (dining)
    // tree: 6×6=36sf, $3000–4000 (green)
    // bikerack: 2×6=12sf, $300–1200, 2 bikes (transit)
    const s = computeStats([item("cafe-table"), item("tree", 5, 5), item("bikerack", 10, 10)], 160);
    expect(s.used).toBe(64);
    expect(s.pct).toBe(Math.round((64 / 160) * 100));
    expect(s.cLo).toBe(3450);
    expect(s.cHi).toBe(5500);
    expect(s.seats).toBe(2);
    expect(s.bikes).toBe(2);
    expect(s.units).toBe(0);
    expect(s.cats).toEqual({ dining: 16, green: 36, transit: 12 });
  });

  it("counts housing units", () => {
    const s = computeStats([item("adu")], 3000);
    expect(s.units).toBe(1);
    expect(s.used).toBe(400); // studio ADU is 20×20 ft
  });

  it("ignores unknown refs instead of crashing", () => {
    const s = computeStats([item("does-not-exist")], 160);
    expect(s.used).toBe(0);
  });
});

describe("carsReclaimed", () => {
  it("uses one space = 160 sq ft, rounded to 0.1", () => {
    expect(carsReclaimed(160)).toBe(1);
    expect(carsReclaimed(520)).toBe(3.3);
    expect(carsReclaimed(640)).toBe(4);
  });
});

describe("overlap", () => {
  it("detects overlapping footprints", () => {
    expect(itemsOverlap(item("cafe-table", 0, 0), item("cafe-table", 3, 3))).toBe(true);
  });
  it("treats edge-adjacent items as not overlapping", () => {
    expect(itemsOverlap(item("cafe-table", 0, 0), item("cafe-table", 4, 0))).toBe(false);
  });
  it("accounts for rotation", () => {
    // comm-table is 3×8; at 90° it spans 8 wide from x=0, overlapping x=5,
    // but unrotated (3 wide) it does not reach x=5
    expect(itemsOverlap(item("comm-table", 0, 0, 90), item("cafe-table", 5, 0))).toBe(true);
    expect(itemsOverlap(item("comm-table", 0, 0, 0), item("cafe-table", 5, 0))).toBe(false);
  });
  it("collects all overlapping uids", () => {
    const a = item("cafe-table", 0, 0, 0, "a");
    const b = item("cafe-table", 2, 2, 0, "b");
    const c = item("cafe-table", 12, 12, 0, "c");
    expect(overlappingUids([a, b, c])).toEqual(new Set(["a", "b"]));
  });
});
