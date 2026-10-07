import { downloadDataUrl, slug } from "./exportPng";

/*
 * Lets the 3D view (Plot3D) register its WebGL canvas so the existing Snapshot
 * and Present flows can export the 3D render instead of the 2D plan when the 3D
 * view is active. The canvas is registered on mount and cleared on unmount, so
 * `has3DCanvas()` doubles as "is the 3D view currently showing?". The canvas is
 * created with preserveDrawingBuffer so toDataURL works at any time.
 */

let canvasEl: HTMLCanvasElement | null = null;

export function register3DCanvas(c: HTMLCanvasElement | null) {
  canvasEl = c;
}

export function has3DCanvas(): boolean {
  return !!canvasEl;
}

export function capture3DDataUrl(): string | null {
  if (!canvasEl) return null;
  try {
    return canvasEl.toDataURL("image/png");
  } catch {
    return null;
  }
}

/** Download the current 3D render as a PNG. Returns false if nothing to capture. */
export function download3DPng(name: string): boolean {
  const d = capture3DDataUrl();
  if (!d) return false;
  downloadDataUrl(d, `${slug(name || "design")}-3d.png`);
  return true;
}
