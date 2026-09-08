import { useEffect, useState } from "react";
import { BANK, byId, type BankElement, type Category } from "../../data/elements";
import { useProject } from "../../state/useProject";
import { C, CAT, money } from "../../theme/palette";
import { fmtArea, fmtDims } from "../../lib/units";
import { ElementDetailModal } from "../ElementDetailModal";
import { Sprite } from "../Sprite";

/**
 * Elements: a quick, scannable catalog of everything that fits in a parking
 * space. Each card opens a shared detail modal (no routing).
 */
export function Elements() {
  const cats = Object.keys(CAT) as Category[];
  const goTo = useProject((s) => s.goTo);
  const units = useProject((s) => s.units);
  const pendingElementId = useProject((s) => s.pendingElementId);
  const clearPendingElement = useProject((s) => s.clearPendingElement);
  const [selected, setSelected] = useState<BankElement | null>(null);

  // when arriving from a Library precedent's "Elements used" chip, open that element
  useEffect(() => {
    if (!pendingElementId) return;
    const el = byId(pendingElementId);
    if (el) setSelected(el);
    clearPendingElement();
  }, [pendingElementId, clearPendingElement]);

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-10 pb-16 sm:px-6">
      <h2 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight sm:text-[36px]">Elements</h2>
      <p className="m-0 mb-8 text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        A standard parking space is {fmtDims(8, 20, units)} ({fmtArea(160, units)}). View all of the community elements
        that could fit in this space instead.
      </p>

      {cats.map((cat) => {
        const items = BANK.filter((b) => b.cat === cat);
        return (
          <section key={cat} className="mb-10">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 rounded-[2px]"
                style={{ background: CAT[cat].soft, border: `1px solid ${C.woodDark}` }}
              />
              <h3 className="m-0 text-[19px] font-extrabold tracking-tight">{CAT[cat].label}</h3>
              <span className="text-xs font-semibold" style={{ color: C.inkSoft }}>
                {items.length} elements
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
              {items.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  // focus the card explicitly so focus restoration on close works
                  // even in browsers that don't focus buttons on mouse-click (Safari)
                  onClick={(e) => {
                    e.currentTarget.focus();
                    setSelected(b);
                  }}
                  aria-haspopup="dialog"
                  aria-label={`${b.name} — view details`}
                  className="element-card panel group flex w-full items-start gap-3 text-left"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px]"
                    style={{ background: CAT[b.cat].soft, border: `1px solid ${C.woodDark}` }}
                  >
                    <Sprite icon={b.icon} cat={b.cat} size={30} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14.5px] font-extrabold">{b.name}</div>
                    <div className="text-[12px] font-semibold" style={{ color: C.inkSoft }}>
                      {fmtDims(b.wFt, b.lFt, units)} · {fmtArea(b.wFt * b.lFt, units)}
                    </div>
                    <div className="mt-1 text-[12.5px] leading-snug" style={{ color: C.ink }}>
                      {b.impact}
                    </div>
                    <div className="mt-1 text-[12px] font-semibold" style={{ color: C.inkSoft }}>
                      {money(b.cost[0])}–{money(b.cost[1])}
                    </div>
                  </div>
                  {/* subtle affordance that the card opens */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                    style={{ color: C.inkSoft }}
                  >
                    <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <p className="mt-2 text-xs leading-relaxed" style={{ color: C.inkSoft }}>
        For more details about how these details were sourced, read{" "}
        <button
          onClick={() => goTo("methodology")}
          className="cursor-pointer font-bold underline"
          style={{ color: C.leaf }}
        >
          Methodology
        </button>{" "}
        for more details.
      </p>

      {selected && <ElementDetailModal element={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
