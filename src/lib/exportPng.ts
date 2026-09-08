import type Konva from "konva";
import { C } from "../theme/palette";

/*
 * The PlotCanvas registers its Konva stage here so the export bar (and the
 * proposal exporter) can snapshot it without prop-drilling refs.
 */

let stage: Konva.Stage | null = null;

export function registerStage(s: Konva.Stage | null) {
  stage = s;
}

export function plotPngDataUrl(pixelRatio = 3): string | null {
  if (!stage) return null;
  return stage.toDataURL({ pixelRatio, mimeType: "image/png" });
}

/** Stage snapshot composed with the chunky wooden frame + drop-shadow lip. */
export async function framedPlotPng(pixelRatio = 3): Promise<string | null> {
  const raw = plotPngDataUrl(pixelRatio);
  if (!raw) return null;
  const img = await new Promise<HTMLImageElement | null>((resolve) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => resolve(null);
    i.src = raw;
  });
  if (!img) return raw;

  // white sheet margin + thin drawing border, like a plan sheet
  const margin = 10 * pixelRatio;
  const border = 2 * pixelRatio;
  const cv = document.createElement("canvas");
  cv.width = img.width + (margin + border) * 2;
  cv.height = img.height + (margin + border) * 2;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = C.woodDark;
  ctx.fillRect(margin, margin, img.width + border * 2, img.height + border * 2);
  ctx.drawImage(img, margin + border, margin + border);
  return cv.toDataURL("image/png");
}

export function slug(name: string): string {
  return name.trim().replace(/\s+/g, "-").toLowerCase() || "parking-reimagined";
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export async function exportPlotPng(projectName: string): Promise<boolean> {
  const url = await framedPlotPng();
  if (!url) return false;
  downloadDataUrl(url, slug(projectName) + "-plot.png");
  return true;
}
