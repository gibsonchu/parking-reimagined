import { useEffect } from "react";
import { byId } from "../data/elements";
import { useProject } from "../state/useProject";
import { C } from "../theme/palette";
import { ExportBar } from "./ExportBar";
import { PlotCanvas } from "./PlotCanvas";
import { TownStats } from "./TownStats";
import { ToyBox } from "./ToyBox";

const inField = (e: KeyboardEvent) => {
  const t = e.target as HTMLElement | null;
  return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
};

/** The editor: toy box · plot canvas · town stats (stacked on mobile). */
export function Editor() {
  const selectedUid = useProject((s) => s.selectedUid);
  const project = useProject((s) => s.project);
  const removeItem = useProject((s) => s.removeItem);
  const rotateItem = useProject((s) => s.rotateItem);
  const nudgeItem = useProject((s) => s.nudgeItem);
  const select = useProject((s) => s.select);
  const notice = useProject((s) => s.notice);

  const selectedItem = project.items.find((p) => p.uid === selectedUid);
  const selectedEl = selectedItem ? byId(selectedItem.ref) : undefined;

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (inField(e)) return;
      if (e.key === "Escape") {
        select(null);
        return;
      }
      if (!selectedUid) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeItem(selectedUid);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        rotateItem(selectedUid);
      } else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const d = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
        if (d) nudgeItem(selectedUid, d[0], d[1]);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selectedUid, removeItem, rotateItem, nudgeItem, select]);

  return (
    <div>
      <ExportBar />
      <div className="mx-auto flex max-w-[1180px] flex-col gap-5 p-4 sm:p-6 lg:grid lg:grid-cols-[230px_minmax(0,1fr)_264px] lg:items-start">
        <div className="order-2 lg:order-1">
          <ToyBox />
        </div>
        <div className="order-1 lg:order-2">
          {project.prompt && (
            <div
              className="mb-3 rounded-md px-4 py-2.5 text-[13.5px] leading-snug"
              style={{ background: C.grass, border: `1px solid ${C.wood}`, color: C.ink }}
            >
              <span className="font-extrabold">Prompt</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              {project.prompt}
            </div>
          )}
          <PlotCanvas />
          <div className="mt-2 flex min-h-9 flex-wrap items-center gap-2.5" aria-live="polite">
            {notice && (
              <span
                className="rounded px-3 py-1.5 text-[13px] font-semibold"
                style={{ background: "#fbe8e4", color: "#c93a26", border: "1px solid #e6a99e" }}
                role="alert"
              >
                {notice}
              </span>
            )}
            {!notice && selectedItem && selectedEl && (
              <>
                <span className="note text-[13.5px]" style={{ color: C.inkSoft }}>
                  {selectedEl.name} selected · {selectedEl.impact}
                </span>
                <button onClick={() => rotateItem(selectedItem.uid)} className="wood-btn">
                  Rotate
                </button>
                <button
                  onClick={() => removeItem(selectedItem.uid)}
                  className="wood-btn"
                  style={{ borderColor: "#c93a26", color: "#c93a26" }}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
        <div className="order-3 lg:sticky lg:top-[74px]">
          <TownStats />
        </div>
      </div>
    </div>
  );
}
