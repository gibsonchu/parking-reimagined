import { create } from "zustand";
import { byId, type Category } from "../data/elements";
import { scaleById, type Scale } from "../data/scales";
import type { Template } from "../data/templates";
import { clampToPlot, type PlacedItem } from "../lib/impact";
import type { Units } from "../lib/units";

const UNITS_KEY = "reclaim.units";
const loadUnits = (): Units => {
  try {
    return localStorage.getItem(UNITS_KEY) === "metric" ? "metric" : "imperial";
  } catch {
    return "imperial";
  }
};

export interface Project {
  id?: string;
  name: string;
  scaleId: string;
  customDims?: { wFt: number; lFt: number }; // for the adjustable lot or a curated preset
  prompt?: string; // optional design-exercise prompt (from a template)
  items: PlacedItem[];
}

export const uid = () => Math.random().toString(36).slice(2, 9);

/** Plot dimensions in feet for a project (custom dims win for the adjustable lot). */
export function plotDims(project: Pick<Project, "scaleId" | "customDims">): { wFt: number; lFt: number; scale: Scale } {
  const scale = scaleById(project.scaleId);
  const wFt = project.customDims?.wFt ?? scale.wFt;
  const lFt = project.customDims?.lFt ?? scale.lFt;
  return { wFt, lFt, scale };
}

/**
 * Top-level destinations. "design" is the landing page; "choose" is the space
 * picker it leads into (reached via the CTA, not the nav).
 */
export type Page =
  | "design"
  | "choose"
  | "templates"
  | "elements"
  | "library"
  | "action"
  | "workshop"
  | "methodology"
  | "about";

interface ProjectState {
  stage: "start" | "edit";
  page: Page;
  project: Project;
  selectedUid: string | null;
  activeCat: Category;
  showBefore: boolean;
  justPlacedUid: string | null;
  notice: string | null; // transient message, e.g. when a placement is blocked
  units: Units; // display unit for lengths and areas (geometry stays in feet)
  pendingElementId: string | null; // Elements-catalog element to auto-open on arrival

  goTo: (page: Page) => void;
  setUnits: (units: Units) => void;
  openElementInCatalog: (id: string) => void;
  clearPendingElement: () => void;
  startBlank: (scale: Scale, customDims?: { wFt: number; lFt: number }) => void;
  startTemplate: (t: Template) => void;
  openProject: (p: Project) => void;
  backToStart: () => void;
  setName: (name: string) => void;
  setActiveCat: (cat: Category) => void;
  setShowBefore: (v: boolean) => void;
  select: (uid: string | null) => void;
  addElement: (ref: string, at?: { x: number; y: number }) => void;
  moveItem: (uid: string, x: number, y: number) => void;
  nudgeItem: (uid: string, dx: number, dy: number) => void;
  rotateItem: (uid: string) => void;
  removeItem: (uid: string) => void;
  markProjectSaved: (id: string) => void;
}

const emptyProject: Project = { name: "", scaleId: "single", items: [] };

// guards the auto-clear timer so a newer notice can't be wiped by an older one
let noticeToken = 0;

