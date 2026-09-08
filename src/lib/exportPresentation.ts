import { jsPDF } from "jspdf";
import { SLIDE_H, SLIDE_W } from "./presentationSlide";
import { downloadDataUrl, slug } from "./exportPng";

/*
 * Rasterizes the presentation SVG string(s) to PNG / PDF at 16:9. The SVG is
 * the single source of truth (see presentationSlide.ts), so PNG, PDF, preview
 * and full-screen all match. Embedded design images are data URLs, so the
 * canvas is never tainted and toDataURL works.
 */

function svgToPng(svg: string, scale = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = SLIDE_W * scale;
      cv.height = SLIDE_H * scale;
      const ctx = cv.getContext("2d")!;
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
      resolve(cv.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to rasterize slide"));
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}

export async function downloadSlidePng(svg: string, name: string): Promise<void> {
  const png = await svgToPng(svg, 2); // 2560 × 1440 — crisp for slides
  downloadDataUrl(png, slug(name) + "-slide.png");
}

/** One 16:9 PDF page per slide (px unit → 1280 × 720 px = 16:9). */
export async function downloadSlidePdf(svgs: string[], name: string): Promise<void> {
  const doc = new jsPDF({ unit: "px", format: [SLIDE_W, SLIDE_H], orientation: "landscape" });
  for (let i = 0; i < svgs.length; i++) {
    if (i > 0) doc.addPage([SLIDE_W, SLIDE_H], "landscape");
    const png = await svgToPng(svgs[i], 1.5); // 1920×1080 — sharp for a slide, lighter file
    doc.addImage(png, "PNG", 0, 0, SLIDE_W, SLIDE_H);
  }
  doc.save(slug(name) + "-slides.pdf");
}
