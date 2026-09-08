import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BANK } from "../data/elements";
import { useProject } from "../state/useProject";
import { C, CAT, money } from "../theme/palette";
import { fmtDims } from "../lib/units";

/** "How we estimate" — a short in-editor summary of the Methodology page. */
export function HowWeEstimate({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const goTo = useProject((s) => s.goTo);
  const units = useProject((s) => s.units);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    ref.current?.focus();
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Portal to <body> so the sticky editor columns' stacking contexts can't trap
  // the overlay beneath the top bar. Aligned to the top of the viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      style={{ background: "rgba(31,35,40,.45)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="How we estimate"
    >
      <div
        ref={ref}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-md p-6 outline-none"
        style={{
          background: C.creamPanel,
          border: `1px solid ${C.woodDark}`,
          boxShadow: "0 12px 32px rgba(31,35,40,.18)",
          color: C.ink,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="m-0 text-xl font-black">How we estimate</h2>
          <button onClick={onClose} className="wood-btn" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p className="m-0">
            <b>Object footprint</b> is the physical size of the element, and the dimension the tool draws and counts on
            the one-foot grid. <b>Planning area</b> is the space needed to use it safely and comfortably.
          </p>
          <p className="m-0">
            <b>Cost range</b> is an early planning range, not a quote or construction budget. <b>Cost basis</b> states
            what the range covers. Freight, design, permitting, utility work, labor and maintenance are excluded unless
            stated.
          </p>
        </div>

        <h3 className="mt-5 mb-2 text-sm font-extrabold" style={{ color: C.inkSoft }}>
          Estimated dimensions and pricing
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="text-left" style={{ color: C.inkSoft }}>
                <th className="py-2 pr-3 font-bold">Element</th>
                <th className="py-2 pr-3 text-right font-bold">Object footprint</th>
                <th className="py-2 pr-3 text-right font-bold">Planning area</th>
                <th className="py-2 pr-3 text-right font-bold">Cost range</th>
                <th className="py-2 font-bold">Cost basis</th>
              </tr>
            </thead>
            <tbody>
              {BANK.map((b) => (
                <tr key={b.id} style={{ borderTop: `1px solid ${C.wood}` }}>
                  <td className="py-2 pr-3 font-bold whitespace-nowrap">
                    <span
                      className="mr-1.5 inline-block h-2 w-2 rounded-sm align-middle"
                      style={{ background: CAT[b.cat].color }}
                    />
                    {b.name}
                  </td>
                  <td className="tnum py-2 pr-3 text-right whitespace-nowrap">
                    {fmtDims(b.wFt, b.lFt, units)}
                  </td>
                  <td className="py-2 pr-3 text-right" style={{ color: C.inkSoft }}>
                    {b.planningArea}
                  </td>
                  <td className="tnum py-2 pr-3 text-right whitespace-nowrap">
                    {money(b.cost[0])}–{money(b.cost[1])}
                  </td>
                  <td className="py-2" style={{ color: C.inkSoft }}>
                    {b.costBasis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 mb-0 text-xs leading-relaxed" style={{ color: C.inkSoft }}>
          All cost ranges are currently representative figures pending public sourcing. See{" "}
          <button
            onClick={() => {
              onClose();
              goTo("methodology");
            }}
            className="cursor-pointer font-bold underline"
            style={{ color: C.leaf }}
          >
            Methodology
          </button>{" "}
          for the full explanation of what is and is not modeled.
        </p>
      </div>
    </div>,
    document.body,
  );
}
