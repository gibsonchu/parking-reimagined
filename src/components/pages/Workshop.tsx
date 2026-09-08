import { useState } from "react";
import { BANK } from "../../data/elements";
import { LOT_MAX_FT, LOT_MIN_FT, SCALES } from "../../data/scales";
import {
  DEFAULT_BLANKS,
  DEFAULT_PAPER_ID,
  PAPER_SIZES,
  RECOMMENDED_QUANTITIES,
  WORKSHOP_INTRO,
  INSTRUCTION_STEPS,
  type BlankPiece,
} from "../../data/workshop";
import { useProject } from "../../state/useProject";
import { C, CAT } from "../../theme/palette";
import { fmtArea } from "../../lib/units";
import { WorkshopKitPrint } from "../WorkshopKitPrint";

const recommendedState = (): Record<string, number> =>
  Object.fromEntries(BANK.map((b) => [b.id, RECOMMENDED_QUANTITIES[b.id] ?? 0]));

export function Workshop() {
  const goTo = useProject((s) => s.goTo);
  const units = useProject((s) => s.units);

  const [scaleId, setScaleId] = useState("double");
  const [lotW, setLotW] = useState(50);
  const [lotL, setLotL] = useState(60);
  const [paperId, setPaperId] = useState(DEFAULT_PAPER_ID);
  const [qty, setQty] = useState<Record<string, number>>(recommendedState);
  const [blanks, setBlanks] = useState<BlankPiece[]>(DEFAULT_BLANKS.map((b) => ({ ...b })));
  const [printing, setPrinting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const scale = SCALES.find((s) => s.id === scaleId)!;
  const paper = PAPER_SIZES.find((p) => p.id === paperId)!;
  const custom = scale.adjustable ? { wFt: lotW, lFt: lotL } : undefined;

  const bump = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }));
  const setBlankCount = (id: string, d: number) =>
    setBlanks((bs) => bs.map((b) => (b.id === id ? { ...b, count: Math.max(0, b.count + d) } : b)));

  const totalPieces =
    Object.values(qty).reduce((a, b) => a + b, 0) + blanks.reduce((a, b) => a + b.count, 0);

  const Stepper = ({ value, onDec, onInc, label }: { value: number; onDec: () => void; onInc: () => void; label: string }) => (
    <div className="flex items-center gap-1.5" role="group" aria-label={label}>
      <button onClick={onDec} aria-label={`Fewer ${label}`} className="wk-step">
        −
      </button>
      <span className="w-6 text-center text-[14px] font-extrabold tabular-nums">{value}</span>
      <button onClick={onInc} aria-label={`More ${label}`} className="wk-step">
        +
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[960px] px-4 pt-10 pb-16 sm:px-6">
      <div className="text-[13px] font-bold tracking-[0.12em] uppercase" style={{ color: C.inkSoft }}>
        Community Workshop Kit
      </div>
      <h1 className="m-0 mt-1 text-[30px] font-extrabold tracking-tight sm:text-[38px]">Reimagine a street together</h1>
      <p className="m-0 mt-3 max-w-[640px] text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        Print a street plan, cut out Elements, and work together to explore how curb space could be used differently.
      </p>

      {/* 3-step intro */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {WORKSHOP_INTRO.map((s) => (
          <div key={s.n} className="panel flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-extrabold"
              style={{ background: C.ink, color: "#fff" }}
            >
              {s.n}
            </span>
            <span className="text-[14px] font-extrabold">{s.title}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <button onClick={() => setPrinting(true)} className="sun-btn">
          Create Workshop Kit
        </button>
        <button onClick={() => setShowInstructions(true)} className="wood-btn">
          View Instructions
        </button>
      </div>

      {/* Space + paper */}
      <h2 className="mt-10 mb-3 text-[19px] font-extrabold tracking-tight">Choose the workshop space</h2>
      <div className="flex flex-wrap gap-2">
        {SCALES.map((s) => {
          const active = s.id === scaleId;
          return (
            <button
              key={s.id}
              onClick={() => setScaleId(s.id)}
              aria-pressed={active}
              className="cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
              style={{ border: `1px solid ${active ? C.woodDark : C.wood}`, background: active ? C.ink : C.white, color: active ? "#fff" : C.inkSoft }}
            >
              {s.name}
            </button>
          );
        })}
      </div>
      {scale.adjustable && (
        <div className="mt-3 max-w-[420px] space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.inkSoft }}>
            W
            <input type="range" min={LOT_MIN_FT} max={LOT_MAX_FT} value={lotW} onChange={(e) => setLotW(+e.target.value)} className="w-full accent-[#2e9e4f]" aria-label="Lot width in feet" />
            <span className="w-16 text-right tabular-nums">{lotW} ft</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.inkSoft }}>
            L
            <input type="range" min={LOT_MIN_FT} max={LOT_MAX_FT} value={lotL} onChange={(e) => setLotL(+e.target.value)} className="w-full accent-[#2e9e4f]" aria-label="Lot length in feet" />
            <span className="w-16 text-right tabular-nums">{lotL} ft</span>
          </label>
        </div>
      )}

      <h2 className="mt-8 mb-3 text-[19px] font-extrabold tracking-tight">Print size</h2>
      <div className="flex flex-wrap gap-2">
        {PAPER_SIZES.map((p) => {
          const active = p.id === paperId;
          return (
            <button
              key={p.id}
              onClick={() => setPaperId(p.id)}
              aria-pressed={active}
              className="cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
              style={{ border: `1px solid ${active ? C.woodDark : C.wood}`, background: active ? C.ink : C.white, color: active ? "#fff" : C.inkSoft }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[12.5px]" style={{ color: C.inkSoft }}>
        The board and Elements print at the same scale. Larger spaces print best on 11 × 17 or the 24 × 36 poster.
      </p>

      {/* Element quantities */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-[19px] font-extrabold tracking-tight">Elements to print</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setQty(recommendedState())} className="wood-btn text-[12.5px]">
            Recommended set
          </button>
          <button onClick={() => setQty(Object.fromEntries(BANK.map((b) => [b.id, Math.max(1, qty[b.id] ?? 0)])))} className="wood-btn text-[12.5px]">
            Select all
          </button>
          <button onClick={() => setQty(Object.fromEntries(BANK.map((b) => [b.id, 0])))} className="wood-btn text-[12.5px]">
            Clear all
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {BANK.map((b) => (
          <div key={b.id} className="panel flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ background: CAT[b.cat].color }} />
              <span className="truncate text-[13.5px] font-bold">{b.name}</span>
            </span>
            <Stepper value={qty[b.id] ?? 0} onDec={() => bump(b.id, -1)} onInc={() => bump(b.id, 1)} label={b.name} />
          </div>
        ))}
      </div>

      {/* Blank pieces */}
      <h2 className="mt-8 mb-1 text-[19px] font-extrabold tracking-tight">Blank “Your Idea” pieces</h2>
      <p className="m-0 mb-3 text-[12.5px]" style={{ color: C.inkSoft }}>
        Blank cut-outs, sized on the same grid, for ideas that aren't in the catalog.
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {blanks.map((bl) => (
          <div key={bl.id} className="panel flex items-center justify-between gap-2">
            <span className="text-[13.5px] font-bold">{bl.label}</span>
            <Stepper value={bl.count} onDec={() => setBlankCount(bl.id, -1)} onInc={() => setBlankCount(bl.id, 1)} label={`${bl.label} blanks`} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button onClick={() => setPrinting(true)} className="sun-btn">
          Download Workshop Kit
        </button>
        <span className="text-[13px] font-semibold" style={{ color: C.inkSoft }}>
          {totalPieces} pieces · {scale.name} board on {paper.label}
        </span>
      </div>

      <p className="mt-8 text-xs leading-relaxed" style={{ color: C.inkSoft }}>
        Prefer to design digitally?{" "}
        <button onClick={() => goTo("choose")} className="cursor-pointer font-bold underline" style={{ color: C.leaf }}>
          Use the Design tool
        </button>{" "}
        — the same Elements, footprints, and {fmtArea(160, units)} parking space.
      </p>

      {printing && (
        <WorkshopKitPrint
          scaleId={scaleId}
          customDims={custom}
          paper={paper}
          quantities={qty}
          blanks={blanks.filter((b) => b.count > 0)}
          onClose={() => setPrinting(false)}
        />
      )}
      {showInstructions && <InstructionsProjector onClose={() => setShowInstructions(false)} />}
    </div>
  );
}

/** Projector-friendly full-screen instruction poster. Escape exits. */
function InstructionsProjector({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto p-6 sm:p-12"
      style={{ background: "#fff", color: C.ink }}
      role="dialog"
      aria-modal="true"
      aria-label="Workshop instructions"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={-1}
      ref={(el) => el?.focus()}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-[5px] px-3 py-1.5 text-[13px] font-semibold"
        style={{ border: `1px solid ${C.woodDark}` }}
      >
        Exit (Esc)
      </button>
      <div className="w-full max-w-[1100px] text-center">
        <div className="text-[15px] font-extrabold tracking-[0.06em] uppercase" style={{ color: C.inkSoft }}>
          Parking, Reimagined
        </div>
        <h1 className="m-0 mt-2 text-[44px] font-extrabold tracking-tight sm:text-[64px]">Reimagine This Space</h1>
        <p className="mx-auto mt-3 max-w-[720px] text-[18px] sm:text-[22px]" style={{ color: C.inkSoft }}>
          Work together to decide how this space could better serve your community.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2">
          {INSTRUCTION_STEPS.map((s) => (
            <div key={s.n} className="flex items-start gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[26px] font-extrabold"
                style={{ background: C.ink, color: "#fff" }}
              >
                {s.n}
              </span>
              <div>
                <div className="text-[24px] font-extrabold">{s.verb}</div>
                <div className="text-[17px]" style={{ color: C.inkSoft }}>
                  {s.prompt}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-[17px] font-bold">
          <div>There is no single right answer.</div>
          <div>Use the blank pieces to add ideas that are missing.</div>
        </div>
      </div>
    </div>
  );
}