export const useProject = create<ProjectState>((set, get) => ({
  stage: "start",
  page: "design",
  project: emptyProject,
  selectedUid: null,
  activeCat: "dining",
  showBefore: false,
  justPlacedUid: null,
  notice: null,
  units: loadUnits(),
  pendingElementId: null,

  // navigate to the Elements catalog and flag an element to auto-open there
  openElementInCatalog: (id) => set({ page: "elements", stage: "start", selectedUid: null, pendingElementId: id }),
  clearPendingElement: () => set({ pendingElementId: null }),

  setUnits: (units) => {
    try {
      localStorage.setItem(UNITS_KEY, units);
    } catch {
      /* preference is best-effort */
    }
    set({ units });
  },

  // leaving the editor for a nav destination always returns to page view
  goTo: (page) => set({ page, stage: "start", selectedUid: null }),

  startBlank: (scale, customDims) =>
    set({
      stage: "edit",
      selectedUid: null,
      showBefore: false,
      project: {
        name: "",
        scaleId: scale.id,
        customDims: scale.adjustable ? customDims : undefined,
        items: [],
      },
    }),

  startTemplate: (t) =>
    set({
      stage: "edit",
      selectedUid: null,
      showBefore: false,
      project: {
        name: t.name,
        scaleId: t.scale,
        customDims: t.customDims,
        prompt: t.prompt,
        items: t.items.map((it) => ({ uid: uid(), ref: it.ref, x: it.x, y: it.y, rotation: it.rotation ?? 0 })),
      },
    }),

  openProject: (p) => set({ stage: "edit", selectedUid: null, showBefore: false, project: p }),

  // "New plot" returns to the size picker rather than the landing page
  backToStart: () => set({ stage: "start", page: "choose", selectedUid: null }),

  setName: (name) => set((s) => ({ project: { ...s.project, name } })),
  setActiveCat: (activeCat) => set({ activeCat }),
  setShowBefore: (showBefore) => set({ showBefore }),
  select: (selectedUid) => set({ selectedUid }),

  addElement: (ref, at) => {
    const { project } = get();
    const b = byId(ref);
    if (!b) return;
    const { wFt, lFt } = plotDims(project);
    const totalSqFt = wFt * lFt;

    // Don't let the placed footprints exceed the site area.
    const newArea = b.wFt * b.lFt;
    const usedArea = project.items.reduce((sum, it) => {
      const e = byId(it.ref);
      return sum + (e ? e.wFt * e.lFt : 0);
    }, 0);
    if (usedArea + newArea > totalSqFt) {
      const msg = `No room left — ${b.name} needs ${newArea} sq ft, but only ${Math.max(0, totalSqFt - usedArea)} sq ft is free.`;
      set({ notice: msg });
      const token = ++noticeToken;
      setTimeout(() => {
        if (token === noticeToken) set({ notice: null });
      }, 3200);
      return;
    }

    const want = at ?? { x: (wFt - b.wFt) / 2, y: 2 };
    const pos = clampToPlot(want.x, want.y, b, 0, wFt, lFt);
    const item: PlacedItem = { uid: uid(), ref, x: pos.x, y: pos.y, rotation: 0 };
    set({
      project: { ...project, items: [...project.items, item] },
      selectedUid: item.uid,
      justPlacedUid: item.uid,
      notice: null,
    });
    setTimeout(() => {
      if (get().justPlacedUid === item.uid) set({ justPlacedUid: null });
    }, 400);
  },

  moveItem: (u, x, y) =>
    set((s) => {
      const { wFt, lFt } = plotDims(s.project);
      return {
        project: {
          ...s.project,
          items: s.project.items.map((it) => {
            if (it.uid !== u) return it;
            const b = byId(it.ref);
            if (!b) return it;
            const pos = clampToPlot(x, y, b, it.rotation, wFt, lFt);
            return { ...it, ...pos };
          }),
        },
      };
    }),

  nudgeItem: (u, dx, dy) => {
    const it = get().project.items.find((i) => i.uid === u);
    if (it) get().moveItem(u, it.x + dx, it.y + dy);
  },

  rotateItem: (u) =>
    set((s) => {
      const { wFt, lFt } = plotDims(s.project);
      return {
        project: {
          ...s.project,
          items: s.project.items.map((it) => {
            if (it.uid !== u) return it;
            const b = byId(it.ref);
            if (!b) return it;
            const rotation = (it.rotation + 90) % 360;
            const pos = clampToPlot(it.x, it.y, b, rotation, wFt, lFt);
            return { ...it, rotation, ...pos };
          }),
        },
      };
    }),

  removeItem: (u) =>
    set((s) => ({
      project: { ...s.project, items: s.project.items.filter((it) => it.uid !== u) },
      selectedUid: s.selectedUid === u ? null : s.selectedUid,
    })),

  markProjectSaved: (id) => set((s) => ({ project: { ...s.project, id } })),
}));
