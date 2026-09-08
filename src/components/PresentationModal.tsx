import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { framedPlotPng } from "../lib/exportPng";
import { downloadSlidePdf, downloadSlidePng } from "../lib/exportPresentation";
import {
  buildDetailsSVG,
  buildPresentationSVG,
  buildSlideInput,
  type SlideMeta,
} from "../lib/presentationSlide";
import { useModalDialog } from "../lib/useModalDialog";
import { useProject } from "../state/useProject";
import { C } from "../theme/palette";
import { PresentationDesignView } from "./PresentationDesignView";

/** Preview + export a finished design as a 16:9 presentation slide. */
export function PresentationModal({ onClose }: { onClose: () => void }) {
  const project = useProject((s) => s.project);
  const units = useProject((s) => s.units);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [planImage, setPlanImage] = useState<string | null>(null);
  const [meta, setMeta] = useState<SlideMeta>({ title: project.name, location: "", description: "" });
  const [includeDetails, setIncludeDetails] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [busy, setBusy] = useState(false);

  useModalDialog(dialogRef, closeRef, onClose);

  // snapshot the live design once (the Konva stage is mounted behind us).
  // pixelRatio 2 is plenty at slide size and keeps the exported files light.
  useEffect(() => {
    let ok = true;
    framedPlotPng(2).then((png) => ok && setPlanImage(png));
    return () => {
      ok = false;
    };
  }, []);

  const input = buildSlideInput(project, meta, planImage, units);
  const mainSvg = buildPresentationSVG(input);
  const detailsSvg = buildDetailsSVG(input);
  const slides = includeDetails ? [mainSvg, detailsSvg] : [mainSvg];
  const fileBase = meta.title || project.name || "design";

  const run = (fn: () => Promise<void>) => async () => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const field = (label: string, value: string, onChange: (v: string) => void, placeholder: string) => (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold tracking-[0.06em] uppercase" style={{ color: C.inkSoft }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded px-3 py-1.5 text-[14px] outline-none focus-visible:ring-2"
        style={{ border: `1px solid ${C.woodDark}`, background: C.white, color: C.ink }}
      />
    </label>
  );

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[100] flex items-stretch justify-center overflow-y-auto sm:items-start sm:p-6"
        style={{ background: "rgba(31,35,40,.5)" }}
        onClick={onClose}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Presentation slide export"
          onClick={(e) => e.stopPropagation()}
          className="flex h-full w-full max-w-[940px] flex-col overflow-hidden bg-white sm:my-auto sm:h-auto sm:max-h-[92vh] sm:rounded-lg"
          style={{ border: `1px solid ${C.woodDark}`, boxShadow: "0 16px 48px rgba(31,35,40,.28)", color: C.ink }}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-4 px-5 py-3 sm:px-7"
            style={{ borderBottom: `1px solid ${C.wood}`, background: C.white }}
          >
            <span className="text-[15px] font-extrabold">Present your design</span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close presentation export"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[5px]"
              style={{ border: `1px solid ${C.woodDark}`, background: C.white }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6 L18 18 M18 6 L6 18" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
            {/* preview */}
            <div className="overflow-hidden rounded-md" style={{ border: `1px solid ${C.woodDark}` }}>
              <PresentationDesignView svg={mainSvg} />
            </div>
            {includeDetails && (
              <div className="mt-3 overflow-hidden rounded-md" style={{ border: `1px solid ${C.wood}` }}>
                <PresentationDesignView svg={detailsSvg} />
              </div>
            )}

            {/* optional project text */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {field("Project title", meta.title, (v) => setMeta((m) => ({ ...m, title: v })), "Title your design")}
              {field("Location", meta.location ?? "", (v) => setMeta((m) => ({ ...m, location: v })), "Location")}
            </div>
            <div className="mt-3">
              {field(
                "One-sentence description",
                meta.description ?? "",
                (v) => setMeta((m) => ({ ...m, description: v })),
                "e.g., Two parking spaces reimagined as neighborhood seating and greenery.",
              )}
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-[13.5px] font-semibold" style={{ color: C.ink }}>
              <input type="checkbox" checked={includeDetails} onChange={(e) => setIncludeDetails(e.target.checked)} />
              Include a second “Design details” slide
            </label>

            {/* actions */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button onClick={run(() => downloadSlidePng(mainSvg, fileBase))} disabled={busy} className="sun-btn">
                Download PNG
              </button>
              <button onClick={run(() => downloadSlidePdf(slides, fileBase))} disabled={busy} className="wood-btn">
                Download PDF
              </button>
              <button onClick={() => setFullscreen(true)} className="wood-btn">
                Present Full Screen
              </button>
            </div>
            <p className="mt-3 mb-0 text-[12.5px] leading-relaxed" style={{ color: C.inkSoft }}>
              Drop the PNG or PDF directly into PowerPoint, Google Slides, or Keynote.
            </p>
          </div>
        </div>
      </div>

      {fullscreen && <PresentationFullScreen svg={mainSvg} onExit={() => setFullscreen(false)} />}
    </>,
    document.body,
  );
}

/** Distraction-free projector view. Escape (capture, so it beats the modal) exits. */
function PresentationFullScreen({ svg, onExit }: { svg: string; onExit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => {});

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation(); // don't let the underlying modal also close
        exit();
      }
    };
    document.addEventListener("keydown", onKey, true);

    const onFsChange = () => {
      if (!document.fullscreenElement) onExit();
    };
    document.addEventListener("fullscreenchange", onFsChange);

    function exit() {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else onExit();
    }

    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("fullscreenchange", onFsChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10"
      style={{ background: "#0d0f11" }}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen presentation"
      onClick={onExit}
    >
      <div className="w-full max-w-[1600px]" onClick={(e) => e.stopPropagation()}>
        <PresentationDesignView svg={svg} />
      </div>
      <button
        onClick={onExit}
        className="absolute right-4 top-4 rounded-[5px] px-3 py-1.5 text-[13px] font-semibold"
        style={{ background: "rgba(255,255,255,.14)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}
      >
        Exit (Esc)
      </button>
    </div>
  );
}
