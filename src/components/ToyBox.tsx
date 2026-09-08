import { BANK, type Category } from "../data/elements";
import { useProject } from "../state/useProject";
import { C, CAT } from "../theme/palette";
import { fmtDims } from "../lib/units";
import { Sprite } from "./Sprite";

/*
 * Left panel: category tabs + element list. Click to plop an element onto the
 * plot, or drag it to a precise spot (HTML5 drag → PlotCanvas drop handler).
 */
export function ToyBox() {
  const activeCat = useProject((s) => s.activeCat);
  const setActiveCat = useProject((s) => s.setActiveCat);
  const addElement = useProject((s) => s.addElement);
  const units = useProject((s) => s.units);
  const catList = BANK.filter((b) => b.cat === activeCat);

  return (
    <div className="panel">
      <div className="panel-title">Elements</div>
      <div className="mb-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Element categories">
        {(Object.entries(CAT) as [Category, (typeof CAT)[Category]][]).map(([k, v]) => (
          <button
            key={k}
            role="tab"
            aria-selected={activeCat === k}
            onClick={() => setActiveCat(k)}
            className="cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              border: `2px solid ${v.color}`,
              background: activeCat === k ? v.color : C.white,
              color: activeCat === k ? C.white : v.deep,
              outlineColor: v.deep,
            }}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
        {catList.map((b) => (
          <button
            key={b.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/reclaim-element", b.id);
              e.dataTransfer.effectAllowed = "copy";
            }}
            onClick={() => addElement(b.id)}
            title={`${b.impact} · ${fmtDims(b.wFt, b.lFt, units)}`}
            className="flex cursor-grab items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-transform hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-1"
            style={{ background: C.white, border: `2px solid ${CAT[b.cat].soft}`, outlineColor: CAT[b.cat].deep }}
            onMouseEnter={(e) => (e.currentTarget.style.background = CAT[b.cat].soft)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.white)}
          >
            <span className="flex shrink-0 rounded-lg p-[3px]" style={{ background: CAT[b.cat].soft }}>
              <Sprite icon={b.icon} cat={b.cat} size={26} />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-bold" style={{ color: C.ink }}>{b.name}</span>
              <span className="text-[11px]" style={{ color: C.inkSoft }}>
                {fmtDims(b.wFt, b.lFt, units)} · {b.impact}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="note mt-2.5 text-[12.5px] leading-snug" style={{ color: C.inkSoft }}>
        Tap to place, or drag onto the plan. Select + <b>R</b> rotates, <b>Delete</b> removes.
      </div>
    </div>
  );
}
