import { useEffect, useMemo, useRef, useState } from "react";
import type { Category } from "../data/elements";
import { computeStats } from "../lib/impact";
import { plotDims, useProject } from "../state/useProject";
import { C, CAT, money } from "../theme/palette";
import { areaUnit, areaValue, fmtAreaShort } from "../lib/units";
import { HowWeEstimate } from "./HowWeEstimate";

const prefersReducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly animates toward a target number (respects prefers-reduced-motion). */
function useAnimatedNumber(value: number): number {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = value;
    if (from === value || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const t0 = performance.now();
    const dur = 350;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - (1 - k) ** 3;
      setDisplay(from + (value - from) * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return display;
}

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between rounded px-3 py-1.5"
      style={{ background: C.white, border: `1px solid ${C.wood}` }}
    >
      <span className="text-[12.5px] font-semibold" style={{ color: C.inkSoft }}>
        {icon ? `${icon} ` : ""}{label}
      </span>
      <span className="text-sm font-extrabold" style={{ color: C.ink }}>
        {value}
      </span>
    </div>
  );
}

/** Right panel: live-updating impact stats derived from real square footage. */
export function TownStats() {
  const project = useProject((s) => s.project);
  const units = useProject((s) => s.units);
  const { wFt, lFt } = plotDims(project);
  const totalSqFt = wFt * lFt;
  const stats = useMemo(() => computeStats(project.items, totalSqFt), [project.items, totalSqFt]);
  const usedAnim = useAnimatedNumber(stats.used);
  const [showHow, setShowHow] = useState(false);

  return (
    <div>
      <div className="panel">
        <div className="panel-title">Your design</div>
        <div
          className="mb-3 rounded px-4 py-3.5"
          style={{ background: "#f4faf5", border: `1px solid ${C.leaf}` }}
        >
          {/* label sits beside the figure, wrapping within its own column
              rather than dropping below once the number grows */}
          <div className="flex items-baseline gap-2">
            <span className="shrink-0 text-[38px] leading-none font-black" style={{ color: C.leaf }} aria-live="polite">
              {areaValue(usedAnim, units)}
            </span>
            <span className="min-w-0 text-[12.5px] leading-snug font-semibold" style={{ color: C.ink }}>
              {areaUnit(units)} of {areaValue(totalSqFt, units)}, reimagined
            </span>
          </div>
          <div
            className="mt-2.5 h-[9px] overflow-hidden rounded-md"
            style={{ background: "#fff", border: `1.5px solid ${C.leaf}` }}
            role="progressbar"
            aria-valuenow={stats.pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Share of plot reprogrammed"
          >
            <div
              className="h-full transition-[width] duration-300 ease-out motion-reduce:transition-none"
              style={{ width: `${Math.min(100, stats.pct)}%`, background: `linear-gradient(90deg, ${CAT.green.color}, ${C.leaf})` }}
            />
          </div>
          <div className="mt-1.5 text-[11.5px] font-semibold" style={{ color: C.ink }}>
            {stats.pct}% programmed · {stats.carsRemoved} car spaces reclaimed
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <Row icon="" label="Est. cost" value={project.items.length ? `${money(stats.cLo)}–${money(stats.cHi)}` : "—"} />
          {stats.seats > 0 && <Row icon="" label="Seating" value={`~${stats.seats} people`} />}
          {stats.bikes > 0 && <Row icon="" label="Bike parking" value={`~${stats.bikes} bikes`} />}
          {stats.units > 0 && <Row icon="" label="Homes" value={`${stats.units}`} />}
          <div className="pt-2.5" style={{ borderTop: `1px dashed ${C.wood}` }}>
            <div className="mb-2 text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: C.inkSoft }}>
              Land use
            </div>
            {Object.keys(stats.cats).length === 0 && (
              <div className="text-[12.5px]" style={{ color: C.inkSoft }}>
                Nothing planted yet.
              </div>
            )}
            {(Object.entries(stats.cats) as [Category, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <div key={k} className="mb-2">
                  <div className="mb-[3px] flex justify-between text-[12.5px] font-semibold">
                    <span className="flex items-center gap-1.5" style={{ color: C.ink }}>
                      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: CAT[k].color }} />
                      {CAT[k].label}
                    </span>
                    <span style={{ color: C.inkSoft }}>{fmtAreaShort(v, units)}</span>
                  </div>
                  <div className="h-1.5 rounded" style={{ background: CAT[k].soft }}>
                    <div
                      className="h-full rounded transition-[width] duration-300 motion-reduce:transition-none"
                      style={{ width: `${Math.min(100, (v / totalSqFt) * 100)}%`, background: CAT[k].color }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-2.5 text-center text-[12px] leading-snug">
        <button className="cursor-pointer font-bold underline" style={{ color: C.leaf }} onClick={() => setShowHow(true)}>
          How we estimate
        </button>
      </div>
      {showHow && <HowWeEstimate onClose={() => setShowHow(false)} />}
    </div>
  );
}
