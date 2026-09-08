import { byId } from "../data/elements";
import type { Scale } from "../data/scales";
import type { Template } from "../data/templates";
import { footprint } from "../lib/impact";
import type { SavedProject } from "../lib/storage";
import { plotDims } from "../state/useProject";
import { C, CAT } from "../theme/palette";

/*
 * Thumbnails use a single uniform scale for both axes so a plot keeps its true
 * proportions — a one-spot 8×20 lot reads as a tall strip, not a stretched box.
 */

export function TemplateThumb({ t, sc, boxW = 208, boxH = 150 }: { t: Template; sc: Scale; boxW?: number; boxH?: number }) {
  const scale = Math.min(boxW / sc.wFt, boxH / sc.lFt);
  return (
    <div className="flex items-center justify-center" style={{ height: boxH }}>
      <div
        className="checker relative overflow-hidden rounded-[3px]"
        style={{
          width: sc.wFt * scale, height: sc.lFt * scale, background: C.grass,
          border: `1.5px solid ${C.woodDark}`, backgroundSize: `${scale * 2}px ${scale * 2}px`,
        }}
      >
        {t.items.map((it, i) => {
          const b = byId(it.ref);
          if (!b) return null;
          const fp = footprint(b, it.rotation ?? 0);
          return (
            <div
              key={i}
              className="absolute rounded-[1px]"
              style={{
                left: it.x * scale, top: it.y * scale, width: fp.w * scale, height: fp.l * scale,
                background: CAT[b.cat].soft, border: `1px solid ${C.woodDark}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function PlotMini({ p }: { p: SavedProject }) {
  const { wFt, lFt } = plotDims(p);
  const boxW = 72, boxH = 56;
  const scale = Math.min(boxW / wFt, boxH / lFt);
  return (
    <div className="flex shrink-0 items-center justify-center" style={{ width: boxW, height: boxH }}>
      <div
        className="checker relative overflow-hidden rounded-[2px]"
        style={{
          width: wFt * scale, height: lFt * scale, background: C.grass,
          border: `1.5px solid ${C.woodDark}`, backgroundSize: `${scale * 4}px ${scale * 4}px`,
        }}
      >
        {p.items.map((it) => {
          const b = byId(it.ref);
          if (!b) return null;
          const fp = footprint(b, it.rotation ?? 0);
          return (
            <div
              key={it.uid}
              className="absolute rounded-[1px]"
              style={{
                left: it.x * scale, top: it.y * scale, width: fp.w * scale, height: fp.l * scale,
                background: CAT[b.cat].color, opacity: 0.85,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Little plan-view diagram of N standard 8×20 stalls, used on the scale cards. */
export function StallDiagram({ wFt, lFt }: { wFt: number; lFt: number }) {
  const cols = Math.max(1, Math.min(8, Math.round(wFt / 8)));
  const rows = Math.max(1, Math.min(6, Math.round(lFt / 20)));
  return (
    <div className="mt-2.5 flex gap-[3px]">
      {Array.from({ length: cols }).map((_, c) => (
        <div key={c} className="flex flex-col gap-[3px]">
          {Array.from({ length: rows }).map((_, r) => (
            <span
              key={r}
              className="block rounded-[1px]"
              style={{ width: 11, height: 22, background: C.grass, border: `1px solid ${C.inkSoft}` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
