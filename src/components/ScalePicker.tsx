import { useState } from "react";
import { LOT_MAX_FT, LOT_MIN_FT, SCALES } from "../data/scales";
import { useProject } from "../state/useProject";
import { C } from "../theme/palette";
import { fmtArea, fmtDims, fmtLen } from "../lib/units";
import { StallDiagram } from "./PlotThumb";

/**
 * "How much space are you designing?" — the entry point into the editor.
 * Lives at the bottom of the homepage; "Start Designing" scrolls here.
 */
export function ScalePicker() {
  const startBlank = useProject((s) => s.startBlank);
  const units = useProject((s) => s.units);
  const [lotW, setLotW] = useState(50);
  const [lotL, setLotL] = useState(60);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(215px,1fr))] items-start gap-3">
      {SCALES.map((s) => (
        <div key={s.id} className="scale-card">
          <button
            onClick={() => startBlank(s, s.adjustable ? { wFt: lotW, lFt: lotL } : undefined)}
            className="block w-full cursor-pointer text-left"
          >
            <div className="flex items-center gap-2 text-[15px] font-extrabold">
              {s.name}
              {s.id === "single" && (
                <span
                  className="rounded-[3px] px-1.5 py-[1px] text-[9px] font-bold tracking-[0.08em] uppercase"
                  style={{ background: C.leaf, color: "#fff" }}
                >
                  Typical
                </span>
              )}
            </div>
            <div className="mt-[3px] text-xs font-semibold" style={{ color: C.inkSoft }}>
              {s.adjustable
                ? `${fmtDims(lotW, lotL, units)} · ${fmtArea(lotW * lotL, units)}`
                : `${fmtArea(s.wFt * s.lFt, units)} · ${s.tag}`}
            </div>
            <StallDiagram wFt={s.adjustable ? lotW : s.wFt} lFt={s.adjustable ? lotL : s.lFt} />
          </button>
          {s.adjustable && (
            <div className="mt-3 space-y-1.5 border-t border-dashed pt-2.5" style={{ borderColor: C.wood }}>
              <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.inkSoft }}>
                W
                <input
                  type="range" min={LOT_MIN_FT} max={LOT_MAX_FT} value={lotW}
                  onChange={(e) => setLotW(Number(e.target.value))}
                  className="w-full accent-[#2e9e4f]" aria-label="Lot width in feet"
                />
                <span className="w-14 text-right tabular-nums">{fmtLen(lotW, units)}</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.inkSoft }}>
                L
                <input
                  type="range" min={LOT_MIN_FT} max={LOT_MAX_FT} value={lotL}
                  onChange={(e) => setLotL(Number(e.target.value))}
                  className="w-full accent-[#2e9e4f]" aria-label="Lot length in feet"
                />
                <span className="w-14 text-right tabular-nums">{fmtLen(lotL, units)}</span>
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
