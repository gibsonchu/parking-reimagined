import { byId } from "../data/elements";
import { scaleById } from "../data/scales";
import { TEMPLATES } from "../data/templates";
import { useProject } from "../state/useProject";
import { C, CAT } from "../theme/palette";
import { fmtArea } from "../lib/units";
import { TemplateThumb } from "./PlotThumb";

/** Ready-made designs — pick one and it opens in the editor to rearrange. */
export function TemplateGallery() {
  const startTemplate = useProject((s) => s.startTemplate);
  const units = useProject((s) => s.units);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {TEMPLATES.map((t) => {
        const sc = scaleById(t.scale);
        const leadCat = byId(t.items[0]?.ref)?.cat ?? "green";
        return (
          <button key={t.id} onClick={() => startTemplate(t)} className="card-btn">
            <TemplateThumb t={t} sc={sc} />
            <div className="mt-3 flex items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-[2px]"
                style={{ background: CAT[leadCat].soft, border: `1px solid ${C.woodDark}` }}
              />
              <span className="text-[17px] font-extrabold">{t.name}</span>
            </div>
            <div className="mt-1 text-[13px] leading-snug" style={{ color: C.inkSoft }}>
              {t.blurb}
            </div>
            <div className="mt-2 text-xs font-semibold" style={{ color: C.inkSoft }}>
              {sc.name} · {fmtArea(sc.wFt * sc.lFt, units)} · {sc.tag}
            </div>
          </button>
        );
      })}
    </div>
  );
}
