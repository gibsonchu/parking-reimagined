import { useEffect } from "react";
import { createPortal } from "react-dom";
import { BANK } from "../data/elements";
import { scaleById } from "../data/scales";
import {
  FACILITATOR_PROMPTS,
  INSTRUCTION_STEPS,
  OUTPUT_FIELDS,
  type BlankPiece,
  type PaperSize,
} from "../data/workshop";
import { C, CAT } from "../theme/palette";
import { Sprite } from "./Sprite";

const PX = 96; // CSS px per inch

interface Props {
  scaleId: string;
  customDims?: { wFt: number; lFt: number };
  paper: PaperSize;
  quantities: Record<string, number>;
  blanks: BlankPiece[];
  onClose: () => void;
}

/**
 * Full-kit print view. Everything is sized in real inches so the printed board
 * and the printed Element cut-outs share ONE scale (in/ft): a printed Café table
 * and Bench keep their true relative size. Board + cut-outs come from the same
 * Elements dataset. Screen shows a preview; the browser print dialog produces
 * the paper output. `@page` size is injected for the selected paper.
 */
export function WorkshopKitPrint({ scaleId, customDims, paper, quantities, blanks, onClose }: Props) {
  const scale = scaleById(scaleId);
  const wFt = customDims?.wFt ?? scale.wFt;
  const lFt = customDims?.lFt ?? scale.lFt;

  // one scale for the whole kit: fit the board (lFt horizontal) to the paper
  const margin = 0.4;
  const usableW = paper.wIn - margin * 2;
  const usableH = paper.hIn - margin * 2;
  const inPerFt = Math.min(usableW / lFt, usableH / wFt);

  // page-break + physical page size while this overlay is open
  useEffect(() => {
    document.body.classList.add("printing-workshop");
    const style = document.createElement("style");
    style.textContent = `@media print { @page { size: ${paper.wIn}in ${paper.hIn}in; margin: ${margin}in; } }`;
    document.head.appendChild(style);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("printing-workshop");
      style.remove();
      document.removeEventListener("keydown", onKey);
    };
  }, [paper, margin, onClose]);

  // parking-space-sized (8×20 ft) outline tiles across the plot
  const cols = Math.max(1, Math.round(wFt / 8));
  const rows = Math.max(1, Math.round(lFt / 20));

  // flatten quantities → cut-out pieces
  const elementPieces = BANK.flatMap((b) => Array.from({ length: quantities[b.id] ?? 0 }, (_, i) => ({ key: `${b.id}-${i}`, b })));

  const Cutout = ({ wFt: cw, lFt: cl, children }: { wFt: number; lFt: number; children: React.ReactNode }) => (
    <div
      className="wk-cutout"
      style={{
        width: `${Math.max(cw * inPerFt, 0.7)}in`,
        height: `${Math.max(cl * inPerFt, 0.7)}in`,
      }}
    >
      {children}
    </div>
  );

  return createPortal(
    <div className="workshop-print-portal fixed inset-0 z-[120] overflow-y-auto" style={{ background: "#f3f3f3" }}>
      {/* screen-only controls */}
      <div
        className="no-print sticky top-0 z-10 flex items-center justify-between gap-3 px-4 py-3"
        style={{ background: C.woodDark, color: "#fff" }}
      >
        <span className="text-[14px] font-bold">Workshop Kit — print preview · {paper.label}</span>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="rounded px-3 py-1.5 text-[13px] font-bold" style={{ background: "#fff", color: C.ink }}>
            Print / Save PDF
          </button>
          <button onClick={onClose} className="rounded px-3 py-1.5 text-[13px] font-bold" style={{ border: "1px solid #fff", color: "#fff" }}>
            Close
          </button>
        </div>
      </div>

      <div className="wk-sheets">
        {/* ── Page 1 — Instruction poster ── */}
        <section className="wk-page wk-poster">
          <div className="wk-brand">Parking, Reimagined</div>
          <h1 className="wk-poster-title">Reimagine This Space</h1>
          <p className="wk-poster-sub">Work together to decide how this space could better serve your community.</p>
          <div className="wk-poster-steps">
            {INSTRUCTION_STEPS.map((s) => (
              <div key={s.n} className="wk-poster-step">
                <div className="wk-poster-num">{s.n}</div>
                <div>
                  <div className="wk-poster-verb">{s.verb}</div>
                  <div className="wk-poster-prompt">{s.prompt}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="wk-poster-foot">
            <div>There is no single right answer.</div>
            <div>Use the blank pieces to add ideas that are missing.</div>
          </div>
        </section>

        {/* ── Page 2 — Base board ── */}
        <section className="wk-page">
          <div className="wk-board-head">
            <div className="wk-brand">Parking, Reimagined</div>
            <div className="wk-board-title">Reimagine This Space</div>
          </div>
          <div className="wk-fields">
            <span>Location: <span className="wk-line" /></span>
            <span>Workshop / group: <span className="wk-line" /></span>
            <span>Date: <span className="wk-line wk-line-sm" /></span>
          </div>

          <div className="wk-dimtop">← {lFt} ft →</div>
          <div className="wk-board-row">
            <div className="wk-dimside">← {wFt} ft →</div>
            <div
              className="wk-board"
              style={{ width: `${lFt * inPerFt}in`, height: `${wFt * inPerFt}in`, backgroundSize: `${inPerFt}in ${inPerFt}in` }}
            >
              {Array.from({ length: cols }).map((_, c) =>
                Array.from({ length: rows }).map((_, r) => (
                  <div
                    key={`${c}-${r}`}
                    className="wk-stall"
                    style={{
                      left: `${r * 20 * inPerFt}in`,
                      top: `${c * 8 * inPerFt}in`,
                      width: `${Math.min(20, lFt - r * 20) * inPerFt}in`,
                      height: `${Math.min(8, wFt - c * 8) * inPerFt}in`,
                    }}
                  />
                )),
              )}
            </div>
          </div>
          <div className="wk-legend">Place the printed Elements inside the plan to create your design.</div>
        </section>

        {/* ── Pages 3+ — Element cut-out sheets ── */}
        <section className="wk-page wk-cutsheet">
          <div className="wk-sheet-head no-break">
            <div className="wk-brand">Elements — cut along the lines</div>
            <div className="wk-sheet-note">1 ft = {inPerFt.toFixed(2)} in · same scale as the board</div>
          </div>
          <div className="wk-cutgrid">
            {elementPieces.map(({ key, b }) => (
              <Cutout key={key} wFt={b.wFt} lFt={b.lFt}>
                <span className="wk-cat" style={{ color: CAT[b.cat].deep }}>
                  {CAT[b.cat].label}
                </span>
                <span className="wk-sprite">
                  <Sprite icon={b.icon} cat={b.cat} size={Math.max(16, Math.min(b.wFt, b.lFt) * inPerFt * PX * 0.42)} />
                </span>
                <span className="wk-name">{b.name}</span>
              </Cutout>
            ))}
            {blanks.flatMap((bl) =>
              Array.from({ length: bl.count }, (_, i) => (
                <Cutout key={`${bl.id}-${i}`} wFt={bl.wFt} lFt={bl.lFt}>
                  <span className="wk-cat">Your idea</span>
                  <span className="wk-name wk-name-blank">{bl.label}</span>
                </Cutout>
              )),
            )}
          </div>
        </section>

        {/* ── Facilitator prompts ── */}
        <section className="wk-page">
          <h2 className="wk-h2">Facilitator prompts</h2>
          <p className="wk-muted">Use these to guide the conversation. You do not need to cover all of them.</p>
          <ul className="wk-prompts">
            {FACILITATOR_PROMPTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        {/* ── Output / reflection sheet ── */}
        <section className="wk-page">
          <div className="wk-brand">Parking, Reimagined</div>
          <h2 className="wk-h2">Our Design</h2>
          <div className="wk-out-fields">
            {OUTPUT_FIELDS.map((f) => (
              <div key={f} className="wk-out-field">
                <div className="wk-out-label">{f}</div>
                <div className="wk-line-full" />
                <div className="wk-line-full" />
              </div>
            ))}
          </div>
          <div className="wk-out-photo">
            Place or photograph your final design here
            <div className="wk-qr">QR</div>
          </div>
        </section>
      </div>
    </div>,
    document.body,
  );
}
